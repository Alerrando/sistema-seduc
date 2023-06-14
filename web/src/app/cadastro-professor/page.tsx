'use client';
import Table from '@/Components/Table';
import { createTeacher, deleteTeacdeleteTeacher, deleteTeacher, editTeacher, readAllTeacher } from '@/api';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TeacherInfos, SchoolValuesDefault, changeRegisterType, objectEmptyValue, refreshInfosTeacher } from '../../../slice';
import { RootState } from '../../../system';
import CreateHeader from '@/Components/CreateHeader';
import Modal from '@/Components/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CadastroProfessor(){
    const { allInfosTeacher, registerType } = useSelector((root: RootState) => root.Slice);
    const [infosInput, setInfosInput] = useState<TeacherInfos>(SchoolValuesDefault);
    const [search, setSearch] = useState("");
    const [modal, setModal] = useState<boolean>(false);
    const thead = ["Id", "Nome do Professor(a)", "Ações"];
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            dispatch(refreshInfosTeacher(await readAllTeacher()));
            dispatch(changeRegisterType("Teacher"));
        })()
    }, [])


    return(
        <main className='w-5/6 ml-auto px-6 overflow-y-auto'>
            <div className="w-full flex flex-col gap-4 px-6 py-3">
                <h1 className="text-[42px]">Cadastro de Professor</h1>

                {allInfosTeacher != undefined ? (
                    <CreateHeader setModal={setModal} setSearch={setSearch} totalRegiter={allInfosTeacher.length} key={"create-header-school"} />
                ) : null}

                <Table tableHead={thead} infosAll={allInfosTeacher} editInfo={editInfo} deleteInfo={deleteInfo} search={search} key={"Table-Escola"} />

            </div>
            {modal ? (
                <Modal infosInput={infosInput} setInfosInput={setInfosInput} setModal={setModal} submitInfos={submitTeacher} key={"modal-cadastro-escola"} />
            ) : null}

            <ToastContainer />
        </main>
    )

    async function submitTeacher(event){
        const aux: TeacherInfos = {
            edit: -1,
            name: event.name,
            id: infosInput.id,
        }
		if(infosInput.edit === -1){
            if(!objectEmptyValue(aux)){
                const message: object | string = await createTeacher(aux);
                messageToast(message);
                dispatch(refreshInfosTeacher(await readAllTeacher()));
            }
		}
		else{
			const message: object | string = await editTeacher(aux, aux.id);
            messageToast(message);
			dispatch(refreshInfosTeacher(await readAllTeacher()));
			setInfosInput(SchoolValuesDefault);
		}

		setModal(false);
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
