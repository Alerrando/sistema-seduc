"use client";
import { AxiosError } from "axios";
import { ClipboardList } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import { AppDispatch, RootState } from "../../../../configureStore";
import {
  InputConfig,
  OfficeInfos,
  TeacherInfos,
  TeacherValuesDefault,
  changeRegisterType,
  refreshInfosOffice,
  refreshInfosTeacher,
  refreshInfosTeachersOffice,
  refreshInfosTeachersThirst,
} from "../../../../slice";
import CreateHeaderRegisters from "../../../Components/CreateHeaderRegisters";
import Modal, { SubmitDataModal } from "../../../Components/Modal";
import TableRegisters, { InfosTableRegisterData } from "../../../Components/TableRegisters";
import {
  createTeacher,
  createTeachersOffice,
  createTeachersThirst,
  deleteTeacher,
  editTeacher,
  editTeacherOffice,
  findAllTeachersOffice,
  findAllTeachersThirst,
  getRegisterOffice,
  readAllTeacher,
} from "../../../api";
import RootLayout from "../../../app/layout";
import { isValidCPF, maskCPF } from "../../../utils/maskUtils";

export const createFormSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório!"),
  cpf: z
    .string()
    .max(15)
    .refine((value) => isValidCPF(value), {
      message: "CPF inválido",
    }),
  teachersThirst: z.array(z.number()).min(1, "Selecione pelo menos uma sede"),
  teachersOffice: z.array(z.number()).min(1, "Selecione pelo menos um cargo"),
});

export type CreateFormDataTeacher = z.infer<typeof createFormSchema>;

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
      htmlFor: "Thirst",
      label: "Sede",
      name: "Thirst",
      optionDefault: "Selecione a Sede",
      optionType: "TeachersThrist",
      input: "select",
    },

    {
      type: "text",
      htmlFor: "office",
      label: "Cargo",
      name: "office",
      optionDefault: "Selecione o cargo",
      optionType: "TeachersOffice",
      input: "select",
    },
  ];

  useEffect(() => {
    (async () => {
      dispatch(refreshInfosTeacher(await readAllTeacher()));
      dispatch(changeRegisterType("Teacher"));
      const allInfos: OfficeInfos[] | string = await getRegisterOffice();
      if (allInfos !== undefined && typeof allInfos !== "string") {
        const sortedInfos = allInfos
          .slice()
          .sort((info1: OfficeInfos, info2: OfficeInfos) =>
            info1.type && info2.type ? info1.type.localeCompare(info2.type) : 0,
          );
        dispatch(refreshInfosOffice(sortedInfos));
      }
    })();
  }, []);

  return (
    <RootLayout showHeaderAside>
      <main className="w-full sm:w-5/6 h-max ml-auto">
        <div className="w-full flex flex-col gap-4 px-6 py-3">
          <h1 className="text-3xl md:text-[42px]">Cadastro de Professor</h1>

          {allInfosTeacher !== undefined ? (
            <CreateHeaderRegisters
              setModal={setModal}
              setSearch={setSearch}
              totalRegiter={allInfosTeacher.length}
              key={"create-header-school"}
            />
          ) : null}

          <div className="w-full h-auto flex items-center justify-end">
            <ClipboardList size={26} className="cursor-pointer" onClick={() => setModalInactive(true)} />
          </div>

          <TableRegisters
            tableHead={thead}
            infosAll={allInfosTeacher.filter((infosTeacher: TeacherInfos) => Object.keys(infosTeacher))}
            editInfo={editInfo}
            deleteInfo={deleteInfo}
            key={"Table-Escola"}
          />
        </div>
        {modal ? (
          <Modal
            infosInput={infosInput}
            setModal={handleCloseModal}
            setInfosInput={setInfosInput}
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
    debugger;
    if ("cpf" in data && "name" in data) {
      const { Thirst, cpf, teachersOffice, ...rest } = data;

      const aux: TeacherInfos = {
        edit: false,
        id: infosInput.id,
        cpf: data.cpf.replaceAll(".", "").replaceAll("-", ""),
        inactive: false,
        ...rest,
      };

      await submitEditTeacher(aux, data);
      dispatch(refreshInfosTeachersOffice(await findAllTeachersOffice()));
      dispatch(refreshInfosTeachersThirst(await findAllTeachersThirst()));
      dispatch(refreshInfosTeacher(await readAllTeacher()));
      setInfosInput(TeacherValuesDefault);
    }
  }

  async function submitEditTeacher(aux: TeacherInfos, data: SubmitDataModal) {
    let message: AxiosError | string;
    let auxData: AxiosError | TeacherInfos;

    if (!infosInput.edit) {
      auxData = await createTeacher(aux, aux.Thirst.id);
      message = auxData !== undefined ? "Professor cadastrada com sucesso" : auxData;
      await createTeachersOffice(data.teachersOffice, auxData.id);
      await createTeachersThirst(data.teachersThirst, auxData.id);
    } else {
      auxData = await editTeacher(aux, aux.Thirst.id);
      message = auxData !== undefined ? "Professor editado com sucesso" : auxData;
      await editTeacherOffice(data.teachersOffice, auxData.id);
      setModal(false);
    }

    messageToast(message);
  }

  async function editInfo(info: InfosTableRegisterData, inactive = false) {
    if ("Thirst" in info && "cpf" in info && "office" in info && "name" in info) {
      if (!inactive) {
        const { Thirst, edit, ...rest } = info;

        const aux: TeacherInfos = {
          edit: true,
          Thirst,
          ...rest,
        };

        setInfosInput(aux);
        setModal(true);
      } else {
        if (window.confirm(`Quer mesmo ${inactive ? "inativar" : "ativar"} o professor ${info.name}?`)) {
          const { inactive, ...rest } = info;
          const aux: TeacherInfos = { inactive: !inactive, ...rest };
          await editTeacher(aux, info.Thirst.id);
          messageToast(
            inactive ? "Inativação do Professor feito com sucesso!" : "Ativação do Professor feito com sucesso!",
          );
          dispatch(refreshInfosTeacher(await readAllTeacher()));
        }
      }
    }
  }

  async function deleteInfo(info: InfosTableRegisterData) {
    if ("Thirst" in info && "cpf" in info && "office" in info && "name" in info) {
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
    } else {
      const errorMessage = message?.response?.data || "Erro desconhecido";
      toast.error(errorMessage.toString(), {
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

  function handleCloseModal() {
    setModal(false);
    setInfosInput(TeacherValuesDefault);
  }
}
