import Navbar from "@/components/Navbar";
import { isGuestServerSide } from "@/lib/firebase/serverApp";
import { redirect } from "next/navigation";
export default async function LandingPageLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const isGuest = await isGuestServerSide();

  if (!isGuest) {
    return redirect("/main");
  }

  return (
    <>
      <Navbar variant="guest" />
      {children}
      {/* <Footer /> */}
    </>
  );
}
