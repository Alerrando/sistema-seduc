"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useStore } from "../../../slice";
import Login from "./Login";
import "./style.css";

export default function LoginRegister() {
  const { user } = useStore();
  const router = useRouter();

  useEffect(() => {
    localStorage.clear();
    if (Object.values(user).length > 0) {
      router.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={"w-full h-screen flex flex-col md:flex-row overflow-x-hidden pr-4 md:py-9"}>
      <Login />
    </main>
  );
}
