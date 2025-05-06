import React from "react";
import { redirect } from "next/navigation";
import { User, UserType } from "@/types/userTypes";
import { cookies } from "next/headers";
import { AuthService } from "@/services/AuthService";

interface Props {
  children: React.ReactNode;
  allowedUserTypes?: UserType[];
  guestOnly?: boolean;
  redirectPath?: string;
  ignoreAuth?: boolean;
}

export async function getUserServerSide() {
  const userValue = (await cookies()).get(AuthService.USER_COOKIE_NAME)?.value;
  const user: User | null = userValue ? JSON.parse(userValue) : null;

  return user;
}

export default async function AuthGuard({
  children,
  allowedUserTypes = [],
  guestOnly,
  redirectPath = "/",
  ignoreAuth = false
}: Props) {
  if (ignoreAuth) return children; // If ignoreAuth is true, skip authentication check

  const user = await getUserServerSide();

  if (guestOnly) {
    if (user) return redirect(redirectPath);
    else return children;
  }

  if (user) {
    if (allowedUserTypes.length === 0) {
      return children; //if no user types are specified, allow all authenticated users
    }
    if (allowedUserTypes.includes(user.userType)) {
      return children; //if user type is allowed, allow access
    } else {
      return redirect(redirectPath);
    }
  } else {
    // If no user is found and guestOnly is not set, redirect to the login page
    return redirect(redirectPath);
  }
}
