import { DatasTypes } from "@/Components/Filter";
import React, { createContext, useRef } from "react";
import { persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";
import { SchoolDTOInfos, SchoolInfos, TeacherDTOInfos, TeacherInfos } from ".";

type StateProps = {
  allFilterInfosTeacher: TeacherDTOInfos[];
  allFilterInfosSchool: SchoolDTOInfos[];
  filterInfosTeacher: TeacherInfos;
  filterInfosSchool: SchoolInfos;
  filterStartEndDate: DatasTypes;
};

export const initialState: StateProps = {
  allFilterInfosTeacher: [],
  allFilterInfosSchool: [],
  filterInfosTeacher: {} as TeacherInfos,
  filterInfosSchool: {} as SchoolInfos,
  filterStartEndDate: {} as DatasTypes,
};

const useStore = createStore(
  persist<StateProps>((set) => ({
    refreshAllFilterInfosTeacher: (payload: TeacherDTOInfos[]) => set({ allFilterInfosTeacher: payload }),
    refreshAllFilterInfosSchool: (payload: SchoolDTOInfos[]) => set({ allFilterInfosSchool: payload }),
    refreshFilterInfosTeacher: (payload: TeacherInfos) => set({ filterInfosTeacher: payload }),
    refreshFilterInfosSchool: (payload: SchoolInfos) => set({ filterInfosSchool: payload }),
    refreshFilterStartEndDate: (payload: DatasTypes) => set({ filterStartEndDate: payload }),
    emptyAllFilter: () =>
      set({
        allFilterInfosSchool: [],
        allFilterInfosTeacher: [],
        filterInfosSchool: {} as SchoolInfos,
        filterInfosTeacher: {} as TeacherInfos,
        filterStartEndDate: {} as DatasTypes,
      }),
  })),
);

export const StateContextFilter = createContext<StateProps>(initialState);

export function StateProviderFilter({ children }: { children: React.ReactNode }) {
  const { getState } = useRef(useStore()).current;

  return <StateContextFilter.Provider value={getState()}>{children}</StateContextFilter.Provider>;
}
