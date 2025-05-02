"use client";

import React from "react";
import { cn } from "@/lib/utils";
import TextInput from "../TextInput";

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
  containerClassName,
  placeholder = "Enter your comment",
  showTitle = true,
  customTitle,
  rows = 10
}: Props) {
  return (
    <div className={cn("flex flex-col gap-2", containerClassName)}>
      {showTitle && (
        <h2 className="text-2xl font-semibold text-gray-800">
          {customTitle || "Leave a Comment (optional)"}
        </h2>
      )}
      <TextInput
        isTextArea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
      />
    </div>
  );
}

export default TenantComment;
