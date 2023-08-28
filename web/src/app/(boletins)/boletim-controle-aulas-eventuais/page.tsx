"use client";
import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { AppDispatch, RootState } from "../../../../configureStore";
import { TeacherDTOInfos, changeReportsType, refreshInfosSchool, refreshInfosTeacher } from "../../../../slice";
import { refreshAllFilterInfosTeacher, refreshFilterInfosTeacher } from "../../../../slice/FilterSlice";
import Filter, { DatasTypes, SubmitDataFilter } from "../../../Components/Filter";
import TableReports from "../../../Components/TableReports";
import { getNameByIdTeacher, getReportsTeacher, readAllSchool, readAllTeacher } from "../../../api";
import RootLayout from "../../../app/layout";

const createFormSchema = z.object({
  cadastroProfessor: z
    .string()
    .nonempty("Selecione um professor ou adicione!")
    .transform((teacher) => Number(teacher)),
});

export type InitalValuesBulletinControlOccasionalClasses = {
  cadastroProfessor: number;
};

export default function BoletimControleAulasEventuais() {
  const [initalValues, setInitialValues] = useState<InitalValuesBulletinControlOccasionalClasses>(
    {} as InitalValuesBulletinControlOccasionalClasses,
  );
  const [filter, setFilter] = useState<boolean>(false);
  const [datas, setDatas] = useState<DatasTypes>({} as DatasTypes);
  const { allFilterInfosTeacher } = useSelector((root: RootState) => root.SliceFilter);
  const tableHead = ["Nome Professor", "Data", "Escola", "N° de Aulas"];
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      dispatch(refreshInfosSchool(await readAllSchool()));
      dispatch(refreshInfosTeacher(await readAllTeacher()));
      dispatch(changeReportsType("Teacher"));
    })();
  }, []);

  return (
    <RootLayout showHeaderAside>
      <main className="w-full h-[88vh] md:h-[83vh] md:w-5/6 flex flex-col items-center justify-between ml-auto px-6 overflow-y-auto">
        <div className="w-full h-100%">
          <div className="w-full flex flex-row items-center justify-between gap-4 py-3">
            <h1 className="text-[19px] font-bold md:text-[42px]">Boletim de Controle de Aulas Eventuais</h1>
            <SlidersHorizontal
              className="w-6 h-6 md:w-8 md:h-8 absolute top-3 right-3 text-white md:relative md:inset-0 md:text-black cursor-pointer"
              onClick={() => setFilter(!filter)}
            />
          </div>

          <TableReports tableHead={tableHead} allFilterInfos={allFilterInfosTeacher} />
        </div>

        <div className="w-full flex items-center justify-end">
          <Link
            href="/imprimir-boletim-controle-aulas-eventuais"
            className="w-36 py-2 border border-zinc-500 text-zinc-500 rounded-lg text-center hover:bg-zinc-500 hover:text-white transition-colors"
          >
            Imprimir
          </Link>
        </div>
      </main>

      {filter ? (
        <Filter
          setFilter={setFilter}
          datas={datas}
          setDatas={setDatas}
          filterName="cadastroProfessor"
          schema={createFormSchema}
          submit={submit}
          initialValues={initalValues}
          key="filter-boletim-controle-eventuais"
        />
      ) : null}
    </RootLayout>
  );

  async function submit(data: SubmitDataFilter) {
    if ("cadastroProfessor" in data) {
      const aux: TeacherDTOInfos[] = await getReportsTeacher(
        data.cadastroProfessor,
        new Date(datas.dataInicial),
        new Date(datas.dataFinal),
      );

      console.log(aux);

      if (typeof aux === "object") {
        dispatch(
          refreshAllFilterInfosTeacher(
            aux?.sort(
              (data1: TeacherDTOInfos, data2: TeacherDTOInfos) =>
                new Date(data1.lessonDay).getTime() - new Date(data2.lessonDay).getTime(),
            ),
          ),
        );
        dispatch(refreshFilterInfosTeacher(await getNameByIdTeacher(data.cadastroProfessor)));
      }

      setFilter(false);
    }
  }
}
