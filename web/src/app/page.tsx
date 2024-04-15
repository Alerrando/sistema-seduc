"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../configureStore";
import { StateContextLogin } from "../../slice/LoginSlice";

type HomeProps = {
  children: React.ReactNode;
}

function Home({ children }: HomeProps) {
  const { user } = useContext(StateContextLogin);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    debugger
    if (pathName === "/") {
      router.replace("/login-register");
    }

    if (typeof window !== "undefined" && Object.values(user).length !== 0) {
      if (pathName === "/admin") {
        router.replace("/admin");
      }
    } else {
      router.replace("/login-register");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}

export default Home;
