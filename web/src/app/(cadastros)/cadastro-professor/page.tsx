'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SchoolValuesDefault, TeacherInfos, changeRegisterType, objectEmptyValue, refreshInfosTeacher } from '../../../../slice';
import { RootState } from '../../../../system';
import CreateHeaderRegisters from '../../../Components/CreateHeaderRegisters';
import Modal from '../../../Components/Modal';
import TableRegisters from '../../../Components/TableRegisters';
import { createTeacher, deleteTeacher, editTeacher, readAllTeacher } from '../../../api';
import RootLayout from '../../../app/layout';

export default function CadastroProfessor(){
    const { allInfosTeacher, registerType } = useSelector((root: RootState) => root.Slice);
    const [infosInput, setInfosInput] = useState<TeacherInfos>(SchoolValuesDefault);
    const [search, setSearch] = useState("");
    const [modal, setModal] = useState<boolean>(false);
    const thead = ["Nome do Professor(a)", "Cpf", "Sede", "Cargo", "Ações"];
    const dispatch = useDispatch();

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
                        key={"modal-cadastro-escola"}
                    />
                ) : null}

                <ToastContainer />
            </main>
        </RootLayout>
    )

    async function submitTeacher(event){
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