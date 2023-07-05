"use client";
import React, { useEffect, useState } from "react";
import { UserInfos } from "../../../../../slice/LoginSlide";
import { getUsers } from "../../../../api";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../system";
import { Pencil, Trash } from "lucide-react";

export default function UsersList(){
    const [usersAll, setUsersAll] = useState<UserInfos[]>([] as UserInfos);
    const { allInfosSchool } = useSelector((root: RootState) => root.Slice);
    const tableHead = ["Id", "Nome", "Email", "Rg", "Escola", "Permissão", "Ações"];

    useEffect(() => {
        (async () => {
            setUsersAll(await getUsers());
        })()
    }, [])

    return (
        <>
            <header className="w-full h-auto border-b border-b-[#efefef] p-3">
                <h1 className="text-3xl">Lista de Usuários</h1>
            </header>

            <section className="h-full w-full flex flex-col items-start justify-between p-12">
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
                                        <td className="">
                                            <div className="flex flex-row gap-4 items-center justify-between">
                                                <div className="flex items-center gap-2 px-2 py-1 border border-blue-500 text-blue-500 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white transition-colors" onClick={() => editInfo(info)}>
                                                    <Pencil size={18} />
                                                    <span>Edit</span>
                                                </div>

                                                <div className="flex items-center gap-2 px-2 py-1 border border-red-500 text-red-500 rounded-lg cursor-pointer hover:bg-red-500 hover:text-white transition-colors" onClick={() => deleteInfo(info)}>
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
        </>
    );

    function schoolName(cadastroEscola){
        let aux = allInfosSchool?.find((school) => school.id == cadastroEscola)?.name;

        return aux === undefined ? "Não Atribuido" : aux;
    }
}