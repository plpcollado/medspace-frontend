"use client";

import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import { IoAdd } from "react-icons/io5";
import { HiOutlineHeart } from "react-icons/hi2";
import { Toggle } from "@radix-ui/react-toggle";

type SearchFilterProps = {
  /** Callback when show saved is toggled */
  onShowSavedToggle: (pressed: boolean) => void;
  /** Callback when equipment selection changes */
  onEquipmentChange?: (selectedEquipment: string[]) => void;
  /** Callback when duration options change */
  onDurationChange?: (selectedDurations: string[]) => void;
  /** Available equipment options */
  equipmentOptions: { id: string; name: string }[];
};

const SearchFilter = ({
  onShowSavedToggle,
  onEquipmentChange,
  onDurationChange,
  equipmentOptions
}: SearchFilterProps) => {
  const [selectedDurations, setSelectedDurations] = useState<string[]>([
    "Hourly"
  ]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [isEquipmentDropdownOpen, setIsEquipmentDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsEquipmentDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDurationToggle = (duration: string, pressed: boolean) => {
    const newSelectedDurations = pressed
      ? [...selectedDurations, duration]
      : selectedDurations.filter((d) => d !== duration);

    setSelectedDurations(newSelectedDurations);
    onDurationChange?.(newSelectedDurations);
  };

  const handleEquipmentToggle = (equipmentId: string, checked: boolean) => {
    const newSelectedEquipment = checked
      ? [...selectedEquipment, equipmentId]
      : selectedEquipment.filter((id) => id !== equipmentId);

    setSelectedEquipment(newSelectedEquipment);
    onEquipmentChange?.(newSelectedEquipment);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white w-full min-w-full">
      {/* Duration Options */}
      <div className="flex flex-wrap gap-2 flex-1 min-w-0">
        <Toggle
          defaultPressed
          onPressedChange={(pressed) => handleDurationToggle("Hourly", pressed)}
          className="px-4 py-2 text-sm font-medium bg-white border-2 rounded-full data-[state=on]:bg-[#1D8BF9] data-[state=on]:text-white data-[state=on]:border-[#1D8BF9]"
        >
          Hourly
        </Toggle>
        <Toggle
          onPressedChange={(pressed) => handleDurationToggle("Daily", pressed)}
          className="px-4 py-2 text-sm font-medium bg-white border-2 rounded-full data-[state=on]:bg-[#1D8BF9] data-[state=on]:text-white data-[state=on]:border-[#1D8BF9]"
        >
          Daily
        </Toggle>
        <Toggle
          onPressedChange={(pressed) => handleDurationToggle("Weekly", pressed)}
          className="px-4 py-2 text-sm font-medium bg-white border-2 rounded-full data-[state=on]:bg-[#1D8BF9] data-[state=on]:text-white data-[state=on]:border-[#1D8BF9]"
        >
          Weekly
        </Toggle>
        <Toggle
          onPressedChange={(pressed) =>
            handleDurationToggle("Monthly", pressed)
          }
          className="px-4 py-2 text-sm font-medium bg-white border-2 rounded-full data-[state=on]:bg-[#1D8BF9] data-[state=on]:text-white data-[state=on]:border-[#1D8BF9]"
        >
          Monthly
        </Toggle>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 ml-16 shrink-0">
        <Toggle
          onPressedChange={onShowSavedToggle}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white border-2 rounded-full data-[state=on]:bg-[#1D8BF9] data-[state=on]:text-white data-[state=on]:border-[#1D8BF9]"
        >
          <HiOutlineHeart className="w-4 h-4" />
          Show Saved
        </Toggle>
        <div className="relative" ref={dropdownRef}>
          <Toggle
            pressed={selectedEquipment.length > 0}
            onPressedChange={() =>
              setIsEquipmentDropdownOpen(!isEquipmentDropdownOpen)
            }
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white border-2 rounded-full data-[state=on]:bg-[#1D8BF9] data-[state=on]:text-white data-[state=on]:border-[#1D8BF9]"
          >
            <IoAdd className="w-4 h-4" />
            Select Equipment
          </Toggle>
          {isEquipmentDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-2 z-10">
              <div className="max-h-60 overflow-y-auto">
                {equipmentOptions.map((equipment) => (
                  <div
                    key={equipment.id}
                    className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded"
                  >
                    <input
                      type="checkbox"
                      id={equipment.id}
                      checked={selectedEquipment.includes(equipment.id)}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleEquipmentToggle(equipment.id, e.target.checked)
                      }
                      className="h-4 w-4 rounded border-gray-300 text-[#1D8BF9] focus:ring-[#1D8BF9]"
                    />
                    <label
                      htmlFor={equipment.id}
                      className="text-sm font-medium text-gray-700"
                    >
                      {equipment.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
