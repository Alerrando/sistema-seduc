"use client";
import { ClipboardList } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import { AppDispatch, RootState } from "../../../../configureStore";
import { InputConfig, OfficeInfos, SchoolInfos, TeacherInfos, TeacherValuesDefault, changeRegisterType, refreshInfosOffice, refreshInfosTeacher } from "../../../../slice";
import CreateHeaderRegisters from "../../../Components/CreateHeaderRegisters";
import Modal, { SubmitDataModal } from "../../../Components/Modal";
import TableRegisters, { InfosTableRegisterData } from "../../../Components/TableRegisters";
import { createTeacher, deleteTeacher, editTeacher, getIdSchool, getOfficeById, getRegisterOffice, readAllTeacher } from "../../../api";
import RootLayout from "../../../app/layout";
import { isValidCPF, maskCPF } from "../../../utils/maskUtils";
import { AxiosError } from "axios";

const createFormSchema = z.object({
	name: z.string().nonempty("Nome é obrigatório!"),
	cpf: z.string().max(15).refine((value) => isValidCPF(value), {
		message: "CPF inválido",
	}),
	thirst: z.string().nonempty("Selecione qual a sede"),
	office: z.string().nonempty("Selecione qual o cargo"),
});

export type CreateFormDataTeacher = z.infer<typeof createFormSchema>

export default function CadastroProfessor() {
	const { allInfosTeacher } = useSelector((root: RootState) => root.Slice);
	const [infosInput, setInfosInput] = useState<TeacherInfos>(TeacherValuesDefault);
	const [search, setSearch] = useState("");
	const [modalInactive, setModalInactive] = useState<boolean>(false);
	const [modal, setModal] = useState<boolean>(false);
	const thead = ["Id", "Nome do Professor(a)", "Cpf", "Sede", "Cargo", "Ações"];
	const dispatch = useDispatch<AppDispatch>();
	const inputs: InputConfig[] = [
		{
			htmlFor: "name",
			label: "Nome do Professor",
			name: "name",
			placeholder: "Ana Laura",
			type: "text",
			input: "input",
		},

		{
			htmlFor: "cpf",
			label: "Cpf do Professor",
			name: "cpf",
			placeholder: "000.000.000-00",
			type: "text",
			input: "input",
			maxChars: 14,
			maskHandleForm: maskCPF,
		},

		{
			type: "text",
			htmlFor: "thirst",
			label: "Sede",
			name: "thirst",
			optionDefault: "Selecione uma Sede",
			optionType: "School",
			input: "select",
		},

		{
			type: "text",
			htmlFor: "office",
			label: "Cargo",
			name: "office",
			optionDefault: "Selecione o cargo",
			optionType: "OfficeTeacher",
			input: "select",
		},
	];

	useEffect(() => {
		(async () => {
			dispatch(refreshInfosTeacher(await readAllTeacher()));
			dispatch(changeRegisterType("Teacher"));
			const allInfos: OfficeInfos[] | string = await getRegisterOffice();
			if (allInfos !== undefined && typeof allInfos !== "string") {
				const sortedInfos = allInfos.slice().sort((info1: OfficeInfos, info2: OfficeInfos) =>
					info1.type && info2.type ? info1.type.localeCompare(info2.type) : 0
				);
				dispatch(refreshInfosOffice(sortedInfos));
			}
		})();
	}, []);

	return (
		<RootLayout showHeaderAside>
			<main className='w-full sm:w-5/6 h-max ml-auto'>
				<div className="w-full flex flex-col gap-4 px-6 py-3">
					<h1 className="text-3xl md:text-[42px]">Cadastro de Professor</h1>

					{allInfosTeacher != undefined ? (
						<CreateHeaderRegisters setModal={setModal} setSearch={setSearch} totalRegiter={allInfosTeacher.length} key={"create-header-school"} />
					) : null}

					<div className="w-full h-auto flex items-center justify-end">
						<ClipboardList size={26} className="cursor-pointer" onClick={() => setModalInactive(true)} />
					</div>

					<TableRegisters
						tableHead={thead}
						infosAll={allInfosTeacher}
						editInfo={editInfo}
						deleteInfo={deleteInfo}
						key={"Table-Escola"}
					/>
				</div>
				{modal ? (
					<Modal
						infosInput={infosInput}
						setModal={setModal}
						submitInfos={submitTeacher}
						title="Cadastro de Professor"
						inputs={inputs}
						createFormSchema={createFormSchema}
						modalName="Teacher"
						key={"modal-cadastro-professor"}
					/>
				) : null}

				{modalInactive ? (
					<Modal
						setModal={setModalInactive}
						modalName="Teacher"
						editInfo={editInfo}
						title="Professores Inativas"
						thead={thead}
					/>
				) : null}

				<ToastContainer />
			</main>
		</RootLayout>
	);

	async function submitTeacher(data: SubmitDataModal) {
		if ("thirst" in data && "cpf" in data && "office" in data && "name" in data) {
			const { thirst, office, ...rest } = data;
			const school: SchoolInfos = await getIdSchool(thirst);
			const OfficeTeacher: OfficeInfos = await getOfficeById(office);

			const aux: TeacherInfos = {
				thirst: school,
				office: OfficeTeacher,
				edit: false,
				id: infosInput.id,
				cpf: data.cpf.replaceAll(".", "").replaceAll("-", ""),
				inactive: false,
				...rest,
			};

			let message: AxiosError | string;
			if (!infosInput.edit) {
				message = await createTeacher(aux, aux.thirst.id);
			}
			else {
				message = await editTeacher(aux, aux.thirst.id);
				setModal(false);
			}

			dispatch(refreshInfosTeacher(await readAllTeacher()));
			messageToast(message);
			setInfosInput(TeacherValuesDefault);
		}
	}

	async function editInfo(info: InfosTableRegisterData, inactive = false) {
		if ("thirst" in info && "cpf" in info && "office" in info && "name" in info) {
			if (!inactive) {
				const { thirst, ...rest } = info;

				const aux: TeacherInfos = {
					edit: true,
					thirst: thirst,
					...rest,
				};
				setInfosInput(aux);
				setModal(true);
			}
			else {
				if (window.confirm(`Quer mesmo ${!inactive === true ? "inativar" : "ativar"} o professor ${info.name}?`)) {
					const { inactive, ...rest } = info;
					const aux: TeacherInfos = { inactive: !inactive, ...rest, };
					await editTeacher(aux, String(info.thirst));
					messageToast(!inactive === true ? "Inativação do Professor feito com sucesso!" : "Ativação do Professor feito com sucesso!");
					dispatch(refreshInfosTeacher(await readAllTeacher()));
				}
			}
		}
	}

	async function deleteInfo(info: InfosTableRegisterData) {
		if ("thirst" in info && "cpf" in info && "office" in info && "name" in info) {
			if (window.confirm(`Quer mesmo deletar o professor ${info.name}?`)) {
				const message: AxiosError | string = await deleteTeacher(info.id);
				messageToast(message);
				dispatch(refreshInfosTeacher(await readAllTeacher()));
			}
		}
	}

	function messageToast(message: AxiosError | string) {
		if (typeof message !== "object") {
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
		else {
			toast.error(message?.response?.data?.url, {
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
