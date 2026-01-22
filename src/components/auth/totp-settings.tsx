"use client";

import { useState, useTransition, useEffect } from "react";
import Image from "next/image";
import { Loader2, Shield, ShieldCheck, Copy, Check } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "@/hooks/use-toast";
import {
    getTotpSetupAction,
    enableTotpAction,
    disableTotpAction,
    checkTotpStatusAction,
} from "@/app/_actions/totp";

export const TotpSettings = () => {
    const [isPending, startTransition] = useTransition();
    const [isSetupPending, startSetupTransition] = useTransition();
    const [totpEnabled, setTotpEnabled] = useState(false);
    const [setupData, setSetupData] = useState<{
        secret: string;
        qrCodeUrl: string;
    } | null>(null);
    const [verifyCode, setVerifyCode] = useState("");
    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Check current TOTP status on mount
    useEffect(() => {
        checkTotpStatusAction().then((result) => {
            setTotpEnabled(result.enabled);
            setIsLoading(false);
        });
    }, []);

    const handleSetupTotp = () => {
        startSetupTransition(async () => {
            const result = await getTotpSetupAction();
            if (result.success && result.data) {
                setSetupData(result.data);
            } else {
                toast({
                    title: "Error",
                    description: result.message || "Failed to set up TOTP",
                    variant: "destructive",
                });
            }
        });
    };

    const handleEnableTotp = () => {
        if (verifyCode.length !== 6) {
            toast({
                title: "Error",
                description: "Please enter a 6-digit code",
                variant: "destructive",
            });
            return;
        }

        startTransition(async () => {
            const result = await enableTotpAction(verifyCode);
            if (result.success) {
                setTotpEnabled(true);
                setSetupData(null);
                setVerifyCode("");
                toast({
                    title: "Success",
                    description: "Google Authenticator enabled successfully!",
                });
            } else {
                toast({
                    title: "Error",
                    description: result.message || "Failed to enable TOTP",
                    variant: "destructive",
                });
            }
        });
    };

    const handleDisableTotp = () => {
        startTransition(async () => {
            const result = await disableTotpAction();
            if (result.success) {
                setTotpEnabled(false);
                toast({
                    title: "Success",
                    description: "Google Authenticator disabled",
                });
            } else {
                toast({
                    title: "Error",
                    description: result.message || "Failed to disable TOTP",
                    variant: "destructive",
                });
            }
        });
    };

    const copySecret = () => {
        if (setupData?.secret) {
            navigator.clipboard.writeText(setupData.secret);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            toast({
                title: "Copied",
                description: "Secret key copied to clipboard",
            });
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    // TOTP is enabled - show status and disable button
    if (totpEnabled && !setupData) {
        return (
            <div className="space-y-6 p-6 border border-border/40 rounded-lg bg-background/50">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="h-8 w-8 text-green-500" />
                    <div>
                        <h3 className="text-lg font-semibold">Google Authenticator Enabled</h3>
                        <p className="text-sm text-muted-foreground">
                            Your account is protected with two-factor authentication
                        </p>
                    </div>
                </div>

                <Button
                    variant="destructive"
                    onClick={handleDisableTotp}
                    disabled={isPending}
                    className="w-full sm:w-auto"
                >
                    {isPending ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Disabling...
                        </>
                    ) : (
                        "Disable Google Authenticator"
                    )}
                </Button>
            </div>
        );
    }

    // Setup mode - show QR code and verification
    if (setupData) {
        return (
            <div className="space-y-6 p-6 border border-border/40 rounded-lg bg-background/50">
                <div className="flex items-center gap-3">
                    <Shield className="h-8 w-8 text-primary" />
                    <div>
                        <h3 className="text-lg font-semibold">Set Up Google Authenticator</h3>
                        <p className="text-sm text-muted-foreground">
                            Scan the QR code with your authenticator app
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-6">
                    {/* QR Code */}
                    <div className="p-4 bg-white rounded-xl shadow-md">
                        <Image
                            src={setupData.qrCodeUrl}
                            alt="TOTP QR Code"
                            width={200}
                            height={200}
                            className="rounded"
                        />
                    </div>

                    {/* Manual entry secret */}
                    <div className="w-full space-y-2">
                        <p className="text-sm text-muted-foreground text-center">
                            Or enter this secret key manually:
                        </p>
                        <div className="flex items-center gap-2">
                            <code className="flex-1 p-3 bg-muted rounded text-sm font-mono break-all text-center">
                                {setupData.secret}
                            </code>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={copySecret}
                                className="shrink-0"
                            >
                                {copied ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                    <Copy className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Verification input */}
                    <div className="w-full space-y-4">
                        <p className="text-sm text-muted-foreground text-center">
                            Enter the 6-digit code from your authenticator app:
                        </p>
                        <Input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={6}
                            placeholder="000000"
                            value={verifyCode}
                            onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, ''))}
                            className="text-center text-2xl tracking-widest font-mono"
                        />
                    </div>

                    <div className="flex gap-3 w-full">
                        <Button
                            variant="outline"
                            onClick={() => setSetupData(null)}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleEnableTotp}
                            disabled={isPending || verifyCode.length !== 6}
                            className="flex-1"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                "Enable"
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // Initial state - show setup button
    return (
        <div className="space-y-6 p-6 border border-border/40 rounded-lg bg-background/50">
            <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-muted-foreground" />
                <div>
                    <h3 className="text-lg font-semibold">Google Authenticator</h3>
                    <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                    </p>
                </div>
            </div>

            <p className="text-sm text-muted-foreground">
                Use Google Authenticator or any TOTP-compatible app to generate secure
                login codes. This replaces email-based verification codes.
            </p>

            <Button
                onClick={handleSetupTotp}
                disabled={isSetupPending}
                className="w-full sm:w-auto"
            >
                {isSetupPending ? (
                    <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Setting up...
                    </>
                ) : (
                    <>
                        <Shield className="h-4 w-4 mr-2" />
                        Set Up Google Authenticator
                    </>
                )}
            </Button>
        </div>
    );
};
