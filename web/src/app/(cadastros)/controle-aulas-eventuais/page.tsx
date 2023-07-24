"use client";
import { format, isValid } from "date-fns";
import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { z } from "zod";
import { AppDispatch, RootState } from "../../../../configureStore";
import { HorasValuesDefault, InputConfig, LessonsInfos, TeacherInfos, changeRegisterType, refreshInfosLesson } from "../../../../slice";
import CreateHeaderRegisters from '../../../Components/CreateHeaderRegisters';
import Modal, { SubmitDataModal } from "../../../Components/Modal";
import TableRegisters, { InfosTableRegisterData } from "../../../Components/TableRegisters";
import { createLesson, deleteLesson, editLesson, getIdSchool, getNameByIdTeacher, readAllLesson } from "../../../api";
import RootLayout from "../../../app/layout";

const createFormSchema = z.object({
  horaAulas: z.string().nonempty("Digite a quantidade de aulas!"),
  cadastroProfessor: z.string().nonempty("Selecione um professor ou adicione!"),
  cadastroEscola: z.string().nonempty("Selecione uma escola ou adicione!"),
})

export type CreateFormDataLesson = z.infer<typeof createFormSchema>

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
      type: "string",
      htmlFor: "cadastroProfessor",
      label: "Professores",
      name: "cadastroProfessor",
      optionDefault: "Selecione um Professor",
      optionType: "Teacher",
      input: "select"
    },

    {
      type: "string",
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

  
  async function submitLesson(data: SubmitDataModal) {
    if("horaAulas" in data && "cadastroProfessor" in data && "cadastroEscola" in data){
      debugger;
      let message: any | string;
      const { cadastroEscola, cadastroProfessor, horaAulas} = data;
      const schoolLesson = await getIdSchool(data.cadastroEscola);
      const teacherLesson = await getNameByIdTeacher(data.cadastroProfessor);
      
      let aux: LessonsInfos = {
        id: infosInput.id,
        lessonDay: new Date(infosInput.lessonDay),
        edit: false,
        amountTime: data.horaAulas,
        registerSchool: schoolLesson,
        registerTeacher: teacherLesson,
      };
      if (!infosInput.edit) {
          message = await createLesson(aux, data.cadastroEscola, data.cadastroProfessor);
          
      } else {
        aux.id = infosInput.id;
        message = await editLesson(aux, data.cadastroEscola, data.cadastroProfessor);
        setModal(false);
      }
      
      dispatch(refreshInfosLesson(await readAllLesson()));
      messageToast(message);
      setInfosInput(HorasValuesDefault);
      setLessonsLengthall(await readAllLesson().then((data) => data.length));
    }
  }
  
  function editInfo(info: InfosTableRegisterData) {
    if("horaAulas" in info && "cadastroProfessor" in info && "cadastroEscola" in info){
      const { ...rest } = info;
      const aux = {
        ...rest,
        edit: true,
      }
      
      setInfosInput(aux);
      setModal(true);
    }
  }

  async function deleteInfo(info: InfosTableRegisterData) {
    debugger;
    if("horaAulas" in info && "cadastroProfessor" in info && "cadastroEscola" in info){
      if(window.confirm(`Deseja deletar a aula do professor ${getNameTeacher(info.cadastroProfessor)} no dia ${format(new Date(info.diaAula), "dd/MM/yyyy")}?`)){
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

  function messageToast(message: any | string){
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
