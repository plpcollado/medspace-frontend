"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { isSameDay } from "date-fns";

type AvailabilityCalendarProps = {
  /** Array of available dates for selection (ISO format: 'YYYY-MM-DD') */
  availableDates: string[];
  /** Array of dates that are already occupied (ISO format: 'YYYY-MM-DD') */
  occupiedDates: string[];
  /** Object containing the allowed date range by the landlord */
  request_date: {
    start: string;
    end: string;
  };
  /** Array of selected dates */
  selected_dates?: Date[];
  /** Callback function when dates are selected */
  onDatesChange?: (dates: Date[]) => void;
};

const AvailabilityCalendar = ({
  availableDates,
  occupiedDates,
  request_date,
  selected_dates = [],
  onDatesChange,
}: AvailabilityCalendarProps) => {
  const [selectedDates, setSelectedDates] = React.useState<Date[]>(selected_dates);

  // Parse dates with timezone safety (using noon to avoid DST issues)
  const parseDate = (dateStr: string): Date => {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day, 12);
  };

  // Memoize date arrays to prevent unnecessary recalculations
  const allowedDateRange = React.useMemo(
    () => ({
      start: parseDate(request_date.start),
      end: parseDate(request_date.end),
    }),
    [request_date]
  );

  const occupiedDatesArray = React.useMemo(
    () => occupiedDates.map(parseDate),
    [occupiedDates]
  );

  const availableDatesArray = React.useMemo(
    () => availableDates.map(parseDate),
    [availableDates]
  );

  const isDateUnavailable = React.useCallback(
    (date: Date) => {
      // Check if date is within allowed range
      const isWithinAllowedRange = date >= allowedDateRange.start && date <= allowedDateRange.end;

      // Check if date is occupied
      const isOccupied = occupiedDatesArray.some((occupiedDate) =>
        isSameDay(date, occupiedDate)
      );

      // Check if date is available
      const isAvailable = availableDatesArray.some((availableDate) =>
        isSameDay(date, availableDate)
      );

      return !isWithinAllowedRange || isOccupied || !isAvailable;
    },
    [allowedDateRange, occupiedDatesArray, availableDatesArray]
  );

  const handleSelect = (dates: Date[] | undefined) => {
    if (!dates) {
      setSelectedDates([]);
      if (onDatesChange) {
        onDatesChange([]);
      }
      return;
    }

    setSelectedDates(dates);
    if (onDatesChange) {
      onDatesChange(dates);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 shadow-[0_0_5px_rgba(0,0,0,0.1)] rounded-sm">
      <h2 className="text-2xl font-bold mb-4">Select Rental Days</h2>
      <Calendar
        mode="multiple"
        selected={selectedDates}
        onSelect={handleSelect}
        disabled={isDateUnavailable}
        numberOfMonths={1}
        defaultMonth={allowedDateRange.start}
        fromDate={allowedDateRange.start}
        toDate={allowedDateRange.end}
        className="rounded-md border shadow"
        classNames={{
          day_selected: "bg-blue-500 text-white hover:bg-blue-600",
          day_today: "bg-accent text-accent-foreground",
        }}
      />
      <div className="flex flex-col gap-2 w-full mt-4">
        <p className="text-sm text-gray-600">
          Selected Days:{" "}
          {selectedDates.length > 0 ? (
            <span className="font-medium">
              {selectedDates
                .sort((a, b) => a.getTime() - b.getTime())
                .map(date => date.toLocaleDateString())
                .join(", ")}
            </span>
          ) : (
            "No dates selected"
          )}
        </p>
        <p className="text-sm text-gray-500">
          Total days selected: {selectedDates.length}
        </p>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
