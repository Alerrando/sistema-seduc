"use client";
import { AxiosError } from "axios";
import { format, isValid } from "date-fns";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ToastContainer, toast } from "react-toastify";
import { createDefinitionPeriods, findAllDefinitionPeriods } from "../../../../api";
import { StateContext } from "../../../../../slice";
import { DefinitionPeriodsInfos } from "../../../../utils/type";

export default function DefinitionPeriods() {
  const { infosDefinitionPeriods } = useContext(StateContext);
  const [datas, setDatas] = useState<DefinitionPeriodsInfos>({} as DefinitionPeriodsInfos);

  useEffect(() => {
    (async () => {
      const periods: DefinitionPeriodsInfos[] = await findAllDefinitionPeriods();
      const formattedPeriods: DefinitionPeriodsInfos[] = periods?.map((period) => ({
        startDate: new Date(period.startDate).toISOString(),
        endDate: new Date(period.endDate).toISOString(),
      }));

      console.log(formattedPeriods);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <header className="w-full h-auto flex items-center justify-between border-b border-b-[#efefef] p-3">
        <h1 className="text-3xl">Definição do período de Cadastro de Aulas Eventuais</h1>

        <div className="w-auto h-auto">
          <div
            className="inline-block h-5 w-5 cursor-pointer hover:animate-spin rounded-full border-4 border-solid border-current border-b-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          ></div>
        </div>
      </header>

      <form className="h-full w-full flex flex-col items-start justify-between p-12" onSubmit={submit}>
        <div className="h-full w-full flex items-start justify-between">
          <div className="h-auto w-1/3 grid justify-center text-center gap-3">
            <h2 className="text-2xl">Data inicial</h2>

            <Calendar
              className="w-[100%!important] calendar shadow-md border border-[#dfdfdf!important] rounded-md calendar"
              value={datas.startDate}
              onChange={(e) =>
                setDatas({
                  ...datas,
                  startDate: e ? (typeof e === "string" ? e : e instanceof Date ? e.toISOString() : e.toString()) : "",
                })
              }
            />
          </div>

          <div className="h-auto w-1/3 grid justify-center text-center gap-3">
            <h2 className="text-2xl">Data Final</h2>

            <Calendar
              className="w-[100%!important] calendar shadow-md border border-[#dfdfdf!important] rounded-md calendar"
              value={datas.endDate}
              onChange={(e) =>
                setDatas({
                  ...datas,
                  endDate: e ? (typeof e === "string" ? e : e instanceof Date ? e.toISOString() : e.toString()) : "",
                })
              }
            />
          </div>
        </div>

        <div className="w-full flex items-center justify-between border-t border-t-[#bfbfbf] py-2">
          <div className="w-auto h-auto flex flex-row gap-3">
            <div className="w-auto h-auto flex flex-row items-center gap-3 px-2">
              <p className="text-base">Data Inicial Atual:</p>

              <div className="w-auto h-full flex p-2 border border-[#cfcfcf] rounded shadow-lg">
                <span>
                  {infosDefinitionPeriods?.length > 0 && isValid(new Date(infosDefinitionPeriods[0]?.startDate))
                    ? format(new Date(infosDefinitionPeriods[0]?.startDate), "dd/MM/yyyy")
                    : ""}
                </span>
              </div>
            </div>

            <div className="w-[2px] h-auto bg-[#dfdfdf]"></div>

            <div className="w-auto h-auto flex flex-row items-center gap-3 px-2">
              <p className="text-base">Data Final Atual:</p>

              <div className="w-auto h-full flex p-2 border border-[#cfcfcf] rounded shadow-lg">
                <span>
                  {infosDefinitionPeriods?.length > 0 && isValid(new Date(infosDefinitionPeriods[0]?.endDate))
                    ? format(new Date(infosDefinitionPeriods[0]?.endDate), "dd/MM/yyyy")
                    : ""}
                </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center p-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold transition-all"
          >
            Confirmar
          </button>
        </div>
      </form>

      <ToastContainer />
    </>
  );

  async function submit(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    if (datas.startDate !== null && datas.endDate !== null) {
      const message: string | AxiosError = await createDefinitionPeriods(datas);
      const aux = await findAllDefinitionPeriods();

      const formattedPeriods: DefinitionPeriodsInfos[] = aux?.map((period: DefinitionPeriodsInfos) => ({
        startDate: new Date(period.startDate).toISOString(),
        endDate: new Date(period.endDate).toISOString(),
      }));

      console.log(formattedPeriods);
      messageToast(message);
    }
  }

  function messageToast(message: AxiosError | string) {
    if (typeof message !== "object") {
      toast.success(message, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      const errorMessage = message?.response?.data || "Erro desconhecido";
      toast.error(errorMessage.toString(), {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
}
