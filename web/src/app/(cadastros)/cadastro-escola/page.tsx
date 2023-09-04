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
  SchoolInfos,
  SchoolValuesDefault,
  changeRegisterType,
  refreshInfosSchool,
} from "../../../../slice";
import CreateHeaderRegisters from "../../../Components/CreateHeaderRegisters";
import Modal, { SubmitDataModal } from "../../../Components/Modal";
import TableRegisters, { InfosTableRegisterData } from "../../../Components/TableRegisters";
import { createSchool, deleteSchool, editSchool, readAllSchool } from "../../../api";
import RootLayout from "../../../app/layout";
import { applyCEPFormat, maskTelefone } from "../../../utils/maskUtils";

const createFormSchema = z.object({
  name: z.string().nonempty("Campo Nome é obrigatório!"),
  adress: z.string().nonempty("Campo Endereço é obrigatório!"),
  zip: z
    .string()
    .nonempty("Campo Cep é obrigatório!")
    .transform((value) => value.replace(/\D/g, ""))
    .refine((value) => value.length === 8, {
      message: "CEP inválido. O CEP deve conter 8 dígitos.",
    }),
  fone: z.string().nonempty("Campo Telefone é obrigatório!"),
  email: z.string().email().nonempty("O campo Email é obrigatório!"),
});

export type CreateFormDataSchool = z.infer<typeof createFormSchema>;

export default function CadastroEscola() {
  const { allInfosSchool } = useSelector((root: RootState) => root.Slice);
  const [infosInput, setInfosInput] = useState<SchoolInfos>(SchoolValuesDefault);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<boolean>(false);
  const [modalInactive, setModalInactive] = useState<boolean>(false);
  const thead = ["Id", "Nome da Escola", "Endereço da Escola", "Cep", "Telefone", "Email", "Inatividade", "Ações"];
  const dispatch = useDispatch<AppDispatch>();
  const inputs: InputConfig[] = [
    {
      htmlFor: "name",
      label: "Nome da Escola",
      name: "name",
      placeholder: "Escola Municipal Mario Fiorante",
      type: "text",
      input: "input",
    },

    {
      htmlFor: "adress",
      label: "Endereço da Escola",
      name: "adress",
      placeholder: "Endereço",
      type: "text",
      input: "input",
    },

    {
      htmlFor: "zip",
      label: "Cep",
      name: "zip",
      placeholder: "00000-000",
      type: "text",
      input: "input",
      maxChars: 9,
      maskHandleForm: applyCEPFormat,
    },

    {
      htmlFor: "fone",
      label: "Telefone",
      name: "fone",
      placeholder: "(00)0000-0000",
      type: "text",
      input: "input",
      maxChars: 15,
      maskHandleForm: maskTelefone,
    },

    {
      htmlFor: "email",
      label: "Email",
      name: "email",
      placeholder: "Email",
      type: "text",
      input: "input",
    },
  ];

  useEffect(() => {
    (async () => {
      dispatch(refreshInfosSchool(await readAllSchool()));
      dispatch(changeRegisterType("School"));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RootLayout showHeaderAside>
      <main className="w-full sm:w-5/6 h-max ml-auto">
        <div className="w-full flex flex-col gap-4 px-6 py-3">
          <h1 className="text-3xl md:text-[42px]">Cadastro de Escolas</h1>

          {allInfosSchool !== undefined ? (
            <CreateHeaderRegisters
              setModal={setModal}
              setSearch={setSearch}
              totalRegiter={allInfosSchool.length}
              key={"create-header-school"}
            />
          ) : null}

          <div className="w-full h-auto flex items-center justify-end">
            <ClipboardList size={26} className="cursor-pointer" onClick={() => setModalInactive(true)} />
          </div>

          <TableRegisters
            tableHead={thead}
            infosAll={allInfosSchool.filter((school: SchoolInfos) =>
              school.name.toLowerCase().includes(search.toLowerCase()),
            )}
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
            submitInfos={submitSchool}
            title="Cadastro de Escolas"
            createFormSchema={createFormSchema}
            inputs={inputs}
            modalName="School"
            key={"modal-cadastro-escola"}
          />
        ) : null}

        {modalInactive ? (
          <Modal
            setModal={setModalInactive}
            modalName="School"
            editInfo={editInfo}
            title="Escolas Inativas"
            thead={thead}
          />
        ) : null}

        <ToastContainer />
      </main>
    </RootLayout>
  );

  async function submitSchool(data: SubmitDataModal) {
    if ("name" in data && "adress" in data && "zip" in data && "fone" in data && "email" in data) {
      const { ...rest } = data;
      const { id } = infosInput;
      const aux: SchoolInfos = {
        id,
        edit: false,
        inactive: false,
        ...rest,
      };

      let message: AxiosError | string;

      if (!infosInput.edit) {
        message = await createSchool(aux);
      } else {
        message = await editSchool(aux, aux.id);
        setModal(false);
      }

      dispatch(refreshInfosSchool(await readAllSchool()));
      setInfosInput(SchoolValuesDefault);
      messageToast(message);
    }
  }

  async function editInfo(info: InfosTableRegisterData, inactive = false) {
    if ("name" in info && "adress" in info && "zip" in info && "fone" in info && "email" in info) {
      if (!inactive) {
        const { ...rest } = info;
        const aux = {
          ...rest,
          edit: true,
        };
        setInfosInput(aux);
        setModal(true);
      } else {
        if (window.confirm(`Quer mesmo ${inactive ? "inativar" : "ativar"} a escola ${info.name}?`)) {
          const { inactive, ...rest } = info;
          const aux: SchoolInfos = { inactive: !inactive, ...rest };
          await editSchool(aux, aux.id);
          messageToast(inactive ? "Inativação da Escola feito com sucesso!" : "Ativação da Escola feito com sucesso!");
          dispatch(refreshInfosSchool(await readAllSchool()));
        }
      }
    }
  }

  async function deleteInfo(info: InfosTableRegisterData) {
    if ("name" in info && "adress" in info && "zip" in info && "fone" in info && "email" in info) {
      if (window.confirm(`Quer mesmo deletar a escola ${info.name}?`)) {
        const message: AxiosError | string = await deleteSchool(info.id);
        messageToast(message);
        dispatch(refreshInfosSchool(await readAllSchool()));
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
    setInfosInput(SchoolValuesDefault);
  }
}
