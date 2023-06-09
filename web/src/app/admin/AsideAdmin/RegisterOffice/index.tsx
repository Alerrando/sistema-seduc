"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { z } from "zod";
import { RootState } from "../../../../../configureStore";
import { InputConfig, OfficeInfos, OfficeValuesDefault, changeRegisterType, refreshInfosOffice } from "../../../../../slice";
import CreateHeaderRegisters from "../../../../Components/CreateHeaderRegisters";
import Modal, { SubmitDataModal } from "../../../../Components/Modal";
import TableRegisters, { InfosTableRegisterData } from "../../../../Components/TableRegisters";
import { createRegisterOffice, deleteRegisterOffice, editRegisterOffice, getRegisterOffice } from "../../../../api";

const createFormSchema = z.object({
    name: z.string().nonempty("Nome é obrigatório!"),
    type: z.string().nonempty("Campo Cargo é obrigatório")
})

export type CreateFormDataOffice = z.infer<typeof createFormSchema>

export default function RegisterOffice(){
    const { allInfosOffice } = useSelector((root: RootState) => root.Slice);
    const [infosRegister, setInfosRegister] = useState<OfficeInfos>(OfficeValuesDefault);
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
            input: "input",
        },

        {
            htmlFor: "type",
            label: "Cargo para: ",
            name: "type",
            input: "select",
            optionDefault: "Selecione um tipo de cargo",
            optionType: "Office",
            type: "string",
        }
    ]

    useEffect(() => {
        (async () => {
            const allInfos: OfficeInfos[] | string = await getRegisterOffice();
            if (typeof allInfos !== "string") {
                const sortedInfos = allInfos.slice().sort((info1: OfficeInfos, info2: OfficeInfos) =>
                    info1.type.localeCompare(info2.type)
                );
                
                dispatch(refreshInfosOffice(sortedInfos));
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

    async function submit(data: SubmitDataModal){
        if("name" in data && "type" in data){
            let message: any | string;
            let allInfos: OfficeInfos[] = [];
            const { ...rest }  = data;
            const aux = { ...rest, id: infosRegister.id, edit: infosRegister.edit }
    
            if(!infosRegister.edit){
                message = await createRegisterOffice(aux);
            }
            else{
                message = await editRegisterOffice(aux, infosRegister.id);
                setModal(false);
            }
            
            allInfos = await getRegisterOffice();
            const sortedInfos = allInfos.slice().sort((info1: OfficeInfos, info2: OfficeInfos) =>
                    info1.type.localeCompare(info2.type)
            );
                
            dispatch(refreshInfosOffice(sortedInfos));
            messageToast(message);
        }
    }

    function editInfo(info: InfosTableRegisterData){
        if("name" in info && "type" in info){
            const { ...rest } = info;
            const aux = { ...rest, edit: true };
            setInfosRegister(aux);
            setModal(true);
        }
    }

    async function deleteInfo(info: InfosTableRegisterData){
        if("name" in info && "type" in info){
            const message: any | string = await deleteRegisterOffice(info.id);
            const allInfos = await getRegisterOffice();
            const sortedInfos = allInfos.slice().sort((info1: OfficeInfos, info2: OfficeInfos) =>
                info1.type.localeCompare(info2.type)
            );
            
            dispatch(refreshInfosOffice(sortedInfos));
            messageToast(message);
        }
    }

    async function handleLoadingClick() {
        try {
          const data = await getRegisterOffice();
          dispatch(refreshInfosOffice(data));
        } catch (error) {
          console.error('Erro ao atualizar os dados:', error);
        }
    }

    function messageToast(message: any | string){
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