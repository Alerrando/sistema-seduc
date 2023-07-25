"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../configureStore";
import { changeLoginLogout } from "../../../slice/LoginSlice";
import RootLayout from "../layout";
import Login from "./Login";
import "./style.css";

export default function LoginRegister() {
    const { userInfos } = useSelector((root: RootState) => root.SliceLogin);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(changeLoginLogout({}))
      localStorage.clear();
      if(Object.values(userInfos).length > 0){
        router.replace("/dashboard");
      }
    }, [])
  
    return (
      <RootLayout showHeaderAside={false}>
        <main className={`w-full h-screen flex flex-col md:flex-row overflow-x-hidden pr-4 md:py-9`}>
            <Login />          
        </main>
      </RootLayout>
    );
}
  