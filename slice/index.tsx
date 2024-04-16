import { LessonInfos, OfficeInfos, SchoolInfos, TeacherInfos, TeachersOffice, TeachersThirst } from "../src/utils/type";
import React, { createContext, useRef } from "react";
import { createStore } from "zustand";
import { persist } from "zustand/middleware";

export const registerTypes = {
  Lesson: {},
  School: {},
  Teacher: {},
  User: {},
};

const reportsTypes = {
  School: {},
  Teacher: {},
};

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
  registerType: keyof typeof registerTypes | null;
  reportsTypes: keyof typeof reportsTypes | null;
};

export const initialState: StateProps = {
  allInfosLesson: [],
  allInfosSchool: [],
  allInfosTeacher: [],
  allInfosOffice: [],
  allInfosTeachersOffice: [],
  allInfosTeachersThirst: [],
  registerType: null,
  reportsTypes: null,
};

const useStore = createStore(
  persist<StateProps>(
    (set) => ({
      setAllInfosLesson: (allInfosLesson: LessonInfos[]) => set({ allInfosLesson }),
      setAllInfosSchool: (allInfosSchool: SchoolInfos[]) => set({ allInfosSchool }),
      setAllInfosTeacher: (allInfosTeacher: TeacherInfos[]) => set({ allInfosTeacher }),
      setAllInfosOffice: (allInfosOffice: OfficeInfos[]) => set({ allInfosOffice }),
      setAllInfosTeacherOffice: (allInfosTeacherOffice: TeachersOffice[]) => set({ allInfosTeacherOffice }),
      setAllInfosTeachersThirst: (allInfosTeachersThirst: TeachersThirst[]) => set({ allInfosTeachersThirst }),
    }),
    {
      name: "state",
      version: 1,
      getStorage: () => sessionStorage,
    },
  ),
);

export const StateContext = createContext<StateProps>(initialState);

export function StateProvider({ children }: { children: React.ReactNode }) {
  const { getState } = useRef(useStore()).current;

  return <StateContext.Provider value={getState()}>{children}</StateContext.Provider>;
}
