'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppDispatch, RootState } from '../../../../configureStore';
import { InputConfig, SchoolValuesDefault, TeacherInfos, changeRegisterType, objectEmptyValue, refreshInfosTeacher } from '../../../../slice';
import CreateHeaderRegisters from '../../../Components/CreateHeaderRegisters';
import Modal from '../../../Components/Modal';
import { CreateFormDataTeacher } from '../../../Components/Modal/FormRegisterTeacher';
import TableRegisters from '../../../Components/TableRegisters';
import { createTeacher, deleteTeacher, editTeacher, readAllTeacher } from '../../../api';
import RootLayout from '../../../app/layout';
import { z } from 'zod';

const createFormSchema = z.object({
    name: z.string().nonempty("Nome é obrigatório!"),
    cpf: z.string().max(15).refine((value) => isValidCPF(value), {
      message: 'CPF inválido',
    }),
    sede: z.string().nonempty("Selecione qual a sede"),
    cargo: z.string().nonempty("Selecione qual o cargo"),
})

export default function CadastroProfessor(){
    const { allInfosTeacher, registerType } = useSelector((root: RootState) => root.Slice);
    const [infosInput, setInfosInput] = useState<TeacherInfos>(SchoolValuesDefault);
    const [search, setSearch] = useState("");
    const [modal, setModal] = useState<boolean>(false);
    const thead = ["Nome do Professor(a)", "Cpf", "Sede", "Cargo", "Ações"];
    const dispatch = useDispatch<AppDispatch>();
    const inputs: InputConfig[] = [
        {
            htmlFor: "name",
            label: "Nome do Professor",
            name: "name",
            placeholder: "Ana Laura",
            type: "text",
            input: "input",
            key: "horaAulas-input",
        },

        {
            htmlFor: "cpf",
            label: "Cpf do Professor",
            name: "cpf",
            placeholder: "000.000.000-00",
            type: "text",
            input: "input",
            key: "cpf-input",
        },

        {
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

    async function submitTeacher(event: CreateFormDataTeacher){
        const aux: TeacherInfos = event;
        aux.edit = false;
        aux.id = infosInput.id;
        aux.cpf = event.cpf.replaceAll(".", "").replaceAll("-", "");

		if(!infosInput.edit){
            if(!objectEmptyValue(aux)){
                const message: object | string = await createTeacher(aux, aux.sede);
                messageToast(message);
                dispatch(refreshInfosTeacher(await readAllTeacher()));
            }
		}
		else{
			const message: object | string = await editTeacher(aux, aux.sede);
            messageToast(message);
			dispatch(refreshInfosTeacher(await readAllTeacher()));
            setModal(false);
		}
        
        setInfosInput(SchoolValuesDefault);
	}

    async function editInfo(info: TeacherInfos) {
        setInfosInput(info);
        setModal(true);
    }

    async function deleteInfo(info: TeacherInfos) {
        const message:object | string = await deleteTeacher(info.id);
        messageToast(message);
        dispatch(refreshInfosTeacher(await readAllTeacher()));
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
