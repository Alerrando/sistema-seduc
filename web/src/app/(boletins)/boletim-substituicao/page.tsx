"use client";

import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { AppDispatch, RootState } from "../../../../configureStore";
import { SchoolDTOInfos, changeReportsType } from "../../../../slice";
import {
  refreshAllFilterInfosSchool,
  refreshFilterInfosSchool,
  refreshFilterStartEndDate,
} from "../../../../slice/FilterSlice";
import Filter, { DatasTypes, SubmitDataFilter } from "../../../Components/Filter";
import TableReports from "../../../Components/TableReports";
import { getIdSchool, getReportsSchool } from "../../../api";
import RootLayout from "../../../app/layout";

const createFormSchema = z.object({
  cadastroEscola: z
    .string()
    .nonempty("Selecione uma escola ou adicione!")
    .transform((school) => Number(school)),
});

export type InitalValuesTypeSubstitutionBulletin = {
  cadastroEscola: number;
};

export default function BoletimSubstituicao() {
  const [filter, setFilter] = useState<boolean>(false);
  const [initalValues, setInitialValues] = useState<InitalValuesTypeSubstitutionBulletin>(
    {} as InitalValuesTypeSubstitutionBulletin,
  );
  const [datas, setDatas] = useState<DatasTypes>({} as DatasTypes);
  const tableHead = ["Nome", "Formação", "Dias Trabalhados", "Total a pagar", "Observações"];
  const { allFilterInfosSchool } = useSelector((root: RootState) => root.SliceFilter);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      dispatch(changeReportsType("School"));
    })();
  }, []);

  return (
    <RootLayout showHeaderAside>
      <main className="w-full h-[88vh] md:h-[83vh] md:w-5/6 flex flex-col items-center justify-between ml-auto px-6 overflow-y-auto">
        <div className="w-full h-100%">
          <div className="w-full flex flex-row items-center justify-between gap-4 py-3">
            <h1 className="text-[19px] font-bold md:text-[42px]">Boletim de Substituições</h1>
            <SlidersHorizontal
              className="w-6 h-6 md:w-8 md:h-8 absolute top-3 right-3 text-white md:relative md:inset-0 md:text-black cursor-pointer"
              onClick={() => setFilter(!filter)}
            />
          </div>

          <TableReports tableHead={tableHead} allFilterInfos={allFilterInfosSchool} />
        </div>

        <div className="w-full flex items-center justify-end">
          <Link
            href="/imprimir-boletim-substituicao"
            className="w-36 py-2 border border-zinc-500 text-zinc-500 rounded-lg text-center hover:bg-zinc-500 hover:text-white transition-colors"
          >
            Imprimir
          </Link>
        </div>
      </main>

      {filter ? (
        <Filter
          datas={datas}
          filterName="cadastroEscola"
          schema={createFormSchema}
          setDatas={setDatas}
          setFilter={setFilter}
          submit={submit}
          initialValues={initalValues}
          key={"filter-boletim-substituição"}
        />
      ) : null}
    </RootLayout>
  );

  async function submit(data: SubmitDataFilter) {
    if ("cadastroEscola" in data) {
      const aux: SchoolDTOInfos[] = await getReportsSchool(
        data.cadastroEscola,
        new Date(datas.dataInicial),
        new Date(datas.dataFinal),
      );
      console.log(aux);

      if (typeof aux === "object") {
        const sortedInfos: SchoolDTOInfos[] = aux?.sort((info1: SchoolDTOInfos, info2: SchoolDTOInfos) =>
          info1.name.localeCompare(info2.name),
        );

        dispatch(refreshAllFilterInfosSchool(sortedInfos));
        dispatch(refreshFilterInfosSchool(await getIdSchool(data.cadastroEscola)));
        dispatch(refreshFilterStartEndDate(datas));
      }

      setFilter(false);
    }
  }
}
