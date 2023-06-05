import { format, isValid } from 'date-fns';
import { Pencil, Trash } from 'lucide-react';
import React, { Key } from 'react';
import { HorasInfos } from '../../../slice';

type TableProps = {
    tableHead: string[],
    editInfo: (info: HorasInfos) => void,
    deleteInfo: (info: HorasInfos) => void,
    infosAll: HorasInfos[],
    search: string,
}

export default function Table(props: TableProps) {
    const { tableHead, editInfo, deleteInfo, infosAll, search } = props;

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr>
                        {tableHead.map(head => <th key={head} scope="col" className="p-1 text-start whitespace-nowrap border border-[#999]">{head}</th>)}
                    </tr>
                </thead>

                <tbody>
                    {infosAll?
                        .filter((register) => Object.values(register.nomeProfessor).join("").toLowerCase().includes(search.toLowerCase()))
                        .map((info: HorasInfos, index: Key) => {
                            return (
                                <tr key={`${index}-${info.nomeProfessor}`}>
                                    <td className="p-1 text-start whitespace-nowrap border border-[#999]">{info.id}</td>
                                    <td className="p-1 text-start whitespace-nowrap border border-[#999]">{info.nomeProfessor}</td>
                                    <td className="p-1 text-start whitespace-nowrap border border-[#999]">{info.horaAulas}</td>
                                    <td className="p-1 text-start whitespace-nowrap border border-[#999]">{info.titularidade}</td>
                                    <td className="p-1 text-start whitespace-nowrap border border-[#999]">
                                        {/* eslint-disable-next-line */}
                                        <span className='whitespace-nowrap'>{format(new Date(info.diaAula.toString()), "dd/MM/yyyy")}</span>
                                    </td>
                                    <td className="p-1 text-start whitespace-nowrap border border-[#999]">{info.escola}</td>
                                    <td className="p-1 text-start border-x border-t border-[#999]">
                                        <div className="flex flex-row items-center justify-between">
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
