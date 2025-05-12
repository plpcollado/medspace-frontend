import React from "react";

interface Props {
  userBio: string;
}

export default function AboutSection({ userBio }: Props) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold mb-4">About</h2>
      <div className=" gap-6">
        <p className="text-gray-700">{userBio}</p>
      </div>
    </div>
  );
}
