interface SearchParams {
  location: string;
  date: Date;
  time: string;
}

interface Props {
  /** Default location value */
  defaultLocation?: string;
  /** Default date value */
  defaultDate?: Date;
  /** Default time value */
  defaultTime?: string;
  /** List of available locations */
  locations?: string[];
  /** Callback when search is clicked */
  onSearch: (searchParams: SearchParams) => void;
  /** Whether the component is in a loading state */
  isLoading?: boolean;
}

import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@radix-ui/react-popover";
import DatePicker from "../DatePicker/DatePicker";
import { CgSpinner } from "react-icons/cg";

function SearchBar({
  locations = ["CMDX", "MONTERREY"],
  defaultLocation,
  defaultTime,
  defaultDate,
  isLoading,
  onSearch
}: Props) {
  const [selectedLocation, setSelectedLocation] = useState(
    defaultLocation || locations[0]
  );
  const [selectedDate, setSelectedDate] = useState<Date>(
    defaultDate || new Date()
  );
  const [selectedHour, setSelectedHour] = useState(
    defaultTime?.split(":")[0] || "12"
  );
  const [selectedMinute, setSelectedMinute] = useState(
    defaultTime?.split(":")[1] || "00"
  );

  const hours = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, "0")
  );
  const minutes = ["00", "30"];

  function formatTime(hour: string, minute: string) {
    return `${hour}:${minute}`;
  }

  function formatDate(date: Date) {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric"
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  function handleDateChange(date: Date | Date[] | undefined) {
    setSelectedDate(date as Date);
  }

  function handleSearch() {
    const formattedTime = formatTime(selectedHour, selectedMinute);
    const searchParams: SearchParams = {
      location: selectedLocation,
      date: selectedDate,
      time: formattedTime
    };
    onSearch(searchParams);
  }

  return (
    <div
      className={`flex items-center bg-white rounded-full shadow-sm px-2 py-2 space-x-2 w-fit ${isLoading && "pointer-events-none"} `}
    >
      {/* Location Selector */}
      <Popover>
        <PopoverTrigger asChild>
          <div className="select-none cursor-pointer text-sm font-medium text-black hover:bg-gray-100 rounded-xl px-2 py-1 ">
            {selectedLocation}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-2 bg-white border rounded-md shadow-lg space-y-1">
          {locations.map((loc) => (
            <div
              key={loc}
              className={`cursor-pointer px-2 py-1 rounded-md  ${
                selectedLocation === loc
                  ? "font-semibold text-primary-500  bg-primary-50"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedLocation(loc)}
            >
              {loc}
            </div>
          ))}
        </PopoverContent>
      </Popover>

      <div className="w-px h-5 bg-gray-300" />

      {/* Date Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <div className="select-none cursor-pointer text-sm font-medium text-black hover:bg-gray-100 rounded-xl px-2 py-1">
            {selectedDate ? formatDate(selectedDate) : "Pick a date"}
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <DatePicker onSelectDate={handleDateChange} />
        </PopoverContent>
      </Popover>

      <div className="w-px h-5 bg-gray-300" />

      {/* Time Selector */}
      <Popover>
        <PopoverTrigger asChild>
          <div className="select-none cursor-pointer text-sm font-medium text-black hover:bg-gray-100 rounded-xl px-2 py-1">
            {formatTime(selectedHour, selectedMinute)}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-52 p-4 bg-white border rounded-md shadow-lg space-y-2">
          <div className="flex space-x-2">
            <select
              value={selectedHour}
              onChange={(e) => setSelectedHour(e.target.value)}
              className="border rounded-md p-1 w-full"
            >
              {hours.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
            <span className="flex items-center">:</span>
            <select
              value={selectedMinute}
              onChange={(e) => setSelectedMinute(e.target.value)}
              className="border rounded-md p-1 w-full"
            >
              {minutes.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </PopoverContent>
      </Popover>

      {/* Search Button */}

      <button
        disabled={isLoading}
        className={`bg-primary-500 hover:bg-primary-600 text-white p-2 rounded-full cursor-pointer`}
        onClick={handleSearch}
      >
        {isLoading ? <CgSpinner className="animate-spin" /> : <FiSearch />}
      </button>
    </div>
  );
}

export default SearchBar;
