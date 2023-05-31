import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type HorasInfos = {
  id: number;
  nomeProfessor: string;
  horaAulas: number;
  titularidade: string;
  diaAula: Date;
  edit: number,
}

const HorasValues: HorasInfos[] = [
	{
		horaAulas: 0,
		id: 0,
		nomeProfessor: "Alerrando",
		titularidade: "Titular",
		diaAula: new Date().toString(),
		edit: -1,
	}
];

export type StateProps = {
  allInfos: HorasInfos[];
}

const initialState: StateProps = {
	allInfos: HorasValues,
};

export const Slice = createSlice({
	name: "Slice",
	initialState,
	reducers: {
		addInfos: (state, action: PayloadAction<HorasInfos>) => {
			state.allInfos.push(action.payload);
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
			state.allInfos = state.allInfos.filter(info => info.id !== action.payload.id);
		}
	},
});

export const { addInfos, editInfosChange, deleteInfosChange } = Slice.actions;
export default Slice.reducer;
