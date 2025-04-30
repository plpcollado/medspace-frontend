import TextInput from "@/components/TextInput";
import StepSectionBase, { StepSectionProps } from "./StepSectionBase";

export interface RentInfoData {
  pricePerDay: number | null;
  maximumStayInDays: number | null;
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
  return (
    <StepSectionBase
      onClickPrimary={onClickPrimary}
      onClickSecondary={onClickSecondary}
      primaryLabel="Continue"
      secondaryLabel="Back"
    >
      <div className="flex flex-col gap-6">
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
      </div>
    </StepSectionBase>
  );
}
