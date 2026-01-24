"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
    value?: number[]
    onValueChange?: (value: number[]) => void
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
    ({ className, min = 0, max = 100, step = 1, value, onValueChange, ...props }, ref) => {
        const val = value ? value[0] : (Number(min) || 0)

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = parseFloat(e.target.value)
            if (onValueChange) {
                onValueChange([newValue])
            }
        }

        return (
            <input
                type="range"
                className={cn(
                    "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50",
                    className
                )}
                min={min}
                max={max}
                step={step}
                value={val}
                onChange={handleChange}
                ref={ref}
                {...props}
            />
        )
    }
)
Slider.displayName = "Slider"

export { Slider }
