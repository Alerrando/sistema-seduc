"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createDefinitionPeriods, getDefinitionPeriods } from "../../../../api";
import { useDispatch, useSelector } from "react-redux";
import { refreshDefinitionPeriods } from "../../../../../slice";
import { format, isValid } from "date-fns";
import { AppDispatch, RootState } from "../../../../../configureStore";

const createFormSchema = z.object({
    startDate: z.date({ invalid_type_error: "Não é uma data válida", required_error: "Selecione uma data" }),
    endDate: z.date({ invalid_type_error: "Não é uma data válida", required_error: "Selecione uma data" }),
})

type CreateFormData = z.infer<typeof createFormSchema>

export default function DefinitionPeriods(){
    const { infosDefinitionPeriods } = useSelector((root: RootState) => root.Slice);
    const { handleSubmit, formState: { errors }, setValue } = useForm<CreateFormData>({
        resolver: zodResolver(createFormSchema)
    });
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        (async () => {
          const periods = await getDefinitionPeriods();
          const formattedPeriods = periods.map(period => ({
            startDate: new Date(period.startDate).toISOString(),
            endDate: new Date(period.endDate).toISOString(),
          }));
          dispatch(refreshDefinitionPeriods(formattedPeriods));
        })();
    }, []);

    return(
        <>
            <header className="w-full h-auto flex items-center justify-between border-b border-b-[#efefef] p-3">
                <h1 className="text-3xl">Definição do período de Cadastro de Aulas Eventuais</h1>

                <div className="w-auto h-auto">
                    <div className="inline-block h-5 w-5 cursor-pointer hover:animate-spin rounded-full border-4 border-solid border-current border-b-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status"
                        onClick={() => handleLoadingClick()}
                    >
                    </div>
                </div>
            </header>

            <form className="h-full w-full flex flex-col items-start justify-between p-12" onSubmit={handleSubmit(submit)}>
                <div className="h-full w-full flex items-start justify-between">
                    <div className="h-auto w-1/3 grid justify-center text-center gap-3">
                        <h2 className="text-2xl">Data inicial</h2>

                        <Calendar
                            className="w-[100%!important] calendar shadow-md border border-[#dfdfdf!important] rounded-md calendar"
                            onChange={handleStartDateChange}
                        />

                        {errors.startDate && <span className="text-red-600">{errors.startDate.message}</span> }
                    </div>

                    <div className="h-auto w-1/3 grid justify-center text-center gap-3">
                        <h2 className="text-2xl">Data Final</h2>

                        <Calendar
                            className="w-[100%!important] calendar shadow-md border border-[#dfdfdf!important] rounded-md calendar"
                            onChange={handleEndDateChange}
                        />

                        {errors.endDate && <span className="text-red-600">{errors.endDate.message}</span>}
                    </div>
                </div>

                <div className="w-full flex items-center justify-between border-t border-t-[#bfbfbf] py-2">
                    <div className="w-auto h-auto flex flex-row gap-3">
                        <div className="w-auto h-auto flex flex-row items-center gap-3 px-2">
                            <p className="text-base">Data Inicial Atual:</p>

                            <div className="w-auto h-full flex p-2 border border-[#cfcfcf] rounded shadow-lg">
                                <span>
                                    {infosDefinitionPeriods?.length > 0 && isValid(new Date(infosDefinitionPeriods[infosDefinitionPeriods.length - 1]?.startDate))
                                        ? format(new Date(infosDefinitionPeriods[infosDefinitionPeriods.length - 1]?.startDate), "dd/MM/yyyy")
                                        : ""}
                                </span>
                            </div>
                        </div>

                        <div className="w-[2px] h-auto bg-[#dfdfdf]"></div>

                        <div className="w-auto h-auto flex flex-row items-center gap-3 px-2">
                            <p className="text-base">Data Final Atual:</p>

                            <div className="w-auto h-full flex p-2 border border-[#cfcfcf] rounded shadow-lg">
                                <span>
                                    {infosDefinitionPeriods?.length > 0 && isValid(new Date(infosDefinitionPeriods[infosDefinitionPeriods.length - 1]?.endDate))
                                        ? format(new Date(infosDefinitionPeriods[infosDefinitionPeriods.length - 1]?.endDate), "dd/MM/yyyy")
                                        : ""}
                                </span>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="flex items-center justify-center p-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold transition-all">
                        Confirmar
                    </button>
                </div>
            </form>
        </>
    );

    async function submit(e: CreateFormData) {
        const startDate = new Date(e.startDate);
        const endDate = new Date(e.endDate);
        const formattedData = {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        };
        const message = await createDefinitionPeriods(formattedData);
        dispatch(refreshDefinitionPeriods(await getDefinitionPeriods()));
    }

    async function handleLoadingClick() {
        try {
          const data = await getDefinitionPeriods();
          dispatch(refreshDefinitionPeriods(data));
        } catch (error) {
          console.error('Erro ao atualizar os dados:', error);
        }
    }
      

    function handleStartDateChange(date: Date){
        setValue("startDate", date);
    };
    
    function handleEndDateChange(date: Date){
        setValue("endDate", date);
    };
}