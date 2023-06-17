'use client';

import { useEffect, useState } from "react";
import CreateHeaderReports from "../../Components/CreateHeaderReports";
import { Search, SlidersHorizontal } from "lucide-react";
import { TeacherDTOInfos, changeReportsType } from "../../../slice";
import TableReports from "../../Components/TableReports";
import { getReportsTeacher } from "../../api";
import { useDispatch } from "react-redux";

export default function RelatorioProfessor(){
    const [allReportsInfos, setAllReportsInfos] = useState<TeacherDTOInfos[]>([] as TeacherDTOInfos[])
    const [search, setSearch] = useState("");
    const tableHead = ["Id", "Nome do Professor", "Quantidade de horas de aulas", "Data das Aulas"];
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            setAllReportsInfos(await getReportsTeacher());
            dispatch(changeReportsType("Teacher"));
            
        })()
    }, [])

    return(
        <main className="w-5/6 ml-auto px-6 overflow-y-auto">
            <div className="w-full flex flex-col gap-4 px-6 py-3">
                <h1 className="text-[42px]">Relatório de Professores</h1>

                <CreateHeaderReports setSearch={setSearch} totalRegister={allReportsInfos.length} key="create-header-reports-school" />

                <TableReports infosAll={allReportsInfos} search={search} tableHead={tableHead} key={"table-reports-school"} />
            </div>
        </main>
    )
}