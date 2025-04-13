import React from "react";
import Button from "../Button";

interface RentRequestProps {
  clinicName: string; // Prop para recibir el nombre del consultorio
}

function RentRequest({ clinicName }: RentRequestProps) {
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

      {/* Placeholder del calendario */}
      <div className="calendar-placeholder w-full h-56 mb-6 flex flex-col items-center justify-center border border-gray-300 rounded-lg">
        <span className="text-gray-500 text-sm">[Calendar Component Here]</span>
      </div>

      {/* Placeholder del selector de rango de tiempo */}
      <div className="time-selector-placeholder w-full h-40 mb-6 flex flex-col items-center justify-center border border-gray-300 rounded-lg">
        <span className="text-gray-500 text-sm">[Time Range Selector Here]</span>
      </div>

      {/* Placeholder de la caja de comentarios */}
      <div className="comment-box-placeholder w-full h-24 mb-6 flex flex-col items-start justify-center border border-gray-300 rounded-lg p-4">
        <span className="text-gray-500 text-sm">[Comment Box Here]</span>
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
