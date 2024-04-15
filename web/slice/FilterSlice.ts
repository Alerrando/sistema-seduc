import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";
import { SchoolDTOInfos, SchoolInfos, TeacherDTOInfos, TeacherInfos } from ".";
import { DatasTypes } from "../src/Components/Filter";
import { createStore } from "zustand";
import { persist } from "zustand/middleware";

type StateProps = {
  allFilterInfosTeacher: TeacherDTOInfos[];
  allFilterInfosSchool: SchoolDTOInfos[];
  refreshAllFilterInfosTeacher: (infos: TeacherDTOInfos[]) => void;
  refreshAllFilterInfosSchool: (infos: SchoolDTOInfos[]) => void;
  emptyAllFilter: () => void;
};

export const useFilterStore = 
  createStore(
    persist<StateProps>((set) => ({
      allFilterInfosTeacher: [],
      allFilterInfosSchool: [],
      refreshAllFilterInfosTeacher: (infos: TeacherDTOInfos[]) =>
        set((state) => ({ ...state, allFilterInfosTeacher: infos })),
      refreshAllFilterInfosSchool: (infos: SchoolDTOInfos[]) =>
        set((state) => ({ ...state, allFilterInfosSchool: infos })),
      emptyAllFilter: () => set({ allFilterInfosSchool: [], allFilterInfosTeacher: [] }),
    }),
    {
      name: "filter",
      skipHydration: true,
    },
  ),
);

export default useFilterStore;
