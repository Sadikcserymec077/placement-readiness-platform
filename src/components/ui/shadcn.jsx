import React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export const Card = ({ className, ...props }) => {
    return (
        <div
            className={cn(
                "rounded-xl border border-gray-100 bg-white text-gray-950 shadow-sm",
                className
            )}
            {...props}
        />
    )
}

export const CardHeader = ({ className, ...props }) => {
    return (
        <div
            className={cn("flex flex-col space-y-1.5 p-6", className)}
            {...props}
        />
    )
}

export const CardTitle = ({ className, ...props }) => {
    return (
        <h3
            className={cn(
                "text-lg font-semibold leading-none tracking-tight",
                className
            )}
            {...props}
        />
    )
}

export const CardDescription = ({ className, ...props }) => {
    return (
        <p
            className={cn("text-sm text-gray-500", className)}
            {...props}
        />
    )
}

export const CardContent = ({ className, ...props }) => {
    return (
        <div className={cn("p-6 pt-0", className)} {...props} />
    )
}

export const CardFooter = ({ className, ...props }) => {
    return (
        <div
            className={cn("flex items-center p-6 pt-0", className)}
            {...props}
        />
    )
}

// Simple Progress bar component
export const Progress = ({ value, className }) => {
    return (
        <div className={cn("relative h-4 w-full overflow-hidden rounded-full bg-gray-100", className)}>
            <div
                className="h-full w-full flex-1 bg-indigo-600 transition-all duration-500 ease-in-out"
                style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
            />
        </div>
    )
}
