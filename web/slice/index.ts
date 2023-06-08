import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { readAll } from "@/api";

export type LessonsInfos = {
  id: number;
  name: string;
  horaAulas: number;
  titularidade: string;
  diaAula: Date;
  cadastroEscola: number;
  edit: number;
};

export type SchoolInfos = {
  id: number;
  diretor: string;
  name: string;
  edit: number;
}

const registerTypes = {
  Lesson: {},

  School: {},

  Director: {},

}

export const HorasValuesDefault = {
  diaAula: new Date().toString(),
  edit: -1,
  horaAulas: 0,
  id: 0,
  name: "",
  titularidade: "",
  cadastroEscola: 0,
};

export const SchoolValuesDefault = {
  id: 0,
  diretor: "",
  name: "",
  edit: -1,
}

export type StateProps = {
  allInfosLesson: LessonsInfos[];
  allInfosSchool: SchoolInfos[];
  registerType: keyof typeof registerTypes;
};

const initialState: StateProps = {
  allInfosLesson: [],
  allInfosSchool: [],
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
    changeRegisterType: (state, action: PayloadAction<keyof typeof registerTypes>) => {
      state.registerType = action.payload;
    },
  },
});

export const { refreshInfosLesson, refreshInfosSchool, changeRegisterType } = Slice.actions;

export default Slice.reducer;
