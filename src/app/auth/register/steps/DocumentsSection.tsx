import FileInput from "@/components/FileInput";
import SelectInput from "@/components/SelectInput/SelectInput";
import TextInput from "@/components/TextInput";
import React, { useState } from "react";
import Avatar from "@/components/Avatar/Avatar";
import { TENANT_SPECIALTIES, UserRegistrationData } from "@/types/userTypes";
import { constToTitleCase } from "@/lib/textUtils";

type CreateUserFormData = Partial<UserRegistrationData>;

interface Props {
  formData: CreateUserFormData;
  updateFormData: (
    key: keyof CreateUserFormData,
    value: CreateUserFormData[keyof CreateUserFormData]
  ) => void;
}

export default function DocumentsSection({ formData, updateFormData }: Props) {
  const [pfpPreview, setPfpPreview] = useState<string | null>(
    formData.pfp ? URL.createObjectURL(formData.pfp!) : null
  );

  return (
    <div className="w-full p-6 m-auto mx-auto">
      <form className="space-y-4">
        <div className=" flex items-center justify-center ">
          <Avatar className={"size-20"} imageUrl={pfpPreview!} />
        </div>

        <FileInput
          accept="image/*"
          label="Upload Profile Picture"
          placeholder={formData.pfp?.name}
          onChange={(files) => {
            if (!files) return;
            updateFormData("pfp", files[0]);
            setPfpPreview(URL.createObjectURL(files[0]));
          }}
        />

        <FileInput
          label="Upload Official ID Card"
          placeholder={formData.officialId?.name}
          onChange={(files) => {
            if (!files) return;
            updateFormData("officialId", files[0]);
          }}
        />

        {formData.userType === "TENANT" && (
          <>
            <SelectInput
              label="Specialty:"
              values={TENANT_SPECIALTIES.map((s, i) => {
                return {
                  name: constToTitleCase(s),
                  value: i.toString()
                };
              })}
              value={formData.tenantSpecialtyId}
              onChange={(e) =>
                updateFormData("tenantSpecialtyId", parseInt(e.target.value))
              }
            />

            <TextInput
              label="Professional License Number:"
              type="number"
              value={formData.tenantProfessionalLicenseNumber}
              onChange={(e) =>
                updateFormData(
                  "tenantProfessionalLicenseNumber",
                  e.target.value
                )
              }
            />

            <FileInput
              placeholder={formData.tenantProfessionalLicense?.name}
              label="Upload Professional License"
              onChange={(files) => {
                if (!files) return;
                updateFormData("tenantProfessionalLicense", files[0]);
              }}
            />
          </>
        )}
      </form>
    </div>
  );
}
