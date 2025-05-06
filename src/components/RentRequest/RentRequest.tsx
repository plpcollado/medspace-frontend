"use client";

import React from "react";
import Button from "../Button";
import { useState } from "react";
import TenantComment from "../TenantComment/TenantComment";
import DatePicker from "../DatePicker/DatePicker";

interface RentRequestProps {
  clinicName: string;
  occupiedDates: Date[];
  availableDatesEnd?: Date;
}

function RentRequest({
  clinicName,
  occupiedDates,
  availableDatesEnd
}: RentRequestProps) {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [comment, setComment] = useState("");

  function handleSelectDate(dates: Date[] | undefined) {
    setSelectedDates(dates as Date[]);
  }

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white shadow-md rounded-md border border-gray-200">
      {/* Título principal */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Rent Request</h2>

      {/* Descripción */}
      <p className="text-sm text-gray-600 mb-6">
        You&#39;re about to request <strong>&quot;{clinicName}&quot;</strong>.
        Please select the date you&#39;d like to rent it and add an optional
        comment before submitting. You&#39;ll receive a notification once the
        owner reviews your request.
      </p>

      {/* Calendar Component */}
      <div className="mb-6 flex justify-center">
        <DatePicker
          mode="multiple"
          onSelectDate={handleSelectDate} // Placeholder function
          disabledDates={occupiedDates}
          fromDate={new Date()}
          toDate={availableDatesEnd}
          selectedDate={selectedDates}
        />
      </div>

      {/* Comment Box */}
      <div className="mb-6">
        <TenantComment
          value={comment}
          onChange={setComment}
          showTitle={true}
          rows={4}
        />
      </div>

      {/* Botones */}
      <div className="flex gap-4">
        <Button
          onClick={() => alert("Request canceled")}
          variant="outline"
          className="flex-1 h-12 text-base"
        >
          Cancel
        </Button>
        <Button
          onClick={() => alert(`Request submitted ${selectedDates}`)}
          variant="primary"
          className="flex-1 h-12 text-base"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default RentRequest;
