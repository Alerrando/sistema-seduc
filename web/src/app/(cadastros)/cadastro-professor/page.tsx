'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppDispatch, RootState } from '../../../../configureStore';
import { InputConfig, TeacherInfos, TeacherValuesDefault, changeRegisterType, objectEmptyValue, refreshInfosTeacher } from '../../../../slice';
import CreateHeaderRegisters from '../../../Components/CreateHeaderRegisters';
import Modal, { SubmitDataModal } from '../../../Components/Modal';
import TableRegisters, { InfosTableRegisterData } from '../../../Components/TableRegisters';
import { createTeacher, deleteTeacher, editTeacher, readAllTeacher } from '../../../api';
import RootLayout from '../../../app/layout';
import { z } from 'zod';

function isValidCPF(cpf: string): boolean {
    const cleanedCPF = cpf.replace(/\D/g, '');
  
    if (cleanedCPF.length !== 11) {
      return false;
    }
  
    if (/^(\d)\1{10}$/.test(cleanedCPF)) {
      return false;
    }
  
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanedCPF.charAt(i)) * (10 - i);
    }
    let mod = sum % 11;
    const digit1 = mod < 2 ? 0 : 11 - mod;
  
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanedCPF.charAt(i)) * (11 - i);
    }
    mod = sum % 11;
    const digit2 = mod < 2 ? 0 : 11 - mod;
  
    return (
      cleanedCPF.charAt(9) === digit1.toString() &&
      cleanedCPF.charAt(10) === digit2.toString()
    );
}

const createFormSchema = z.object({
    name: z.string().nonempty("Nome é obrigatório!"),
    cpf: z.string().max(15).refine((value) => isValidCPF(value), {
      message: 'CPF inválido',
    }),
    sede: z.string().nonempty("Selecione qual a sede"),
    cargo: z.string().nonempty("Selecione qual o cargo"),
})

export type CreateFormDataTeacher = z.infer<typeof createFormSchema>

export default function CadastroProfessor(){
    const { allInfosTeacher, registerType } = useSelector((root: RootState) => root.Slice);
    const [infosInput, setInfosInput] = useState<TeacherInfos>(TeacherValuesDefault);
    const [search, setSearch] = useState("");
    const [modal, setModal] = useState<boolean>(false);
    const thead = ["Id", "Nome do Professor(a)", "Cpf", "Sede", "Cargo", "Ações"];
    const dispatch = useDispatch<AppDispatch>();
    const inputs: InputConfig[] = [
        {
            htmlFor: "name",
            label: "Nome do Professor",
            name: "name",
            placeholder: "Ana Laura",
            type: "text",
            input: "input",
        },

        {
            htmlFor: "cpf",
            label: "Cpf do Professor",
            name: "cpf",
            placeholder: "000.000.000-00",
            type: "text",
            input: "input",
        },

        {
            type: "text",
            htmlFor: "sede",
            label: "Sede",
            name: "sede",
            optionDefault: "Selecione uma Sede",
            optionType: "School",
            input: "select",
        },
    ]

    useEffect(() => {
        (async () => {
            dispatch(refreshInfosTeacher(await readAllTeacher()));
            dispatch(changeRegisterType("Teacher"));
        })()
    }, [])


    return(
        <RootLayout showHeaderAside>
            <main className='w-full sm:w-5/6 h-max ml-auto'>
                <div className="w-full flex flex-col gap-4 px-6 py-3">
                    <h1 className="text-3xl md:text-[42px]">Cadastro de Professor</h1>

                    {allInfosTeacher != undefined ? (
                        <CreateHeaderRegisters setModal={setModal} setSearch={setSearch} totalRegiter={allInfosTeacher.length} key={"create-header-school"} />
                    ) : null}

                    <div className="w-full h-auto flex items-center justify-end">
                        <div className="inline-block h-5 w-5 cursor-pointer hover:animate-spin rounded-full border-4 border-solid border-current border-b-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                            role="status"
                            onClick={() => handleLoadingClick()}
                        >
                        </div>
                    </div>

                    <TableRegisters tableHead={thead} infosAll={allInfosTeacher} editInfo={editInfo} deleteInfo={deleteInfo} search={search} key={"Table-Escola"} />
                </div>
                {modal ? (
                    <Modal 
                        infosInput={infosInput} 
                        setInfosInput={setInfosInput} 
                        setModal={setModal} 
                        submitInfos={submitTeacher}
                        title="Cadastro de Professor"
                        inputs={inputs}
                        createFormSchema={createFormSchema}
                        modalName="Teacher"
                        key={"modal-cadastro-professor"}
                    />
                ) : null}

                <ToastContainer />
            </main>
        </RootLayout>
    )

    async function submitTeacher(data: SubmitDataModal){
        if("sede" in data && "cpf" in data && "cargo" in data && "name" in data){
            const { ...rest } = data;
            const aux: TeacherInfos = { ...rest, edit: false, id: infosInput.id, cpf: data.cpf.replaceAll(".", "").replaceAll("-", "") };
            let message: any | string;
            if(!infosInput.edit){
                if(!objectEmptyValue(aux)){
                    message = await createTeacher(aux, aux.sede);
                }
            }
            else{
                message = await editTeacher(aux, aux.sede);
                setModal(false);
            }
            
            dispatch(refreshInfosTeacher(await readAllTeacher()));
            messageToast(message);
            setInfosInput(TeacherValuesDefault);
        }
	}

    async function editInfo(info: InfosTableRegisterData) {
        if("sede" in info && "cpf" in info && "cargo" in info && "name" in info){
            const { ...rest } = info;
            const aux = { ...rest, edit : true, }
            setInfosInput(aux);
            setModal(true);
        }
    }

    async function deleteInfo(info: InfosTableRegisterData) {
        if("sede" in info && "cpf" in info && "cargo" in info && "name" in info){
            const message: any | string = await deleteTeacher(info.id);
            messageToast(message);
            dispatch(refreshInfosTeacher(await readAllTeacher()));
        }
    }

    async function handleLoadingClick() {
        try {
          const data = await readAllTeacher();
          dispatch(refreshInfosTeacher(data));
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
