import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../system";
import { usePathname, useRouter } from "next/navigation";

export default function ProtectedRoute({ childreen }: React.ReactNode){
    const { userInfos } = useSelector((root: RootState) => root.SliceLogin);
    const router = useRouter();
    const pathName = usePathname();

    console.log(pathName);

    if(Object.values(userInfos).length == 0){
        router.replace("/login-register");
        return null;
    }

    return(
        <>
            {childreen}
        </>
    )
}