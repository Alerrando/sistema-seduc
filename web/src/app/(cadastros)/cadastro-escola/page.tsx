'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SchoolInfos, SchoolValuesDefault, changeRegisterType, objectEmptyValue, refreshInfosSchool } from '../../../../slice';
import { RootState } from '../../../../system';
import CreateHeaderRegisters from '../../../Components/CreateHeaderRegisters';
import Modal from '../../../Components/Modal';
import TableRegisters from '../../../Components/TableRegisters';
import { createSchool, deleteSchool, editSchool, readAllSchool } from '../../../api';
import RootLayout from '../../../app/layout';

export default function CadastroEscola(){
    const { allInfosSchool, registerType } = useSelector((root: RootState) => root.Slice);
    const [infosInput, setInfosInput] = useState<SchoolInfos>(SchoolValuesDefault);
    const [search, setSearch] = useState("");
    const [modal, setModal] = useState<boolean>(false);
    const thead = ["Nome da Escola", "Ações"];
    const dispatch = useDispatch();

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

                    <TableRegisters tableHead={thead} infosAll={allInfosSchool} editInfo={editInfo} deleteInfo={deleteInfo} search={search} key={"Table-Escola"} />

                </div>
                {modal ? (
                    <Modal 
                    infosInput={infosInput} 
                    setInfosInput={setInfosInput} 
                    setModal={setModal} 
                    submitInfos={submitSchool} 
                    title="Cadastro de Escolas"
                    key={"modal-cadastro-escola"} />
                ) : null}

                <ToastContainer />
            </main>
        </RootLayout>
    )

    async function submitSchool(event){
        let message: object | string;

        const aux: SchoolInfos = {
            edit: false,
            name: `${event.classificação} ${event.name}`,
            id: infosInput.id,
        }

		if(!infosInput.edit){
            if(!objectEmptyValue(aux)){
                message = await createSchool(aux);
                dispatch(refreshInfosSchool(await readAllSchool()));
            }
		}
		else{
            message = await editSchool(aux, aux.id);
			dispatch(refreshInfosSchool(await readAllSchool()));
            setModal(false);
		}
        
        setInfosInput(SchoolValuesDefault);
        messageToast(message);
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