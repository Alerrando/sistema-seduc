"use client";
import { format, isValid } from "date-fns";
import { Check, Eye, EyeOff, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { LessonsInfos, SchoolInfos, TeacherInfos } from "../../../../slice";
import { InfosTableRegisterData } from "../../../Components/TableRegisters";
import { UserInfos } from "../../../../slice/LoginSlice";

type ModalInactiveProps = {
    editInfo?: (info: InfosTableRegisterData, inactive: boolean) => void,
    modalName: string,
    thead: string[],
    infosAll: InfosTableRegisterData[],
}

export default function ModalInactive({ editInfo, modalName, thead, infosAll }: ModalInactiveProps){
	const [viewPassword, setViewPassword] = useState<boolean>(false);

	function renderLessonColumns(info: LessonsInfos, index: number){
		return (
			<>
				<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index + 1}</td>
				<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.registerTeacher?.name}</td>
				<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.amountTime}</td>
				<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.registerSchool?.name}</td>
				<td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
					<span className='whitespace-nowrap'>{isValid(new Date(info.lessonDay)) ? format(new Date(info.lessonDay), "dd/MM/yyyy") : ""}</span>
				</td>
			</>
		);
	}

	function renderSchoolColumns(info: SchoolInfos, index: number){
		return (
			<>
				<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index + 1}</td>
				<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.name}</td>
				<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.adress}</td>
				<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.zip}</td>
				<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.fone}</td>
				<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.email}</td>
			</>
		);
	}

	function renderTeacherColumns(info: TeacherInfos, index: number){
		return (
			<>
				<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index + 1}</td>
				<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.name}</td>
				<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.cpf}</td>
				<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.thirst?.name}</td>
				<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.office.name}</td>
			</>
		);
	}

	function renderUserColumns(info: UserInfos, index: number){
		return (
			<>
				<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index + 1}</td>
				<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.name}</td>
				<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.email}</td>
				<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.rg}</td>
				<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.office?.name}</td>
				<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.registerSchool !== null ? info.registerSchool?.name : "Não Atribuido"}</td>
				<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.mandatoryBulletin === 1 ? "Obrigatório" : "Não Obrigatório"}</td>
				<td className="flex flex-row items-center gap-2 whitespace-nowrap p-4 font-medium text-gray-900">{!viewPassword ? (
					<EyeOff size={26} className="cursor-pointer" onClick={() => setViewPassword(true)} />
				) : (
					<>
						{info.password}
						<Eye size={26} className="cursor-pointer" onClick={() => setViewPassword(false)} />
					</>
				)}</td>
			</>
		);
	}

	function renderOtherColumns(info: InfosTableRegisterData, index: number){
		return (
			<>
				<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index + 1}</td>
				<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{"name" in info && info.name}</td>
				<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{"type" in info && info.type === "1" ? "Usuário" : "Professor"}</td>
			</>
		);
	}

	return(
		<table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
			<thead className="ltr:text-left rtl:text-right">
				<tr>
					{thead.map(head => <th key={head} scope="col" className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">{head}</th>)}
				</tr>
			</thead>
			<tbody className="divide-y divide-gray-200">
				{infosAll !== null && infosAll.map((info: InfosTableRegisterData, index: number) => (
					<>
						{info.inactive === true && (
							<tr key={`${info.id}-${index}`}>
								{modalName === "Lesson" && "registerTeacher" in info && "registerSchool" in info ? 
									renderLessonColumns(info, index) :
									modalName === "School" && "name" in info && "adress" in info && "zip" in info && "fone" in info && "email" in info ? 
										renderSchoolColumns(info, index) 
										: modalName === "Teacher" && "thirst" in info ? 
											renderTeacherColumns(info, index) 
											: modalName === "User" && "name" in info && "email" in info && "rg" in info && "office" in info && "password" in info && "registerSchool" in info && "mandatoryBulletin" in info ?
												renderUserColumns(info, index) : renderOtherColumns(info, index)
								}
								<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
									<div 
										className="h-10 w-10 flex items-center justify-center rounded-full bg-green-600 text-white hover:bg-green-700 cursor-pointer"
										onClick={() => editInfo(info, true)}
									>
										<Check size={28} />
									</div>
								</td>
								<td className="">
									<div className="flex flex-row gap-4 items-center justify-between">
										<div className="flex items-center gap-2 px-2 py-1 border border-blue-500 text-blue-500 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white transition-colors" onClick={() => editInfo(info)}>
											<Pencil size={18} />
											<span>Edit</span>
										</div>
										<div className="flex items-center gap-2 px-2 py-1 border border-red-500 text-red-500 rounded-lg cursor-pointer hover:bg-red-500 hover:text-white transition-colors" onClick={() => deleteInfo(info)}>
											<Trash size={18} />
											<span>Delete</span>
										</div>
									</div>
								</td>
							</tr>
						)}
					</>
				))}
			</tbody>
		</table>
	);
}