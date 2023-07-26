import { Check, Pencil, Trash } from "lucide-react";
import { SchoolInfos, TeacherInfos } from "../../../../slice";
import { InfosTableRegisterData } from "../../../Components/TableRegisters";

type ModalInactiveProps = {
    editInfo?: (info: InfosTableRegisterData, inactive: boolean) => void,
    modalName: string,
    thead: string[],
    infosAll: InfosTableRegisterData[],
}

export default function ModalInactive({ editInfo, modalName, thead, infosAll }: ModalInactiveProps){

	console.log(infosAll);

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
				<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.thirst.name}</td>
				<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.office}</td>
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
								{modalName === "School" && "name" in info && "adress" in info && "zip" in info && "fone" in info && "email" in info ? 
									renderSchoolColumns(info, index) 
									: modalName === "Teacher" && "thirst" in info ? 
										renderTeacherColumns(info, index)  : renderOtherColumns(info, index)
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