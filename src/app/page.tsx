"use client";
import "react-calendar/dist/Calendar.css";
import { ArrowLeft, ArrowRight, Pencil, Plus, Search, Trash } from "lucide-react";
import React, { Key, useState } from "react";
import dynamic from "next/dynamic";
import Modal from "@/Components/Modal";

const Calendar = dynamic(() => import("react-calendar"), { ssr: false });

type HorasInfos = {
	id: number;
	nome: string;
	horaAulas: number;
	titularidade: string;
	diaAula: Date;
}

export default function Home() {
	const [date, setDate] = useState<Date>(new Date());
	const [allInfos, setAllInfos] = useState<HorasInfos[]>([
		{
			id: 1,
			nome: "Alerrando",
			titularidade: "Titular",
			diaAula: new Date(),
			horaAulas: 6,
		},
	] as HorasInfos[]);
	const [modal, setModal] = useState(false);

	return (
		<section className="w-5/6 h-max ml-auto">
			<Calendar className="w-[100%!important] h-1/2 calendar shadow-md rounded-md" value={date} onChange={e => setDate(e)} />

			<div className="w-full flex flex-col gap-4 px-6 py-3">
				<h1 className="text-5xl">Aulas</h1>

				<div className="h-auto border border-[#DDD] rounded-lg">
					<header className="flex items-center justify-between px-5 py-4">
						<div className="flex flex-row items-center gap-2 py-2 px-4 border border-[#22C55E] text-[#22C55E] cursor-pointer rounded-lg group hover:bg-[#22C55E] transition-colors" onClick={() => setModal(true)}>
							<Plus size={26} className="group-hover:text-white" />
							<span className="text-lg group-hover:text-white">Cadastro</span>
						</div>

						<div className="flex flex-row items-center gap-2 px-3 py-2 border border-zinc-500 rounded-full">
							<Search size={26} />
							<input type="text" className="w-full outline-none border-none" />
						</div>

						<div className="flex flex-row items px-4 py-2 bg-principal text-white rounded-lg">
							<span>Total de registros: 100</span>
						</div>
					</header>
				</div>

				<div className="w-full flex justify-end">
					<div className="w-auto flex flex-row items-center gap-4">
						<ArrowLeft size={32} className="cursor-pointer" />
						<span className="text-2xl font-bold">1</span>
						<ArrowRight size={32} className="cursor-pointer" />
					</div>
				</div>

				<div className="w-full border border-[#999]">
					<table className="w-full">
						<thead>
							<tr>
								<th scope="col" className="p-1 text-start border border-[#999]">Id</th>
								<th scope="col" className="p-1 text-start border border-[#999]">Nome</th>
								<th scope="col" className="p-1 text-start border border-[#999]">Horas de aulas dadas</th>
								<th scope="col" className="p-1 text-start border border-[#999]">Titularidade</th>
								<th scope="col" className="p-1 text-start border border-[#999]">Dia das aulas</th>
								<th scope="col" className="p-1 text-start border border-[#999]">Ações</th>
							</tr>
						</thead>

						<tbody>
							{allInfos.map((info: HorasInfos, index: Key) => (
								<tr key={index}>
									<th scope="row" className="p-1 text-start border border-[#999]">{info.id}</th>
									<th scope="row" className="p-1 text-start border border-[#999]">{info.nome}</th>
									<th scope="row" className="p-1 text-start border border-[#999]">{info.horaAulas}</th>
									<th scope="row" className="p-1 text-start border border-[#999]">{info.titularidade}</th>
									<th scope="row" className="p-1 text-start border border-[#999]">{info.diaAula.getUTCDate()}</th>
									<th scope="row" className="flex items-center justify-between p-1 text-start border-x border-t border-[#999]">
										<div className="w-1/3 flex flex-row items-center gap-2 px-2 py-1 border border-blue-500 text-blue-500 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white transition-colors">
											<Pencil size={18} />
											<span>Edit</span>
										</div>

										<div className="w-1/3 flex flex-row items-center gap-2 px-2 py-1 border border-red-500 text-red-500 rounded-lg cursor-pointer hover:bg-red-500 hover:text-white transition-colors">
											<Trash size={18} />
											<span>Delete</span>
										</div>
									</th>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			
			{modal ? (<Modal setModal={setModal} date={date} setDate={setDate} />) : null}
		</section>
	);
}
