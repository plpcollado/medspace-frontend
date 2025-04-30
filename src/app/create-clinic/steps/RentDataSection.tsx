import StepSectionBase, { StepSectionProps } from "./StepSectionBase";

export interface RentData {
  price: number;
  contractLengthMonths: number;
}

export default function RentDataSection({
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
