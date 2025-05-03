import { useState } from "react";
import {
  CLINIC_CATEGORIES,
  ClinicRegistrationData,
  WEEK_DAYS
} from "@/types/clinicTypes";
import { useRouter } from "next/navigation";
import { useForm } from "./useForm";
import { ClinicService } from "@/services/ClinicService";

export type CreateClinicFormData = Partial<ClinicRegistrationData>;

const defaultData: CreateClinicFormData = {
  displayName: "",
  description: "",
  category: CLINIC_CATEGORIES[0],
  equipments: [],
  size: null,
  photos: [],
  pricePerDay: null,
  maximumStayInDays: null,
  availabilities: WEEK_DAYS.map((day) => ({
    dayOfWeek: day,
    fromTime: null,
    toTime: null,
    isActive: true
  })),
  propertyProof: null
};

export function useCreateClinicForm() {
  const router = useRouter();

  const { formData, updateFormData } =
    useForm<CreateClinicFormData>(defaultData);

  const [currentStep, setCurrentStep] = useState(1);

  const goNext = () => setCurrentStep((prev) => prev + 1);
  const goBack = () => setCurrentStep((prev) => prev - 1);
  const cancel = () => router.push("/main");
  const submit = async () => {
    try {
      await ClinicService.createClinic(formData as ClinicRegistrationData);
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
    setCurrentStep
  };
}
