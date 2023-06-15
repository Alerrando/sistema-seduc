import { format, isValid, parseISO } from "date-fns";
import { Pencil, Trash } from "lucide-react";
import React, { Key, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../system";
import { refreshInfosSchool, refreshInfosTeacher, LessonsInfos, SchoolInfos, TeacherInfos } from "../../../slice";
import { readAllSchool, readAllTeacher } from "@/api";

type TableProps = {
    tableHead: string[],
    editInfo: (info: LessonsInfos | SchoolInfos | TeacherInfos) => void,
    deleteInfo: (info: LessonsInfos | SchoolInfos | TeacherInfos) => void,
    infosAll: LessonsInfos[] | SchoolInfos[] | TeacherInfos[],
    search: string,
}

export default function Table(props: TableProps) {
    const { tableHead, editInfo, deleteInfo, infosAll, search } = props;
    const { registerType, allInfosSchool, allInfosTeacher } = useSelector((root: RootState) => root.Slice);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            dispatch(refreshInfosSchool(await readAllSchool()));
            dispatch(refreshInfosTeacher(await readAllTeacher()));
        })()
    }, [])

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr>
                        {tableHead.map(head => <th key={head} scope="col" className="px-2 py-1 text-start whitespace-nowrap border border-[#999]">{head}</th>)}
                    </tr>
                </thead>

                <tbody>
                {infosAll != undefined && infosAll.map((info: LessonsInfos | SchoolInfos | TeacherInfos, index: Key) => {

                        return (
                        <tr key={`${info.id}-${index}`}>
                            {registerType === "Lesson" ? (
                                <>
                                    <td className="p-1 text-start whitespace-nowrap border border-[#999]">{info.id}</td>
                                    <td className="p-1 text-start whitespace-nowrap border border-[#999]">{getNameTeacher(info.cadastroProfessor)}</td>
                                    <td className="p-1 text-start whitespace-nowrap border border-[#999]">{info.horaAulas}</td>
                                    <td className="p-1 text-start whitespace-nowrap border border-[#999]">{info.titularidade}</td>
                                    <td className="p-1 text-start whitespace-nowrap border border-[#999]">{getNameSchool(info.cadastroEscola)}</td>
                                    <td className='p-1 text-start whitespace-nowrap border border-[#999]'>
                                        <span className='whitespace-nowrap'>{format(new Date(info.diaAula?.toString()), "dd/MM/yyyy")}</span>
                                    </td>
                                </>
                            ) : registerType === "School" ? (
                                <>
                                    <td className="p-1 text-start whitespace-nowrap border border-[#999]">{info.id}</td>
                                    <td className="p-1 text-start whitespace-nowrap border border-[#999]">{info.name}</td>
                                    <td className="p-1 text-start whitespace-nowrap border border-[#999]">{info.diretor}</td>
                                </>
                            ) : (
                                <>
                                    <td className="p-1 text-start whitespace-nowrap border border-[#999]">{info.id}</td>
                                    <td className="p-1 text-start whitespace-nowrap border border-[#999]">{info.name}</td>
                                </>
                            )}
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
        let aux = ""
        allInfosSchool.forEach((school: SchoolInfos) => {
            if(school.id == id){
                aux = school.name;
            }
        })

        return aux;
    }

    function getNameTeacher(id: string){
        let aux = "";
        allInfosTeacher.forEach((teacher: TeacherInfos) => {
            if(teacher.id == id){
                aux = teacher.name;
            }
        })

        return aux;
    }
}
