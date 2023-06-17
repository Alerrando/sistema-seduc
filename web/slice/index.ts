import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { readAll } from "../src/api";

export type LessonsInfos = {
  id: number;
  cadastroProfessor: string;
  horaAulas: number;
  diaAula: Date;
  cadastroEscola: string;
  titularidade: string;
  edit: number;
};

export type SchoolInfos = {
  id: number;
  name: string;
  classificação?: string,
  edit: number;
}

export type TeacherInfos = {
  id: number,
  name: string,
  cpf: string;
  edit: number,
}

export type SchoolDTOInfos = {
  id: number,
  name: string,
  quantidadeAulas: number,
}

export type TeacherDTOInfos = {
  id: number,
  name: string,
  horaAulas: number,
  datasAulas: String[],
}

const registerTypes = {
  Lesson: {},

  School: {},

  Teacher: {},

}

export const HorasValuesDefault = {
  diaAula: new Date().toString(),
  edit: -1,
  horaAulas: 0,
  id: 0,
  titularidade: "",
  cadastroProfessor: "",
  cadastroEscola: 0,
};

export const SchoolValuesDefault = {
  id: 0,
  name: "",
  cpf: "",
  edit: -1,
}

export const TeacherValuesDefault = {
  id: 0,
  name: "",
  edit: -1,
}

export type StateProps = {
  allInfosLesson: LessonsInfos[];
  allInfosSchool: SchoolInfos[];
  allInfosTeacher: TeacherInfos[];
  registerType: keyof typeof registerTypes;
};

const initialState: StateProps = {
  allInfosLesson: [],
  allInfosSchool: [],
  allInfosTeacher: [],
  registerType: null,
};

export const Slice = createSlice({
  name: "Slice",
  initialState,
  reducers: {
    refreshInfosLesson: (state, action: PayloadAction<LessonsInfos[]>) => {
      state.allInfosLesson = action.payload;
    },
    refreshInfosSchool: (state, action: PayloadAction<SchoolInfos[]>) => {
      state.allInfosSchool = action.payload;
    },
    refreshInfosTeacher: (state, action: PayloadAction<TeacherInfos[]>) => {
      state.allInfosTeacher = action.payload;
    },
    changeRegisterType: (state, action: PayloadAction<keyof typeof registerTypes>) => {
      state.registerType = action.payload;
    },
  },
});

export function objectEmptyValue(obj: LessonsInfos | SchoolInfos | TeacherInfos){
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (value === "" || value === null || value === undefined) {
        return true;
      }
    }
  }
  
  return false;
};

export const { refreshInfosLesson, refreshInfosSchool, refreshInfosTeacher, changeRegisterType } = Slice.actions;

export default Slice.reducer;
