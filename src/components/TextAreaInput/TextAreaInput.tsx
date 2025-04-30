import { cn } from "@/lib/utils";

interface TextAreaInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Additional class name for the textarea */
  className?: string;
  /** Label for textarea */
  label?: string;
  /** Indicates if the textarea is invalid */
  isInvalid?: boolean;
  /** Message to display when textarea is invalid */
  invalidMessage?: string;
}

export default function TextAreaInput({
  className,
  label,
  isInvalid = false,
  invalidMessage,
  ...props
}: TextAreaInputProps) {
  const baseStyle = cn(
    "px-4 py-2 mt-2 w-full",
    "block text-gray-700 bg-white border",
    "rounded-lg focus:outline-none focus:ring focus:ring-opacity-40",
    isInvalid
      ? "border-red-500  focus:border-red-500 focus:ring-red-500"
      : "focus:border-blue-400  focus:ring-blue-300"
  );

  return (
    <div className={cn("w-full", className)}>
      <label
        className={`mt-4 block text-sm font-medium text-gray-800 dark:text-gray-200 ${!label && "hidden"}`}
      >
        {label}
      </label>
      <textarea className={cn(baseStyle)} {...props} rows={10} />
      {isInvalid && invalidMessage && (
        <p className="text-red-500 text-sm mt-2">{invalidMessage}</p>
      )}
    </div>
  );
}
