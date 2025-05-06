import { getUserServerSide } from "@/components/AuthGuard/AuthGuard";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getUserServerSide();

  if (!user) {
    redirect("/auth/login");
  }

  if (user.userType === "ANALYST") {
    redirect("/main/analyst");
  }

  if (user.userType === "TENANT") {
    redirect("/main/tenant");
  }

  if (user.userType === "LANDLORD") {
    redirect("/main/landlord");
  }
}
