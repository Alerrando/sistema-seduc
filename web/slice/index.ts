import { createAsyncThunk, createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";

export type InputConfig = {
  label: string;
  htmlFor: string;
  type: string;
  placeholder?: string;
  name: string;
  optionDefault?: string,
  optionType?: string,
  input: "input" | "select",
};

export type LessonsInfos = {
  id: number;
  cadastroProfessor: string;
  horaAulas: string;
  diaAula: Date | string;
  cadastroEscola: string;
  edit: boolean;
};

export type SchoolInfos = {
  id: number;
  name: string;
  edit: boolean;
}

export type TeacherInfos = {
  cpf: string;
  sede: string;
  cargo: string;
} & SchoolInfos

export type DefinitionPeriodsInfos = {
  startDate: Date | string,
  endDate: Date | string,
}

export type OfficeInfos = {
  type: string,
} & SchoolInfos

export type SchoolDTOInfos = {
  id: number,
  name: string,
  datesWork: any,
  quantidadeAulas: number,
  cargo: string,
}

export type TeacherDTOInfos = {
  name: string,
  horaAulas: number,
  dataAula: Date | string,
  cadastroEscola: string;
}

export const registerTypes = {
  Lesson: {},

  School: {},

  Teacher: {},
}

const reportsTypes = {
  School: {},

  Teacher: {},
}

export const HorasValuesDefault: LessonsInfos = {
  id: 0,
  diaAula: new Date().toString(),
  edit: false,
  horaAulas: "",
  cadastroProfessor: "",
  cadastroEscola: "",
};

export const SchoolValuesDefault: SchoolInfos = {
  id: 0,
  name: "",
  edit: false,
}

export const OfficeValuesDefault: OfficeInfos = {
  ...SchoolValuesDefault,
  type: "",
}

export const TeacherValuesDefault: TeacherInfos = {
  ...SchoolValuesDefault,
  cpf: "",
  cargo: "",
  sede: "",
};

export const DefinitionPeriodsValuesDefault: DefinitionPeriodsInfos = {
  startDate: new Date().toString(),
  endDate: new Date().toString(),
}

type StateProps = {
  allInfosLesson: LessonsInfos[];
  allInfosSchool: SchoolInfos[];
  allInfosTeacher: TeacherInfos[];
  infosDefinitionPeriods: DefinitionPeriodsInfos[];
  allInfosOffice: OfficeInfos[];
  registerType: keyof typeof registerTypes | null;
  reportsTypes: keyof typeof reportsTypes | null;
};

const initialState: StateProps = {
  allInfosLesson: [],
  allInfosSchool: [],
  allInfosTeacher: [],
  infosDefinitionPeriods: [],
  allInfosOffice: [],
  registerType: null,
  reportsTypes: null,
};

export const slice: Slice<StateProps> = createSlice({
  name: "slice",
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

    refreshDefinitionPeriods: (state, action: PayloadAction<DefinitionPeriodsInfos[]>) => {
      state.infosDefinitionPeriods = action.payload;
    },

    refreshInfosOffice: (state, action: PayloadAction<OfficeInfos[]>) => {
      state.allInfosOffice = action.payload;
    },

    changeRegisterType: (state, action: PayloadAction<keyof typeof registerTypes>) => {
      state.registerType = action.payload;
    },

    changeReportsType: (state, action: PayloadAction<keyof typeof reportsTypes>) => {
      state.reportsTypes = action.payload;
    },
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

export const { refreshInfosLesson, refreshInfosSchool, refreshInfosTeacher, refreshDefinitionPeriods, refreshInfosOffice, changeRegisterType, changeReportsType } = slice.actions;

export default slice.reducer;
