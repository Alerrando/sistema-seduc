"use client";
import React, { useEffect } from "react";
import Modal from "@/Components/Modal";
import Table from "@/Components/Table";
import { ArrowLeft, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { refreshInfosLesson, LessonsInfos, HorasValuesDefault, changeRegisterType, refreshInfosSchool } from "../../../slice";
import { RootState } from "@/system";
import { createLesson, deleteLesson, editLesson, readAllLesson, readAllSchool, readPaginationLesson } from "@/api";
import CreateHeader from "@/Components/CreateHeader";
import { Calendar } from 'react-calendar';

export default function CadastroAula() {
  const [infosInput, setInfosInput] =
    useState<LessonsInfos>(HorasValuesDefault);
  const [lessonsLengthall, setLessonsLengthall] = useState(0);
  const [pagination, setPagination] = useState(0);
  const { allInfosLesson, allInfosSchool, registerType } = useSelector(
    (slice: RootState) => slice.Slice
  );
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const tableHead = [
    "Id",
    "Nome Completo",
    "Horas de aulas dadas",
    "Titularidade",
    "Escola",
    "Dia das aulas",
    "Ações",
  ];

  useEffect(() => {
    (async () => {
      dispatch(changeRegisterType("Lesson"));
      setLessonsLengthall(await readAllLesson().then((data) => data.length));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      dispatch(refreshInfosLesson(await readPaginationLesson(pagination, 5)));
      setLessonsLengthall(await readAllLesson().then((data) => data.length));
    })();
  }, [pagination]);

  return (
    <section className="w-full sm:w-5/6 h-max ml-auto">
      <div className="w-full flex flex-col gap-4 px-6 py-3">
        <Calendar
          className="w-[100%!important] h-1/2 calendar shadow-md rounded-md"
          value={infosInput.diaAula}
          onChange={(e) =>
            setInfosInput({ ...infosInput, diaAula: new Date(e) })
          }
        />
        <h1 className="text-[42px]">Aulas</h1>

        {allInfosLesson != undefined ? (
          <CreateHeader
            setModal={setModal}
            setSearch={setSearch}
            totalRegiter={lessonsLengthall}
            key={"create-header-lesson"}
          />
        ) : null}

        <div className="w-full flex justify-end">
          <div className="w-auto flex flex-row items-center gap-4">
            <ArrowLeft
              size={32}
              className="cursor-pointer"
              onClick={changePagination("Left")}
            />
            <span className="text-2xl font-bold">{pagination + 1}</span>
            <ArrowRight
              size={32}
              className="cursor-pointer"
              onClick={changePagination("Right")}
            />
          </div>
        </div>

        <div className="w-full border border-[#999]">
          <Table
            tableHead={tableHead}
            editInfo={editInfo}
            deleteInfo={deleteInfo}
            infosAll={allInfosLesson}
            search={search}
            key={"Table-Cadastro"}
          />
        </div>
      </div>

      {modal ? (
        <Modal
          infosInput={infosInput}
          setInfosInput={setInfosInput}
          setModal={setModal}
          submitInfos={submitLesson}
        />
      ) : null}
    </section>
  );

  function editInfo(infos: LessonsInfos) {
    setInfosInput({
      diaAula: infos.diaAula,
      edit: 1,
      horaAulas: infos.horaAulas,
      id: infos.id,
      titularidade: infos.titularidade,
      id_escola: infos.id_escola,
      cadastroProfessor: infos.cadastroProfessor,
    });
    setModal(true);
  }

  async function submitLesson(event) {
    const aux: LessonsInfos = {
      diaAula: new Date(infosInput.diaAula),
      horaAulas: event.horaAulas,
      cadastroProfessor: event.cadastroProfessor,
      titularidade: event.titularidade,
      cadastroEscola: event.cadastroEscola,
    };

    if (aux.cadastroEscola == "0" || aux.cadastroProfessor == "0") {
      alert("Selecione uma escola ou um professor, caso não existam, cadastreos!");
    } else {
      if (infosInput.edit === -1) {
        await createLesson(aux, aux.cadastroEscola, aux.cadastroProfessor);
        dispatch(refreshInfosLesson(await readPaginationLesson(pagination, 5)));
      } else {
        aux.id = infosInput.id;
        await editLesson(aux, aux.cadastroEscola, aux.cadastroProfessor);
        dispatch(refreshInfosLesson(await readPaginationLesson(pagination, 5)));
        setInfosInput(HorasValuesDefault);
      }

      setModal(false);
    }
  }

  async function deleteInfo(infos: LessonsInfos) {
    await deleteLesson(infos.id);
    dispatch(refreshInfosLesson(await readPaginationLesson(pagination, 5)));
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
}
