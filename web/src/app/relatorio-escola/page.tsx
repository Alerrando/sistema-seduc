'use client';

import CreateHeaderReports from "../../Components/CreateHeaderReports";
import { Search, SlidersHorizontal } from "lucide-react";

export default function RelatorioEscola(){
    return(
        <main className="w-5/6 ml-auto px-6 overflow-y-auto">
            <div className="w-full flex flex-col gap-4 px-6 py-3">
                <h1 className="text-[42px]">Relatório de Escolas</h1>

                <CreateHeaderReports />
            </div>
        </main>
    )
}