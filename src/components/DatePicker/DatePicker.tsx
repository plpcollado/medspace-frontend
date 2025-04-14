"use client";

import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { useEffect, useState } from "react";

import { DayPicker, Matcher } from "react-day-picker";
import "react-day-picker/style.css";

interface Props {
  mode?: "single" | "multiple";
  onSelectDate: (date: Date | Date[] | undefined) => void;
  fromDate?: Date;
  toDate?: Date;
  className?: ClassValue;
  disabledDates?: Date[];
}

export default function DatePicker({
  onSelectDate,
  fromDate,
  toDate,
  disabledDates,
  mode = "single",
  className
}: Props) {
  const [selected, setSelected] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (selected) {
      onSelectDate(selected);
    }
  }, [selected, onSelectDate]);

  return (
    <div
      className={cn(
        "w-fit rounded-2xl border p-4 shadow-md bg-white",
        className
      )}
    >
      <DayPicker
        mode={mode as "single"}
        selected={selected as Date}
        onSelect={setSelected}
        disabled={[
          { before: fromDate, after: toDate } as Matcher,
          ...(disabledDates || [])
        ]}
      />
    </div>
  );
}
