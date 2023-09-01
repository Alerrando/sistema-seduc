import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ZodType } from "zod";
import { AppDispatch } from "../../../configureStore";
import { refreshInfosSchool, refreshInfosTeacher } from "../../../slice";
import { readAllSchool, readAllTeacher } from "../../api";
import { InitalValuesBulletinControlOccasionalClasses } from "../../app/(boletins)/boletim-controle-aulas-eventuais/page";
import { InitalValuesTypeSubstitutionBulletin } from "../../app/(boletins)/boletim-substituicao/page";
import { SelectInput } from "../Modal/ModalForm/SelectInput";

export type SubmitDataFilter = InitalValuesTypeSubstitutionBulletin | InitalValuesBulletinControlOccasionalClasses;

export type DatasTypes = {
  dataInicial: string | Date;
  dataFinal: string | Date;
};

type FilterProps = {
  setFilter: (filter: boolean) => void;
  submit: (data: SubmitDataFilter) => void;
  datas: DatasTypes;
  setDatas: (datas: DatasTypes) => void;
  filterName: string;
  schema: ZodType<unknown, unknown, unknown>;
  initialValues: SubmitDataFilter;
};

export default function Filter(props: FilterProps) {
  const { datas, setDatas, setFilter, submit, filterName, schema, initialValues } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InitalValuesTypeSubstitutionBulletin | InitalValuesBulletinControlOccasionalClasses>({
    resolver: zodResolver(schema),
    defaultValues: initialValues as (typeof schema)["_input"],
  });

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      if (filterName === "cadastroProfessor") {
        dispatch(refreshInfosTeacher(await readAllTeacher()));
      } else {
        dispatch(refreshInfosSchool(await readAllSchool()));
      }
    })();
  }, [dispatch, filterName]);

  return (
    <div className="w-screen h-full fixed flex items-center justify-end bg-modal top-0 left-0 ">
      <form
        className="w-full md:w-[35%] h-full flex flex-col gap-6 bg-white p-3 overflow-y-auto"
        onSubmit={handleSubmit(submitFilter)}
      >
        <header className="w-full h-auto grid grid-cols-2 items-center justify-between gap-1 after:block after:w-full after:h-1 after:border-b after:border-[#E0E0E0] after:col-span-2">
          <h2 className="text-3xl font-bold">Filtro</h2>

          <X size={36} className="cursor-pointer ml-auto" onClick={() => setFilter(false)} />
        </header>

        <div className="w-full h-auto flex flex-col gap-1">
          {filterName === "cadastroProfessor" ? (
            <>
              <SelectInput
                htmlFor="cadastroProfessor"
                label="Professores"
                name="cadastroProfessor"
                optionDefault="Selecione um Professor"
                optionType="Teacher"
                register={register}
              />
            </>
          ) : (
            <>
              <SelectInput
                htmlFor="cadastroEscola"
                label="Escola"
                name="cadastroEscola"
                optionDefault="Selecione uma Escola"
                optionType="School"
                register={register}
              />
            </>
          )}

          <ErrorMessage
            errors={errors}
            name={filterName}
            render={({ message }) => <span className="text-red-600">{message}</span>}
          />
        </div>

        <div className="w-full h-auto flex flex-col gap-1">
          <span className="text-lg font-bold">Data Inicial: </span>
          <Calendar
            className="w-[100%!important] calendar shadow-md rounded-md calendar"
            value={datas.dataInicial ? new Date(datas.dataInicial) : null}
            onChange={(e) =>
              setDatas({
                ...datas,
                dataInicial: e ? (typeof e === "string" ? e : e instanceof Date ? e.toISOString() : e.toString()) : "",
              })
            }
          />
        </div>

        <div className="w-full h-auto flex flex-col gap-1">
          <span className="text-lg font-bold">Data Final: </span>
          <Calendar
            className="w-[100%!important] calendar shadow-md rounded-md calendar"
            value={datas.dataFinal ? new Date(datas.dataFinal) : null}
            onChange={(e) =>
              setDatas({
                ...datas,
                dataFinal: e ? (typeof e === "string" ? e : e instanceof Date ? e.toISOString() : e.toString()) : "",
              })
            }
          />
        </div>

        <div className="w-full h-auto flex items-center justify-center">
          <button
            type="submit"
            className="w-[80%] py-2 text-center border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
          >
            Filtrar
          </button>
        </div>
      </form>
    </div>
  );

  function submitFilter(data: SubmitDataFilter) {
    submit(data);
  }
}
