import React from "react";
import Button from "../Button"; // Importa el componente Button

interface TenantRequestItemProps {
  nombreConsultorio: string;
  fecha: string;
  onClickCancel: () => void;
  fotoConsultorio?: string;
}

const TenantRequestItem: React.FC<TenantRequestItemProps> = ({
  nombreConsultorio,
  fecha,
  onClickCancel,
  fotoConsultorio,
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-sm rounded-lg w-full max-w-4xl border border-gray-200">
      {/* Foto del consultorio */}
      {fotoConsultorio && (
        <img
          src={fotoConsultorio}
          alt="Foto del consultorio"
          className="h-12 w-12 rounded-full object-cover mr-4"
        />
      )}

      {/* Detalles del consultorio */}
      <div className="flex-1">
        <strong className="text-base font-medium">{nombreConsultorio}</strong>
        <div className="text-sm text-gray-500">{fecha}</div>
      </div>

      {/* Botón de cancelar */}
      <Button
        onClick={onClickCancel}
        variant="danger" // Usa la variante danger para el botón rojo
      >
        Cancel
      </Button>
    </div>
  );
};

export default TenantRequestItem;
