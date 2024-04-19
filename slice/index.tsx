import { createContext, useContext, useState } from "react";
import { LessonInfos, OfficeInfos, SchoolInfos, TeacherInfos, TeachersOffice, TeachersThirst } from "../src/utils/type";
import { DatasTypes } from "../src/Components/Filter";

type AllTypesUsedStateSlice = LessonInfos | OfficeInfos | SchoolInfos | TeacherInfos | TeachersOffice | TeachersThirst | DatasTypes;

type StateProps = {
  allInfosLesson: LessonInfos[];
  allInfosSchool: SchoolInfos[];
  allInfosTeacher: TeacherInfos[];
  allInfosOffice: OfficeInfos[];
  allInfosTeachersOffice: TeachersOffice[];
  allInfosTeachersThirst: TeachersThirst[];
  infosDefinitionPeriods: DatasTypes[];
  emptyAllFilter: () => void;
  setValueInState: (name: string, value: AllTypesUsedStateSlice) => void;
};

const initialState: StateProps = {
  allInfosLesson: [],
  allInfosSchool: [],
  allInfosTeacher: [],
  allInfosOffice: [],
  allInfosTeachersOffice: [],
  allInfosTeachersThirst: [],
  infosDefinitionPeriods: [],
  emptyAllFilter: () => {},
  setValueInState: (name: string, value: AllTypesUsedStateSlice) => {},
}

const StateContext = createContext<StateProps>(initialState);

export function StateProvider(children: React.ReactNode) {
  const [state, setState] = useState<StateProps>(initialState);

  function emptyAllFilter(){
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
  };

  function setValueInState(name: string, value: AllTypesUsedStateSlice){
    setState({ ...state, [name]: value });
  }

  return <StateContext.Provider value={{ ...state, setValueInState, emptyAllFilter }}>{children}</StateContext.Provider>;
}

export const useStore = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useStore must be used within a StateProvider");
  }
  return context;
};
