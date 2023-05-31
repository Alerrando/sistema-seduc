import React, { useEffect } from "react";
import { parse } from "date-fns";
import { Plus, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { HorasInfos, addInfos, editInfosChange } from "../../../slice";
import { RootState } from "../../../system";

type ModalProps = {
	setInfosInput: (infosInput: HorasInfos) => void;
	infosInput: HorasInfos;
	setModal: (modal: boolean) => void;
}

const Calendar = dynamic(() => import("react-calendar"), { ssr: false });

export default function Modal(props: ModalProps){
	const { setInfosInput, infosInput, setModal } = props;
	const allInfos = useSelector(({ Slice }: RootState) => Slice.allInfos);
	const { register, handleSubmit, setValue } = useForm<HorasInfos>();
	const dispatch = useDispatch();

	useEffect(() => {
		if (infosInput.edit !== -1) {
			const parsedDate = parse(infosInput.diaAula, "dd/MM/yyyy", new Date());
			setValue("diaAula", parsedDate);
			setValue("horaAulas", infosInput.horaAulas);
			setValue("nomeProfessor", infosInput.nomeProfessor);
			setValue("titularidade", infosInput.titularidade);
		}
	}, [infosInput.edit]);

	return(
		<div className="w-screen h-screen flex items-center justify-center bg-modal fixed inset-0">
			<div className="w-3/5 h-auto p-3 bg-white">
				<header className="w-full h-auto flex flex-col gap-2 p-2 after:block after:border-b after:border-[#999]">
					<div className="w-full flex flex-row items-center justify-between">
						<h2 className="text-3xl font-bold">Cadastro</h2>
						<X size={32} className="cursor-pointer" onClick={() => setModal(false)} />
					</div>
				</header>

				<div className="w-full flex flex-col sm:grid sm:grid-cols-2">
					<Calendar className="w-[100%!important] calendar shadow-md rounded-md" value={infosInput.diaAula} onChange={e => setInfosInput({ ...infosInput, diaAula: new Date(e).toString()})}  />

					<form className="w-full flex flex-col gap-8 py-2 px-4" onSubmit={handleSubmit(submit)}>
						<div className="w-full flex flex-row items-center justify-between">
							<div className="w-auto flex flex-row items-center gap-2">
								<input type="radio" name="titularidade" className="w-4 h-4" id="titular" value="Titular" { ...register("titularidade") } />
								<span className="text-xl font-bold">Titular</span>
							</div>

							<div className="w-auto flex flex-row items-center gap-2">
								<input type="radio" name="titularidade" className="w-4 h-4" id="titular" value="Substituo" { ...register("titularidade") } />
								<span className="text-xl font-bold">Substituo</span>
							</div>
						</div>

						<div className="w-full flex flex-col gap-3">
							<div className="w-full flex flex-col gap-2 px-2">
								<label htmlFor="professores" className="font-bold">Professores</label>
								<select name="nomeProfessor" id="" className="border border-[#999] rounded-lg p-2 outline-none" { ...register("nomeProfessor") }>
									<option value="" defaultChecked className="outline-none border-none">Selecione um Professor</option>
									<option value="Alerrando" className="outline-none border-none">Alerrando</option>
									<option value="Breno" className="outline-none border-none">Breno</option>
								</select>
							</div>

							<div className="w-full flex flex-col gap-2 px-2">
								<label htmlFor="horas-aulas" className="font-bold">Horas de aula dadas</label>
								<input type="text" placeholder="1" name="horaAulas" className="border border-[#999] rounded-lg p-2 outline-none" { ...register("horaAulas") } />
							</div>
						</div>

						<div className="w-full flex items-center justify-end">
							<button type="submit" className="flex flex-row items-center gap-2 py-2 px-4 border border-[#22C55E] text-[#22C55E] cursor-pointer rounded-lg group hover:bg-[#22C55E] transition-colors" onClick={() => setModal(true)}>
								<Plus size={26} className="group-hover:text-white" />
								<span className="text-lg group-hover:text-white">Cadastro</span>
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);

	function submit(event){
		const aux: HorasInfos = {
			diaAula: new Date(infosInput.diaAula).toString(),
			horaAulas: event.horaAulas,
			nomeProfessor: event.nomeProfessor,
			titularidade: event.titularidade,
		};
		
		if(infosInput.edit === -1){
			aux.edit = allInfos.length;
			dispatch(addInfos(aux));
		}
		else{
			aux.id = infosInput.id;
			dispatch(editInfosChange(aux));
		}

		setModal(false);
	}
}