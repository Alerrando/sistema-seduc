"use client";
import { format, isValid } from "date-fns";
import { ClipboardList } from "lucide-react";
import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import { AppDispatch, RootState } from "../../../../configureStore";
import { HorasValuesDefault, InputConfig, LessonsInfos, TeacherInfos, changeRegisterType, refreshInfosLesson } from "../../../../slice";
import CreateHeaderRegisters from "../../../Components/CreateHeaderRegisters";
import Modal, { SubmitDataModal } from "../../../Components/Modal";
import TableRegisters, { InfosTableRegisterData } from "../../../Components/TableRegisters";
import { createLesson, deleteLesson, editLesson, getIdSchool, getNameByIdTeacher, readAllLesson } from "../../../api";
import RootLayout from "../../../app/layout";
import { AxiosError } from "axios";

const createFormSchema = z.object({
	amountTime: z.string().nonempty("Digite a quantidade de aulas!"),
	registerTeacher: z.string().nonempty("Selecione um professor ou adicione!"),
	registerSchool: z.string().nonempty("Selecione uma escola ou adicione!"),
});

export type CreateFormDataLesson = z.infer<typeof createFormSchema>

export default function ControleAulasEventuais() {
	const [infosInput, setInfosInput] = useState<LessonsInfos>(HorasValuesDefault);
	const { allInfosLesson, allInfosTeacher } = useSelector((slice: RootState) => slice.Slice);
	const { infosDefinitionPeriods } = useSelector((root: RootState) => root.Slice);
	const dispatch = useDispatch<AppDispatch>();
	const [search, setSearch] = useState("");
	const [modal, setModal] = useState(false);
	const [lessonsLengthall, setLessonsLengthall] = useState(0);
	const tableHead = ["Id", "Nome Completo", "Horas de aulas dadas", "Escola",  "Dia da aula", "Ações"];
	const inputs: InputConfig[] = [
		{
			type: "string",
			htmlFor: "registerTeacher",
			label: "Professores",
			name: "registerTeacher",
			optionDefault: "Selecione um Professor",
			optionType: "Teacher",
			input: "select"
		},

		{
			type: "string",
			htmlFor: "registerSchool",
			label: "Escola",
			name: "registerSchool",
			optionDefault: "Selecione uma Escola",
			optionType: "School",
			input: "select"
		},

		{
			htmlFor: "amount-time",
			input: "input",
			label: "Horas de aula dadas",
			name: "amountTime",
			placeholder: "1",
			type: "string",
		},
	];

	useEffect(() => {
		(async () => {
			dispatch(changeRegisterType("Lesson"));
			setLessonsLengthall(await readAllLesson().then((data) => data?.length));
		})();
	}, []);

	return (
		<RootLayout showHeaderAside>
			<section className="w-full sm:w-5/6 h-max ml-auto">
				<div className="w-full flex flex-col gap-4 px-6 py-3">
					<h1 className="text-[27px] md:text-[42px]">Controle de Aulas Eventuais</h1>

					{allInfosLesson != undefined ? (
						<CreateHeaderRegisters setModal={setModal} setSearch={setSearch} totalRegiter={lessonsLengthall} key={"create-header-lesson"} />
					) : null}

					<div className="w-full flex items-center justify-between">
						<div className="w-auto h-auto flex flex-row gap-3">
							<div className="w-auto h-auto flex flex-row items-center gap-3 px-2">
								<p className="text-base">Período Inicial de Cadastro:</p>

								<div className="w-auto h-full flex p-2 border border-[#cfcfcf] rounded shadow-lg">
									<span>
										{infosDefinitionPeriods?.length > 0 && isValid(new Date(infosDefinitionPeriods[0]?.startDate))
											? format(new Date(infosDefinitionPeriods[0]?.startDate), "dd/MM/yyyy")
											: ""}
									</span>
								</div>
							</div>

							<div className="w-[2px] h-auto bg-[#dfdfdf]"></div>

							<div className="w-auto h-auto flex flex-row items-center gap-3 px-2">
								<p className="text-base">Período Final de Cadastro:</p>

								<div className="w-auto h-full flex p-2 border border-[#cfcfcf] rounded shadow-lg">
									<span>
										{infosDefinitionPeriods?.length > 0 && isValid(new Date(infosDefinitionPeriods[0]?.endDate))
											? format(new Date(infosDefinitionPeriods[0]?.endDate), "dd/MM/yyyy")
											: ""}
									</span>
								</div>
							</div>
						</div>

						<div className="w-auto h-full flex items-center justify-center">
							<ClipboardList size={26} className="cursor-pointer" />
						</div>
					</div>

					<div className="w-full border border-[#999]">
						<TableRegisters tableHead={tableHead} editInfo={editInfo} deleteInfo={deleteInfo} infosAll={allInfosLesson} key={"Table-Cadastro"} />
					</div>
				</div>

				{modal ? (
					<Modal 
						infosInput={infosInput} 
						setInfosInput={setInfosInput} 
						setModal={setModal} 
						submitInfos={submitLesson} 
						title="Controle de Aulas Eventuais" 
						inputs={inputs} 
						createFormSchema={createFormSchema} 
						modalName="Lesson"
						key={"modal-controle-aulas-eventuais"}
					/>
				) : null}

				<ToastContainer />
			</section>
		</RootLayout>
	);

  
	async function submitLesson(data: SubmitDataModal) {
		if("amountTime" in data && "registerTeacher" in data && "registerSchool" in data){
			let message: AxiosError | string;
			const { registerSchool, registerTeacher, ...rest} = data;
			const schoolLesson = await getIdSchool(registerSchool);
			const teacherLesson = await getNameByIdTeacher(registerTeacher);
      
			const aux: LessonsInfos = {
				id: infosInput.id,
				lessonDay: new Date(infosInput.lessonDay),
				edit: false,
				registerSchool: schoolLesson,
				registerTeacher: teacherLesson,
				...rest,
			};

			if (!infosInput.edit) {
				message = await createLesson(aux, aux.registerSchool.id, aux.registerTeacher.id);
          
			} else {
				aux.id = infosInput.id;
				message = await editLesson(aux, aux.registerSchool.id, aux.registerTeacher.id);
				setModal(false);
			}
      
			dispatch(refreshInfosLesson(await readAllLesson()));
			messageToast(message);
			setInfosInput(HorasValuesDefault);
			setLessonsLengthall(await readAllLesson().then((data) => data.length));
		}
	}
  
	async function editInfo(info: InfosTableRegisterData, inactive = false) {
		if("amountTime" in info && "registerTeacher" in info && "registerSchool" in info){
			if(!inactive){
				const { ...rest } = info;
				const aux = {
					...rest,
					edit: true,
				};
        
				setInfosInput(aux);
				setModal(true);
			}
			else{
				const { inactive, ...rest } = info;
				const aux = { inactive: !inactive, ...rest };
				await editLesson(aux, aux.registerSchool.id, aux.registerTeacher.id);
				dispatch(refreshInfosLesson(await readAllLesson()));
			}
		}
	}

	async function deleteInfo(info: InfosTableRegisterData) {
		if("amountTime" in info && "registerTeacher" in info && "registerSchool" in info){
			if(window.confirm(`Deseja deletar a aula do professor ${getNameTeacher(info.registerTeacher)} no dia ${format(new Date(info.diaAula), "dd/MM/yyyy")}?`)){
				const message = await deleteLesson(info.id);
				messageToast(message);
				dispatch(refreshInfosLesson(await readAllLesson()));
			}
		}
	}

	function getNameTeacher(id: string){
		let aux = "";
		allInfosTeacher?.forEach((teacher: TeacherInfos) => {
			if(String(teacher.id) == id){
				aux = teacher.name;
			}
		});

		return aux;
	}

	function messageToast(message: AxiosError | string){
		if(typeof message !== "object"){
			toast.success(message, {
				position: "bottom-left",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}
		else{
			toast.error(message.response.data, {
				position: "bottom-left",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}
	}
}
