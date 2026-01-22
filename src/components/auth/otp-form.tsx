"use client";

import {
  completeChallengeAction,
  resendChallengeAction,
  checkUserTotpStatusAction,
} from "@/app/_actions/challenge";
import {
  OneTimePasswordSchema,
  type OtpSchemaType,
} from "@/app/schemas/otp.schema";
import { routes } from "@/config/routes";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, RotateCw, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { OneTimePasswordInput } from "./otp-input";

export const OtpForm = () => {
  const [isCodePending, startCodeTransition] = useTransition();
  const [isSubmitPending, startSubmitTransition] = useTransition();
  const [usesTotp, setUsesTotp] = useState<boolean | null>(null);
  const router = useRouter();

  const form = useForm<OtpSchemaType>({
    resolver: zodResolver(OneTimePasswordSchema),
  });

  // Check if user has TOTP enabled on mount
  useEffect(() => {
    checkUserTotpStatusAction().then((result) => {
      setUsesTotp(result.usesTotp);
    });
  }, []);

  const onSubmit: SubmitHandler<OtpSchemaType> = (data) => {
    startSubmitTransition(async () => {
      const result = await completeChallengeAction(data.code);
      console.log("first", { result });

      if (!result?.success) {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      } else {
        router.push(routes.admin.dashboard);
      }
    });
  };

  const [sendButtonText, setSendButtonText] = useState("Send code");

  const sendCode = () => {
    startCodeTransition(async () => {
      const result = await resendChallengeAction();

      if (result.usesTotp) {
        // User has TOTP - no need to send email
        setUsesTotp(true);
        toast({
          title: "Google Authenticator",
          description: "Enter the code from your authenticator app",
        });
        return;
      }

      setSendButtonText("Resend code");

      if (!result.success) {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Code sent",
        description: "Check your email for the code",
      });
    });
  };

  useEffect(() => {
    if (isCodePending) setSendButtonText("Sending...");
  }, [isCodePending]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex w-full flex-1 justify-center px-6 pt-10 lg:items-center lg:pt-0">
      <div className="flex w-full max-w-lg flex-col">
        <h3 className="mb-4 text-4xl lg:text-5xl text-center">
          One Time Password
        </h3>

        {/* Show different instructions based on TOTP status */}
        {usesTotp ? (
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Smartphone className="h-5 w-5 text-primary" />
              <span className="text-slate-500">Google Authenticator</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Enter the 6-digit code from your authenticator app
            </p>
          </div>
        ) : (
          <p className="mb-12 text-center text-slate-500">
            Enter the six digit code sent to your email
          </p>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="code"
              render={({ field: { value, onChange, ...rest } }) => (
                <FormItem className="mb-8">
                  <FormControl>
                    <OneTimePasswordInput
                      type="number"
                      setValue={onChange}
                      {...rest}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Only show resend button for email OTP users */}
            {!usesTotp && (
              <div className="flex w-full items-center justify-center">
                <button
                  type="button"
                  className="flex items-centewr gap-2.5 text-base font-medium text-slate-600 transition-colors duration-200 hover:text-primary group cursor-pointer"
                  onClick={sendCode}
                  disabled={isCodePending}>
                  {isCodePending ? (
                    <Loader2 className="w-6 h-6 text-secondary transition-colors duration-200 group-hover:text-primary animate-spin" />
                  ) : (
                    <RotateCw className="w-6 h-6 text-secondary transition-colors duration-200 group-hover:text-primary" />
                  )}
                  {sendButtonText}
                </button>
              </div>
            )}

            <div className="mt-6 flex w-full flex-col gap-4 md:mt-16">
              <Button
                className="flex w-full gap-x-2"
                disabled={isSubmitPending}>
                <span className="text-sm uppercase tracking-wider text-inherit">
                  {isSubmitPending ? "Verifying..." : "Verify"}
                </span>
                {isSubmitPending ? (
                  <Loader2 className="w-4 h-4 shrink-0 animate-spin" />
                ) : null}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

