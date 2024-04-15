import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";
import { SchoolDTOInfos, SchoolInfos, TeacherDTOInfos, TeacherInfos } from ".";
import { DatasTypes } from "../src/Components/Filter";

type StateProps = {
  allFilterInfosTeacher: TeacherDTOInfos[];
  allFilterInfosSchool: SchoolDTOInfos[];
  filterInfosTeacher: TeacherInfos;
  filterInfosSchool: SchoolInfos;
  filterStartEndDate: DatasTypes;
};

const initialState: StateProps = {
  allFilterInfosTeacher: [],
  allFilterInfosSchool: [],
  filterInfosTeacher: {} as TeacherInfos,
  filterInfosSchool: {} as SchoolInfos,
  filterStartEndDate: {} as DatasTypes,
};

export const sliceFilter: Slice<StateProps> = createSlice({
  name: "sliceFilter",
  initialState,
  reducers: {
    refreshAllFilterInfosTeacher: (state, action: PayloadAction<TeacherDTOInfos[]>) => {
      state.allFilterInfosTeacher = action.payload;
    },

    refreshAllFilterInfosSchool: (state, action: PayloadAction<SchoolDTOInfos[]>) => {
      state.allFilterInfosSchool = action.payload;
    },

    refreshFilterInfosTeacher: (state, action: PayloadAction<TeacherInfos>) => {
      state.filterInfosTeacher = action.payload;
    },

    refreshFilterInfosSchool: (state, action: PayloadAction<SchoolInfos>) => {
      state.filterInfosSchool = action.payload;
    },

    refreshFilterStartEndDate: (state, action: PayloadAction<DatasTypes>) => {
      state.filterStartEndDate = action.payload;
    },

    emptyAllFilter: (state) => {
      state.allFilterInfosSchool = [];
      state.allFilterInfosTeacher = [];
      state.filterInfosSchool = [];
      state.filterInfosTeacher = [];
      state.filterStartEndDate = [];
    },
  },
});

export const {
  refreshAllFilterInfosTeacher,
  refreshAllFilterInfosSchool,
  refreshFilterInfosTeacher,
  refreshFilterInfosSchool,
  refreshFilterStartEndDate,
  emptyAllFilter,
} = sliceFilter.actions;

export default sliceFilter.reducer;
