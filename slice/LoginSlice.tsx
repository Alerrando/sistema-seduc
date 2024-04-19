import React, { createContext, useContext, useState } from "react";
import { OfficeInfos, SchoolInfos, TypeDefault } from "../src/utils/type";

export type UserInfos = {
  email: string;
  password: string;
  office: OfficeInfos;
  rg: string;
  registerSchool: SchoolInfos;
  level: number;
  mandatoryBulletin: number;
} & TypeDefault;

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
  setUser: (userInfos: UserInfos) => void;
  usersAll: UserInfos[];
  setUsersAll: (usersAll: UserInfos[]) => void;
};

const initialState: StateProps = {
  user: DefaultUserInfos,
  setUser: () => {},
  usersAll: [DefaultUserInfos],
  setUsersAll: () => {},
};

const StateContextLogin = createContext<StateProps>(initialState);

export function StateProviderLogin({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState(initialState);

  const setUser = (user: UserInfos) => {
    setState((prevState) => ({ ...prevState, user }));
  };

  const setUsersAll = (usersAll: UserInfos[]) => {
    setState((prevState) => ({ ...prevState, usersAll }));
  };

  return <StateContextLogin.Provider value={{ ...state, setUser, setUsersAll }}>{children}</StateContextLogin.Provider>;
}

export function useLoginState() {
  return useContext(StateContextLogin);
}
