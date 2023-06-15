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
        <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                    <tr>
                        {tableHead.map(head => <th key={head} scope="col" className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">{head}</th>)}
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                {infosAll != undefined && infosAll.map((info: LessonsInfos | SchoolInfos | TeacherInfos, index: Key) => {

                        return (
                        <tr key={`${info.id}-${index}`}>
                            {registerType === "Lesson" ? (
                                <>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index + 1}</td>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{getNameTeacher(info.cadastroProfessor)}</td>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.horaAulas}</td>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.titularidade}</td>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{getNameSchool(info.cadastroEscola)}</td>
                                    <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                                        <span className='whitespace-nowrap'>{isValid(new Date(info.diaAula)) ? format(new Date(info.diaAula?.toString()), "dd/MM/yyyy") : ""}</span>
                                    </td>
                                </>
                            ) : registerType === "School" ? (
                                <>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index + 1}</td>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.name}</td>
                                </>
                            ) : (
                                <>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index + 1}</td>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.name}</td>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.cpf}</td>
                                </>
                            )}
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
