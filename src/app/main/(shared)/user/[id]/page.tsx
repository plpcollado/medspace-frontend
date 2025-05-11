import React, { Suspense } from "react";
import ProfileCard from "./components/UserProfile";
import UserProfileSkeleton from "./components/UserProfileSkeleton";

export default async function page({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="pt-10">
      <Suspense fallback={<UserProfileSkeleton />}>
        <ProfileCard userId={parseInt(id)} />
      </Suspense>
    </div>
  );
}
