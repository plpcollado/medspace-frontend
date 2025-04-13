"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface Props {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  showTitle?: boolean;
  customTitle?: string;
  rows?: number;
  containerClassName?: string;
}

function TenantComment({ 
  value, 
  onChange, 
  className,
  containerClassName,
  placeholder = "Enter your comment",
  showTitle = true,
  customTitle,
  rows = 10
}: Props) {
  const textareaStyle = cn(
    "px-4 py-2 w-full",
    "block text-gray-700 bg-white border",
    "rounded-lg focus:outline-none focus:ring focus:ring-opacity-40",
    "focus:border-blue-400 focus:ring-blue-300",
    className
  );

  return (
    <div className={cn("flex flex-col gap-2", containerClassName)}>
      {showTitle && (
        <h2 className="text-2xl font-semibold text-gray-800">
          {customTitle || "Leave a Comment (optional)"}
        </h2>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={textareaStyle}
      />
    </div>
  );
}

export default TenantComment;
