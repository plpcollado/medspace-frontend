import { CLINIC_CATEGORIES } from "@/types/clinicTypes";
import StepSectionBase, { StepSectionProps } from "./StepSectionBase";
import TextInput from "@/components/TextInput";
import SelectInput from "@/components/SelectInput/SelectInput";
import TextAreaInput from "@/components/TextAreaInput";

export interface BasicInfoData {
  displayName: string;
  description: string;
  category: string;
  // equipments: string[];
  // size: number;
  // TODO: add location data @Eashley
}

interface BasicInfoSectionProps extends StepSectionProps {
  data: BasicInfoData;
  setData: (data: Partial<BasicInfoData>) => void;
}

export default function BasicInfoSection({
  onClickPrimary,
  onClickSecondary,
  data,
  setData
}: BasicInfoSectionProps) {
  const categoryOptions = CLINIC_CATEGORIES.map((cat) => ({
    value: cat,
    name: cat
      .toLowerCase()
      .split("_")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ")
  }));

  return (
    <StepSectionBase
      onClickPrimary={onClickPrimary}
      onClickSecondary={onClickSecondary}
      primaryLabel={"Continue"}
      secondaryLabel={"Cancel"}
    >
      <div className="flex flex-col gap-6">
        <div className="flex gap-12">
          <div className="flex-1">
            <TextInput
              label="Display Name"
              value={data.displayName}
              onChange={(e) => setData({ displayName: e.target.value })}
            />
          </div>
          <div className="flex-1">
            <SelectInput
              label="Clinic Category"
              values={categoryOptions}
              onChange={(e) => setData({ category: e.target.value })}
              value={data.category}
            />
          </div>
        </div>
        <div className="flex gap-12">
          <div className="flex-1">
            <TextAreaInput
              label="Description"
              value={data.description}
              onChange={(e) => setData({ description: e.target.value })}
            />
          </div>
          <div className="flex-1">Map here</div>
        </div>
      </div>
    </StepSectionBase>
  );
}
