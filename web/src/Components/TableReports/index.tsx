import { format, isValid, parseISO } from "date-fns";
import { Pencil, Trash } from "lucide-react";
import React, { Key, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../system";
import { SchoolDTOInfos, TeacherDTOInfos } from "../../../slice";

type TableReportsProps = {
    tableHead: string[],
    infosAll: SchoolDTOInfos[] | TeacherDTOInfos[],
    search: string,
}

export default function TableReports(props: TableReportsProps) {
    const { tableHead, infosAll, search } = props;
    const { reportsTypes } = useSelector((root: RootState) => root.Slice);


    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                    <tr>
                        {tableHead.map(head => <th key={head} scope="col" className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">{head}</th>)}
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                {infosAll != undefined && infosAll.map((info: SchoolDTOInfos | TeacherDTOInfos, index: Key) => {

                    return (
                        <tr key={`${info.id}-${index}`}>
                            {reportsTypes == "School" ? (
                                <>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.id}</td>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.name}</td>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.quantidadeAulas}</td>
                                </>
                            ) : (
                                <>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.id}</td>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.name}</td>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.horaAulas}</td>
                                    <td className='flex flex-row gap-4 whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                                        {info.datasAulas.map((data) => {
                                                const date = parseISO(data);
                                                const dataFormatada = format(date, 'dd/MM/yyyy');

                                                return(
                                                    <>
                                                        <span className='whitespace-nowrap'>{dataFormatada}</span>
                                                    </>
                                                )
                                            }
                                        )}
                                    </td>
                                </>
                            )}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    )
}
