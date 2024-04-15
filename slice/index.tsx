import { OptionType } from "@/utils/type";
import { createStore } from "zustand";
import { persist } from "zustand/middleware";

export type InputConfig = {
  label: string;
  htmlFor: string;
  type: string;
  placeholder?: string;
  name: OptionType;
  optionDefault?: string;
  optionType?: string;
  input: "input" | "select";
  maxChars?: number;
  maskHandleForm?: (value: string) => string;
};

export type TypeDefault = {
  id: number;
  name: string;
  edit: boolean;
  inactive: boolean;
};

export type SchoolInfos = {
  adress: string;
  zip: string;
  fone: string;
  email: string;
} & TypeDefault;

export type TeacherInfos = {
  cpf: string;
} & TypeDefault;

export type LessonInfos = {
  id: number;
  registerTeacher: TeacherInfos;
  amountTime: string;
  lessonDay: Date | string;
  registerSchool: SchoolInfos;
  inactive: boolean;
  edit: boolean;
};

export type DefinitionPeriodsInfos = {
  startDate: Date | string;
  endDate: Date | string;
};

export type OfficeInfos = {
  type: string;
} & TypeDefault;

export type TeachersOffice = {
  id: number;
  registerOffice: OfficeInfos;
  registerTeacher: TeacherInfos;
};

export type TeachersThirst = {
  id: number;
  registerSchool: SchoolInfos;
  registerTeacher: TeacherInfos;
};

export type SchoolDTOInfos = {
  id: number;
  name: string;
  datesWork: unknown;
  amountTime: number;
};

export type TeacherDTOInfos = {
  name: string;
  amountTime: number;
  lessonDay: Date | string;
  registerSchool: TeacherInfos;
  amountTimeTotal: number;
};

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

export default useStore;
