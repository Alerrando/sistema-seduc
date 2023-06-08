"use client";
import React, { useEffect } from "react";
import Modal from "@/Components/Modal";
import Table from "@/Components/Table";
import { ArrowLeft, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteInfosChange, refreshInfosLesson, LessonsInfos, HorasValuesDefault, changeRegisterType } from "../../slice";
import { RootState } from "../../system";
import { createLesson, deleteLesson, editLesson, readAllLesson } from "@/api";
import CreateHeader from "@/Components/CreateHeader";

const Calendar = dynamic(() => import("react-calendar"), { ssr: false });

export default function Home() {
	const [infosInput, setInfosInput] = useState<LessonsInfos>(HorasValuesDefault);
	const { allInfosLesson, registerType } = useSelector((slice: RootState) => slice.Slice);
	const dispatch = useDispatch();
	const [search, setSearch] = useState("");
	const [modal, setModal] = useState(false);
	const tableHead = ["Id", "Nome", "Horas de aulas dadas", "Titularidade", "Dia das aulas", "Escola","Ações"];

	useEffect(() => {
		(async () => {
			dispatch(refreshInfosLesson(await readAllLesson()));
			dispatch(changeRegisterType("Lesson"));
		})()
	}, [])

	return (
		<section className="w-full sm:w-5/6 h-max ml-auto">

			<div className="w-full flex flex-col gap-4 px-6 py-3">
				<Calendar className="w-[100%!important] h-1/2 calendar shadow-md rounded-md" value={infosInput.diaAula} onChange={e => setInfosInput({ ...infosInput, diaAula: new Date(e)})} />
				<h1 className="text-[42px]">Aulas</h1>

				{allInfosLesson != undefined ? (
					<CreateHeader setModal={setModal} setSearch={setSearch} totalRegiter={allInfosLesson.length} key={"create-header-lesson"} />
				): null}

				<div className="w-full flex justify-end">
					<div className="w-auto flex flex-row items-center gap-4">
						<ArrowLeft size={32} className="cursor-pointer" />
						<span className="text-2xl font-bold">1</span>
						<ArrowRight size={32} className="cursor-pointer" />
					</div>
				</div>

				<div className="w-full border border-[#999]">
					<Table tableHead={tableHead} editInfo={editInfo} deleteInfo={deleteInfo} infosAll={allInfosLesson} search={search} key={"Table-Cadastro"} />
				</div>
			</div>
			
			{modal ? (<Modal infosInput={infosInput} setInfosInput={setInfosInput} setModal={setModal} submitInfos={submitLesson} />) : null}
		</section>
	);

	function editInfo(infos: LessonsInfos){
		setInfosInput({ diaAula: infos.diaAula, edit: 1, horaAulas: infos.horaAulas, id: infos.id, titularidade: infos.titularidade, name: infos.name });
		
		setModal(true);
	}

	async function submitLesson(event){
		const aux: LessonsInfos = {
			diaAula: new Date(infosInput.diaAula),
			horaAulas: event.horaAulas,
			name: event.nomeProfessor,
			titularidade: event.titularidade,
			escola: event.escola,
		};
		
		if(infosInput.edit === -1){
			await createLesson(aux);
			dispatch(refreshInfosLesson(await readAllLesson()));
		}
		else{
			aux.id = infosInput.id;
			await editLesson(aux, aux.id);
			dispatch(refreshInfosLesson(await readAllLesson()));
			setInfosInput(HorasValuesDefault);
		}

		setModal(false);
	}

	async function deleteInfo(infos: LessonsInfos){
		await deleteLesson(infos.id);
		dispatch(refreshInfosLesson(await readAllLesson()));
	}
}
