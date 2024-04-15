import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";
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
  userInfos: UserInfos;
  usersAll: UserInfos[];
};

const initialState: StateProps = {
  userInfos: {} as UserInfos,
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
    }
  ],
};

export const sliceLogin: Slice<StateProps> = createSlice({
  name: "sliceLogin",
  initialState,
  reducers: {
    refreshInfosUser: (state, action: PayloadAction<UserInfos[]>) => {
      state.usersAll = action.payload;
    },

    changeLoginLogout: (state, action: PayloadAction<UserInfos>) => {
      state.userInfos = action.payload;
    },
  },
});

export const { changeLoginLogout, refreshInfosUser } = sliceLogin.actions;

export default sliceLogin.reducer;
