import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../system";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ childreen }: React.ReactNode){
    const { LoginInfos } = useSelector((root: RootState) => root.SliceLogin);
    const router = useRouter();

    if(Object.values(LoginInfos).length == 0){
        router.replace("/login-register");
        return null;
    }

    return(
        <>
            {childreen}
        </>
    )
}