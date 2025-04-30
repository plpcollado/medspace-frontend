import Button from "@/components/Button";

interface StepSectionBaseProps {
  children?: React.ReactNode;
  onClickPrimary: () => void;
  onClickSecondary: () => void;
  primaryLabel: string;
  secondaryLabel: string;
}

export interface StepSectionProps {
  onClickPrimary: () => void;
  onClickSecondary: () => void;
}

export default function StepSectionBase({
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
