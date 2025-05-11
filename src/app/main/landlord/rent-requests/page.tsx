import { Suspense } from "react";
import RentRequestFetcher from "./components/RentRequestFetcher";
import ClinicsListSkeleton from "../my-clinics/components/ClinicsListSkeleton";

export default function RentRequestsPage() {
  return (
    <main className="flex flex-col">
      <div className="container mx-auto px-6 py-8">
        <h2 className="font-bold text-2xl">Rent Requests</h2>

        <div className="mt-12 ">
          <Suspense fallback={<ClinicsListSkeleton />}>
            <RentRequestFetcher />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
