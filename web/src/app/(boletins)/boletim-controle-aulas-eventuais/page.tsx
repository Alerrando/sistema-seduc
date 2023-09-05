"use client";
import { SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { AppDispatch, RootState } from "../../../../configureStore";
import {
  TeacherDTOInfos,
  TeachersThirst,
  changeReportsType,
  refreshInfosSchool,
  refreshInfosTeacher,
} from "../../../../slice";
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
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [initalValues, setInitialValues] = useState<InitalValuesBulletinControlOccasionalClasses>(
    {} as InitalValuesBulletinControlOccasionalClasses,
  );
  const [filter, setFilter] = useState<boolean>(false);
  const [datas, setDatas] = useState<DatasTypes>({} as DatasTypes);
  const tableHead = ["Nome Professor", "Data", "Escola", "N° de Aulas"];
  const dispatch = useDispatch<AppDispatch>();
  const { allInfosTeachersThirst } = useSelector((root: RootState) => root.Slice);
  const { allFilterInfosTeacher, filterInfosTeacher } = useSelector((root: RootState) => root.SliceFilter);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      dispatch(refreshInfosSchool(await readAllSchool()));
      dispatch(refreshInfosTeacher(await readAllTeacher()));
      dispatch(changeReportsType("Teacher"));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  function redirectPrintOut(idThirst: number) {
    const aux = allFilterInfosTeacher.filter(
      (infosTeacher: TeacherDTOInfos) => infosTeacher.registerSchool.id === idThirst,
    );

    dispatch(refreshAllFilterInfosTeacher(aux));

    router.replace("/imprimir-boletim-controle-aulas-eventuais");
  }

  async function submit(data: SubmitDataFilter) {
    if ("cadastroProfessor" in data) {
      const aux: TeacherDTOInfos[] = await getReportsTeacher(
        data.cadastroProfessor,
        new Date(datas.dataInicial),
        new Date(datas.dataFinal),
      );

      if (typeof aux === "object") {
        dispatch(
          refreshAllFilterInfosTeacher(
            aux?.sort(
              (info1: TeacherDTOInfos, info2: TeacherDTOInfos) => info1.registerSchool.name - info2.registerSchool.name,
            ),
          ),
        );
        dispatch(refreshFilterInfosTeacher(await getNameByIdTeacher(data.cadastroProfessor)));
      }
      setFilter(false);
    }
  }
}
