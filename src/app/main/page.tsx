import { getCurrentUserServerSide } from "@/lib/firebase/serverApp";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getCurrentUserServerSide();

  if (!user) {
    return redirect("/auth/login");
  }

  if (user!.userType === "ANALYST") {
    return redirect("/main/analyst");
  }

  if (user!.userType === "TENANT") {
    return redirect("/main/tenant");
  }
  if (user!.userType === "LANDLORD") {
    return redirect("/main/landlord");
  }
}
