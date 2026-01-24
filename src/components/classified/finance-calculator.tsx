"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CalculatorIcon } from "lucide-react";

interface FinanceCalculatorProps {
    price: number;
}

export const FinanceCalculator = ({ price }: FinanceCalculatorProps) => {
    // Kenyan Market Defaults
    const [depositPercent, setDepositPercent] = useState(20);
    const [interestRate, setInterestRate] = useState(13); // 13% average
    const [months, setMonths] = useState(48);
    const [monthlyPayment, setMonthlyPayment] = useState(0);

    const depositAmount = (price * depositPercent) / 100;
    const loanAmount = price - depositAmount;

    useEffect(() => {
        // PMT Formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
        const r = interestRate / 100 / 12; // Monthly interest rate
        const n = months;

        if (r === 0) {
            setMonthlyPayment(loanAmount / n);
        } else {
            const payment = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            setMonthlyPayment(payment);
        }
    }, [price, depositPercent, interestRate, months, loanAmount]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-KE", {
            style: "currency",
            currency: "KES",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <Card className="w-full bg-blue-50/50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900 shadow-sm">
            <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                        <CalculatorIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-100">
                            Finance Calculator
                        </CardTitle>
                        <CardDescription className="text-xs">
                            Estimate your monthly payments
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Loan Term */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <Label className="font-medium text-gray-700 dark:text-gray-300">Loan Term</Label>
                        <span className="font-bold text-blue-600 dark:text-blue-400">{months} Months</span>
                    </div>
                    <div className="flex gap-2">
                        {[12, 24, 36, 48, 60].map((m) => (
                            <Button
                                key={m}
                                variant={months === m ? "default" : "outline"}
                                size="sm"
                                onClick={() => setMonths(m)}
                                className={`flex-1 text-xs h-8 ${months === m ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                            >
                                {m}m
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Deposit Slider */}
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <Label className="font-medium text-gray-700 dark:text-gray-300">Deposit ({depositPercent}%)</Label>
                        <span className="font-medium text-gray-600 dark:text-gray-400">{formatCurrency(depositAmount)}</span>
                    </div>
                    <Slider
                        value={[depositPercent]}
                        onValueChange={(vals) => setDepositPercent(vals[0])}
                        min={10}
                        max={80}
                        step={5}
                        className="w-full"
                    />
                </div>

                {/* Interest Rate */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <Label className="font-medium text-gray-700 dark:text-gray-300">Interest Rate</Label>
                        <span className="font-medium text-gray-600 dark:text-gray-400">{interestRate}%</span>
                    </div>
                    <Slider
                        value={[interestRate]}
                        onValueChange={(vals) => setInterestRate(vals[0])}
                        min={1}
                        max={25}
                        step={0.5}
                        className="w-full"
                    />
                </div>

                {/* Result */}
                <div className="pt-4 border-t border-blue-200 dark:border-blue-900 mt-2">
                    <div className="flex justify-between items-end">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Estimated Monthly</span>
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {formatCurrency(monthlyPayment)}
                        </span>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-2 text-center">
                        *Estimates only. Subject to credit approval.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};
