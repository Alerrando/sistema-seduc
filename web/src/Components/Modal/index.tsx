import { X } from "lucide-react";
import { useSelector } from "react-redux";
import { InputConfig, LessonsInfos, OfficeInfos, SchoolInfos, TeacherInfos } from "../../../slice";
import { ModalForm } from "./ModalForm";
import { ZodType, z } from "zod";
import { CreateFormDataSchool } from "../../app/(cadastros)/cadastro-escola/page";
import { CreateFormDataTeacher } from "../../app/(cadastros)/cadastro-professor/page";
import { CreateFormDataLesson } from "../../app/(cadastros)/controle-aulas-eventuais/page";
import { CreateFormDataOffice } from "../../app/admin/AsideAdmin/RegisterOffice";
import { CreateFormDataUser } from "../../app/admin/AsideAdmin/UsersList";
import { UserInfos } from "../../../slice/LoginSlide";

type ModalProps = {
	setInfosInput: (infosInput: LessonsInfos | SchoolInfos | TeacherInfos | OfficeInfos | UserInfos) => void;
	infosInput: LessonsInfos | SchoolInfos | TeacherInfos | OfficeInfos | UserInfos;
	setModal: (modal: boolean) => void;
	submitInfos: (data: CreateFormDataSchool | CreateFormDataTeacher | CreateFormDataLesson | CreateFormDataOffice | CreateFormDataUser) => void;
	title: string,
	inputs: InputConfig[],
	createFormSchema: ZodType<any, any, any>,
	modalName: string
}

export default function Modal(props: ModalProps){
	const { setInfosInput, infosInput, setModal, submitInfos, title, inputs, createFormSchema, modalName } = props;

	async function submit(data: CreateFormDataSchool | CreateFormDataTeacher | CreateFormDataLesson | CreateFormDataOffice | CreateFormDataUser){
		submitInfos(data);
	}
	
	return(
		<div className="w-screen h-auto flex items-center justify-center bg-modal fixed inset-0">
			<div className="w-auto sm:w-3/5 max-h-[90%] sm:h-auto p-3 bg-white rounded-md overflow-y-auto">
				<header className="w-full h-auto flex flex-col gap-2 p-2 after:block after:border-b after:border-[#999]">
					<div className="w-full flex flex-row items-center justify-between">
						<h2 className="text-xl md:text-3xl font-bold">{title}</h2>
						<X size={32} className="cursor-pointer" onClick={() => setModal(false)} />
					</div>
				</header>

				{modalName === "Lesson" ? (
					<div className="w-full flex flex-col sm:grid sm:grid-cols-2">
						<ModalForm inputs={inputs} setInfosInput={setInfosInput} onSubmit={submitInfos} initialValues={infosInput} schema={createFormSchema} modalName={modalName} />
					</div>
				) : (
					<ModalForm inputs={inputs} setInfosInput={setInfosInput} onSubmit={submitInfos} initialValues={infosInput} schema={createFormSchema} modalName={modalName} />
				)}
			</div>
		</div>
	);
}
