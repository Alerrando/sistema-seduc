"use client";
import React, { useEffect, useState } from "react";
import { UserInfos } from "../../../../../slice/LoginSlide";
import { getUsers } from "../../../../api";

export default function UsersList(){
    const [usersAll, setUsersAll] = useState<UserInfos[]>([] as UserInfos);

    useEffect(() => {
        (async () => {
            setUsersAll(await getUsers());
        })()
    }, [])

    return (
        <>
            <header className="w-full h-auto border-b border-b-[#efefef] p-3">
                <h1 className="text-3xl">Lista de Usuários</h1>
            </header>

            <section className="h-full w-full flex flex-col items-start justify-between p-12">
            
            </section>
        </>
    )
}