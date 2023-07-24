"use client";
import React, { useEffect, useState } from "react"
import Login from "./Login";
import Register from "./Register";
import { boolean } from "zod";
import "./style.css"
import RootLayout from "../layout";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "../../../configureStore";
import { changeLoginLogout } from "../../../slice/LoginSlide";

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
  