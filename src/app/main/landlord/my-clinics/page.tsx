import React, { Suspense } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import { MdAddBox } from "react-icons/md";
import ClinicFetcher from "./components/ClinicFetcher";
import ClinicsListSkeleton from "./components/ClinicsListSkeleton";

export default async function page() {
  return (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex flex-row items-center">
        <h1 className="text-2xl font-bold mr-5">My Clinics</h1>
        <Link href={"/main/landlord/create-clinic"}>
          <Button icon={<MdAddBox />} className="rounded-xl px-3">
            Create
          </Button>
        </Link>
      </div>

      <Suspense fallback={<ClinicsListSkeleton />}>
        <ClinicFetcher />
      </Suspense>
    </div>
  );
}
