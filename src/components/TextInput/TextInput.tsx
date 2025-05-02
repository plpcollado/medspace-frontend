"use client";

import React, {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useState
} from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { cn } from "@/lib/utils";

// Base type for shared properties
interface BaseProps {
  className?: string;
  label?: string;
  isInvalid?: boolean;
  invalidMessage?: string;
}

interface InputProps extends BaseProps, InputHTMLAttributes<HTMLInputElement> {
  isTextArea?: false; // This prop indicates that this is not a textarea
}

interface TextareaProps
  extends BaseProps,
    TextareaHTMLAttributes<HTMLTextAreaElement> {
  isTextArea: true; // This prop indicates that this is a textarea
  type?: never; // No type prop for textarea
}

// Union type that can be either input or textarea props
type Props = InputProps | TextareaProps;

function TextInput({
  className,
  isInvalid = false,
  isTextArea = false,
  invalidMessage,
  label,
  type,
  ...props
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const commonStyle = cn(
    "px-4 py-2 mt-2 w-full",
    "block text-gray-700 bg-white border border-gray-300",
    "rounded-lg focus:outline-none focus:ring focus:ring-opacity-40",
    isInvalid
      ? "border-red-500  focus:border-red-500 focus:ring-red-500 "
      : "focus:border-primary-400  focus:ring-primary-300"
  );

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className={cn("w-full", className)}>
      <label
        className={`mt-4 block text-sm font-medium text-gray-800 ${!label && "hidden"}`}
      >
        {label}
      </label>

      {!isTextArea && (
        <div className="relative">
          <input
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
            className={`${className} ${commonStyle}`}
          />

          <button
            type="button"
            onClick={handleShowPassword}
            className={`${
              type !== "password" && "hidden"
            } absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 `}
          >
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </button>
        </div>
      )}

      {isTextArea && (
        <textarea
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          rows={10}
          className={cn(className, commonStyle)}
        />
      )}

      {isInvalid && (
        <p
          className={`text-red-500 text-sm mt-2 ${!invalidMessage && "hidden"} `}
        >
          {invalidMessage}
        </p>
      )}
    </div>
  );
}

export default TextInput;
