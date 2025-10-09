import * as React from "react"

import { cn } from "@/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 lg:h-10 w-full rounded-lg border border-input bg-background px-4 lg:px-3 py-3 lg:py-2 text-base lg:text-sm ring-offset-background file:border-0 file:bg-transparent file:text-base lg:file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 touch-manipulation transition-all duration-200 focus:border-ring/50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }