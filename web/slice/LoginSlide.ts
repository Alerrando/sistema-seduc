import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";

export type UserInfos = {
    id: number,
    name: string,
    email: string,
    password: string,
    rg: string,
    cadastroEscola: string,
    level: number,
    permission: number,
    mandatoryBulletin: number,
    edit: boolean,
}

export const DefaultUserInfos: UserInfos = {
    id: 0,
    name: "",
    rg: "",
    cadastroEscola: "",
    level: 2,
    permission: 0,
    email: "",
    password: "",
    mandatoryBulletin: 0,
    edit: false,
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