"use client";
import { format, isValid } from "date-fns";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AppDispatch, RootState } from "../../../../configureStore";
import { HorasValuesDefault, LessonsInfos, changeRegisterType, refreshInfosLesson } from "../../../../slice";
import CreateHeaderRegisters from '../../../Components/CreateHeaderRegisters';
import Modal from "../../../Components/Modal";
import { CreateFormDataLesson } from "../../../Components/Modal/FormRegisterLesson";
import TableRegisters from "../../../Components/TableRegisters";
import { createLesson, deleteLesson, editLesson, readAllLesson, readPaginationLesson } from "../../../api";
import RootLayout from "../../../app/layout";

export default function ControleAulasEventuais() {
  const [infosInput, setInfosInput] = useState<LessonsInfos>(HorasValuesDefault);
  const [lessonsLengthall, setLessonsLengthall] = useState(0);
  const [pagination, setPagination] = useState(0);
  const { allInfosLesson, allInfosSchool, allInfosTeacher, registerType } = useSelector((slice: RootState) => slice.Slice);
  const { infosDefinitionPeriods } = useSelector((root: RootState) => root.Slice);
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const tableHead = [
    "Nome Completo",
    "Horas de aulas dadas",
    "Escola", 
    "Dia da aula",
    "Ações",
  ];

  useEffect(() => {
    (async () => {
      dispatch(changeRegisterType("Lesson"));
      setLessonsLengthall(await readAllLesson().then((data) => data?.length));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      dispatch(refreshInfosLesson(await readPaginationLesson(pagination, 10)));
      setLessonsLengthall(await readAllLesson().then((data) => data?.length));
    })();
  }, [pagination]);

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
            <div className="w-auto flex flex-row items-center gap-4">
              <ArrowLeft size={32} className="cursor-pointer" onClick={changePagination("Left")} />
              <span className="text-2xl font-bold">{pagination + 1}</span>
              <ArrowRight size={32} className="cursor-pointer" onClick={changePagination("Right")} />
            </div>
          </div>

          <div className="w-full border border-[#999]">
            <TableRegisters tableHead={tableHead} editInfo={editInfo} deleteInfo={deleteInfo} infosAll={allInfosLesson} search={search} key={"Table-Cadastro"} />
          </div>
        </div>

        {modal ? (
          <Modal infosInput={infosInput} setInfosInput={setInfosInput} setModal={setModal} submitInfos={submitLesson} title="Controle de Aulas Eventuais" />
        ) : null}

        <ToastContainer />
      </section>
    </RootLayout>
  );

  function editInfo(infos: LessonsInfos) {
    const aux = infos;
    aux.edit = true;
    
    setInfosInput(aux);
    setModal(true);
  }

  async function submitLesson(event: CreateFormDataLesson) {
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
    
    dispatch(refreshInfosLesson(await readPaginationLesson(pagination, 10)));
    messageToast(message);
    setInfosInput(HorasValuesDefault);
    setLessonsLengthall(await readAllLesson().then((data) => data.length));
  }

  async function deleteInfo(infos: LessonsInfos) {
    if(window.confirm(`Deseja deletar a aula do professor ${getNameTeacher(infos.cadastroProfessor)} no dia ${format(new Date(infos.diaAula.toString()), "dd/MM/yyyy")}?`)){
      const message = await deleteLesson(infos.id);
      messageToast(message);
      dispatch(refreshInfosLesson(await readPaginationLesson(pagination, 5)));
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
