import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LessonsInfos = {
  id: number;
  cadastroProfessor: string;
  horaAulas: number;
  diaAula: Date | string;
  cadastroEscola: string;
  edit: boolean;
};

export type SchoolInfos = {
  id: number;
  name: string;
  classificação: string,
  edit: boolean;
}

export type TeacherInfos = {
  id: number,
  name: string,
  cpf: string;
  sede: string;
  cargo: string;
  edit: boolean;
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

const reportsTypes = {
  School: {},

  Teacher: {},
}

export const HorasValuesDefault: LessonsInfos = {
  diaAula: new Date().toString(),
  edit: false,
  horaAulas: 0,
  id: 0,
  cadastroProfessor: "",
  cadastroEscola: "",
};

export const SchoolValuesDefault: SchoolInfos = {
  id: 0,
  name: "",
  classificação: "",
  edit: false,
}

export const TeacherValuesDefault: TeacherInfos = {
  id: 0,
  name: "",
  cpf: "",
  cargo: "",
  sede: "",
  edit: false,
}

export type StateProps = {
  allInfosLesson: LessonsInfos[];
  allInfosSchool: SchoolInfos[];
  allInfosTeacher: TeacherInfos[];
  registerType: keyof typeof registerTypes | null;
  reportsTypes: keyof typeof reportsTypes | null;
};

const initialState: StateProps = {
  allInfosLesson: [],
  allInfosSchool: [],
  allInfosTeacher: [],
  registerType: null,
  reportsTypes: null,
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
    changeReportsType: (state, action: PayloadAction<keyof typeof reportsTypes>) => {
      state.reportsTypes = action.payload;
    }
  },
});

export function objectEmptyValue(obj: LessonsInfos | SchoolInfos | TeacherInfos){
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key as keyof (LessonsInfos | SchoolInfos | TeacherInfos)];
      if (typeof value === "string" && (value === "" || value === null || value === undefined)) {
        return true;
      }
    }
  }
  
  return false;
};

export const { refreshInfosLesson, refreshInfosSchool, refreshInfosTeacher, changeRegisterType, changeReportsType } = Slice.actions;

export default Slice.reducer;
