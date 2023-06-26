"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../system";

export default function Home({ children }: React.ReactNode) {
  const { userInfos } = useSelector((root: RootState) => root.SliceLogin);
  const router = useRouter();

  console.log(typeof window)

  useEffect(() => {
    if (typeof window !== "undefined" && Object.values(userInfos).length === 0) {
      router.replace("/login-register");
    }
  }, [userInfos]);

  return <>{children}</>;
}
