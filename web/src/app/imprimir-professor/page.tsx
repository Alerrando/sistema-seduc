'use client';
import React, { useEffect, useState } from "react";
import RootLayout from "../layout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../system";

export default function ImprimirProfessor(){
    const { filterInfosTeacher, allFilterInfosTeacher } = useSelector((root: RootState) => root.SliceTeacher)

    return(
        <RootLayout showHeaderAside={false}>
            <main className="w-full h-screen">
                <section className="w-full-h-auto flex flex-col items-center justify-center gap-8 px-6 py-8 md:px-12 md:py-8">
                    <header className="w-full h-auto flex flex-col items-center justify-center gap-8 md:gap-2">
                        <div className="w-full md:w-[40%] xl:w-[24%] h-auto flex flex-col items-center justify-center after:block after:w-full after:h-[2px] after:bg-zinc-600">
                            <h1 className="text-2xl md:text-3xl">Controle de Aulas Eventuais</h1>
                        </div>

                        <div className="w-11/12 h-auto flex flex-col gap-6 md:gap-2 items-start mr-auto">
                            <div className="w-full flex flex-row gap-1 relative items-center">
                                <h3 className="font-bold text-xl">NOME: </h3>
                                <span className="w-full flex flex-col text-lg after:absolute after:bottom-1 after:block after:w-[calc(390px_-_110px)] md:after:w-[93%] after:h-[2px] after:bg-zinc-900">
                                    {filterInfosTeacher?.name}
                                </span>
                            </div>

                            <div className="w-full flex items-center justify-between">
                                <div className="w-auto flex flex-row items-center gap-1 md:gap-4">
                                    <h3 className="font-bold text-base md:text-xl">CARGO: </h3>
                                    <span className="font-bold text-sm md:text-lg">{filterInfosTeacher?.cargo}</span>
                                </div>

                                <div className="w-auto flex flex-row items-center gap-1 md:gap-4">
                                    <h3 className="font-bold text-base md:text-xl">SEDE: </h3>
                                    <span className="font-bold text-sm md:text-lg">{filterInfosTeacher?.sede}</span>
                                </div>

                                <div className="w-auto flex flex-row items-center gap-1 md:gap-4">
                                    <h3 className="font-bold text-base md:text-xl">ANO: </h3>
                                    <span className="font-bold text-sm md:text-lg">2023</span>
                                </div>
                            </div>
                        </div>
                    </header>

                    <table className="min-w-full border text-center text-sm font-light border-neutral-500">
                        <thead className="border-b font-medium border-neutral-500">
                            <tr>
                                <th scope="col" className="text-start border-r pl-4 pr-2 py-2 border-neutral-500">DATA</th>
                                <th scope="col" className="text-start border-r pl-4 pr-2 py-2 border-neutral-500">ESCOLA</th>
                                <th scope="col" className="text-start border-r pl-4 pr-2 py-2 border-neutral-500">N° DE AULAS</th>
                            </tr>
                        </thead>


                        <tbody className="divide-y divide-gray-200">
                            
                        </tbody>
                    </table>
                </section>
            </main>
        </RootLayout>
    )
}