import StepSectionBase, { StepSectionProps } from "./StepSectionBase";

export interface PropertyProofData {
  documentFile: File | null;
}

export default function PropertyProof({
  onClickPrimary,
  onClickSecondary
}: StepSectionProps) {
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
