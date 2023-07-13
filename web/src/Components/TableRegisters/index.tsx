import { format, isValid, parseISO } from "date-fns";
import { Pencil, Trash } from "lucide-react";
import React, { Key, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshInfosSchool, refreshInfosTeacher, LessonsInfos, SchoolInfos, TeacherInfos } from "../../../slice";
import { readAllSchool, readAllTeacher } from "../../api";
import { AppDispatch, RootState } from "../../../configureStore";

type TableRegistersProps = {
    tableHead: string[],
    editInfo: (info: LessonsInfos | SchoolInfos | TeacherInfos) => void,
    deleteInfo: (info: LessonsInfos | SchoolInfos | TeacherInfos) => void,
    infosAll: LessonsInfos[] | SchoolInfos[] | TeacherInfos[],
    search: string,
}

export default function TableRegisters(props: TableRegistersProps) {
    const { tableHead, editInfo, deleteInfo, infosAll, search } = props;
    const { registerType, allInfosSchool, allInfosTeacher } = useSelector((root: RootState) => root.Slice);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        (async () => {
            dispatch(refreshInfosSchool(await readAllSchool()));
            dispatch(refreshInfosTeacher(await readAllTeacher()));
        })()
    }, [])

    return (
        <div className="overflow-x-auto border border-gray-200">
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
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{allInfosTeacher?.find((teacher) => teacher.id == info.cadastroProfessor)?.name}</td>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.horaAulas}</td>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{allInfosSchool?.find((school) => school.id == info.cadastroEscola)?.name}</td>
                                    <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                                        <span className='whitespace-nowrap'>{isValid(new Date(info.diaAula)) ? format(new Date(info.diaAula), "dd/MM/yyyy") : ""}</span>
                                    </td>
                                </>
                            ) : registerType === "School" ? (
                                <>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index + 1}</td>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.name}</td>
                                </>
                            ) : registerType === "Teacher" ? (
                                <>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index + 1}</td>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.name}</td>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.cpf}</td>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{allInfosSchool?.find((school) => school.id == info.sede)?.name}</td>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.cargo}</td>
                                </>
                            ) : (
                                <>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index + 1}</td>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.name}</td>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.type == "1" ? "Usuário" : "Professor"}</td>
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
}
