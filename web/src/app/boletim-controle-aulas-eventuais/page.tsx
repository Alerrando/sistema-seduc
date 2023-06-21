'use client';

import { useEffect, useState } from "react";
import CreateHeaderReports from "../../Components/CreateHeaderReports";
import { Search, SlidersHorizontal } from "lucide-react";
import { TeacherDTOInfos, changeReportsType, refreshInfosSchool, refreshInfosTeacher } from "../../../slice";
import TableReports from "../../Components/TableReports";
import { getReportsTeacher, readAllSchool, readAllTeacher } from "../../api";
import { useDispatch } from "react-redux";
import Filter from "../../Components/Filter";

export default function BoletimControleAulasEventuais(){
    const [allReportsInfos, setAllReportsInfos] = useState<TeacherDTOInfos[]>([] as TeacherDTOInfos[]);
    const [filter, setFilter] = useState<boolean>(false);
    const tableHead = [
        "Nome Professor",
        "Data",
        "Escola",
        "N° de Aulas",
    ]
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            dispatch(refreshInfosSchool(await readAllSchool()));
            dispatch(refreshInfosTeacher(await readAllTeacher()));
            dispatch(changeReportsType("Teacher"));
        })()
    }, [])

    return(
        <>
            <main className="w-full h-[88vh] md:h-[83vh] md:w-5/6 flex flex-col items-center justify-between ml-auto px-6 overflow-y-auto">
                <div className="w-full h-100%">
                    <div className="w-full flex flex-row items-center justify-between gap-4 py-3">
                        <h1 className="text-[19px] font-bold md:text-[42px]">Boletim de Controle de Aulas Eventuais</h1>
                        <SlidersHorizontal className="w-6 h-6 md:w-8 md:h-8 absolute top-3 right-3 text-white md:relative md:inset-0 md:text-black cursor-pointer" onClick={() => setFilter(!filter)} />
                    </div>

                    <TableReports infosAll={allReportsInfos} tableHead={tableHead} />
                </div>

                <div className="w-full flex items-center justify-end">
                    <button className="w-36 py-2 border border-zinc-500 text-zinc-500 rounded-lg text-center hover:bg-zinc-500 hover:text-white transition-colors">
                        Imprimir
                    </button>
                </div>
            </main>
            {filter ? (
                <Filter setFilter={setFilter} setAllReportsInfos={setAllReportsInfos} key="filter-boletim-controle-eventuais" />
            ) : null}
        </>
    );

}