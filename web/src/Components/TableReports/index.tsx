import { format, isValid, parseISO } from "date-fns";
import { Pencil, Trash } from "lucide-react";
import React, { Key, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../system";
import { SchoolDTOInfos, TeacherDTOInfos } from "../../../slice";

type TableReportsProps = {
    tableHead: string[],
    infosAll: SchoolDTOInfos[] | TeacherDTOInfos[],
}

export default function TableReports(props: TableReportsProps) {
    const { tableHead, infosAll } = props;
    const { reportsTypes, allInfosSchool } = useSelector((root: RootState) => root.Slice);

    return (
        <div className="max-h-[77%] overflow-x-auto rounded-lg border border-gray-200">
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
                                        {console.log(info)}
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.name}</td>
                                        <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                                            <span className='whitespace-nowrap'>{isValid(new Date(info.dataAula)) ? format(new Date(info.dataAula?.toString()), "dd/MM/yyyy") : ""}</span>
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{getNameSchool(info.cadastroEscola)}</td>
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

    function getNameSchool(id: string){
        let aux = ""
        allInfosSchool?.forEach((school: SchoolInfos) => {
            if(school.id == id){
                aux = school.name;
            }
        })

        return aux;
    }
}
