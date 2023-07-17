import { format, isValid, parseISO } from "date-fns";
import { Pencil, Trash } from "lucide-react";
import React, { Key, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SchoolDTOInfos, TeacherDTOInfos } from "../../../slice";
import { AppDispatch, RootState } from "../../../configureStore";

type InfosTableReportsData = SchoolDTOInfos | TeacherDTOInfos;

type TableReportsProps = {
    allFilterInfos: SchoolDTOInfos[] | TeacherDTOInfos[],
    tableHead: string[],
}

export default function TableReports(props: TableReportsProps) {
    const { tableHead, allFilterInfos } = props;
    const { reportsTypes, allInfosSchool } = useSelector((root: RootState) => root.Slice);
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
                    {allFilterInfos != undefined && allFilterInfos.map((info: InfosTableReportsData, index: number) => {

                        return (
                            <tr key={`${info.name}-${index}`}>
                                {reportsTypes == "School" && "quantidadeAulas" in info ? (
                                    <>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index + 1}</td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.name}</td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.cargo}</td>
                                        <td className="items-center h-full px-4 py-2 font-medium text-gray-900">
                                            <div className="grid grid-cols-4">
                                                {info.datesWork.map((dateWork: any) => (
                                                    <div className="h-auto flex flex-row items-center justify-start gap-1 border border-[#afafaf] p-1">
                                                        <span>{isValid(new Date(dateWork[0])) ? format(new Date(dateWork[0]), "dd/MM") : ""}</span>
                                                        <span>-</span>
                                                        <span>{dateWork[1]}h</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                            {`
                                                ${info.cargo.split("-")[0].trim()} = ${info.quantidadeAulas}h`
                                            }
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                            <textarea className="w-full h-auto outline-none border border-bg-[#efefef] rounded-md" type="text" name="" id="" />
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index + 1}</td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.name}</td>
                                        <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                                            {"dataAula" in info && (
                                                    <span className='whitespace-nowrap'>{isValid(new Date(info.dataAula)) ? format(new Date(info.dataAula), "dd/MM/yyyy") : ""}</span>
                                                )
                                            }
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                            {"cadastroEscola" in info && allInfosSchool?.find((school) => String(school.id) == info.cadastroEscola)?.name}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{"horaAulas" in info && info.horaAulas}</td>
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
