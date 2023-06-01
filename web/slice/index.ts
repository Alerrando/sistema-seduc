import { readAll } from "@/api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type HorasInfos = {
  id: number;
  nomeProfessor: string;
  horaAulas: number;
  titularidade: string;
  diaAula: Date;
  escola: String,
  edit: number,
}

export const HorasValuesDefault = {
	diaAula: new Date().toString(),
	edit: -1,
	horaAulas: 0,
	id: 0,
	nomeProfessor: "",
	titularidade: "",
	escola: "",
}

const fetchAllHorasInfos = async () => {
  const horasInfos = await readAll();
  return horasInfos;
};

const HorasValues: HorasInfos[] = await readAll();

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
	extraReducers: (builder) => {
		builder.addCase(fetchAllHorasInfos.fulfilled, (state, action) => {
		  state.allInfos = action.payload;
		});
	  },
});

export const fetchAllInfos = () => {
	return async (dispatch: Dispatch) => {
	  try {
		const horasInfos = await dispatch(fetchAllHorasInfos());
	  } catch (error) {
		console.log(error);
	  }
	};
  };

export const { addInfos, editInfosChange, deleteInfosChange } = Slice.actions;
export default Slice.reducer;
