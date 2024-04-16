"use client";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { StateContextLogin } from "../../slice/LoginSlice";

function Home({ children }: unknown) {
  const { user } = useContext(StateContextLogin);
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
      router.replace("/login-register");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}

export default Home;
