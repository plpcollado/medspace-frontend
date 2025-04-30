import {
  CLINIC_CATEGORIES,
  CLINIC_EQUIPMENTS,
  ClinicCategory,
  ClinicEquipment
} from "@/types/clinicTypes";
import StepSectionBase, { StepSectionProps } from "./StepSectionBase";
import TextInput from "@/components/TextInput";
import SelectInput from "@/components/SelectInput/SelectInput";
import TextAreaInput from "@/components/TextAreaInput";
import ClinicEquipmentTag from "@/components/ClinicEquipmentTag";
import { constToTitleCase } from "@/lib/textUtils";

export interface BasicInfoData {
  displayName: string;
  description: string;
  category: ClinicCategory;
  equipments: ClinicEquipment[];
  size: number;
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
    name: constToTitleCase(cat)
  }));

  const equipmentsOptions = [
    { name: "Select", value: "SELECT" },
    ...CLINIC_EQUIPMENTS.map((eq) => ({
      value: eq,
      name: constToTitleCase(eq)
    }))
  ];

  const handleAddEquipment = (eq: string) => {
    if (!data.equipments.includes(eq)) {
      setData({ equipments: [...data.equipments, eq] });
    }
  };

  const handleDeleteEquipment = (eq: string) => {
    setData({ equipments: data.equipments.filter((e) => e !== eq) });
  };

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
        <div className="flex gap-12">
          <div className="flex-1">
            <SelectInput
              label="Equipments"
              values={equipmentsOptions}
              onChange={(e) => handleAddEquipment(e.target.value)}
              value={"Select"}
            />
          </div>
          <div className="flex-1">
            <TextInput
              type="number"
              label="Size (in sq m)"
              value={data.size}
              min="0"
              onChange={(e) => {
                setData({ size: Number(e.target.value) });
              }}
            />
          </div>
        </div>
        <div className="flex gap-4 flex-wrap">
          {data.equipments.map((eq, idx) => (
            <ClinicEquipmentTag
              key={idx}
              name={constToTitleCase(eq)}
              onDelete={() => {
                handleDeleteEquipment(eq);
              }}
            />
          ))}
        </div>
      </div>
    </StepSectionBase>
  );
}
