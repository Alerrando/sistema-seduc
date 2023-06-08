import { format, isValid, parseISO } from "date-fns";
import { Pencil, Trash } from "lucide-react";
import React, { Key } from "react";
import { LessonsInfos, SchoolInfos } from "@/slice";
import { useSelector } from "react-redux";
import { RootState } from "../../../system";
import { getIdSchool } from "@/api";

type TableProps = {
    tableHead: string[],
    editInfo: (info: LessonsInfos | SchoolInfos) => void,
    deleteInfo: (info: LessonsInfos | SchoolInfos) => void,
    infosAll: LessonsInfos[] | SchoolInfos[],
    search: string,
}

export default function Table(props: TableProps) {
    const { tableHead, editInfo, deleteInfo, infosAll, search } = props;
    const { registerType, allInfosSchool } = useSelector((root: RootState) => root.Slice);


    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr>
                        {tableHead.map(head => <th key={head} scope="col" className="p-1 text-start whitespace-nowrap border border-[#999]">{head}</th>)}
                    </tr>
                </thead>

                <tbody>
                {infosAll != undefined && infosAll.filter((register) => Object.values(register.name).join("").toLowerCase().includes(search.toLowerCase()))
                    .map((info: LessonsInfos | SchoolInfos, index: Key) => {

                        return (
                        <tr key={`${info.id}-${index}`}>
                            {registerType === "Lesson" ? (
                                <>
                                    <td className="p-1 text-start whitespace-nowrap border border-[#999]">{info.id}</td>
                                    <td className="p-1 text-start whitespace-nowrap border border-[#999]">{info.name}</td>
                                    <td className="p-1 text-start whitespace-nowrap border border-[#999]">{info.horaAulas}</td>
                                    <td className="p-1 text-start whitespace-nowrap border border-[#999]">{info.titularidade}</td>
                                    <td className="p-1 text-start whitespace-nowrap border border-[#999]">{getNameSchool(info.cadastroEscola)}</td>
                                    <td className='p-1 text-start whitespace-nowrap border border-[#999]'>
                                        <span className='whitespace-nowrap'>{format(new Date(info.diaAula.toString()), "dd/MM/yyyy")}</span>
                                    </td>
                                </>
                            ) : registerType === "School" ? (
                                <>
                                    <td className="p-1 text-start whitespace-nowrap border border-[#999]">{info.id}</td>
                                    <td className="p-1 text-start whitespace-nowrap border border-[#999]">{info.name}</td>
                                    <td className="p-1 text-start whitespace-nowrap border border-[#999]">{info.diretor}</td>
                                </>
                            ) : null}
                            <td className="p-1 text-start border-x border-y border-[#999]">
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
    )

    function getNameSchool(id: string){
        let aux = "";
        allInfosSchool.forEach((school: SchoolInfos) => {
            if(school.id == id){
                aux = school.name;
            }
        })

        return aux;
    }
}
