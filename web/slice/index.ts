import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { readAll } from "@/api";

export type HorasInfos = {
  id: number;
  nomeProfessor: string;
  horaAulas: number;
  titularidade: string;
  diaAula: Date;
  escola: String;
  edit: number;
};

export const HorasValuesDefault = {
  diaAula: new Date().toString(),
  edit: -1,
  horaAulas: 0,
  id: 0,
  nomeProfessor: "",
  titularidade: "",
  escola: "",
};

export type StateProps = {
  allInfos: HorasInfos[];
};

const initialState: StateProps = {
  allInfos: [],
};

export const Slice = createSlice({
  name: "Slice",
  initialState,
  reducers: {
    refreshInfos: (state, action: PayloadAction<HorasInfos[]>) => {
      state.allInfos = action.payload;
    },
    editInfosChange: (state, action: PayloadAction<HorasInfos>) => {
      state.allInfos = state.allInfos.map((info: HorasInfos) => {
        if (action.payload.id === info.id) {
          return {
            ...action.payload,
            diaAula: action.payload.diaAula,
          };
        }
        return info;
      });
    },
    deleteInfosChange: (state, action: PayloadAction<HorasInfos>) => {
      state.allInfos = state.allInfos.filter(
        (info) => info.id !== action.payload.id
      );
    },
  },
});

export const { refreshInfos, editInfosChange, deleteInfosChange } = Slice.actions;

export default Slice.reducer;
