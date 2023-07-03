"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../system";

type HomeProps = {
  children: React.ReactNode;
};

const Home: React.FC<HomeProps> = ({ children }) => {
  const { userInfos } = useSelector((root: RootState) => root.SliceLogin);
  const router = useRouter();
  const pathName = usePathname();

  console.log(pathName);

  useEffect(() => {
    if (typeof window !== "undefined" && Object.values(userInfos).length === 0) {
      router.replace("/login-register");
    }
  }, [userInfos]);

  return <>{children}</>;
};

export default Home;
