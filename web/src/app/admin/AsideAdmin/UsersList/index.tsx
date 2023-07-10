"use client";
import { Eye, EyeOff, Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from "../../../../../configureStore";
import { UserInfos } from "../../../../../slice/LoginSlide";
import { deleteUser, getUsers } from "../../../../api";
import FormEditionUsers from "../../../../Components/Modal/FormEditionUsers";
import { InputConfig } from "../../../../../slice";

export default function UsersList(){
    const [usersAll, setUsersAll] = useState<UserInfos[]>([] as UserInfos);
    const [modal, setModal] = useState<boolean>(false);
    const [infosEdit, setInfosEdit] = useState<UserInfos>({} as UserInfos);
    const [viewPassword, setViewPassword] = useState<boolean>(false);
    const { allInfosSchool } = useSelector((root: RootState) => root.Slice);
    const { userInfos } = useSelector((root: RootState) => root.SliceLogin);
    const tableHead = ["Id", "Nome", "Email", "Rg", "Escola", "Permissão", "Senha","Ações"];

    useEffect(() => {
        (async () => {
            setUsersAll(await getUsers());
        })()
    }, [])

    return (
        <>
            <header className="w-full h-auto flex items-center justify-between border-b border-b-[#efefef] p-3">
                <h1 className="text-3xl">Lista de Usuários</h1>

                <div className="w-auto h-auto flex items-center justify-center">
                    <div className="inline-block h-5 w-5 cursor-pointer hover:animate-spin rounded-full border-4 border-solid border-current border-b-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status"
                        onClick={() => handleLoadingClick()}
                    >
                    </div>
                </div>
            </header>

            <section className="h-full w-full flex flex-col items-end gap-2 py-4 px-12">
                <div className="flex flex-row items px-4 py-2 bg-principal text-white rounded-lg">
                    <span className="hidden sm:block">Total de registros: {usersAll?.length}</span>
                    <span className="sm:hidden block">Total: {usersAll?.length}</span>
                </div>

                <div className="w-full h-[1px] border border-b border-[#cfcfcf]"></div>

                <div className="w-full overflow-x-auto border border-gray-200">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="ltr:text-left rtl:text-right">
                            <tr>
                                {tableHead.map(head => <th key={head} scope="col" className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">{head}</th>)}
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {usersAll != undefined && usersAll.map((info: UserInfos, index: Key) => {
                                    return (
                                    <tr key={`${info.id}-${index}`}>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index + 1}</td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.name}</td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.email}</td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.rg}</td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{schoolName(info.cadastroEscola)}</td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.permission ? "Autorizado" : "Não Autorizado"}</td>
                                        <td className="flex flex-row items-center gap-2 whitespace-nowrap px-4 py-2 font-medium text-gray-900">{!viewPassword ? (
                                            <EyeOff size={26} className="cursor-pointer" onClick={() => setViewPassword(true)} />
                                        ) : (
                                            <>
                                                {info.password}
                                                <Eye size={26} className="cursor-pointer" onClick={() => setViewPassword(false)} />
                                            </>
                                        )}</td>
                                        <td className="">
                                            <div className="flex flex-row gap-4 items-center justify-between">
                                                <div className="flex items-center gap-2 px-2 py-1 border border-blue-500 text-blue-500 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white transition-colors" onClick={() => editInfo(info)}>
                                                    <Pencil size={18} />
                                                    <span>Edit</span>
                                                </div>

                                                <div className="flex items-center gap-2 px-2 py-1 border border-red-500 text-red-500 rounded-lg cursor-pointer hover:bg-red-500 hover:text-white transition-colors" onClick={() => deleteUserAside(info.id, info.name)}>
                                                    <Trash size={18} />
                                                    <span>Delete</span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>

            <ToastContainer />

            {modal ? (
                <FormEditionUsers infos={infosEdit} setModal={setModal} setUsersAll={setUsersAll} />
            ) : null}
        </>
    );

    function editInfo(info: UserInfos){
        setInfosEdit(info);
        setModal(true);
    }
    
    async function deleteUserAside(id:number, name: string){
        if(window.confirm(`Quer mesmo deletar o usuário ${name}?`)){
            const message = await deleteUser(id);
            setUsersAll(await getUsers());
        }
    }

    async function handleLoadingClick() {
        try {
          const data = await getUsers();
          setUsersAll(data);
        } catch (error) {
          console.error('Erro ao atualizar os dados:', error);
        }
    }

    function schoolName(cadastroEscola){
        let aux = allInfosSchool?.find((school) => school.id == cadastroEscola)?.name;

        return aux === undefined ? "Não Atribuido" : aux;
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