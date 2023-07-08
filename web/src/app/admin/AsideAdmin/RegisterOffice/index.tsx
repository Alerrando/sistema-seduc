"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../configureStore";
import CreateHeaderRegisters from "../../../../Components/CreateHeaderRegisters";
import { refreshInfosOffice } from "../../../../../slice";
import { getRegisterOffice } from "../../../../api";

export default function RegisterOffice(){
    const { allInfosOffice } = useSelector((root: RootState) => root.Slice);
    const [modal, setModal] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            dispatch(refreshInfosOffice(await getRegisterOffice()));
        })
    }, [])

    return(
        <main className='w-full sm:w-5/6 h-max ml-auto'>
            <div className="w-full flex flex-col gap-4 px-6 py-3">
                    <h1 className="text-3xl md:text-[42px]">Cadastro de Cargos</h1>

                    {allInfosOffice != undefined ? (
                        <CreateHeaderRegisters setModal={setModal} setSearch={setSearch} totalRegiter={allInfosOffice.length} key={"create-header-office"} />
                    ) : null}

            </div>
        </main>
    )
}