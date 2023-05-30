import { Plus, X } from "lucide-react";
import React from "react";
import dynamic from "next/dynamic";

type ModalProps = {
	setModal: (modal: boolean) => void;
	date: Date;
	setDate: (date: Date) => void;
}

const Calendar = dynamic(() => import("react-calendar"), { ssr: false });

export default function Modal({ setModal, date, setDate }: ModalProps){
	return(
		<div className="w-screen h-screen flex items-center justify-center bg-modal fixed inset-0">
			<div className="w-3/5 h-1/2 p-3 bg-white">
				<header className="w-full h-auto flex flex-col gap-2 p-2 after:block after:border-b after:border-[#999]">
					<div className="w-full flex flex-row items-center justify-between">
						<h2 className="text-3xl font-bold">Cadastro</h2>
						<X size={32} className="cursor-pointer" onClick={() => setModal(false)} />
					</div>
				</header>

				<div className="w-full grid grid-cols-2">
					<Calendar className="w-[100%!important] calendar shadow-md rounded-md" value={date} onChange={e => setDate(e)} />

					<form className="w-full flex flex-col gap-8 py-2 px-4">
						<div className="w-full flex flex-row items-center justify-between">
							<div className="w-auto flex flex-row items-center gap-2">
								<input type="radio" name="titularidade" className="w-4 h-4" id="titular" value="Titular" />
								<span className="text-xl font-bold">Titular</span>
							</div>

							<div className="w-auto flex flex-row items-center gap-2">
								<input type="radio" name="titularidade" className="w-4 h-4" id="titular" value="Substituo" />
								<span className="text-xl font-bold">Substituo</span>
							</div>
						</div>

						<div className="w-full flex flex-col gap-3">
							<div className="w-full flex flex-col gap-2 px-2">
								<label htmlFor="professores" className="font-bold">Professores</label>
								<select name="professores" id="" className="border border-[#999] rounded-lg p-2 outline-none text-[#bfbfbf]">
									<option value="" defaultChecked className="outline-none border-none">Selecione um Professor</option>
								</select>
							</div>

							<div className="w-full flex flex-col gap-2 px-2">
								<label htmlFor="horas-aulas" className="font-bold">Horas de aula dadas</label>
								<input type="text" placeholder="1" className="border border-[#999] rounded-lg p-2 outline-none text-[#bfbfbf]" />
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
}