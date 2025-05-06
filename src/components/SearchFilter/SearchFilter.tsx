"use client";

import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { HiOutlineHeart } from "react-icons/hi2";
import { Toggle } from "@radix-ui/react-toggle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@radix-ui/react-popover";

type SearchFilterProps = {
  onShowSavedToggle: (pressed: boolean) => void;
  onEquipmentChange?: (selectedEquipment: string[]) => void;
  equipmentOptions: { id: string; name: string }[];
};

const SearchFilter = ({
  onShowSavedToggle,
  onEquipmentChange,
  equipmentOptions
}: SearchFilterProps) => {
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);

  const handleEquipmentToggle = (equipmentId: string, checked: boolean) => {
    const newSelectedEquipment = checked
      ? [...selectedEquipment, equipmentId]
      : selectedEquipment.filter((id) => id !== equipmentId);

    setSelectedEquipment(newSelectedEquipment);
    onEquipmentChange?.(newSelectedEquipment);
  };

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-white w-full">
      {/* Show Saved Toggle */}
      <Toggle
        onPressedChange={onShowSavedToggle}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white border-2 border-gray-300 rounded-full data-[state=on]:bg-[#1D8BF9] data-[state=on]:text-white data-[state=on]:border-[#1D8BF9]"
      >
        <HiOutlineHeart className="w-4 h-4" />
        Show Saved
      </Toggle>

      {/* Equipment Selection */}
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex select-none cursor-pointer items-center gap-2 px-4 py-2 text-sm font-medium bg-white border-2 border-gray-300 rounded-full data-[state=on]:bg-[#1D8BF9] data-[state=on]:text-white data-[state=on]:border-[#1D8BF9]">
            <IoAdd className="w-4 h-4" />
            Select Equipment
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-2 z-10">
          <div className="max-h-60 overflow-y-auto">
            {equipmentOptions.map((equipment) => (
              <div
                key={equipment.id}
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() =>
                  handleEquipmentToggle(
                    equipment.id,
                    !selectedEquipment.includes(equipment.id)
                  )
                }
              >
                <input
                  type="checkbox"
                  id={equipment.id}
                  checked={selectedEquipment.includes(equipment.id)}
                  onChange={(e) =>
                    handleEquipmentToggle(equipment.id, e.target.checked)
                  }
                  className="h-4 w-4 rounded border-gray-300 text-[#1D8BF9] focus:ring-[#1D8BF9]"
                />
                <label className="text-sm font-medium text-gray-700 select-none cursor-pointer">
                  {equipment.name}
                </label>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SearchFilter;
