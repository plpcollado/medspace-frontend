import ClinicImageInput from "@/components/ClinicImageInput";
import StepSectionBase, { StepSectionProps } from "./StepSectionBase";
import { CreateClinicFormData } from "@/hooks/useCreateClinicForm";
import { useState } from "react";
import toast from "react-hot-toast";

interface PhotoSectionProps extends StepSectionProps {
  data: CreateClinicFormData;
  setData: (
    key: keyof CreateClinicFormData,
    value: CreateClinicFormData[keyof CreateClinicFormData]
  ) => void;
}

export default function PhotosSection({
  onClickPrimary,
  onClickSecondary,
  data,
  setData
}: PhotoSectionProps) {
  const [errors, setErrors] = useState({
    photos: ""
  });

  const handlePhotoChange = (index: number, file: File | null) => {
    clearError("photos");
    const updatedPhotos = [...(data.photos || [])];
    updatedPhotos[index] = file;
    setData("photos", updatedPhotos);
  };

  const validateData = () => {
    const MAX_SIZE = 2 * 1024 * 1024; // 2MB

    const newErrors: typeof errors = {
      photos: ""
    };
    let isValid = true;

    const missingPhoto = data.photos?.some((photo) => !photo);
    const oversizedPhoto = data.photos?.some(
      (photo) => photo && photo.size > MAX_SIZE
    );

    if (missingPhoto) {
      newErrors.photos = "Please upload all photos";
      isValid = false;
    } else if (oversizedPhoto) {
      newErrors.photos = "One or more photos exceed the 2MB size limit";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onNavigate = (handler: () => void) => {
    if (!validateData()) {
      toast.error("Please fix errors in the form");
      return;
    }
    handler();
  };

  const clearError = (field: keyof typeof errors) => {
    setErrors((prev) => ({
      ...prev,
      [field]: ""
    }));
  };

  const label = errors.photos || "Upload a photo";

  return (
    <StepSectionBase
      onClickPrimary={() => onNavigate(onClickPrimary)}
      onClickSecondary={() => onNavigate(onClickSecondary)}
      primaryLabel="Continue"
      secondaryLabel="Back"
    >
      <div className="grid grid-cols-[auto_auto] gap-12 items-end justify-center">
        {data.photos?.map((photo, index) => (
          <ClinicImageInput
            key={index}
            image={photo}
            onChange={(file) => handlePhotoChange(index, file)}
            label={index == 0 ? label : null}
            isInvalid={!!errors.photos}
          />
        )) || null}
      </div>
    </StepSectionBase>
  );
}
