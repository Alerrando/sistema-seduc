import React, { createContext, useContext, useState } from "react";
import { DatasTypes } from "../src/Components/Filter";
import { SchoolDTOInfos, SchoolInfos, TeacherDTOInfos, TeacherInfos } from "../src/utils/type";

type AllTypesUsedFilterSlice = SchoolDTOInfos | SchoolInfos | TeacherDTOInfos | TeacherInfos;

type StateProps = {
  allFilterInfosTeacher: TeacherDTOInfos[];
  allFilterInfosSchool: SchoolDTOInfos[];
  filterInfosTeacher: TeacherInfos;
  filterInfosSchool: SchoolInfos;
  filterStartEndDate: DatasTypes;
  emptyAllFilter: () => void;
  setValueInState: (name: string, value: AllTypesUsedFilterSlice) => void;
};

const initialState: StateProps = {
  allFilterInfosTeacher: [],
  allFilterInfosSchool: [],
  filterInfosTeacher: {} as TeacherInfos,
  filterInfosSchool: {} as SchoolInfos,
  filterStartEndDate: {} as DatasTypes,
  emptyAllFilter: () => {},
  setValueInState: (name: string, value: AllTypesUsedFilterSlice) => {},
}

const StateContext = createContext<StateProps>(initialState);

export function StateProviderFilter({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StateProps>(initialState);

  function emptyAllFilter(){
    setState({
      ...state,
      allFilterInfosTeacher: [],
      allFilterInfosSchool: [],
      filterInfosTeacher: {} as TeacherInfos,
      filterInfosSchool: {} as SchoolInfos,
      filterStartEndDate: {} as DatasTypes,
    });
  };

  function setValueInState(name: string, value: AllTypesUsedFilterSlice){
    setState({ ...state, [name]: value });
  }

  return <StateContext.Provider value={{ ...state, emptyAllFilter }}>{children}</StateContext.Provider>;
}

export function useStateContextFilter() {
  const context = useContext(StateContext);
  return context;
}
