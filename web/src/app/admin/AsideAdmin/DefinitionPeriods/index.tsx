"use client";
import { DatasTypes } from "../../../../Components/Filter";
import React, { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


export default function DefinitionPeriods(){
    const [datas, setDatas] = useState<DatasTypes>({} as DatasTypes);

    return(
        <>
            <header className="w-full h-auto border-b border-b-[#efefef] p-3">
                <h1 className="text-3xl">Definição do período de cadastro de Aulas Eventuais</h1>
            </header>

            <section className="h-full w-full flex flex-col items-start justify-between p-12">
            <div className="h-full w-full flex items-center justify-between">
                <div className="h-auto w-1/3 grid justify-center text-center gap-3">
                    <h2 className="text-2xl">Data inicial</h2>

                    <Calendar
                        className="w-[100%!important] calendar shadow-md border border-[#dfdfdf!important] rounded-md calendar"
                        value={datas.dataInicial ? new Date(datas.dataInicial) : null}
                        onChange={(e) =>
                        setDatas({
                            ...datas,
                            dataInicial: e ? (typeof e === "string" ? e : e instanceof Date ? e.toISOString() : e.toString()) : "",
                        })
                        }
                    />
                </div>

                <div className="h-auto w-1/3 grid justify-center text-center gap-3">
                    <h2 className="text-2xl">Data Final</h2>

                    <Calendar
                        className="w-[100%!important] calendar shadow-md border border-[#dfdfdf!important] rounded-md calendar"
                        value={datas.dataFinal ? new Date(datas.dataFinal) : null}
                        onChange={(e) =>
                        setDatas({
                            ...datas,
                            dataFinal: e ? (typeof e === "string" ? e : e instanceof Date ? e.toISOString() : e.toString()) : "",
                        })
                        }
                    />
                </div>
            </div>

            <div className="w-full flex items-end justify-end">
                <button className="flex items-center justify-center p-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                Confirmar
                </button>
            </div>
            </section>
        </>
    )
}