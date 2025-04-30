import { useState } from "react";
import { CLINIC_CATEGORIES } from "@/types/clinicTypes";
import { useRouter } from "next/navigation";
import { BasicInfoData } from "./steps/BasicInfoSection";
import { RentData } from "./steps/RentDataSection";
import { PropertyProofData } from "./steps/PropertyProofSection";

export interface ClinicFormData {
  basicInfo: BasicInfoData;
  photos: string[];
  rentData: RentData;
  propertyProof: PropertyProofData;
}

type UpdateFormData =
  | Partial<BasicInfoData>
  | Partial<RentData>
  | Partial<PropertyProofData>;

export function useCreateClinicForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<ClinicFormData>({
    basicInfo: {
      displayName: "",
      description: "",
      category: CLINIC_CATEGORIES[0],
      equipments: [],
      size: 0
    },
    photos: [],
    rentData: { price: 0, contractLengthMonths: 0 },
    propertyProof: { documentFile: null }
  });

  const [currentStep, setCurrentStep] = useState(1);

  const goNext = () => setCurrentStep((prev) => prev + 1);
  const goBack = () => setCurrentStep((prev) => prev - 1);
  const cancel = () => router.push("/main");

  const updateFormData = (
    section: keyof ClinicFormData,
    data: UpdateFormData
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data
      }
    }));
  };

  return {
    formData,
    updateFormData,
    currentStep,
    goNext,
    goBack,
    cancel,
    setCurrentStep
  };
}
