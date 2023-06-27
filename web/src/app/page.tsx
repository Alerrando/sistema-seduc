import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../system";
import { PageProps } from "your-page-props-type"; // Substitua pelo tipo de suas props de página

type HomeProps = {
  children: React.ReactNode;
};

export default function Home({ children }: HomeProps) {
  const { userInfos } = useSelector((root: RootState) => root.SliceLogin);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && Object.values(userInfos).length === 0) {
      router.replace("/login-register");
    }
  }, [userInfos]);

  return <>{children}</>;
}
