"use client";
import { SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { z } from "zod";
import { StateContextFilter } from "../../../../slice/FilterSlice";
import Filter, { DatasTypes, SubmitDataFilter } from "../../../Components/Filter";
import TableReports from "../../../Components/TableReports";
import { getReportsTeacher } from "../../../api";
import RootLayout from "../../../app/layout";
import { StateContext } from "../../../../slice";
import { TeacherDTOInfos, TeachersThirst } from "@/utils/type";

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
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [initalValues, setInitialValues] = useState<InitalValuesBulletinControlOccasionalClasses>(
    {} as InitalValuesBulletinControlOccasionalClasses,
  );
  const [filter, setFilter] = useState<boolean>(false);
  const [datas, setDatas] = useState<DatasTypes>({} as DatasTypes);
  const tableHead = ["Nome Professor", "Data", "Escola", "N° de Aulas"];
  const { allInfosTeachersThirst } = useContext(StateContext);
  const { allFilterInfosTeacher, filterInfosTeacher } = useContext(StateContextFilter);
  const router = useRouter();

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

        <div className="w-full flex flex-row gap-4 items-center justify-end">
          {Object.keys(filterInfosTeacher).length > 0 && (
            <>
              {allInfosTeachersThirst.map((teachersThirst: TeachersThirst) => (
                <>
                  {teachersThirst.registerTeacher.id === filterInfosTeacher.id && (
                    <button
                      onClick={() => redirectPrintOut(teachersThirst.registerSchool.id)}
                      className="w-auto p-2 border border-zinc-500 text-zinc-500 rounded-lg text-center hover:bg-zinc-500 hover:text-white transition-colors"
                    >
                      {`Imprimir com a sede ${teachersThirst.registerSchool.name}`}
                    </button>
                  )}
                </>
              ))}
            </>
          )}
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

  async function redirectPrintOut(idThirst: number) {
    const aux = allFilterInfosTeacher.filter(
      (infosTeacher: TeacherDTOInfos) => infosTeacher.registerSchool.id === idThirst,
    );

    const idTeacher = aux[0].registerTeacher.id;
    console.log(idTeacher);
    router.replace(`/imprimir-boletim-controle-aulas-eventuais/${idThirst}`);
  }

  async function submit(data: SubmitDataFilter) {
    if ("cadastroProfessor" in data) {
      let aux: TeacherDTOInfos[] = await getReportsTeacher(
        data.cadastroProfessor,
        new Date(datas.dataInicial),
        new Date(datas.dataFinal),
      );
      aux = aux?.sort(
        (info1: TeacherDTOInfos, info2: TeacherDTOInfos) => info1.registerSchool.id - info2.registerSchool.id,
      );

      console.log(aux);
      setFilter(false);
    }
  }
}
