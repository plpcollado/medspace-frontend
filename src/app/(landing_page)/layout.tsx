import Navbar from "@/components/Navbar";
export default function LandingPageLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar variant="guest" />
      {children}
      {/* <Footer /> */}
    </>
  );
}
