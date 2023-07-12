"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { z } from "zod";
import { RootState } from "../../../../../configureStore";
import { InputConfig, OfficeInfos, SchoolValuesDefault, changeRegisterType, objectEmptyValue, refreshInfosOffice } from "../../../../../slice";
import CreateHeaderRegisters from "../../../../Components/CreateHeaderRegisters";
import Modal from "../../../../Components/Modal";
import { createRegisterOffice, deleteRegisterOffice, editRegisterOffice, getRegisterOffice } from "../../../../api";
import TableRegisters from "../../../../Components/TableRegisters";

const createFormSchema = z.object({
    name: z.string().nonempty("Nome é obrigatório!"),
    type: z.string().nonempty("Campo Cargo é obrigatório")
})

export type CreateFormDataOffice = z.infer<typeof createFormSchema>

export default function RegisterOffice(){
    const { allInfosOffice } = useSelector((root: RootState) => root.Slice);
    const [infosRegister, setInfosRegister] = useState<OfficeInfos>(SchoolValuesDefault);
    const [modal, setModal] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const dispatch = useDispatch();
    const tableHead = ["Id", "Nome", "Tipo de Cargo"];
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
            optionType: "Office",
        }
    ]

    useEffect(() => {
        (async () => {
            const allInfos:OfficeInfos[] | string = await getRegisterOffice();
            if(typeof allInfos !== "string"){
                dispatch(refreshInfosOffice(allInfos?.sort((info1:OfficeInfos, info2: OfficeInfos) => info1.type - info2.type)));
                dispatch(changeRegisterType(""));
            }
        })()
    }, [])

    return(
        <main className='w-full h-max ml-auto'>
            <div className="w-full flex flex-col gap-4">
                <header className="w-full h-auto flex items-center justify-between border-b border-b-[#efefef] p-3">
                    <h1 className="text-3xl">Cadastro de Cargos</h1>

                    <div className="w-auto h-auto flex items-center justify-center">
                        <div className="inline-block h-5 w-5 cursor-pointer hover:animate-spin rounded-full border-4 border-solid border-current border-b-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                            role="status"
                            onClick={() => handleLoadingClick()}
                        >
                        </div>
                    </div>
                </header>

                <section className="w-full flex flex-col gap-4 px-6">
                    {allInfosOffice != undefined ? (
                        <CreateHeaderRegisters setModal={setModal} setSearch={setSearch} totalRegiter={allInfosOffice.length} key={"create-header-office"} />
                    ) : null}

                    <TableRegisters
                        deleteInfo={deleteInfo}
                        editInfo={editInfo}
                        infosAll={allInfosOffice}
                        search={search}
                        tableHead={tableHead}
                        key={"table-office"}
                    />
                </section>


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
    );

    async function submit(e: CreateFormDataOffice){
        let message: object | string;
        let allInfos: OfficeInfos[] = [];
        const { ...rest }  = e;
        const aux = { ...rest, id: infosRegister.id, }

        if(!infosRegister.edit){
            message = await createRegisterOffice(aux);
        }
        else{
            message = await editRegisterOffice(aux, infosRegister.id);
            setModal(false);
        }
        
        allInfos = await getRegisterOffice();
        dispatch(refreshInfosOffice(allInfos.sort((info1:OfficeInfos, info2: OfficeInfos) => info1.type - info2.type)));
        messageToast(message);
    }

    function editInfo(info: OfficeInfos){
        const { ...rest } = info;
        const aux = { ...rest, edit: true };
        setInfosRegister(aux);
        setModal(true);
    }

    async function deleteInfo(info: OfficeInfos){
        const message: object | string = await deleteRegisterOffice(info.id);
        const allInfos = await getRegisterOffice();
        dispatch(refreshInfosOffice(allInfos.sort((info1:OfficeInfos, info2: OfficeInfos) => info1.type - info2.type)));
        messageToast(message);
    }

    async function handleLoadingClick() {
        try {
          const data = await getRegisterOffice();
          dispatch(refreshInfosOffice(data));
        } catch (error) {
          console.error('Erro ao atualizar os dados:', error);
        }
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