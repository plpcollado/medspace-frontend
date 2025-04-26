"use client";
import React, { useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { AuthService } from "@/services/AuthService";

export default function LoginPage() {
  // State hooks to manage email and password values
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("123456");

  // Handle form submission
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await AuthService.signInWithEmailAndPassword(email, password);

      window.location.href = "/main";
    } catch {
      console.log("invalid credentials");
    }
  }

  return (
    <>
      <main className="h-screen flex justify-center items-center">
        <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="flex justify-center mx-auto text-2xl font-bold ">
            Login to your account
          </div>

          <form className="mt-6" onSubmit={handleSubmit}>
            <div>
              <TextInput
                label="Email:"
                invalidMessage="Invalid email"
                type="text"
                value={email} // Bind the email state to the input
                onChange={(e) => setEmail(e.target.value)} // Update email state on input change
              />
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label className="block font-medium text-sm text-gray-800 dark:text-gray-200">
                  Password:
                </label>
              </div>

              <TextInput
                type="password"
                value={password} // Bind the password state to the input
                onChange={(e) => setPassword(e.target.value)} // Update password state on input change
              />
            </div>

            <div className="mt-6">
              <Button className="w-full">Login</Button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-400">
            Don&#39;t have an account?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-gray-700 dark:text-gray-200 hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
