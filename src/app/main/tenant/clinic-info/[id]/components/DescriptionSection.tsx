import React from "react";

interface Props {
  description: string;
}

export default function DescriptionSection({ description }: Props) {
  return (
    <div className="mb-6">
      <p className="text-gray-800 mb-2">
        {description ||
          `
            ¿Buscas un consultorio médico listo para operar? Rentamos espacios
        totalmente amueblados en nuestra clínica ubicada en Lomas Virreyes, con
        todos los servicios incluidos. 
        `}
      </p>
    </div>
  );
}
