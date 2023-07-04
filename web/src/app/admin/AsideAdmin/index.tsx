"use client";
import React, { Fragment, useState } from "react";
import { Tab } from "@headlessui/react";
import { BookIcon, CalendarClock, Users } from "lucide-react";
import { DatasTypes } from "../../../Components/Filter";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export function AsideAdmin(){
    const [datas, setDatas] = useState<DatasTypes>({} as DatasTypes);

    return(
        <aside className="w-[4%] h-screen absolute top-0 left-0 shadow-2xl">
            <div className="h-full flex flex-col items-center">
                <div className="w-full h-4/6 flex flex-col gap-8">
                    <div className="h-10 w-full flex-col items-center justify-center border-b">
                        <div className="h-10 w-4/5 flex flex-row items-center justify-start pl-1">
                            <BookIcon size={26} className="text-principal cursor-pointer" />
                        </div>
                    </div>
                    <Tab.Group>
                        <Tab.List className="grid gap-8 items-center">
                            <Tab as={Fragment} key="definition-dates">
                                {({ selected }) => (
                                    <>
                                        <div className="h-10 flex items-center justify-center group">
                                            <button className={`w-full h-full flex flex-row items-center justify-start pl-1 gap-[10px] ${selected ? "bg-principal text-white" : "group-hover:bg-principal group-hover:text-white"} transition-all`}>
                                                <CalendarClock size={26} />
                                            </button>
                                        </div>
                                    </>
                                )}
                            </Tab>
                            <Tab as={Fragment} key="list-users">
                                {({ selected }) => (
                                    <>
                                        <div className="h-10 flex items-center justify-center group">
                                            <button className={`w-full h-full flex flex-row items-center justify-start pl-1 gap-[10px] ${selected ? "bg-principal text-white" : "group-hover:bg-principal group-hover:text-white"} transition-all whitespace-nowrap`}>
                                                <Users size={26} />
                                            </button>
                                        </div>
                                    </>
                                )}
                            </Tab>
                        </Tab.List>
                        <Tab.Panels className="h-screen w-[calc(100vw_-_100%)] top-0 left-full absolute">
                            <Tab.Panel className="w-full h-full flex flex-col">
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
                                                        dataInicial: e ? (typeof e === "string" ? e : e.toISOString()) : "",
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
                                                        dataFinal: e ? (typeof e === "string" ? e : e.toISOString()) : "",
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
                            </Tab.Panel>
                            <Tab.Panel>
                                
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
        </aside>
    )
}