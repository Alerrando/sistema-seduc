import { X } from "lucide-react";
import { useSelector } from "react-redux";
import { InputConfig, OfficeInfos, SchoolInfos, TeacherInfos } from "../../../slice";
import { RootState } from "../../../system";
import FormRegisterLesson from "./FormRegisterLesson";
import FormRegisterSchool from "./FormRegisterSchool";
import FormRegisterTeacher from "./FormRegisterTeacher";
import { ModalForm } from "./ModalForm";
import { ZodTypeAny, z } from "zod";

type ModalProps = {
	setInfosInput: (infosInput: LessonsInfos | SchoolInfos | TeacherInfos | OfficeInfos) => void;
	infosInput: LessonsInfos | SchoolInfos | TeacherInfos | OfficeInfos;
	setModal: (modal: boolean) => void;
	submitInfos: (e) => void;
	title: string,
	inputs: InputConfig[],
	createFormSchema: ZodTypeAny,
	modalName: string
}

export default function Modal(props: ModalProps){
	const { setInfosInput, infosInput, setModal, submitInfos, title, inputs, createFormSchema, modalName } = props;

	async function submit(event: ZodTypeAny){
		submitInfos(event);
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
					<ModalForm inputs={inputs} onSubmit={submitInfos} initialValues={infosInput} schema={createFormSchema} />
				)}
			</div>
		</div>
	);
}
