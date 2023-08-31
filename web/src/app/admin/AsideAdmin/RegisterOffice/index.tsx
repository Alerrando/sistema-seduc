"use client";
import { AxiosError } from "axios";
import { ClipboardList } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import { RootState } from "../../../../../configureStore";
import {
  InputConfig,
  OfficeInfos,
  OfficeValuesDefault,
  changeRegisterType,
  refreshInfosOffice,
} from "../../../../../slice";
import CreateHeaderRegisters from "../../../../Components/CreateHeaderRegisters";
import Modal, { SubmitDataModal } from "../../../../Components/Modal";
import TableRegisters, { InfosTableRegisterData } from "../../../../Components/TableRegisters";
import { createRegisterOffice, deleteRegisterOffice, editRegisterOffice, getRegisterOffice } from "../../../../api";

const createFormSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório!"),
  type: z.string().nonempty("Campo Cargo é obrigatório"),
});

export type CreateFormDataOffice = z.infer<typeof createFormSchema>;

export default function RegisterOffice() {
  const { allInfosOffice } = useSelector((root: RootState) => root.Slice);
  const [infosRegister, setInfosRegister] = useState<OfficeInfos>(OfficeValuesDefault);
  const [modal, setModal] = useState<boolean>(false);
  const [modalInactive, setModalInactive] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const dispatch = useDispatch();
  const tableHead = ["Id", "Nome", "Tipo de Cargo", "Inatividade", "Ações"];
  const inputs: InputConfig[] = [
    {
      htmlFor: "name",
      label: "Nome do Cargo",
      name: "name",
      placeholder: "PEB I",
      type: "text",
      input: "input",
    },

    {
      htmlFor: "type",
      label: "Cargo para: ",
      name: "type",
      input: "select",
      optionDefault: "Selecione um tipo de cargo",
      optionType: "Office",
      type: "string",
    },
  ];

  useEffect(() => {
    (async () => {
      const allInfos: OfficeInfos[] | string = await getRegisterOffice();
      if (allInfos !== undefined && typeof allInfos !== "string") {
        const sortedInfos = allInfos
          .slice()
          .sort((info1: OfficeInfos, info2: OfficeInfos) =>
            info1.type && info2.type ? info1.type.localeCompare(info2.type) : 0,
          );

        dispatch(refreshInfosOffice(sortedInfos));
        dispatch(changeRegisterType(""));
      }
    })();
  }, [dispatch]);

  return (
    <main className="w-full h-max ml-auto">
      <div className="w-full flex flex-col gap-4">
        <header className="w-full h-auto flex items-center justify-between border-b border-b-[#efefef] p-3">
          <h1 className="text-3xl">Cadastro de Cargos</h1>

          <div className="w-auto h-auto flex items-center justify-center">
            <ClipboardList size={26} className="cursor-pointer" onClick={() => setModalInactive(true)} />
          </div>
        </header>

        <section className="w-full flex flex-col gap-4 px-6">
          {allInfosOffice !== undefined ? (
            <CreateHeaderRegisters
              setModal={setModal}
              setSearch={setSearch}
              totalRegiter={allInfosOffice.length}
              key={"create-header-office"}
            />
          ) : null}

          <TableRegisters
            deleteInfo={deleteInfo}
            editInfo={editInfo}
            infosAll={allInfosOffice.map((info: OfficeInfos) => info.name.toLowerCase().includes(search.toLowerCase()))}
            tableHead={tableHead}
            key={"table-office"}
          />
        </section>

        {modal ? (
          <Modal
            title="Cadastro de Cargos"
            createFormSchema={createFormSchema}
            infosInput={infosRegister}
            setInfosInput={setInfosRegister}
            setModal={handleCloseModal}
            submitInfos={submit}
            inputs={inputs}
            modalName="Office"
          />
        ) : (
          false
        )}

        {modalInactive ? (
          <Modal
            setModal={setModalInactive}
            modalName="Office"
            editInfo={editInfo}
            title="Cargos Inativas"
            thead={tableHead}
          />
        ) : null}
      </div>

      <ToastContainer />
    </main>
  );

  async function submit(data: SubmitDataModal) {
    if ("name" in data && "type" in data) {
      let message: AxiosError | string;
      let allInfos: OfficeInfos[] = [];
      const { ...rest } = data;
      const aux: OfficeInfos = {
        id: infosRegister.id,
        edit: infosRegister.edit,
        inactive: false,
        ...rest,
      };

      if (!infosRegister.edit) {
        message = await createRegisterOffice(aux);
      } else {
        message = await editRegisterOffice(aux, infosRegister.id);
        setModal(false);
      }

      allInfos = await getRegisterOffice();
      const sortedInfos = allInfos
        .slice()
        .sort((info1: OfficeInfos, info2: OfficeInfos) => info1.type.localeCompare(info2.type));

      dispatch(refreshInfosOffice(sortedInfos));
      messageToast(message);
    }
  }

  async function editInfo(info: InfosTableRegisterData, inactive = false) {
    if ("name" in info && "type" in info) {
      if (!inactive) {
        const { ...rest } = info;
        const aux = { ...rest, edit: true };
        setInfosRegister(aux);
        setModal(true);
      } else {
        if (window.confirm(`Quer mesmo ${inactive ? "inativar" : "ativar"} o cargo ${info.name}?`)) {
          let allInfos: OfficeInfos[] = [];
          const { inactive, ...rest } = info;
          const aux: OfficeInfos = { inactive: !inactive, ...rest };
          await editRegisterOffice(aux, info.id);

          messageToast(inactive ? "Inativação do Cargo feito com sucesso!" : "Ativação do Cargo feito com sucesso!");

          allInfos = await getRegisterOffice();
          const sortedInfos = allInfos
            .slice()
            .sort((info1: OfficeInfos, info2: OfficeInfos) => info1.type.localeCompare(info2.type));

          dispatch(refreshInfosOffice(sortedInfos));
        }
      }
    }
  }

  async function deleteInfo(info: InfosTableRegisterData) {
    if ("name" in info && "type" in info) {
      if (window.confirm(`Quer mesmo deletar o cargo ${info.name}?`)) {
        const message: AxiosError | string = await deleteRegisterOffice(info.id);
        const allInfos = await getRegisterOffice();
        const sortedInfos = allInfos
          .slice()
          .sort((info1: OfficeInfos, info2: OfficeInfos) => info1.type.localeCompare(info2.type));

        dispatch(refreshInfosOffice(sortedInfos));
        messageToast(message);
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
    setInfosRegister(OfficeValuesDefault);
  }
}
