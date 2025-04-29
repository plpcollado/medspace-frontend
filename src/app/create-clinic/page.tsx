"use client";

import Button from "@/components/Button";
import MultistepFormNavItem from "@/components/MultistepFormNavItem";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function CreateClinicPage() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  const currentStepComponentMap = {
    1: (
      <BasicInfoSection
        onClickPrimary={() => setCurrentStep(2)}
        onClickSecondary={() => redirect("/main")}
      />
    ),
    2: (
      <PhotosSection
        onClickPrimary={() => setCurrentStep(3)}
        onClickSecondary={() => setCurrentStep(1)}
      />
    ),
    3: (
      <RentDataSection
        onClickPrimary={() => setCurrentStep(4)}
        onClickSecondary={() => setCurrentStep(2)}
      />
    ),
    4: (
      <PropertyProof
        onClickPrimary={() => redirect("/main")}
        onClickSecondary={() => setCurrentStep(3)}
      />
    )
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
            {currentStepComponentMap[currentStep]}
          </div>
        </div>
      </main>
    </>
  );
}

interface StepSectionBaseProps {
  children?: React.ReactNode;
  onClickPrimary: () => void;
  onClickSecondary: () => void;
  primaryLabel: string;
  secondaryLabel: string;
}

function StepSectionBase({
  children,
  onClickPrimary,
  onClickSecondary,
  primaryLabel,
  secondaryLabel
}: StepSectionBaseProps) {
  return (
    <section className="max-w-4xl mx-auto flex flex-col">
      <div className="min-h-[45vh]">{children}</div>
      <div className="flex mt-10 justify-around">
        <Button variant="outline" className="w-1/3" onClick={onClickSecondary}>
          {secondaryLabel}
        </Button>
        <Button className="w-1/3" onClick={onClickPrimary}>
          {primaryLabel}
        </Button>
      </div>
    </section>
  );
}

interface StepSectionProps {
  onClickPrimary: () => void;
  onClickSecondary: () => void;
}

function BasicInfoSection({
  onClickPrimary,
  onClickSecondary
}: StepSectionProps) {
  return (
    <StepSectionBase
      onClickPrimary={onClickPrimary}
      onClickSecondary={onClickSecondary}
      primaryLabel={"Continue"}
      secondaryLabel={"Cancel"}
    >
      <p>Basic info section</p>
    </StepSectionBase>
  );
}

function PhotosSection({ onClickPrimary, onClickSecondary }: StepSectionProps) {
  return (
    <StepSectionBase
      onClickPrimary={onClickPrimary}
      onClickSecondary={onClickSecondary}
      primaryLabel="Continue"
      secondaryLabel="Back"
    >
      <p>Photos Section</p>
    </StepSectionBase>
  );
}

function RentDataSection({
  onClickPrimary,
  onClickSecondary
}: StepSectionProps) {
  return (
    <StepSectionBase
      onClickPrimary={onClickPrimary}
      onClickSecondary={onClickSecondary}
      primaryLabel="Continue"
      secondaryLabel="Back"
    >
      <p>Rent Data Section</p>
    </StepSectionBase>
  );
}

function PropertyProof({ onClickPrimary, onClickSecondary }: StepSectionProps) {
  return (
    <StepSectionBase
      onClickPrimary={onClickPrimary}
      onClickSecondary={onClickSecondary}
      primaryLabel="Submit"
      secondaryLabel="Back"
    >
      <p>Property Proof Section</p>
    </StepSectionBase>
  );
}
