import { cn } from "@/lib/utils";

type ButtonProps = {
  /** Text to display in the Button */
  children: React.ReactNode;
  /** Function to call when the Button is clicked */
  onClick?: () => void;
  /** Variant of the Button */
  variant?: "primary" | "blue" | "outline" | "danger";
  /** Icon to display in the Button, tipically a React Icon */
  icon?: React.ReactNode;
  /** Size of the Button */
  size?: "default" | "small" | "large" | "fill";
  /** Other classes */
  className?: string;
};

const Button = ({
  children,
  onClick,
  variant = "primary",
  icon,
  size = "default",
  className,
}: ButtonProps) => {
  const variantMap = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    blue: "bg-blue-200 text-blue-600 font-extrabold hover:bg-blue-300",
    outline: "bg-transparent text-black border border-black hover:bg-gray-100",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  const sizeMap = {
    small: "text-sm px-4 py-1",
    default: "text-md px-6 py-2",
    large: "text-lg px-8 py-3",
    fill: "flex-1 text-sm px-6 py-3",
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "items-center inline-flex justify-center gap-2 rounded-md text-sm px-6 py-2 cursor-pointer transition-all duration-150",
        variantMap[variant],
        sizeMap[size],
        className
      )}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
