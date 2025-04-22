import * as React from "react";
import { OTPInput as InputOTP, OTPInputProps } from "input-otp";
import { cn } from "@/lib/utils";

// Экспортируем OTPInput компонент для использования в приложении
export const OTPInput = React.forwardRef<
  React.ElementRef<typeof InputOTP>,
  OTPInputProps
>(({ className, containerClassName, ...props }, ref) => (
  <InputOTP
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2",
      containerClassName
    )}
    className={cn("", className)}
    {...props}
  />
));

OTPInput.displayName = "OTPInput";
