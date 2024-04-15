"use client";
import { AxiosError } from "axios";
import { ClipboardList } from "lucide-react";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import { InputConfig, OfficeInfos, OfficeValuesDefault, SchoolInfos, SchoolValuesDefault } from "../../../../../slice";
import { DefaultUserInfos, StateContextLogin, UserInfos } from "../../../../../slice/LoginSlice";
import CreateHeaderRegisters from "../../../../Components/CreateHeaderRegisters";
import Modal, { SubmitDataModal } from "../../../../Components/Modal";
import TableRegisters, { InfosTableRegisterData } from "../../../../Components/TableRegisters";
import { createUser, deleteUser, editUser, getIdSchool, getOfficeById } from "../../../../api";
import { maskRG } from "../../../../utils/maskUtils";

const createFormSchema = z.object({
  name: z.string().nonempty("O campo Nome é obrigatório!"),
  email: z.string().nonempty("O campo Email é obrigatório!"),
  rg: z.string().nonempty("O campo Rg é obrigatório!"),
  office: z.string().transform((office) => Number(office)),
  password: z.string().nonempty("O campo Senha é obrigatório!"),
  registerSchool: z.string().transform((school) => Number(school)),
  mandatoryBulletin: z.coerce.number().int(),
});

export type CreateFormDataUser = z.infer<typeof createFormSchema>;

export default function UsersList() {
  const { usersAll } = useContext(StateContextLogin);
  const [modal, setModal] = useState<boolean>(false);
  const [modalInactive, setModalInactive] = useState<boolean>(false);
  const [infosEdit, setInfosEdit] = useState<UserInfos>(DefaultUserInfos);
  const tableHead = [
    "Id",
    "Nome",
    "Email",
    "Rg",
    "Cargo",
    "Escola",
    "Assinatura Obrigatória no boletim",
    "Senha",
    "Inatividade",
    "Ações",
  ];

  const inputs: InputConfig[] = [
    {
      htmlFor: "name",
      label: "Nome do Usuário",
      name: "name",
      placeholder: "Alerrando Breno de Oliveira Andrade",
      type: "text",
      input: "input",
    },

    {
      htmlFor: "email",
      label: "E-mail*",
      name: "email",
      placeholder: "Digite seu email",
      type: "email",
      input: "input",
    },

    {
      htmlFor: "rg",
      label: "Rg*",
      name: "rg",
      placeholder: "00.000.000-0",
      type: "text",
      input: "input",
      maxChars: 11,
      maskHandleForm: maskRG,
    },

    {
      htmlFor: "office",
      label: "Cargo",
      name: "office",
      optionDefault: "Selecione um Cargo",
      optionType: "OfficeUser",
      input: "select",
      type: "string",
    },

    {
      htmlFor: "password",
      label: "Senha*",
      name: "password",
      placeholder: "Digite sua senha",
      type: "password",
      input: "input",
    },

    {
      htmlFor: "registerSchool",
      label: "Escola",
      name: "registerSchool",
      optionDefault: "Selecione uma Escola",
      optionType: "School",
      input: "select",
      type: "string",
    },

    {
      htmlFor: "mandatoryBulletin",
      label: "Obrigatório no Boletim",
      name: "mandatoryBulletin",
      optionDefault: "Usuário Obrigatório no Boletim",
      optionType: "mandatoryBulletin",
      input: "select",
      type: "string",
    },
  ];

  return (
    <>
      <header className="w-full h-auto flex items-center justify-between border-b border-b-[#efefef] p-3">
        <h1 className="text-3xl">Lista de Usuários</h1>

        <div className="w-auto h-auto flex items-center justify-end">
          <ClipboardList size={26} className="cursor-pointer" onClick={() => setModalInactive(true)} />
        </div>
      </header>

      <section className="h-full w-full flex flex-col items-end gap-2 py-4 px-12">
        <div className="w-full h-auto flex flex-row items-center justify-between">
          {usersAll !== undefined ? (
            <CreateHeaderRegisters setModal={setModal} totalRegiter={usersAll.length} key={"create-header-user"} />
          ) : null}
        </div>

        <div className="w-full h-[1px] border border-b border-[#cfcfcf]"></div>

        <TableRegisters
          deleteInfo={deleteInfo}
          editInfo={editInfo}
          infosAll={usersAll}
          tableHead={tableHead}
          key="Table Users"
        />
      </section>

      <ToastContainer />

      {modal ? (
        <Modal
          createFormSchema={createFormSchema}
          infosInput={infosEdit}
          inputs={inputs}
          modalName="User"
          setInfosInput={setInfosEdit}
          setModal={handleCloseModal}
          submitInfos={submit}
          title="Cadastro de Usuário"
        />
      ) : null}

      {modalInactive ? (
        <Modal
          setModal={setModalInactive}
          modalName="User"
          editInfo={editInfo}
          title="Usuários Inativos"
          thead={tableHead}
        />
      ) : null}

      <ToastContainer />
    </>
  );

  async function submit(data: SubmitDataModal) {
    if (
      "name" in data &&
      "email" in data &&
      "rg" in data &&
      "office" in data &&
      "password" in data &&
      "registerSchool" in data &&
      "mandatoryBulletin" in data
    ) {
      if (infosEdit != null) {
        let message: string | AxiosError;
        const { id, level, edit } = infosEdit;
        const { registerSchool, office, ...restData } = data;
        const school: SchoolInfos = await getIdSchool(registerSchool);
        const officeUser: OfficeInfos = await getOfficeById(Number(office));

        const formData: UserInfos = {
          id,
          level,
          edit,
          registerSchool: school === undefined ? SchoolValuesDefault : school,
          office: officeUser === undefined ? OfficeValuesDefault : officeUser,
          inactive: false,
          ...restData,
        };

        if (!infosEdit.edit) {
          message = await createUser(formData);
        } else {
          message = await editUser(formData, infosEdit.id);
        }

        setModal(false);
        messageToast(message);
      }
    }
  }

  async function editInfo(info: InfosTableRegisterData, inactive = false) {
    if (
      "name" in info &&
      "email" in info &&
      "rg" in info &&
      "office" in info &&
      "password" in info &&
      "registerSchool" in info &&
      "mandatoryBulletin" in info
    ) {
      if (!inactive) {
        const { edit, ...rest } = info;

        const aux = {
          edit: !edit,
          ...rest,
        };

        setInfosEdit(aux);
        setModal(true);
      } else {
        if (window.confirm(`Quer mesmo ${inactive ? "inativar" : "ativar"} o usuário ${info.name}?`)) {
          const { inactive, ...rest } = info;
          const aux = { inactive: !inactive, ...rest };
          await editUser(aux, info.id);
          messageToast(
            inactive ? "Inativação do Usuário feito com sucesso!" : "Ativação do Usuário feito com sucesso!",
          );
        }
      }
    }
  }

  async function deleteInfo(info: InfosTableRegisterData) {
    if (
      "name" in info &&
      "email" in info &&
      "rg" in info &&
      "office" in info &&
      "password" in info &&
      "registerSchool" in info &&
      "mandatoryBulletin" in info
    ) {
      if (window.confirm(`Quer mesmo deletar o usuário ${name}?`)) {
        const message: string | AxiosError = await deleteUser(info.id);

        messageToast(message);
      }
    }
  }

  function messageToast(message: string | AxiosError) {
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
    setInfosEdit(DefaultUserInfos);
  }
}
