"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { NextLink } from "./next-link"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex  shrink-0 items-center justify-center rounded-[var(--radius-button)] border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition-all duration-300 outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 hover:-translate-y-0.5 active:translate-y-0 active:scale-95",
  {
    variants: {
      variant: {
        default: 
          "bg-primary text-primary-foreground shadow-[var(--button-shadow)] hover:shadow-[var(--button-shadow-hover)] hover:bg-primary/95",
        premium:
          "bg-[var(--button-gradient)] text-white shadow-[var(--button-shadow)] hover:shadow-[var(--button-shadow-hover)] hover:translate-y-[-4px] active:translate-y-[0px] border-none before:absolute before:inset-0 before:bg-[var(--button-gradient-hover)] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 overflow-hidden [&>*]:relative",
        outline:
          "border-2 border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 shadow-sm hover:shadow-md",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground shadow-sm hover:shadow-md",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40 shadow-sm",
        link: "text-primary underline-offset-4 hover:underline",
        luxury: 
          "bg-transparent border border-[var(--jewelry-gold)] text-[var(--jewelry-gold)] hover:bg-[var(--jewelry-gold)] hover:text-white shadow-lg transition-all duration-700 hover:tracking-[0.1em] uppercase text-xs font-black",
      },
      size: {
        default:
          "h-10 gap-2 px-5 has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        xs: "h-7 gap-1 px-3 text-xs",
        sm: "h-9 gap-1.5 px-4 text-sm",
        lg: "h-12 gap-2 px-8 text-base font-bold",
        xl: "h-14 gap-3 px-10 text-lg font-black",
        icon: "size-10",
        "icon-xs": "size-7",
        "icon-sm": "size-9",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonProps extends ButtonPrimitive.Props, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  href?: string
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  href,
  ...props
}: ButtonProps) {
  if (href) {
    return (
      <NextLink
        href={href}
        className={cn(buttonVariants({ variant, size, className }))}
        {...(props as any)}
      />
    )
  }
  const Comp = asChild ? Slot : ButtonPrimitive
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
