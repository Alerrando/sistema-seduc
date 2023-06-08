'use client';
import Table from '@/Components/Table';
import { createSchool, deleteSchool, editSchool, readAllSchool } from '@/api';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SchoolInfos, SchoolValuesDefault, changeRegisterType, refreshInfosSchool } from '../../../slice';
import { RootState } from '../../../system';
import CreateHeader from '@/Components/CreateHeader';
import Modal from '@/Components/Modal';

export default function CadastroEscola(){
    const allInfosSchool = useSelector(({ Slice }: RootState) => Slice.allInfosSchool);
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
        </main>
    )

    async function submitSchool(event){
        const aux: SchoolInfos = {
            diretor: event.diretor,
            edit: -1,
            name: event.name,
            id: infosInput.id,
        }
		if(infosInput.edit === -1){
			await createSchool(aux);
			dispatch(refreshInfosSchool(await readAllSchool()));
		}
		else{
			await editSchool(aux, aux.id);
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
        await deleteSchool(info.id);
        dispatch(refreshInfosSchool(await readAllSchool()));
    }
}