import React from "react";

interface CreateRequestStatusModalProps {
  icon: "success" | "error"; 
  onClose: () => void; 
}

const CreateRequestStatusModal: React.FC<CreateRequestStatusModalProps> = ({
  icon,
  onClose,
}) => {
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Si el usuario hace clic en el fondo, cierra el modal
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const message = icon === "success" ? "Request Sent" : "Request Failed";

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleBackgroundClick} 
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 flex flex-col items-center">
        {/* Icono personalizado */}
        {icon === "success" ? (
          <img
            src="/success.png"
            alt="Success icon"
            className="w-16 h-16 mb-4"
          />
        ) : (
          <img
            src="/error.png"
            alt="Error icon"
            className="w-16 h-16 mb-4"
          />
        )}

        {/* Mensaje */}
        <p className="text-center text-lg font-medium">{message}</p>
      </div>
    </div>
  );
};

export default CreateRequestStatusModal;