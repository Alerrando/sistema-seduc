"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../system";

type HomeProps = {
  children: React.ReactNode;
};

function Home(props: HomeProps) {
  const { userInfos } = useSelector((root: RootState) => root.SliceLogin);
  const { children } = props;
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && Object.values(userInfos).length === 0) {
      router.replace("/login-register");
    }
  }, [userInfos]);

  return <>{children}</>;
}

export default Home;