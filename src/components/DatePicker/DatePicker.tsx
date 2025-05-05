"use client";

import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { useEffect, useState } from "react";

import { DayPicker, Matcher } from "react-day-picker";
import "react-day-picker/style.css";

interface PropsSingle {
  mode?: "single";
  onSelectDate: (date: Date | undefined) => void;
  fromDate?: Date;
  toDate?: Date;
  className?: ClassValue;
  disabledDates?: Date[];
}

interface PropsMultiple {
  mode: "multiple";
  onSelectDate: (date: Date[] | undefined) => void;
  fromDate?: Date;
  toDate?: Date;
  className?: ClassValue;
  disabledDates?: Date[];
}

type Props = PropsSingle | PropsMultiple;

export default function DatePicker({
  mode = "single",
  onSelectDate,
  fromDate,
  toDate,
  disabledDates,
  className
}: Props) {
  // Use separate state variables based on mode
  const [selectedSingle, setSelectedSingle] = useState<Date | undefined>(
    undefined
  );
  const [selectedMultiple, setSelectedMultiple] = useState<Date[] | undefined>(
    undefined
  );

  useEffect(() => {
    if (mode === "single" && selectedSingle !== undefined) {
      (onSelectDate as PropsSingle["onSelectDate"])(selectedSingle);
    } else if (mode === "multiple" && selectedMultiple !== undefined) {
      (onSelectDate as PropsMultiple["onSelectDate"])(selectedMultiple);
    }
  }, [selectedSingle, selectedMultiple, onSelectDate, mode]);

  return (
    <div
      className={cn(
        "w-fit rounded-2xl border border-gray-300 p-4 shadow-md bg-white",
        className
      )}
    >
      {mode === "single" ? (
        <DayPicker
          mode="single"
          selected={selectedSingle}
          onSelect={setSelectedSingle}
          disabled={[
            { before: fromDate, after: toDate } as Matcher,
            ...(disabledDates || [])
          ]}
        />
      ) : (
        <DayPicker
          mode="multiple"
          selected={selectedMultiple}
          onSelect={setSelectedMultiple}
          disabled={[
            { before: fromDate, after: toDate } as Matcher,
            ...(disabledDates || [])
          ]}
        />
      )}
    </div>
  );
}
