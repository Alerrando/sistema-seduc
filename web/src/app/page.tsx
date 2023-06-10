"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readAllLesson, readAllSchool } from "@/api";
import dynamic from "next/dynamic";
import { refreshInfosSchool } from "../../slice";
import "react-calendar/dist/Calendar.css";
import BarChart from "@/Components/BarChart";
import DoughnutChartChart from "@/Components/DoughnutChart";

const Calendar = dynamic(() => import("react-calendar"), { ssr: false });

export default function Home() {
  const [pagination, setPagination] = useState(0);
  const dispatch = useDispatch();
  const [dataCalendar, setDataCalendar] = useState(new Date().toString());
  const dataBar = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [
      {
        label: 'Vendas',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const dataDoughnut = {
    labels: [
      'Escola Municipal',
      'Escola Estadual',
      'Creche'
    ],
    datasets: [{
      label: 'Escolas',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

  useEffect(() => {
    (async () => {
      setPagination(await readAllLesson().then((data) => data.length))
      dispatch(refreshInfosSchool(await readAllSchool()));
    })()
  }, [])


  return(
    <main className="w-full md:w-5/6 h-full ml-auto">
      <div className="w-full h-full flex flex-col md:flex-row gap-5 py-3">
        <section className="w-full h-full flex flex-col gap-12 px-6">
          <header className="w-full h-auto flex flex-col gap-2 items-start">
            <h1 className="text-3xl md:text-4xl">Bem vindo Alerrando!</h1>
            <p className="text-base text-[#5a5a5a]">É bom vê-lo novamente.</p>
          </header>

          <section className="w-full h-auto flex flex-col gap-12">
            <BarChart data={dataBar} />

            <div className="w-full h-auto grid md:justify-between md:flex md:flex-row gap-3">
              <div className="w-full md:w-52 h-28 flex flex-col justify-center gap-2 rounded-2xl bg-[#F5F5F7] pl-5">
                <h2 className="font-bold text-2xl">11</h2>
                <span className="text-base md:text-sm">Quantidade de Aulas</span>
              </div>

              <div className="w-full md:w-52 h-28 flex flex-col justify-center gap-2 rounded-2xl bg-[#F5F5F7] pl-5">
                <h2 className="font-bold text-2xl">11</h2>
                <span className="text-base md:text-sm">Quantidade de Escolas</span>
              </div>

              <div className="w-full md:w-52 h-28 flex flex-col justify-center gap-2 rounded-2xl bg-[#F5F5F7] pl-5">
                <h2 className="font-bold text-2xl">11</h2>
                <span className="text-base md:text-sm">Quantidade de Professores</span>
              </div>
            </div>
          </section>


        </section>
      </div>
    </main>
  )
}
