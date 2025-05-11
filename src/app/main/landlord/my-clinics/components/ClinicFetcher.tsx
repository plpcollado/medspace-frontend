import React from "react";
import ClinicsList from "./ClinicsList";
import { ClinicService } from "@/services/ClinicService";

export default async function ClinicFetcher() {
  const clinics = await ClinicService.getMyClinics();

  return <ClinicsList clinics={clinics} />;
}
