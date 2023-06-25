import { createSlice } from "@reduxjs/toolkit";

export type LoginInfos = {
    id: number;
    name: string;
    rg: string;
    cadastroEscola: string;
    level: number;
    permission: boolean;
}

export const DefaultLoginInfos: LoginInfos = {
    id: 0,
    name: "",
    rg: "",
    cadastroEscola: "",
    level: 2,
    permission: false,
}

type StateProps = {
    LoginInfos: LoginInfos,
}

const initialState: StateProps = {
    LoginInfos: {} as LoginInfos,
}

export const SliceLogin = createSlice({
    name: "SliceLogin",
    initialState,
    reducers: {
        changeLoginLogout: (state, action: PayloadAction<LoginInfos>) =>{
            state.LoginInfos = action.payload;
        }
    }
})

export const { changeLoginLogout } = SliceLogin.actions;

export default SliceLogin.reducer;