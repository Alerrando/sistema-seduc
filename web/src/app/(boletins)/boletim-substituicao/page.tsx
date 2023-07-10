'use client';

import { useEffect, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { SchoolDTOInfos, changeReportsType } from "../../../../slice";
import { getReportsSchool } from "../../../api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../configureStore";
import RootLayout from "../../../app/layout";
import Link from "next/link";
import TableReports from "../../../Components/TableReports";
import Filter, { DatasTypes } from "../../../Components/Filter";
import { ZodTypeAny, z } from "zod";

const createFormSchema = z.object({
    cadastroEscola: z.string().nonempty("Selecione uma escola ou adicione!"),
})

export default function RelatorioSubstituicao(){
    const [allReportsInfos, setAllReportsInfos] = useState<SchoolDTOInfos[]>([] as SchoolDTOInfos[])
    const [filter, setFilter] = useState<boolean>(false);
    const [datas, setDatas] = useState<DatasTypes>({} as DatasTypes);
    const tableHead = ["Id", "Nome", "Formação", "Dias Trabalhados", "Total a pagar"];
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        (async () => {
            setAllReportsInfos(await getReportsSchool());
            dispatch(changeReportsType("School"));
            
        })()
    }, [])

    return(
        <RootLayout showHeaderAside>
            <main className="w-full h-[88vh] md:h-[83vh] md:w-5/6 flex flex-col items-center justify-between ml-auto px-6 overflow-y-auto">
                <div className="w-full h-100%">
                    <div className="w-full flex flex-row items-center justify-between gap-4 py-3">
                        <h1 className="text-[19px] font-bold md:text-[42px]">Boletim de Substituições</h1>
                        <SlidersHorizontal className="w-6 h-6 md:w-8 md:h-8 absolute top-3 right-3 text-white md:relative md:inset-0 md:text-black cursor-pointer" onClick={() => setFilter(!filter)} />
                    </div>

                    <TableReports tableHead={tableHead} />
                </div>

                <div className="w-full flex items-center justify-end">
                    <Link href="/imprimir-professor" className="w-36 py-2 border border-zinc-500 text-zinc-500 rounded-lg text-center hover:bg-zinc-500 hover:text-white transition-colors">
                        Imprimir
                    </Link>
                </div>
            </main>

            {filter ? (
                <Filter
                    datas={datas}
                    filterName="School"
                    schema={createFormSchema}
                    setDatas={setDatas}
                    setFilter={setFilter}
                    submit={submit}
                    key={"filter-boletim-substituição"}
                />
            ) : null}
        </RootLayout>
    )

    function submit(e: ZodTypeAny){
        console.log(e);
    }
}