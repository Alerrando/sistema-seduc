'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppDispatch, RootState } from '../../../../configureStore';
import { InputConfig, SchoolInfos, SchoolValuesDefault, changeRegisterType, objectEmptyValue, refreshInfosSchool } from '../../../../slice';
import CreateHeaderRegisters from '../../../Components/CreateHeaderRegisters';
import Modal, { SubmitDataModal } from '../../../Components/Modal';
import TableRegisters, { InfosTableRegisterData } from '../../../Components/TableRegisters';
import { createSchool, deleteSchool, editSchool, readAllSchool } from '../../../api';
import RootLayout from '../../../app/layout';
import { z } from 'zod';

const createFormSchema = z.object({
    name: z.string().nonempty("Campo Nome é obrigatório!"),
    adress: z.string().nonempty("Campo Endereço é obrigatório!"),
    zip: z.string()
      .nonempty("Campo Cep é obrigatório!")
      .transform(value => value.replace(/\D/g, ""))
      .refine(value => value.length === 8, {
        message: "CEP inválido. O CEP deve conter 8 dígitos.",
      }),
    fone: z.string().nonempty("Campo Telefone é obrigatório!"),
    email: z.string().email().nonempty("O campo Email é obrigatório!"),
});

export type CreateFormDataSchool = z.infer<typeof createFormSchema>

export default function CadastroEscola(){
    const { allInfosSchool, registerType } = useSelector((root: RootState) => root.Slice);
    const [infosInput, setInfosInput] = useState<SchoolInfos>(SchoolValuesDefault);
    const [search, setSearch] = useState("");
    const [modal, setModal] = useState<boolean>(false);
    const thead = ["Id", "Nome da Escola", "Endereço da Escola", "Cep", "Telefone", "Email", "Ações"];
    const dispatch = useDispatch<AppDispatch>();
    const inputs: InputConfig[] = [
        {
            htmlFor: "name",
            label: "Nome da Escola",
            name: "name",
            placeholder: "Escola Municipal Mario Fiorante",
            type: "text",
            input: "input",
        },
        {
            htmlFor: "adress",
            label: "Endereço da Escola",
            name: "adress",
            placeholder: "Endereço",
            type: "text",
            input: "input",
        },

        {
            htmlFor: "zip",
            label: "Cep",
            name: "zip",
            placeholder: "00000-000",
            type: "text",
            input: "input",
        },

        {
            htmlFor: "fone",
            label: "Telefone",
            name: "fone",
            placeholder: "(00)0000-0000",
            type: "text",
            input: "input",
        },

        {
            htmlFor: "email",
            label: "Email",
            name: "email",
            placeholder: "Email",
            type: "text",
            input: "input",
        },
    ]

    useEffect(() => {
        (async () => {
            dispatch(refreshInfosSchool(await readAllSchool()));
            dispatch(changeRegisterType("School"));
        })()
    }, [])


    return(
        <RootLayout showHeaderAside>
            <main className='w-full sm:w-5/6 h-max ml-auto'>
                <div className="w-full flex flex-col gap-4 px-6 py-3">
                    <h1 className="text-3xl md:text-[42px]">Cadastro de Escolas</h1>

                    {allInfosSchool != undefined ? (
                        <CreateHeaderRegisters setModal={setModal} setSearch={setSearch} totalRegiter={allInfosSchool.length} key={"create-header-school"} />
                    ) : null}

                    <div className="w-full h-auto flex items-center justify-end">
                        <div className="inline-block h-5 w-5 cursor-pointer hover:animate-spin rounded-full border-4 border-solid border-current border-b-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                            role="status"
                            onClick={() => handleLoadingClick()}
                        >
                        </div>
                    </div>

                    <TableRegisters tableHead={thead} infosAll={allInfosSchool} editInfo={editInfo} deleteInfo={deleteInfo} search={search} key={"Table-Escola"} />
                </div>
                {modal ? (
                    <Modal 
                    infosInput={infosInput} 
                    setInfosInput={setInfosInput} 
                    setModal={setModal} 
                    submitInfos={submitSchool} 
                    title="Cadastro de Escolas"
                    createFormSchema={createFormSchema}
                    inputs={inputs}
                    modalName="School"
                    key={"modal-cadastro-escola"}
                />
                ) : null}

                <ToastContainer />
            </main>
        </RootLayout>
    )

    async function submitSchool(data: SubmitDataModal){
        if("name" in data && "adress" in data && "zip" in data && "fone" in data && "email" in data){
            const { ...rest } = data;
            const { id } = infosInput;
            const aux: SchoolInfos = { 
                id,
                edit: false,
                ...rest,
            }

            let message: any | string;
    
            if(!infosInput.edit){
                message = await createSchool(aux);
            }
            else{
                message = await editSchool(aux, aux.id);
                setModal(false);
            }
            
            dispatch(refreshInfosSchool(await readAllSchool()));
            setInfosInput(SchoolValuesDefault);
            messageToast(message);
        }
	}

    async function editInfo(info: InfosTableRegisterData) {
        if("name" in info && "adress" in info && "zip" in info && "fone" in info && "email" in info){
            const { ...rest } = info;
            const aux = { 
                ...rest, 
                edit: true, 
            }
            setInfosInput(aux);
            setModal(true);
        }
    }

    async function deleteInfo(info: InfosTableRegisterData) {
        if("name" in info && "adress" in info && "zip" in info && "fone" in info && "email" in info){
            if(window.confirm(`Quer mesmo deletar a escola ${info.name}?`)){
                const message: any | string = await deleteSchool(info.id);
                messageToast(message);
                dispatch(refreshInfosSchool(await readAllSchool()));
            }
        }
    }

    async function handleLoadingClick() {
        try {
          const data = await readAllSchool();
          dispatch(refreshInfosSchool(data));
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
