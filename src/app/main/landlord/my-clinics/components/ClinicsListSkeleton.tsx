function ClinicsListSkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-gray-200 rounded-lg p-4 h-20"></div>
      ))}
    </div>
  );
}
export default ClinicsListSkeleton;
