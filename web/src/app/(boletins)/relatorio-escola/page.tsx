'use client';

import { useEffect, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { SchoolDTOInfos, changeReportsType } from "../../../../slice";
import { getReportsSchool } from "../../../api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../configureStore";

export default function RelatorioEscola(){
    const [allReportsInfos, setAllReportsInfos] = useState<SchoolDTOInfos[]>([] as SchoolDTOInfos[])
    const [search, setSearch] = useState("");
    const tableHead = ["Id", "Nome da Escola", "Quantidade de horas de aulas"];
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        (async () => {
            setAllReportsInfos(await getReportsSchool());
            dispatch(changeReportsType("School"));
            
        })()
    }, [])

    return(
        <main className="w-5/6 ml-auto px-6 overflow-y-auto">
            <div className="w-full flex flex-col gap-4 px-6 py-3">
                <h1 className="text-[42px]">Relatório de Escolas</h1>

            </div>
        </main>
    )
}