"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../configureStore";
import CreateHeaderRegisters from "../../../../Components/CreateHeaderRegisters";
import { InputConfig, OfficeInfos, SchoolValuesDefault, refreshInfosOffice } from "../../../../../slice";
import { getRegisterOffice } from "../../../../api";
import Modal from "../../../../Components/Modal";
import { z } from "zod";

const createFormSchema = z.object({
    name: z.string().nonempty("Nome é obrigatório!"),
})

export default function RegisterOffice(){
    const { allInfosOffice } = useSelector((root: RootState) => root.Slice);
    const [infosRegister, setInfosRegister] = useState<OfficeInfos>(SchoolValuesDefault);
    const [modal, setModal] = useState<boolean>(false);
    const dispatch = useDispatch();
    const inputs: InputConfig[] = [
        {
            htmlFor: "name",
            label: "Nome do Cargo",
            name: "name",
            placeholder: "Escola Municipal Mario Fiorante",
            type: "text",
            type: "string",
            key: "name-input",
        },
    ]

    useEffect(() => {
        (async () => {
            dispatch(refreshInfosOffice(await getRegisterOffice()));
        })
    }, [])

    return(
        <main className='w-full h-max ml-auto'>
            <div className="w-full flex flex-col gap-4 px-6 py-3">
                    <h1 className="text-3xl md:text-[42px]">Cadastro de Cargos</h1>

                    {allInfosOffice != undefined ? (
                        <CreateHeaderRegisters setModal={setModal} totalRegiter={allInfosOffice.length} key={"create-header-office"} />
                    ) : null}

                    {modal ? (
                        <Modal 
                            title="Cadastro de Cargos"
                            createFormSchema={createFormSchema}
                            infosInput={infosRegister}
                            setInfosInput={setInfosRegister}
                            setModal={setModal}
                            submitInfos={submit}
                            modalName="Office"
                        />
                    ) : false}
            </div>
        </main>
    )

    function submit(){

    }
}