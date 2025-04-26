import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import { getCurrentUserServerSide } from "@/lib/firebase/serverApp";

export default async function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUserServerSide();

  if (user?.userType !== "ANALYST") {
    return redirect("/");
  }

  return (
    <>
      <Navbar variant="analyst" />
      {children}
    </>
  );
}
