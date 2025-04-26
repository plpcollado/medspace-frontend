import { auth } from "@/lib/firebase/clientApp";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser
} from "firebase/auth";
import { setCookie, deleteCookie } from "cookies-next";
import { UserService } from "./UserService";

export class AuthService {
  /**
   * Sets or removes the session cookie for the user.
   *
   * This method is used to manage the session cookie (`__session`)
   * which allows server components to read and identify the user.
   * If a user is provided, their ID token is retrieved and stored
   * in the session cookie. If no user is provided, the session
   * cookie is deleted.
   *
   * @param user - The user object containing authentication details,
   *               or `null` to remove the session cookie.
   */
  private static async setSessionCookie(user: FirebaseUser | null) {
    if (user) {
      const idToken = await user.getIdToken();
      await setCookie("__session", idToken);
    } else {
      await deleteCookie("__session");
    }
  }

  private static checkIfClientSide() {
    if (typeof window === "undefined") {
      throw new Error("This method can only be called on the client side.");
    }
  }

  static isGuest() {
    this.checkIfClientSide();

    return !auth.currentUser;
  }

  static async signInWithEmailAndPassword(email: string, password: string) {
    this.checkIfClientSide();

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      await this.setSessionCookie(res.user);
      return res;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error; // Optionally, rethrow or return a custom error message
    }
  }

  static async createUserWithEmailAndPassword(email: string, password: string) {
    this.checkIfClientSide();

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await this.setSessionCookie(res.user);
      return res;
    } catch (error) {
      console.error("Error creating user", error);
      throw error;
    }
  }

  static async signOut() {
    this.checkIfClientSide();

    try {
      await signOut(auth);
      await this.setSessionCookie(null);
    } catch (error) {
      console.error("Error signing out", error);
    }
  }

  static async getCurrentUserClientSide() {
    this.checkIfClientSide();

    const user = auth.currentUser;
    if (!user) return null;

    // Now calling UserService to get user data
    const data = await UserService.getSelfUserDataFromDatabase(
      await user.getIdToken()
    );
    return data;
  }
}
