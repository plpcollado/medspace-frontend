'use client';
import React from "react";
import Image from "next/image"; 
import Button from "../Button";

interface LandlordRequestItemProps {
  nombreEspecialista: string;
  fecha: string;
  nombreConsultorio: string;
  onClickAccept: () => void;
  onClickDeny: () => void;
  fotoEspecialista?: string;
}

const RequestDetails = ({
  nombreEspecialista,
  fecha,
  fotoEspecialista,
}: {
  nombreEspecialista: string;
  fecha: string;
  fotoEspecialista?: string;
}) => (
  <div className="flex items-center space-x-2">
    {fotoEspecialista && (
      <Image
        src={fotoEspecialista}
        alt="Foto del especialista"
        className="h-8 w-8 rounded-full object-cover"
        width={32} 
        height={32}
      />
    )}
    <div className="flex flex-col">
      <strong className="text-base font-medium">{nombreEspecialista}</strong>
      <small className="text-gray-500 text-sm">{fecha}</small>
    </div>
  </div>
);

const RequestActions = ({
  onClickAccept,
  onClickDeny,
}: {
  onClickAccept: () => void;
  onClickDeny: () => void;
}) => (
  <div className="flex gap-2">
    <Button
      onClick={onClickAccept}
      variant="primary" 
    >
      Accept
    </Button>
    <Button
      onClick={onClickDeny}
      variant="danger" 
    >
      Deny
    </Button>
  </div>
);

const LandlordRequestItem: React.FC<LandlordRequestItemProps> = ({
  nombreEspecialista,
  fecha,
  nombreConsultorio,
  onClickAccept,
  onClickDeny,
  fotoEspecialista,
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-sm rounded-lg w-full max-w-6xl mx-auto">
      <RequestDetails
        nombreEspecialista={nombreEspecialista}
        fecha={fecha}
        fotoEspecialista={fotoEspecialista}
      />
      <div className="flex-1 ml-4 text-gray-700">{nombreConsultorio}</div>
      <RequestActions onClickAccept={onClickAccept} onClickDeny={onClickDeny} />
    </div>
  );
};

export default LandlordRequestItem;


