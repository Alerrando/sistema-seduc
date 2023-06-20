'use client';

import { useEffect, useState } from "react";
import CreateHeaderReports from "../../Components/CreateHeaderReports";
import { Search, SlidersHorizontal } from "lucide-react";
import { TeacherDTOInfos, changeReportsType } from "../../../slice";
import TableReports from "../../Components/TableReports";
import { getReportsTeacher } from "../../api";
import { useDispatch } from "react-redux";
import Filter from "../../Components/Filter";

export default function RelatorioProfessor(){
    const [allReportsInfos, setAllReportsInfos] = useState<TeacherDTOInfos[]>([] as TeacherDTOInfos[])
    const [filter, setFilter] = useState<boolean>(false)
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            setAllReportsInfos(await getReportsTeacher());
            dispatch(changeReportsType("Teacher"));
            
        })()
    }, [])

    return(
        <>
            <main className="w-5/6 ml-auto px-6 overflow-y-auto">
                <div className="w-full flex flex-row items-center justify-between gap-4 px-6 py-3">
                    <h1 className="text-[42px]">Relatório de Professores</h1>
                    <SlidersHorizontal size={32} className="cursor-pointer" onClick={() => setFilter(!filter)} />
                </div>

            </main>
            {filter ? (
                <Filter />
            ) : null}
        </>
    )
}