"use client";
import { useRouter } from "next/navigation";
import { useEffect, useContext } from "react";
import RootLayout from "../layout";
import Login from "./Login";
import "./style.css";
import { StateContextLogin } from "../../../slice/LoginSlice";

export default function LoginRegister() {
  const { user } = useContext(StateContextLogin);
  const router = useRouter();

  useEffect(() => {
    localStorage.clear();
    if (Object.values(user).length > 0) {
      router.replace("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={"w-full h-screen flex flex-col md:flex-row overflow-x-hidden pr-4 md:py-9"}>
      <Login />
    </main>
  );
}