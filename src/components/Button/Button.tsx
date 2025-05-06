import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";
import { CgSpinner } from "react-icons/cg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Text to display in the Button */
  children: React.ReactNode;
  /** Variant of the Button */
  variant?: "primary" | "blue" | "outline" | "danger";
  /** Icon to display in the Button, tipically a React Icon */
  icon?: React.ReactNode;
  /** Size of the Button */
  size?: "default" | "small" | "large" | "fill";
  /*Disable button and show spinner*/
  isLoading?: boolean;
}

const Button = ({
  children,
  variant = "primary",
  icon,
  size = "default",
  className,
  isLoading,
  ...props
}: Props) => {
  const isDisabled = props.disabled || isLoading;

  const variantMap = {
    primary: "bg-primary-500 text-white hover:bg-primary-600",
    blue: "bg-primary-200 text-primary-600 font-semibold hover:bg-primary-300",
    outline:
      "border-2 border-primary text-primary bg-white outline-none hover:bg-primary hover:text-white transition-all ",
    danger: "bg-red-500 text-white hover:bg-red-600"
  };

  const sizeMap = {
    small: "text-sm px-4 py-1",
    default: "text-md px-6 py-2",
    large: "text-lg px-8 py-3",
    fill: "flex-1 text-sm px-6 py-3"
  };

  return (
    <button
      disabled={isDisabled}
      {...props}
      className={cn(
        "items-center inline-flex justify-center gap-2 rounded-md text-sm px-6 py-2 cursor-pointer transition-all duration-150",
        variantMap[variant],
        sizeMap[size],
        isDisabled && "opacity-70 cursor-not-allowed pointer-events-none",
        className
      )}
    >
      {isLoading && <CgSpinner className="absolute animate-spin text-lg" />}

      <div
        className={cn(
          "flex items-center transition-opacity",
          isLoading && "opacity-0"
        )}
      >
        {icon && <span className="mr-1">{icon}</span>}
        {children}
      </div>
    </button>
  );
};

export default Button;
