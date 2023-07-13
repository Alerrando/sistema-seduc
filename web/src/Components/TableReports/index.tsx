import { format, isValid, parseISO } from "date-fns";
import { Pencil, Trash } from "lucide-react";
import React, { Key, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SchoolDTOInfos, TeacherDTOInfos } from "../../../slice";
import { AppDispatch, RootState } from "../../../configureStore";

type TableReportsProps = {
    tableHead: string[],
}

export default function TableReports(props: TableReportsProps) {
    const { tableHead } = props;
    const { reportsTypes, allInfosSchool } = useSelector((root: RootState) => root.Slice);
    const { allFilterInfosTeacher } = useSelector((root: RootState) => root.SliceTeacher);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className="max-h-[77%] overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                    <tr>
                        {tableHead.map(head => <th key={head} scope="col" className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">{head}</th>)}
                    </tr>
                </thead>


                <tbody className="divide-y divide-gray-200">
                    {allFilterInfosTeacher != undefined && allFilterInfosTeacher.map((info: SchoolDTOInfos | TeacherDTOInfos, index: number) => {

                        return (
                            <tr key={`${info.id}-${index}`}>
                                {reportsTypes == "School" ? (
                                    <>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index + 1}</td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.name}</td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.quantidadeAulas}</td>
                                    </>
                                ) : (
                                    <>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.name}</td>
                                        <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                                            <span className='whitespace-nowrap'>{isValid(new Date(info.dataAula)) ? format(new Date(info.dataAula?.toString()), "dd/MM/yyyy") : ""}</span>
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                            {allInfosSchool?.find((school) => school.id == info.cadastroEscola)?.name}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.horaAulas}</td>
                                    </>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
