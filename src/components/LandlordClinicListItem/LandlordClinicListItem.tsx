"use client";
import { IoIosNotifications } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { HiShare } from "react-icons/hi2";

import Button from "@/components/Button";

type ClinicListItemProps = {
  /** Name of the clinic */
  clinicName: string;
  /** State of the clinic */
  clinicState: string;
  /** Url to the clinic's main image */
  clinicImageURL: string;
  /** Number of rent requests of clinic */
  numberOfClinicRequests: number;
  /** Function to call when the requests button is clicked */
  onClickRequests: () => void;
  /** Function to call when the edit button is clicked */
  onClickEdit: () => void;
  /** Function to call when the share button is clicked */
  onShareClick: () => void;
};

const LandlordClinicListItem = ({
  clinicName,
  clinicState,
  clinicImageURL,
  numberOfClinicRequests,
  onClickRequests,
  onClickEdit,
  onShareClick,
}: ClinicListItemProps) => {
  return (
    <div className="flex flex-1 flex-col gap-8 p-8 items-center justify-between shadow-[0_0_5px_rgba(0,0,0,0.1)] rounded-sm md:flex-row md:justify-between md:px-6 md:py-2 ">
      <div className="flex flex-row items-center gap-4">
        <img
          src={clinicImageURL}
          alt="Clinic"
          className="w-16 h-16 object-cover rounded-full"
        />
        <p className="text-lg font-normal">{clinicName}</p>
      </div>
      <div className="hidden md:block">
        <p className="text-md font-light">{clinicState}</p>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <HiShare
          className="cursor-pointer w-6 h-6 fill-gray-600 transition-transform duration-200 hover:-rotate-12"
          onClick={() => onShareClick()}
        />
        <Button icon={<IoIosNotifications />} onClick={() => onClickRequests()}>
          {numberOfClinicRequests} Requests
        </Button>
        <Button
          icon={<MdEdit />}
          variant="outline"
          onClick={() => onClickEdit()}
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default LandlordClinicListItem;
