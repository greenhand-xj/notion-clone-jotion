import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Loader } from "lucide-react";

const spinnerVariants = cva("text-muted-foreground animate-spin", {
  variants: {
    size: {
      default: "w-4 h-4",
      lg: "w-6 h-6",
      sm: "w-2 h-2",
      icon: "h-10 w-10"
    },
  },
  defaultVariants: {
    size: "default",
  },
})

interface SpinnerProps extends VariantProps<typeof spinnerVariants> { }

export const Spinner = ({ size }: SpinnerProps) => {
  return (
    <Loader className={cn(spinnerVariants({ size }))} />
  )
}