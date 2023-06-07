import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { readAll } from "@/api";

export type LessonsInfos = {
  id: number;
  name: string;
  horaAulas: number;
  titularidade: string;
  diaAula: Date;
  escola: string;
  edit: number;
};

export type SchoolInfos = {
  id: number;
  diretor: string;
  name: string;
}

const registerTypes = {
  Lesson: [
    
  ],

  School: {

  },

  Director: {

  }
}

export const HorasValuesDefault = {
  diaAula: new Date().toString(),
  edit: -1,
  horaAulas: 0,
  id: 0,
  name: "",
  titularidade: "",
  escola: "",
};

export const SchoolValuesDefault = {
  id: 0,
  diretor: "",
  name: "",
}

export type StateProps = {
  allInfosLesson: LessonsInfos[];
  allInfosSchool: SchoolInfos[];
};

const initialState: StateProps = {
  allInfosLesson: [],
  allInfosSchool: [],
};

export const Slice = createSlice({
  name: "Slice",
  initialState,
  reducers: {
    refreshInfosLesson: (state, action: PayloadAction<LessonsInfos[]>) => {
      state.allInfosLesson = action.payload;
    },
    refreshInfosSchool: (state, action: PayloadAction<LessonsInfos[]>) => {
      state.allInfosSchool = action.payload;
    },
    editInfosChange: (state, action: PayloadAction<LessonsInfos>) => {
      state.allInfosLesson = state.allInfosLesson.map((info: LessonsInfos) => {
        if (action.payload.id === info.id) {
          return {
            ...action.payload,
            diaAula: action.payload.diaAula,
          };
        }
        return info;
      });
    },
    deleteInfosChange: (state, action: PayloadAction<LessonsInfos>) => {
      state.allInfosLesson = state.allInfosLesson.filter(
        (info) => info.id !== action.payload.id
      );
    },
  },
});

export const { refreshInfosLesson, refreshInfosSchool, editInfosChange, deleteInfosChange } = Slice.actions;

export default Slice.reducer;
