"use client";

import React from "react";
import Button from "../Button";
import AvailabilityCalendar from "@/components/AvailabilityCalendar/AvailabilityCalendar";
import { useState } from "react";
import TenantComment from "../TenantComment/TenantComment";

interface RentRequestProps {
  clinicName: string;
  availableDates: string[];
  occupiedDates: string[];
  requestDate: {
    start: string;
    end: string;
  };
}

function RentRequest({ clinicName, availableDates, occupiedDates, requestDate }: RentRequestProps) {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [comment, setComment] = useState("");

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      {/* Título principal */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Rent Request</h2>

      {/* Descripción */}
      <p className="text-sm text-gray-600 mb-6">
        You're about to request <strong>"{clinicName}"</strong>. 
        Please select the date you'd like to rent it and add an optional comment before submitting. 
        You'll receive a notification once the owner reviews your request.
      </p>

      {/* Calendar Component */}
      <div className="mb-6">
        <AvailabilityCalendar
          availableDates={availableDates}
          occupiedDates={occupiedDates}
          request_date={requestDate}
          selected_dates={selectedDates}
          onDatesChange={setSelectedDates}
        />
      </div>

      {/* Placeholder del selector de rango de tiempo */}
      <div className="time-selector-placeholder w-full h-40 mb-6 flex flex-col items-center justify-center border border-gray-300 rounded-lg">
        <span className="text-gray-500 text-sm">[Time Range Selector Here]</span>
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
          onClick={() => alert("Request submitted")}
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
