'use client';
import React, { useEffect, useState } from 'react';
import CreateHeader from '@/Components/CreateHeader';
import Modal from '@/Components/Modal';
import Table from '@/Components/Table';
import { createSchool, deleteSchool, editSchool, readAllSchool } from '@/api';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SchoolInfos, SchoolValuesDefault, changeRegisterType, objectEmptyValue, refreshInfosSchool } from '../../../slice';
import { RootState } from '../../../system';

export default function CadastroEscola(){
    const { allInfosSchool, registerType } = useSelector((root: RootState) => root.Slice);
    const [infosInput, setInfosInput] = useState<SchoolInfos>(SchoolValuesDefault);
    const [search, setSearch] = useState("");
    const [modal, setModal] = useState<boolean>(false);
    const thead = ["Id", "Nome da Escola", "Diretor", "Ações"];
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            dispatch(refreshInfosSchool(await readAllSchool()));
            dispatch(changeRegisterType("School"));
        })()
    }, [])


    return(
        <main className='w-5/6 ml-auto px-6 overflow-y-auto'>
            <div className="w-full flex flex-col gap-4 px-6 py-3">
                <h1 className="text-[42px]">Cadastro de Escolas</h1>

                {allInfosSchool != undefined ? (
                    <CreateHeader setModal={setModal} setSearch={setSearch} totalRegiter={allInfosSchool.length} key={"create-header-school"} />
                ) : null}

                <Table tableHead={thead} infosAll={allInfosSchool} editInfo={editInfo} deleteInfo={deleteInfo} search={search} key={"Table-Escola"} />

            </div>
            {modal ? (
                <Modal infosInput={infosInput} setInfosInput={setInfosInput} setModal={setModal} submitInfos={submitSchool} key={"modal-cadastro-escola"} />
            ) : null}

            <ToastContainer />
        </main>
    )

    async function submitSchool(event){
        const aux: SchoolInfos = {
            diretor: event.diretor,
            edit: -1,
            name: `${event.classificação} ${event.name}`,
            id: infosInput.id,
        }
		if(infosInput.edit === -1){
            if(!objectEmptyValue(aux)){
                const message: object | string = await createSchool(aux);
                messageToast(message);
                dispatch(refreshInfosSchool(await readAllSchool()));
            }
		}
		else{
			const message: object | string = await editSchool(aux, aux.id);
            messageToast(message);
			dispatch(refreshInfosSchool(await readAllSchool()));
			setInfosInput(SchoolValuesDefault);
		}

		setModal(false);
	}

    async function editInfo(info: SchoolInfos) {
        setInfosInput(info);
        setModal(true);
    }

    async function deleteInfo(info: SchoolInfos) {
        const message:object | string = await deleteSchool(info.id);
        messageToast(message);
        dispatch(refreshInfosSchool(await readAllSchool()));
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
