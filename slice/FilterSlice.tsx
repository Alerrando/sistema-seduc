import React, { createContext, useContext, useState } from "react";
import { DatasTypes } from "../src/Components/Filter";
import { SchoolDTOInfos, SchoolInfos, TeacherDTOInfos, TeacherInfos } from "../src/utils/type";
import { initialState } from "./zustandStore";

type StateProps = {
  allFilterInfosTeacher: TeacherDTOInfos[];
  allFilterInfosSchool: SchoolDTOInfos[];
  filterInfosTeacher: TeacherInfos;
  filterInfosSchool: SchoolInfos;
  filterStartEndDate: DatasTypes;
  emptyAllFilter: () => void;
};

const StateContext = createContext<StateProps>(initialState);

export function StateProviderFilter({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StateProps>(initialState);

  const emptyAllFilter = () => {
    setState({
      ...state,
      allFilterInfosTeacher: [],
      allFilterInfosSchool: [],
      filterInfosTeacher: {} as TeacherInfos,
      filterInfosSchool: {} as SchoolInfos,
      filterStartEndDate: {} as DatasTypes,
    });
  };

  return <StateContext.Provider value={{ ...state, emptyAllFilter }}>{children}</StateContext.Provider>;
}

export function useStateContextFilter() {
  const context = useContext(StateContext);
  return context;
}
