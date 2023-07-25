import { Switch } from "@headlessui/react";
import { format, isValid } from "date-fns";
import { Pencil, Trash } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../configureStore";
import { LessonsInfos, OfficeInfos, SchoolInfos, TeacherInfos, refreshInfosSchool, refreshInfosTeacher } from "../../../slice";
import { readAllSchool, readAllTeacher } from "../../api";

export type InfosTableRegisterData = LessonsInfos | SchoolInfos | TeacherInfos | OfficeInfos;

type TableRegistersProps = {
  tableHead: string[],
  editInfo: (info: InfosTableRegisterData) => void,
  deleteInfo: (info: InfosTableRegisterData) => void,
  infosAll: InfosTableRegisterData[],
}

export default function TableRegisters(props: TableRegistersProps) {
	const { tableHead, editInfo, deleteInfo, infosAll } = props;
	const { registerType } = useSelector((root: RootState) => root.Slice);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		(async () => {
			dispatch(refreshInfosSchool(await readAllSchool()));
			dispatch(refreshInfosTeacher(await readAllTeacher()));
		})();
	}, []);

	console.log(infosAll);

  
	function renderLessonColumns(info: LessonsInfos, index: number){
		return (
			<>
				<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index + 1}</td>
				<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.registerTeacher.name}</td>
				<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.amountTime}</td>
				<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{info.registerSchool.name}</td>
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

	return (
		<div className="overflow-x-auto border border-gray-200">
			<table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
				<thead className="ltr:text-left rtl:text-right">
					<tr>
						{tableHead.map(head => <th key={head} scope="col" className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">{head}</th>)}
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					{infosAll !== null && infosAll.map((info: InfosTableRegisterData, index: number) => (
						<>
							{info.inactive === false && (
								<tr key={`${info.id}-${index}`}>
									{registerType === "Lesson" && "registerTeacher" in info && "registerSchool" in info ? 
										renderLessonColumns(info, index)
										: registerType === "School" && "name" in info && "adress" in info && "zip" in info && "fone" in info && "email" in info ? 
											renderSchoolColumns(info, index) 
											: registerType === "Teacher" && "thirst" in info ? 
												renderTeacherColumns(info, index)  : renderOtherColumns(info, index)
									}
									<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
										<Switch
											checked={info.inactive}
											onClick={() => editInfo(info, true)}
											className={`${info.inactive ? "bg-teal-900" : "bg-teal-700"}
                        relative inline-flex h-[26px] w-[60px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
										>
											<span className="sr-only">Inatividade</span>
											<span
												aria-hidden="true"
												className={`${info.inactive ? "translate-x-9" : "translate-x-0"}
                          pointer-events-none inline-block h-[22px] w-[22px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
											/>
										</Switch>
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
		</div>
	);
}
