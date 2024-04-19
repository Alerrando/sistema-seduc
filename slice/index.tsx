import React, { createContext, useContext, useState } from "react";
import { DatasTypes } from "../src/Components/Filter";
import {
  LessonInfos,
  OfficeInfos,
  SchoolDTOInfos,
  SchoolInfos,
  TeacherDTOInfos,
  TeacherInfos,
  TeachersOffice,
  TeachersThirst,
  UserInfos,
} from "../src/utils/type";

type AllTypesUsedStateSlice =
  | UserInfos
  | UserInfos[]
  | LessonInfos[]
  | OfficeInfos[]
  | SchoolInfos[]
  | SchoolInfos
  | TeacherInfos[]
  | TeacherInfos
  | TeachersOffice[]
  | TeachersThirst[]
  | DatasTypes[]
  | DatasTypes
  | SchoolDTOInfos[]
  | SchoolDTOInfos
  | TeacherDTOInfos[]
  | TeacherDTOInfos;

export const DefaultUserInfos: UserInfos = {
  id: 0,
  name: "",
  email: "",
  password: "",
  office: {} as OfficeInfos,
  rg: "",
  registerSchool: {} as SchoolInfos,
  level: 2,
  mandatoryBulletin: 0,
  edit: false,
  inactive: false,
};

type StateProps = {
  user: UserInfos;
  usersAll: UserInfos[];
  allInfosLesson: LessonInfos[];
  allInfosSchool: SchoolInfos[];
  allInfosTeacher: TeacherInfos[];
  allInfosOffice: OfficeInfos[];
  allInfosTeachersOffice: TeachersOffice[];
  allInfosTeachersThirst: TeachersThirst[];
  infosDefinitionPeriods: DatasTypes[];
  allFilterInfosTeacher: TeacherDTOInfos[];
  allFilterInfosSchool: SchoolDTOInfos[];
  filterInfosTeacher: TeacherInfos;
  filterInfosSchool: SchoolInfos;
  filterStartEndDate: DatasTypes;
  emptyAllFilter: () => void;
  setValueInState: (name: string, value: AllTypesUsedStateSlice) => void;
};

const initialState: StateProps = {
  user: DefaultUserInfos,
  usersAll: [DefaultUserInfos],
  allInfosLesson: [],
  allInfosSchool: [],
  allInfosTeacher: [],
  allInfosOffice: [],
  allInfosTeachersOffice: [],
  allInfosTeachersThirst: [],
  infosDefinitionPeriods: [],
  allFilterInfosTeacher: [],
  allFilterInfosSchool: [],
  filterInfosTeacher: {} as TeacherInfos,
  filterInfosSchool: {} as SchoolInfos,
  filterStartEndDate: {} as DatasTypes,
  emptyAllFilter: () => {},
  setValueInState: (name: string, value: AllTypesUsedStateSlice) => {},
};

const StateContext = createContext<StateProps>(initialState);

export function StateProvider(children: React.ReactNode) {
  const [state, setState] = useState<StateProps>(initialState);

  function emptyAllFilter() {
    setState({
      ...state,
      allInfosLesson: [],
      allInfosSchool: [],
      allInfosTeacher: [],
      allInfosOffice: [],
      allInfosTeachersOffice: [],
      allInfosTeachersThirst: [],
      infosDefinitionPeriods: [],
    });
  }

  function setValueInState(name: string, value: AllTypesUsedStateSlice) {
    setState({ ...state, [name]: value });
  }

  return (
    <StateContext.Provider value={{ ...state, setValueInState, emptyAllFilter }}>{children}</StateContext.Provider>
  );
}

export const useStore = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useStore must be used within a StateProvider");
  }
  return context;
};
