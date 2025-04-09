import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-serif font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        fullfilled: "shadow",
        outlined: "border bg-transparent shadow-sm",
        text: "bg-transparent border-none",
        link: "underline-offset-4 hover:underline bg-transparent border-none p-0",
      },
      color: {
        primary: "",
        secondary: "",
        white: "",
        accent: "",
        black: "",
        error: "",
        success: "",
        muted: "",
      },
      size: {
        xs: "py-1 px-0.5",
        sm: "py-1.5 px-1",
        md: "py-2 px-2",
        lg: "py-2.5 px-3",
        xl: "py-3 px-4",
      },
    },
    compoundVariants: [
      // fullfilled variant
      {
        variant: "fullfilled",
        color: "primary",
        class:
          "bg-primary border-primary text-primary-foreground hover:bg-primary/90 hover:border-primary/90",
      },
      {
        variant: "fullfilled",
        color: "secondary",
        class:
          "bg-secondary border-secondary text-secondary-foreground hover:bg-secondary/80 hover:border-secondary/80",
      },
      {
        variant: "fullfilled",
        color: "white",
        class:
          "bg-white border-white text-black hover:bg-white/90 hover:border-white/90",
      },
      {
        variant: "fullfilled",
        color: "accent",
        class:
          "bg-accent border-accent text-accent-foreground hover:bg-accent/80 hover:border-accent/80",
      },
      {
        variant: "fullfilled",
        color: "black",
        class:
          "bg-black border-black text-white hover:bg-black/90 hover:border-black/90",
      },
      {
        variant: "fullfilled",
        color: "error",
        class:
          "bg-error border-error text-error-foreground hover:bg-error/90 hover:border-error/90",
      },

      {
        variant: "fullfilled",
        color: "success",
        class:
          "bg-success border-success text-success-foreground hover:bg-success/90 hover:border-success/90",
      },
      {
        variant: "fullfilled",
        color: "muted",
        class:
          "bg-muted border-muted text-muted-foreground hover:bg-muted/90 hover:border-muted/90",
      },

      // Outlined variant
      {
        variant: "outlined",
        color: "primary",
        class: "text-primary border-primary hover:bg-primary/10",
      },
      {
        variant: "outlined",
        color: "secondary",
        class: "text-secondary border-secondary hover:bg-secondary/10",
      },
      {
        variant: "outlined",
        color: "white",
        class: "text-white border-white hover:bg-white/10",
      },
      {
        variant: "outlined",
        color: "accent",
        class: "text-accent border-accent hover:bg-accent/10",
      },
      {
        variant: "outlined",
        color: "black",
        class: "text-black border-black hover:bg-black/10",
      },
      {
        variant: "outlined",
        color: "error",
        class: "text-error border-error hover:bg-error/10",
      },

      {
        variant: "outlined",
        color: "success",
        class: "text-success border-success hover:bg-success/10",
      },
      {
        variant: "outlined",
        color: "muted",
        class: "text-muted-foreground border-muted hover:bg-muted/10",
      },

      // Text variant
      {
        variant: "text",
        color: "primary",
        class: "text-primary hover:bg-primary/10",
      },
      {
        variant: "text",
        color: "secondary",
        class: "text-secondary hover:bg-secondary/10",
      },
      {
        variant: "text",
        color: "white",
        class: "text-white hover:bg-white/10",
      },
      {
        variant: "text",
        color: "accent",
        class: "text-accent hover:bg-accent/10",
      },
      {
        variant: "text",
        color: "black",
        class: "text-black hover:bg-black/10",
      },
      {
        variant: "text",
        color: "error",
        class: "text-error hover:bg-error/10",
      },

      {
        variant: "text",
        color: "success",
        class: "text-success hover:bg-success/10",
      },
      {
        variant: "text",
        color: "muted",
        class: "text-muted-foreground hover:bg-muted/10",
      },

      // Link variant
      {
        variant: "link",
        color: "primary",
        class: "text-primary",
      },
      {
        variant: "link",
        color: "secondary",
        class: "text-secondary",
      },
      {
        variant: "link",
        color: "white",
        class: "text-white",
      },
      {
        variant: "link",
        color: "accent",
        class: "text-accent",
      },
      {
        variant: "link",
        color: "black",
        class: "text-black",
      },
      {
        variant: "link",
        color: "error",
        class: "text-error",
      },

      {
        variant: "link",
        color: "success",
        class: "text-success",
      },
      {
        variant: "link",
        color: "muted",
        class: "text-muted-foreground",
      },
    ],
    defaultVariants: {
      variant: "fullfilled",
      color: "primary",
      size: "md",
    },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

import type { TooltipContentProps } from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    ButtonVariantProps {
  asChild?: boolean;
  tooltip?: string;
  tooltipOptions?: Partial<TooltipContentProps>;
  isIconButton?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      color,
      size,
      asChild = false,
      tooltip,
      tooltipOptions,
      isIconButton,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const button = (
      <Comp
        className={cn(
          buttonVariants({ variant, color, size }),
          isIconButton && "aspect-square",
          className,
        )}
        ref={ref}
        {...props}>
        {children}
      </Comp>
    );

    if (!tooltip) {
      return button;
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent {...tooltipOptions}>{tooltip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
