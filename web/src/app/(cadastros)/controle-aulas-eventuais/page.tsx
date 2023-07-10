"use client";
import { format, isValid } from "date-fns";
import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AppDispatch, RootState } from "../../../../configureStore";
import { HorasValuesDefault, InputConfig, LessonsInfos, changeRegisterType, refreshInfosLesson } from "../../../../slice";
import CreateHeaderRegisters from '../../../Components/CreateHeaderRegisters';
import Modal from "../../../Components/Modal";
import TableRegisters from "../../../Components/TableRegisters";
import { createLesson, deleteLesson, editLesson, readAllLesson } from "../../../api";
import RootLayout from "../../../app/layout";
import { ZodTypeAny, z } from "zod";

const createFormSchema = z.object({
  horaAulas: z.string().nonempty("Digite a quantidade de aulas!"),
  cadastroProfessor: z.string().nonempty("Selecione um professor ou adicione!"),
  cadastroEscola: z.string().nonempty("Selecione uma escola ou adicione!"),
})

export default function ControleAulasEventuais() {
  const [infosInput, setInfosInput] = useState<LessonsInfos>(HorasValuesDefault);
  const { allInfosLesson, allInfosSchool, allInfosTeacher, registerType } = useSelector((slice: RootState) => slice.Slice);
  const { infosDefinitionPeriods } = useSelector((root: RootState) => root.Slice);
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [lessonsLengthall, setLessonsLengthall] = useState(0);
  const tableHead = ["Id", "Nome Completo", "Horas de aulas dadas", "Escola",  "Dia da aula", "Ações"];
  const inputs: InputConfig[] = [
    {
      htmlFor: "cadastroProfessor",
      label: "Professores",
      name: "cadastroProfessor",
      optionDefault: "Selecione um Professor",
      optionType: "Teacher",
      input: "select"
    },

    {
      htmlFor: "cadastroEscola",
      label: "Escola",
      name: "cadastroEscola",
      optionDefault: "Selecione uma Escola",
      optionType: "School",
      input: "select"
    },

    {
      htmlFor: "horas-aulas",
      input: "input",
      label: "Horas de aula dadas",
      name: "horaAulas",
      placeholder: "1",
      type: "string",
      key: "horaAulas-input",
    },
  ]

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
                          {infosDefinitionPeriods?.length > 0 && isValid(new Date(infosDefinitionPeriods[infosDefinitionPeriods.length - 1]?.startDate))
                              ? format(new Date(infosDefinitionPeriods[infosDefinitionPeriods.length - 1]?.startDate), "dd/MM/yyyy")
                              : ""}
                      </span>
                  </div>
              </div>

              <div className="w-[2px] h-auto bg-[#dfdfdf]"></div>

              <div className="w-auto h-auto flex flex-row items-center gap-3 px-2">
                  <p className="text-base">Período Final de Cadastro:</p>

                  <div className="w-auto h-full flex p-2 border border-[#cfcfcf] rounded shadow-lg">
                      <span>
                          {infosDefinitionPeriods?.length > 0 && isValid(new Date(infosDefinitionPeriods[infosDefinitionPeriods.length - 1]?.endDate))
                              ? format(new Date(infosDefinitionPeriods[infosDefinitionPeriods.length - 1]?.endDate), "dd/MM/yyyy")
                              : ""}
                      </span>
                  </div>
              </div>
            </div>

            <div className="w-auto h-full flex items-center justify-center">
                <div className="inline-block h-5 w-5 cursor-pointer hover:animate-spin rounded-full border-4 border-solid border-current border-b-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                    onClick={() => handleLoadingClick()}
                >
                </div>
            </div>
          </div>

          <div className="w-full border border-[#999]">
            <TableRegisters tableHead={tableHead} editInfo={editInfo} deleteInfo={deleteInfo} infosAll={allInfosLesson} search={search} key={"Table-Cadastro"} />
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

  function editInfo(infos: LessonsInfos) {
    const { ...rest } = infos;
    const aux = {
      ...rest,
      edit: true,
    }
    
    setInfosInput(aux);
    setModal(true);
  }

  async function submitLesson(event: ZodTypeAny) {
    let message: object | string;
    const aux: LessonsInfos = event;
    aux.diaAula = new Date(infosInput.diaAula);

    if (!infosInput.edit) {
        message = await createLesson(aux, aux.cadastroEscola, aux.cadastroProfessor);
        
    } else {
      aux.id = infosInput.id;
      message = await editLesson(aux, aux.cadastroEscola, aux.cadastroProfessor);
      setModal(false);
    }
    
    dispatch(refreshInfosLesson(await readAllLesson()));
    messageToast(message);
    setInfosInput(HorasValuesDefault);
    setLessonsLengthall(await readAllLesson().then((data) => data.length));
  }

  async function deleteInfo(infos: LessonsInfos) {
    if(window.confirm(`Deseja deletar a aula do professor ${getNameTeacher(infos.cadastroProfessor)} no dia ${format(new Date(infos.diaAula.toString()), "dd/MM/yyyy")}?`)){
      const message = await deleteLesson(infos.id);
      messageToast(message);
      dispatch(refreshInfosLesson(await readAllLesson()));
    }
  }

  function changePagination(type: string) {
    return () => {
      if (type === "Left") {
        if (pagination === 0) setPagination(0);
        else setPagination((prev) => prev - 1);
      } else {
        if (pagination == allInfosLesson.length - 1) setPagination(0);
        else setPagination((prev) => prev + 1);
      }
    };
  }

  function getNameTeacher(id: string){
    let aux = "";
    allInfosTeacher?.forEach((teacher: TeacherInfos) => {
        if(teacher.id == id){
            aux = teacher.name;
        }
    })

    return aux;
  }

  async function handleLoadingClick() {
    try {
      const data = await readAllLesson();
      dispatch(refreshInfosLesson(data));
    } catch (error) {
      console.error('Erro ao atualizar os dados:', error);
    }
  }

  function messageToast(message){
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
