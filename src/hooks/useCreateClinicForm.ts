import { useState } from "react";
import {
  CLINIC_CATEGORIES,
  ClinicRegistrationData,
  WEEK_DAYS
} from "@/types/clinicTypes";
import { useRouter } from "next/navigation";
import { useForm } from "./useForm";
import { ClinicService } from "@/services/ClinicService";
import { ClinicPhotoService } from "@/services/ClinicPhotoService";
import { v4 as uuidv4 } from "uuid";

export type CreateClinicFormData = Partial<ClinicRegistrationData>;

const ALLOWED_NUM_OF_PHOTOS = 4;

const defaultData: CreateClinicFormData = {
  displayName: "",
  description: "",
  category: CLINIC_CATEGORIES[0],
  equipments: [],
  size: null,
  photos: Array.from({ length: ALLOWED_NUM_OF_PHOTOS }, () => null),
  pricePerDay: null,
  maximumStayInDays: null,
  availabilities: WEEK_DAYS.map((day) => ({
    dayOfWeek: day,
    fromTime: null,
    toTime: null,
    isActive: true
  })),
  propertyProof: null,
  availableFromDate: null,
  availableToDate: null
};

export function useCreateClinicForm() {
  const router = useRouter();

  const { formData, updateFormData, errors, setError, clearError } =
    useForm<CreateClinicFormData>(defaultData);

  const [currentStep, setCurrentStep] = useState(1);

  const goNext = () => setCurrentStep((prev) => prev + 1);
  const goBack = () => setCurrentStep((prev) => prev - 1);
  const cancel = () => router.push("/main");
  const submit = async () => {
    try {
      const response = await ClinicService.createClinic(
        formData as ClinicRegistrationData
      );

      if (!response.success || !response.data) {
        throw new Error("Could not create clinic");
      }

      const clinic = response.data;
      await Promise.all(
        formData.photos!.map(async (photo, index) => {
          await ClinicPhotoService.uploadClinicPhoto(
            photo!,
            uuidv4(),
            clinic.id,
            index === 0
          );
        })
      );

      router.push("/main");
    } catch (error) {
      console.error("[Clinic]: Error creating clinic", error);
    }
  };

  return {
    formData,
    updateFormData,
    currentStep,
    goNext,
    goBack,
    cancel,
    submit,
    setCurrentStep,
    errors,
    setError,
    clearError
  };
}
