import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type UserInfos = {
    id: number;
    name: string;
    email: string;
    password: string;
    rg: string;
    cadastroEscola: string;
    level: number;
    permission: boolean;
}

export const DefaultUserInfos: UserInfos = {
    id: 0,
    name: "",
    rg: "",
    cadastroEscola: "",
    level: 2,
    permission: false,
}

type StateProps = {
    userInfos: UserInfos,
}

const initialState: StateProps = {
    userInfos: {} as UserInfos,
}

export const SliceLogin = createSlice({
    name: "SliceLogin",
    initialState,
    reducers: {
        changeLoginLogout: (state, action: PayloadAction<UserInfos>) =>{
            state.userInfos = action.payload;
        },
    }
})

export const { changeLoginLogout } = SliceLogin.actions;

export default SliceLogin.reducer;