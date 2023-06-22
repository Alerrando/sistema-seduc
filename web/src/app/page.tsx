"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readAllLesson, readAllSchool, readAllTeacher } from "../api";
import dynamic from "next/dynamic";
import { refreshInfosLesson, refreshInfosSchool, refreshInfosTeacher } from "../../slice";
import "react-calendar/dist/Calendar.css";
import { Book, GraduationCap, School2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import RootLayout from "./layout"

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(refreshInfosLesson(await readAllLesson()));
      dispatch(refreshInfosSchool(await readAllSchool()));
      dispatch(refreshInfosTeacher(await readAllTeacher()));
    })()
  }, [])


  return(
    <RootLayout showHeaderAside>
      <main className="w-full md:w-5/6 h-[calc(100vh_-_64px)] ml-auto">
        <div className="w-full h-full flex flex-col md:flex-row gap-5 py-3">
          <section className="w-full h-full flex flex-col md:flex-row gap-8 md:gap-0 md:pl-6">
            <div className="w-full md:w-[80%] h-full flex flex-col justify-between gap-12 px-6 md:pl-0">
              <header className="w-full h-auto flex flex-col gap-2 items-start">
                <h1 className="text-3xl md:text-4xl">Bem vindo Alerrando!</h1>
                <p className="text-base text-[#5a5a5a]">É bom vê-lo novamente.</p>
              </header>

              <section className="w-full h-4/6 flex flex-col justify-center gap-16 lg:gap-24">
                <Link href="/cadastro-aula" className="w-full h-auto flex flex-row px-2 gap-5 hover:shadow-xl">
                  <div className="w-9 h-9 flex justify-center items-center rounded-lg bg-[#EFF3FA]">
                    <Book size={22} />
                  </div>
                  <div className="w-full h-full flex flex-col gap-3 text-[#4F4F4F]">
                    <h2 className="text-xl md:text-2xl">Controle de Aulas Eventuais</h2>
                    <span className="text-sm">O controle de aulas eventuais de aulas no dashboard permite registrar, editar e excluir
                      informações sobre as aulas.
                    </span>
                  </div>
                </Link>

                <Link href="/cadastro-escola" className="w-full h-auto flex flex-row px-2 gap-5 hover:shadow-xl">
                  <div className="w-9 h-9 flex justify-center items-center rounded-lg bg-[#EFF3FA]">
                    <School2 size={22} />
                  </div>
                  <div className="w-full h-full flex flex-col gap-3 text-[#4F4F4F]">
                    <h2 className="text-xl md:text-2xl">Cadastro de Escola</h2>
                    <span className="text-sm">O cadastro de escolas é uma funcionalidade essencial do 
                      projeto que permite adicionar e gerenciar informações sobre as instituições 
                      educacionais.
                    </span>
                  </div>
                </Link>

                <Link href="/cadastro-professor" className="w-full h-auto flex flex-row px-2 gap-5 hover:shadow-xl">
                  <div className="w-9 h-9 flex justify-center items-center rounded-lg bg-[#EFF3FA]">
                    <GraduationCap size={22} />
                  </div>
                  <div className="w-full h-full flex flex-col gap-3 text-[#4F4F4F]">
                    <h2 className="text-xl md:text-2xl">Cadastro de Professores</h2>
                    <span className="text-sm">Com o cadastro de professores, você pode manter um registro
                      completo dos docentes, facilitando a atribuição de disciplinas, controle de carga 
                      horária e comunicação eficiente dentro da instituição educacional.
                    </span>
                  </div>
                </Link>
              </section>

              <div className="hidden lg:block"></div>
            </div>

            <div className="w-full h-auto">
              <Image src="/dashboard.png" alt="img-dashboard" fill className="object-cover" />
            </div>
          </section>
        </div>
      </main>
    </RootLayout>
  )
}
