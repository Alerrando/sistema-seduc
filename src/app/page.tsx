"use client";
import React from "react";
import Modal from "@/Components/Modal";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight, Pencil, Plus, Search, Trash } from "lucide-react";
import dynamic from "next/dynamic";
import { Key, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { HorasInfos, deleteInfosChange } from "../../slice";
import { RootState } from "../../system";

const Calendar = dynamic(() => import("react-calendar"), { ssr: false });

export default function Home() {
	const [infosInput, setInfosInput] = useState<HorasInfos>({
		diaAula: new Date().toString(),
		edit: -1,
		horaAulas: 0,
		id: 0,
		nomeProfessor: "",
		titularidade: "",
	} as HorasInfos);
	const allInfos = useSelector(({ Slice }: RootState) => Slice.allInfos);
	const dispatch = useDispatch();
	const [search, setSearch] = useState("");
	const [modal, setModal] = useState(false);

	return (
		<section className="w-5/6 h-max ml-auto">
			<Calendar className="w-[100%!important] h-1/2 calendar shadow-md rounded-md" value={infosInput.diaAula} onChange={e => setInfosInput({ ...infosInput, diaAula: new Date(e).toString()})} />

			<div className="w-full flex flex-col gap-4 px-6 py-3">
				<h1 className="text-5xl">Aulas</h1>

				<div className="h-auto border border-[#DDD] rounded-lg">
					<header className="flex items-center justify-between px-5 py-4">
						<div className="flex flex-row items-center gap-2 py-2 px-4 border border-[#22C55E] text-[#22C55E] cursor-pointer rounded-lg group hover:bg-[#22C55E] transition-colors" 
							onClick={() => setModal(true)}
						>
							<Plus size={26} className="group-hover:text-white" />
							<span className="text-lg group-hover:text-white">Cadastro</span>
						</div>

						<div className="flex flex-row items-center gap-2 px-3 py-2 border border-zinc-500 rounded-full">
							<Search size={26} />
							<input type="text" className="w-full outline-none border-none" onChange={e => setSearch(e.target.value)} />
						</div>

						<div className="flex flex-row items px-4 py-2 bg-principal text-white rounded-lg">
							<span>Total de registros: {allInfos.length}</span>
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
							{allInfos.filter((register) => Object.values(register.nomeProfessor).join("").toLowerCase().includes(search.toLowerCase()))
								.map((info: HorasInfos, index: Key) => {

									return (
										<tr key={index}>
											<th scope="row" className="p-1 text-start border border-[#999]">{info.id + 1}</th>
											<th scope="row" className="p-1 text-start border border-[#999]">{info.nomeProfessor}</th>
											<th scope="row" className="p-1 text-start border border-[#999]">{info.horaAulas}</th>
											<th scope="row" className="p-1 text-start border border-[#999]">{info.titularidade}</th>
											{/* eslint-disable */}
											<th scope="row" className="p-1 text-start border border-[#999]">
												{format(new Date(info.diaAula), "dd/MM/yyyy")}
											</th>
											{/* eslint-enable */}
											<th scope="row" className="flex items-center justify-between p-1 text-start border-x border-t border-[#999]">
												<div className="w-auto flex flex-row items-center gap-2 px-2 py-1 border border-blue-500 text-blue-500 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white transition-colors"
													onClick={() => editInfo(info)} 
												>
													<Pencil size={18}/>
													<span>Edit</span>
												</div>

												<div 
													className="w-auto flex flex-row items-center gap-2 px-2 py-1 border border-red-500 text-red-500 rounded-lg cursor-pointer hover:bg-red-500 hover:text-white transition-colors"
													onClick={() => deleteInfo(info)}
												>
													<Trash size={18} />
													<span>Delete</span>
												</div>
											</th>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
			</div>
			
			{modal ? (<Modal infosInput={infosInput} setInfosInput={setInfosInput} setModal={setModal} />) : null}
		</section>
	);

	function editInfo(infos: HorasInfos){
		setInfosInput({ diaAula: infos.diaAula, edit: 1, horaAulas: infos.horaAulas, id: infos.id, titularidade: infos.titularidade, nomeProfessor: infos.nomeProfessor });
		setModal(true);
	}

	function deleteInfo(infos: HorasInfos){
		dispatch(deleteInfosChange(infos));
	}
}
