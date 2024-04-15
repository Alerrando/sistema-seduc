import create, { createStore } from "zustand";
import { persist } from "zustand/middleware";

export type InputConfig = {
  label: string;
  htmlFor: string;
  type: string;
  placeholder?: string;
  name: string;
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

const ValuesDefault: TypeDefault = {
  id: 0,
  name: "",
  edit: false,
  inactive: false,
};

export const SchoolValuesDefault: SchoolInfos = {
  ...ValuesDefault,
  adress: "",
  email: "",
  fone: "",
  zip: "",
};

export const OfficeValuesDefault: OfficeInfos = {
  ...ValuesDefault,
  type: "",
};

export const TeacherValuesDefault: TeacherInfos = {
  ...ValuesDefault,
  cpf: "",
};

export const HorasValuesDefault: LessonInfos = {
  id: 0,
  lessonDay: new Date().toString(),
  edit: false,
  amountTime: "",
  registerSchool: SchoolValuesDefault,
  registerTeacher: TeacherValuesDefault,
  inactive: false,
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


const useStore = () => 
  createStore(
  persist<StateProps>((set) => (
    {
      allInfosLesson: [],
      setAllInfosLesson: (allInfosLesson: LessonInfos[]) => set({ allInfosLesson }),
      allInfosSchool: [],
      setAllInfosSchool: (allInfosSchool: SchoolInfos[]) => set({ allInfosSchool }),
      allInfosTeacher: [],
      setAllInfosTeacher: (allInfosTeacher: TeacherInfos[]) => set({ allInfosTeacher }),
      allInfosOffice: [],
      setAllInfosOffice: (allInfosOffice: OfficeInfos[]) => set({ allInfosOffice }),
      allInfosTeachersOffice: [],
      setAllInfosTeacherOffice: (allInfosTeachersOffice: TeachersOffice[]) => set({ allInfosTeachersOffice }),
      allInfosTeachersThirst: [],
      setAllInfosTeachersThirst: (allInfosTeachersThirst: TeachersThirst[]) => set({ allInfosTeachersThirst }),
      registerType: null,
      reportsTypes: null,
    }
    ), {
      name: "state",
      version: 1,
      getStorage: () => sessionStorage,
    }
  ),
);

export default useStore;
