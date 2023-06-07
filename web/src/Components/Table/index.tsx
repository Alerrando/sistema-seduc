import { format, isValid, parseISO } from 'date-fns';
import { Pencil, Trash } from 'lucide-react';
import React, { Key } from 'react';
import { LessonsInfos } from '../../../slice';

type TableProps = {
    tableHead: string[],
    editInfo: (info: LessonsInfos) => void,
    deleteInfo: (info: LessonsInfos) => void,
    infosAll: [],
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
                    {infosAll
                        .filter((register) => Object.values(register.name).join("").toLowerCase().includes(search.toLowerCase()))
                        .map((info, index: Key) => {
                            const infos = Object.values(info);

                            return (
                                <tr key={`${index}-${info.nomeProfessor}`}>
                                    {infos.map((infosTable, indeX: Key) => (
                                        <>
                                            {isValid(parseISO(infosTable)) ? (
                                                <td className='p-1 text-start whitespace-nowrap border border-[#999]' key={indeX}>
                                                    <span className='whitespace-nowrap'>{format(new Date(infosTable.toString()), "dd/MM/yyyy")}</span>
                                                </td>
                                                ): (
                                                <td className="p-1 text-start whitespace-nowrap border border-[#999]" key={indeX}>{infosTable}</td>
                                            )}
                                        </>
                                   ))}
                                    <td className="p-1 text-start border-x border-y border-[#999]" key={index}>
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
