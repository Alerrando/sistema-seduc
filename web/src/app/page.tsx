"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../configureStore";

function Home({ children }: any) {
  const { userInfos } = useSelector((root: RootState) => root.SliceLogin);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if(pathName === "/"){
      router.replace("/login-register");
    }
    
    if (typeof window !== "undefined" && Object.values(userInfos).length !== 0) {
      if(pathName === "/admin" && userInfos.level === 1){
          router.replace("/admin");
      }
    }
    else{
      router.replace("/login-register");
    }
  }, [userInfos]);

  return <>{children}</>;
}

export default Home;
