"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../configureStore";

function Home({ children }: unknown) {
  const { userInfos } = useSelector((root: RootState) => root.SliceLogin);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (pathName === "/") {
      router.replace("/login-register");
    }

    if (typeof window !== "undefined" && Object.values(userInfos).length !== 0) {
      if (pathName === "/admin" && userInfos.level === 1) {
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
