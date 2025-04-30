"use client";

import MultistepFormNavItem from "@/components/MultistepFormNavItem";
import { cn } from "@/lib/utils";
import { CLINIC_CATEGORIES } from "@/types/clinicTypes";
import { redirect } from "next/navigation";
import { useState } from "react";
import BasicInfoSection, { BasicInfoData } from "./steps/BasicInfoSection";
import PhotosSection from "./steps/PhotosSection";
import RentDataSection, { RentData } from "./steps/RentDataSection";
import PropertyProof, { PropertyProofData } from "./steps/PropertyProofSection";

interface ClinicFormData {
  basicInfo: BasicInfoData;
  photos: string[];
  rentData: RentData;
  propertyProof: PropertyProofData;
}

export default function CreateClinicPage() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

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

  const renderCurrentStepComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoSection
            onClickPrimary={() => setCurrentStep(2)}
            onClickSecondary={() => redirect("/main")}
            data={formData.basicInfo}
            setData={(data) =>
              setFormData((prev) => ({
                ...prev,
                basicInfo: {
                  ...prev.basicInfo,
                  ...data
                }
              }))
            }
          />
        );
      case 2:
        return (
          <PhotosSection
            onClickPrimary={() => setCurrentStep(3)}
            onClickSecondary={() => setCurrentStep(1)}
          />
        );
      case 3:
        return (
          <RentDataSection
            onClickPrimary={() => setCurrentStep(4)}
            onClickSecondary={() => setCurrentStep(2)}
          />
        );
      case 4:
        return (
          <PropertyProof
            onClickPrimary={() => redirect("/main")}
            onClickSecondary={() => setCurrentStep(3)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <main className="flex flex-col">
        <div className="container mx-auto px-6 py-8">
          <h2 className="font-bold text-2xl">Create Clinic</h2>

          <div className="flex flex-col gap-6 justify-center items-center mt-12 max-w-3xl mx-auto sm:flex-row">
            <MultistepFormNavItem
              stepNumber={1}
              label="Basic Info"
              fill={currentStep >= 1}
              arrow={true}
              className={cn("sm:flex", currentStep === 1 ? "flex" : "hidden")}
            />
            <MultistepFormNavItem
              stepNumber={2}
              label="Photos"
              fill={currentStep >= 2}
              arrow={true}
              className={cn("sm:flex", currentStep === 2 ? "flex" : "hidden")}
            />
            <MultistepFormNavItem
              stepNumber={3}
              label="Rent Data"
              fill={currentStep >= 3}
              arrow={true}
              className={cn("sm:flex", currentStep === 3 ? "flex" : "hidden")}
            />
            <MultistepFormNavItem
              stepNumber={4}
              label="Property Proof"
              fill={currentStep >= 4}
              arrow={false}
              className={cn("sm:flex", currentStep === 4 ? "flex" : "hidden")}
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="container mx-auto px-6 py-2 sm:py-8">
            {renderCurrentStepComponent()}
          </div>
        </div>
      </main>
    </>
  );
}
