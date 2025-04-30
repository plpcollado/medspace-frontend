import StepSectionBase, { StepSectionProps } from "./StepSectionBase";

export default function PhotosSection({
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
      <p>Photos Section</p>
    </StepSectionBase>
  );
}
