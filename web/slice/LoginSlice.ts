import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";
import { TypeDefault } from ".";

export type UserInfos = {
    email: string,
    password: string,
    office: string,
    rg: string,
    cadastroEscola: string,
    level: number,
    mandatoryBulletin: number,
} & TypeDefault

export const DefaultUserInfos: UserInfos = {
    id: 0,
    name: "",
    email: "",
    password: "",
    office: "",
    rg: "",
    cadastroEscola: "",
    level: 2,
    mandatoryBulletin: 0,
    edit: false,
    inactive: false,
}

type StateProps = {
    userInfos: UserInfos,
}

const initialState: StateProps = {
    userInfos: {} as UserInfos,
}

export const sliceLogin: Slice<StateProps> = createSlice({
    name: "sliceLogin",
    initialState,
    reducers: {
        changeLoginLogout: (state, action: PayloadAction<UserInfos>) =>{
            state.userInfos = action.payload;
        },
    }
})

export const { changeLoginLogout } = sliceLogin.actions;

export default sliceLogin.reducer;