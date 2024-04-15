import React, { createContext, useRef } from "react";
import { createStore } from "zustand";
import { persist } from "zustand/middleware";
import { OfficeInfos, OfficeValuesDefault, SchoolInfos, SchoolValuesDefault, TypeDefault } from ".";

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
  office: OfficeValuesDefault,
  rg: "",
  registerSchool: SchoolValuesDefault,
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

export const initialState: StateProps = {
  user: {
    id: 0,
    email: "alerrando2@gmail.com",
    edit: false,
    inactive: false,
    level: 0,
    mandatoryBulletin: 0,
    name: "Alerrando",
    office: OfficeValuesDefault,
    password: "1234",
    registerSchool: SchoolValuesDefault,
    rg: "",
  },
  usersAll: [
    {
      id: 0,
      email: "alerrando2@gmail.com",
      edit: false,
      inactive: false,
      level: 0,
      mandatoryBulletin: 0,
      name: "Alerrando",
      office: OfficeValuesDefault,
      password: "1234",
      registerSchool: SchoolValuesDefault,
      rg: "",
    },
  ],
};

const useProviderStore = () =>
  createStore(
    persist<StateProps>(
      (set) => ({
        user: initialState.user,
        setUser: (user: UserInfos) => set({ user }),
        usersAll: initialState.usersAll,
        setUsersAll: (usersAll: UserInfos[]) => set({ usersAll }),
      }),
      {
        name: "user",
        skipHydration: true,
      },
    ),
  );

export const StateContextLogin = createContext<StateProps>(initialState);

export function StateProviderLogin({ children }: { children: React.ReactNode }) {
  const { getState } = useRef(useProviderStore()).current;

  return <StateContextLogin.Provider value={getState()}>{children}</StateContextLogin.Provider>;
}
