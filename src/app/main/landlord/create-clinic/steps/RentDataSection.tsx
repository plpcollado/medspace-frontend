import TextInput from "@/components/TextInput";
import StepSectionBase, { StepSectionProps } from "./StepSectionBase";
import ClinicAvailabilityInput from "@/components/ClinicAvailabilityInput";
import { constToTitleCase } from "@/lib/textUtils";

export interface RentInfoData {
  pricePerDay: number | null;
  maximumStayInDays: number | null;
  availabilities: DailyAvailability[];
}

export interface DailyAvailability {
  dayOfWeek: string;
  fromTime: string | null;
  toTime: string | null;
  isActive: boolean;
}

interface BasicInfoSectionProps extends StepSectionProps {
  data: RentInfoData;
  setData: (data: Partial<RentInfoData>) => void;
}

export default function RentDataSection({
  onClickPrimary,
  onClickSecondary,
  data,
  setData
}: BasicInfoSectionProps) {
  const handleAvailabilityChange = (
    dayOfWeek: string,
    newData: Partial<DailyAvailability>
  ) => {
    setData({
      availabilities: data.availabilities.map((availability) =>
        availability.dayOfWeek === dayOfWeek
          ? { ...availability, ...newData }
          : availability
      )
    });
  };

  return (
    <StepSectionBase
      onClickPrimary={onClickPrimary}
      onClickSecondary={onClickSecondary}
      primaryLabel="Continue"
      secondaryLabel="Back"
    >
      <div className="flex flex-col gap-8">
        <div className="flex gap-12">
          <div className="flex-1">
            <TextInput
              label="Price Per Day"
              type="number"
              placeholder="$0.00"
              min={0}
              value={data.pricePerDay ?? ""}
              onChange={(e) => {
                setData({
                  pricePerDay: e.target.value ? Number(e.target.value) : null
                });
              }}
            />
          </div>
          <div className="flex-1">
            <TextInput
              label="Maximum Stay In Days"
              type="number"
              onChange={(e) => {
                setData({
                  maximumStayInDays: e.target.value
                    ? Number(e.target.value)
                    : null
                });
              }}
              value={data.maximumStayInDays ?? ""}
              placeholder="1"
              min={1}
            />
          </div>
        </div>
        <div className="flex flex-col max-w-2/3">
          <p className="mb-4 block text-sm font-medium text-gray-800 dark:text-gray-200 ">
            Daily Availabilities
          </p>
          <div className="flex flex-col gap-6">
            {data.availabilities.map((availability) => (
              <ClinicAvailabilityInput
                key={availability.dayOfWeek}
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
              />
            ))}
          </div>
        </div>
      </div>
    </StepSectionBase>
  );
}
