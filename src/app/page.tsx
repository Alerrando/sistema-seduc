"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useLoginState } from "../../slice/LoginSlice";

type HomeProps = {
  children: React.ReactNode
}

function Home({ children }: HomeProps) {
  const { user } = useLoginState();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (pathName === "/") {
      router.replace("/login-register");
    } else if (typeof window !== "undefined" && Object.values(user).length !== 0) {
      if (pathName === "/admin" && user.level === 1) {
        router.replace("/admin");
      }
    } else {
      router.push("/login-register");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}

export default Home;
