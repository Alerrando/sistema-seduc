"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { z } from "zod";
import { RootState } from "../../../../../configureStore";
import { InputConfig, OfficeInfos, SchoolValuesDefault, objectEmptyValue, refreshInfosOffice } from "../../../../../slice";
import CreateHeaderRegisters from "../../../../Components/CreateHeaderRegisters";
import Modal from "../../../../Components/Modal";
import { createRegisterOffice, getRegisterOffice } from "../../../../api";

const createFormSchema = z.object({
    name: z.string().nonempty("Nome é obrigatório!"),
    type: z.string().nonempty("Campo Cargo é obrigatório")
})

type CreateFormData = z.infer<typeof createFormSchema>

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
            placeholder: "PEB I",
            type: "text",
            type: "string",
            key: "name-input",
        },

        {
            htmlFor: "type",
            label: "Cargo para: ",
            name: "type",
            input: "select",
            optionDefault: "Selecione um tipo de cargo",
            optionType: "",
        }
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
                            inputs={inputs}
                            modalName="Office"
                        />
                    ) : false}
            </div>

            <ToastContainer />
        </main>
    )

    async function submit(e: CreateFormData){
        let message: object | string;
        const { ...rest }  = e;
        const aux = { ...rest, id: infosRegister.id, }

        if(!infosRegister.edit){
            if(!objectEmptyValue(aux)){
                message = await createRegisterOffice(aux);
            }
        }

        messageToast(message);
    }

    function messageToast(message){
        if(typeof message !== "object"){
            toast.success(message, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else{
            toast.error(message.response.data, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
}