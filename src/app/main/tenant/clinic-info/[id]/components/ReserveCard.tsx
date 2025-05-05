"use client";

import Button from "@/components/Button";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@radix-ui/react-popover";
import DatePicker from "@/components/DatePicker";
import { format } from "date-fns";

interface Props {
  costPerDay: number;
}

export default function ReserveCard({ costPerDay }: Props) {
  const [selectedDays, setSelectedDays] = React.useState<Date[]>([]);

  function handleSelectDate(dates: Date[] | undefined) {
    if (!dates) {
      setSelectedDays([]);
      return;
    }

    setSelectedDays(dates);
  }

  return (
    <div className="w-full lg:w-4/12 mt-6 lg:mt-0 ">
      <div className="border border-gray-300 rounded-lg p-6 shadow-md sticky top-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="text-xl font-bold">{costPerDay || "10"} MXN</span>
            <span className="text-gray-600"> / day</span>
          </div>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <div className="border border-gray-300 rounded-md mb-4 overflow-hidden cursor-pointer">
              <div className="grid grid-cols-2 divide-x divide-gray-300">
                <div className="p-2">
                  <p
                    className={`text-xs text-gray-500 ${
                      selectedDays.length > 0 && "mb-2"
                    }`}
                  >
                    {selectedDays.length > 0 ? "Selected Days" : "Select Days"}
                  </p>
                  <div className="flex flex-row gap-1">
                    {selectedDays.map((day, i) => (
                      <p
                        key={i}
                        className="font-medium bg-gray-100 px-2 rounded-md"
                      >
                        {format(day, "dd/MM/yyyy")}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <DatePicker onSelectDate={handleSelectDate} />
          </PopoverContent>
        </Popover>

        <Button className="w-full bg-blue-500 text-white py-3 rounded-md font-medium mb-4">
          Reserve
        </Button>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="underline">
              {costPerDay} MXN x {selectedDays.length} Days
            </span>
            {/* <span>{costPerDay * selectedDays.length}</span> */}
          </div>
          <div className="border-t border-gray-300 pt-4 font-bold flex justify-between">
            <span>Total</span>
            <span>{costPerDay * selectedDays.length} MXN</span>
          </div>
        </div>
      </div>
    </div>
  );
}
