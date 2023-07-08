import { X } from "lucide-react";
import { useSelector } from "react-redux";
import { InputConfig, SchoolInfos, TeacherInfos } from "../../../slice";
import { RootState } from "../../../system";
import FormRegisterLesson from "./FormRegisterLesson";
import FormRegisterSchool from "./FormRegisterSchool";
import FormRegisterTeacher from "./FormRegisterTeacher";
import Calendar from "react-calendar";
import { ModalForm } from "./ModalForm";
import { ZodTypeAny } from "zod";

type ModalProps = {
	setInfosInput: (infosInput: LessonsInfos | SchoolInfos | TeacherInfos) => void;
	infosInput: LessonsInfos | SchoolInfos | TeacherInfos;
	setModal: (modal: boolean) => void;
	submitInfos: (e) => void;
	title: string,
	inputs: InputConfig[],
	createFormSchema: ZodTypeAny
}

export default function Modal(props: ModalProps){
	const { setInfosInput, infosInput, setModal, submitInfos, title, inputs, createFormSchema } = props;
	const { registerType } = useSelector((slice: RootState) => slice.Slice)

	async function submit(event){
		submitInfos(event);
	}

	console.log(inputs);
	
	return(
		<div className="w-screen h-auto flex items-center justify-center bg-modal fixed inset-0">
			<div className="w-auto sm:w-3/5 max-h-[90%] sm:h-auto p-3 bg-white overflow-y-auto">
				<header className="w-full h-auto flex flex-col gap-2 p-2 after:block after:border-b after:border-[#999]">
					<div className="w-full flex flex-row items-center justify-between">
						<h2 className="text-xl md:text-3xl font-bold">{title}</h2>
						<X size={32} className="cursor-pointer" onClick={() => setModal(false)} />
					</div>
				</header>


				{registerType === "Lesson" ? (
					<div className="w-full flex flex-col sm:grid sm:grid-cols-2">
						<Calendar className="w-[100%!important] calendar shadow-md rounded-md calendar" value={infosInput.diaAula} onChange={e => setInfosInput({ ...infosInput, diaAula: new Date(e).toString()})}  />
						<ModalForm inputs={inputs} onSubmit={submitInfos} onClose={setModal} initialValues={infosInput} schema={createFormSchema} key={"modal-lesson"} />
					</div>
				) : registerType === "School" ? (
					<div className="w-full flex flex-col sm:grid">
						<ModalForm inputs={inputs} onSubmit={submitInfos} onClose={setModal} initialValues={infosInput} schema={createFormSchema} key={"modal-school"} />
					</div>
				) : (
					<ModalForm inputs={inputs} onSubmit={submitInfos} onClose={setModal} initialValues={infosInput} schema={createFormSchema} key={"teacher-school"} />
				)}
			</div>
		</div>
	);

}
