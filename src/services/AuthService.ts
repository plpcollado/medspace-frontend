import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
  onAuthStateChanged
} from "firebase/auth";
import { setCookie, deleteCookie } from "cookies-next";
import { UserService } from "./UserService";
import { User, UserRegistrationData } from "@/types/userTypes";
import { auth } from "@/lib/firebase/firebaseApp";

export class AuthService {
  static USER_COOKIE_NAME = "__current_user";

  static async setUserCookie(user: User | null = null) {
    if (user) {
      await setCookie(this.USER_COOKIE_NAME, user);
    } else {
      await deleteCookie(this.USER_COOKIE_NAME);
    }
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return !!auth.currentUser;
  }

  // Get the current Firebase auth user
  private static getCurrentFirebaseUser(): FirebaseUser | null {
    return auth.currentUser;
  }

  // Subscribe to auth state changes
  static onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, async (fibUser) => {
      if (!fibUser) {
        await this.setUserCookie(null); // Delete session cookie if user is not authenticated
        return callback(null); // No user is signed in
      }

      let userProfile: User | null = null;

      try {
        if (fibUser.metadata.creationTime === fibUser.metadata.lastSignInTime) {
          // User is newly created, wait a bit before fetch profile from API
          await new Promise((resolve) => setTimeout(resolve, 500));
        }

        userProfile = await UserService.fetchCurrentUserProfile();
        await this.setUserCookie(userProfile);
      } catch (error) {
        console.error(
          "[AuthService]: Error fetching user profile from API",
          error
        );
        await this.signOut();
      }

      callback(userProfile); // Call the original callback
    });
  }

  // Register a new user with email and password
  static async registerUserWithEmailAndPassword(
    email: string,
    password: string,
    userData: UserRegistrationData
  ): Promise<void> {
    let userCredential;

    try {
      userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await UserService.createUserProfile(userData);

      //Wait for a bit to ensure the user is created in the database before proceeding
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error("[AuthService]: Error creating user", error);

      // Rollback: delete Firebase user if DB user creation fails
      if (userCredential?.user) {
        try {
          console.warn("[AuthService]: Rolling back Firebase user creation");
          await userCredential.user.delete();
        } catch (deleteError) {
          console.error(
            "[AuthService]: Failed to rollback Firebase user",
            deleteError
          );
        }
      }

      throw error;
    }
  }

  // Sign in with email and password
  static async signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<void> {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("[AuthService] Error signing in:", error);
      throw error; // Optionally, rethrow or return a custom error message
    }
  }

  // Get Firebase auth token for API calls to custom backend
  static async getIdToken(): Promise<string> {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No authenticated user");

      return await user.getIdToken();
    } catch (error) {
      console.error("Get token error:", error);
      throw error;
    }
  }

  // Get auth headers for API requests (includes Firebase token)
  static async getAuthHeaders(): Promise<Record<string, string>> {
    try {
      const token = await this.getIdToken();
      return {
        Authorization: `Bearer ${token}`
      };
    } catch (error) {
      console.error("Get auth headers error:", error);
      return {}; // Return empty headers on error};
    }
  }

  static async signOut() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  }
}
