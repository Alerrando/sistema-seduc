import React, { createContext, useContext, useState } from "react";
import { LessonInfos, OfficeInfos, SchoolInfos, TeacherInfos, TeachersOffice, TeachersThirst } from "../src/utils/type";
import { DatasTypes } from "../src/Components/Filter";

type StateProps = {
  allInfosLesson: LessonInfos[];
  setAllInfosLesson: (allInfosLesson: LessonInfos[]) => void;
  allInfosSchool: SchoolInfos[];
  setAllInfosSchool: (allInfosSchool: SchoolInfos[]) => void;
  allInfosTeacher: TeacherInfos[];
  setAllInfosTeacher: (allInfosTeacher: TeacherInfos[]) => void;
  allInfosOffice: OfficeInfos[];
  setAllInfosOffice: (allInfosOffice: OfficeInfos[]) => void;
  allInfosTeachersOffice: TeachersOffice[];
  setAllInfosTeacherOffice: (allInfosTeacherOffice: TeachersOffice[]) => void;
  allInfosTeachersThirst: TeachersThirst[];
  setAllInfosTeachersThirst: (allInfosTeachersThirst: TeachersThirst[]) => void;
  infosDefinitionPeriods: DatasTypes[];
  setInfosDefinitionPeriods: (infosDefinitionPeriods: DatasTypes[]) => void;
};

const StateContext = createContext<StateProps | undefined>(undefined);

export function StateProvider(children: React.ReactNode) {
  const [allInfosLesson, setAllInfosLesson] = useState<LessonInfos[]>([]);
  const [allInfosSchool, setAllInfosSchool] = useState<SchoolInfos[]>([]);
  const [allInfosTeacher, setAllInfosTeacher] = useState<TeacherInfos[]>([]);
  const [allInfosOffice, setAllInfosOffice] = useState<OfficeInfos[]>([]);
  const [allInfosTeachersOffice, setAllInfosTeacherOffice] = useState<TeachersOffice[]>([]);
  const [allInfosTeachersThirst, setAllInfosTeachersThirst] = useState<TeachersThirst[]>([]);
  const [infosDefinitionPeriods, setInfosDefinitionPeriods] = useState<DatasTypes[]>([]);

  const value: StateProps = {
    allInfosLesson,
    setAllInfosLesson,
    allInfosSchool,
    setAllInfosSchool,
    allInfosTeacher,
    setAllInfosTeacher,
    allInfosOffice,
    setAllInfosOffice,
    allInfosTeachersOffice,
    setAllInfosTeacherOffice,
    allInfosTeachersThirst,
    setAllInfosTeachersThirst,
    infosDefinitionPeriods,
    setInfosDefinitionPeriods,
  };

  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
}

export const useStore = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useStore must be used within a StateProvider");
  }
  return context;
};
