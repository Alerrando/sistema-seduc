import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";
import { SchoolDTOInfos, SchoolInfos, TeacherDTOInfos, TeacherInfos } from ".";
import { DatasTypes } from "../src/Components/Filter";

type StateProps = {
  allFilterInfosTeacher: TeacherDTOInfos[];
  allFilterInfosSchool: SchoolDTOInfos[];
};

const initialState: StateProps = {
  allFilterInfosTeacher: [],
  allFilterInfosSchool: [],
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

    emptyAllFilter: (state, action: PayloadAction<unknown>) => {
      state.allFilterInfosSchool = [];
      state.allFilterInfosTeacher = [];
    },
  },
});

export const {
  refreshAllFilterInfosTeacher,
  refreshAllFilterInfosSchool,
  emptyAllFilter,
} = sliceFilter.actions;

export default sliceFilter.reducer;
