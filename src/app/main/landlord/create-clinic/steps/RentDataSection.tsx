import TextInput from "@/components/TextInput";
import StepSectionBase, { StepSectionProps } from "./StepSectionBase";
import ClinicAvailabilityInput from "@/components/ClinicAvailabilityInput";
import { constToTitleCase } from "@/lib/textUtils";
import { CreateClinicFormData } from "@/hooks/useCreateClinicForm";
import toast from "react-hot-toast";
import { useState } from "react";

interface ClinicDailyAvailabilityInput {
  dayOfWeek: string;
  fromTime: string | null;
  toTime: string | null;
  isActive: boolean;
}

interface RentDataSectionProps extends StepSectionProps {
  data: CreateClinicFormData;
  setData: (
    key: keyof CreateClinicFormData,
    value: CreateClinicFormData[keyof CreateClinicFormData]
  ) => void;
}

export default function RentDataSection({
  onClickPrimary,
  onClickSecondary,
  data,
  setData
}: RentDataSectionProps) {
  const [errors, setErrors] = useState({
    pricePerDay: "",
    maximumStayInDays: "",
    availabilities: data.availabilities!.map(() => ""),
    atLeastOneAvailabilityActive: ""
  });

  const handleAvailabilityChange = (
    dayOfWeek: string,
    newData: Partial<ClinicDailyAvailabilityInput>
  ) => {
    clearError("atLeastOneAvailabilityActive");
    setErrors((prev) => ({
      ...prev,
      availabilities: prev.availabilities.map((err, index) =>
        index ===
        data.availabilities!.findIndex(
          (availability) => availability.dayOfWeek === dayOfWeek
        )
          ? ""
          : err
      )
    }));
    setData(
      "availabilities",
      data.availabilities?.map((availability) =>
        availability.dayOfWeek === dayOfWeek
          ? { ...availability, ...newData }
          : availability
      )
    );
  };

  const validateData = () => {
    const newErrors: typeof errors = {
      pricePerDay: "",
      maximumStayInDays: "",
      availabilities: data.availabilities!.map(() => ""),
      atLeastOneAvailabilityActive: ""
    };
    let isValid = true;

    if (data.pricePerDay == null || data.pricePerDay <= 0) {
      newErrors.pricePerDay = "Price per day must be greater than 0";
      isValid = false;
    }

    if (data.maximumStayInDays == null || data.maximumStayInDays <= 0) {
      newErrors.maximumStayInDays = "Maximum stay must be greater than 1";
      isValid = false;
    }

    let numOfActiveAvailabilities = 0;
    data.availabilities?.forEach((availability, index) => {
      if (availability.isActive) {
        numOfActiveAvailabilities++;
        if (!availability.fromTime || !availability.toTime) {
          newErrors.availabilities[index] =
            "Please select valid from and to times";
          isValid = false;
        } else if (availability.fromTime >= availability.toTime) {
          newErrors.availabilities[index] = "From time must be before to time";
          isValid = false;
        }
      }
    });

    if (numOfActiveAvailabilities === 0) {
      newErrors.atLeastOneAvailabilityActive =
        "Please select at least one availability";
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

  return (
    <StepSectionBase
      onClickPrimary={() => onNavigate(onClickPrimary)}
      onClickSecondary={() => onNavigate(onClickSecondary)}
      primaryLabel="Continue"
      secondaryLabel="Back"
    >
      <div className="flex flex-col gap-8">
        <div className="flex gap-12">
          <div className="flex-1">
            <TextInput
              label="Price Per Day (in USD)"
              type="number"
              min={1}
              value={data.pricePerDay ?? ""}
              onChange={(e) => {
                clearError("pricePerDay");
                setData(
                  "pricePerDay",
                  e.target.value ? Number(e.target.value) : null
                );
              }}
              isInvalid={!!errors.pricePerDay}
              invalidMessage={errors.pricePerDay}
            />
          </div>
          <div className="flex-1">
            <TextInput
              label="Maximum Stay (in days)"
              type="number"
              onChange={(e) => {
                clearError("maximumStayInDays");
                setData(
                  "maximumStayInDays",
                  e.target.value ? Number(e.target.value) : null
                );
              }}
              value={data.maximumStayInDays ?? ""}
              min={1}
              isInvalid={!!errors.maximumStayInDays}
              invalidMessage={errors.maximumStayInDays}
            />
          </div>
        </div>
        <div className="flex flex-col max-w-2/3">
          <p className="mb-4 block text-sm font-medium text-gray-800 ">
            Daily Availabilities
          </p>
          {errors.atLeastOneAvailabilityActive && (
            <p className="text-sm text-red-500 mb-4">
              {errors.atLeastOneAvailabilityActive}
            </p>
          )}
          <div className="flex flex-col gap-6">
            {data.availabilities?.map((availability) => (
              <div key={availability.dayOfWeek}>
                <ClinicAvailabilityInput
                  dayOfWeek={constToTitleCase(availability.dayOfWeek)}
                  onChangeFromTime={(newTime) =>
                    handleAvailabilityChange(availability.dayOfWeek, {
                      fromTime: newTime
                    })
                  }
                  onChangeToTime={(newTime) =>
                    handleAvailabilityChange(availability.dayOfWeek, {
                      toTime: newTime
                    })
                  }
                  isActive={availability.isActive}
                  onChangeActive={(checked) =>
                    handleAvailabilityChange(availability.dayOfWeek, {
                      isActive: checked
                    })
                  }
                  fromTime={availability.fromTime}
                  toTime={availability.toTime}
                  error={
                    errors.availabilities[
                      data.availabilities!.indexOf(availability)
                    ]
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </StepSectionBase>
  );
}
