import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit"
import { TeacherDTOInfos, TeacherValuesDefault } from "."

type FilterInfosTeacher = {
    id: number,
    name: string,
    cpf: string,
    sede: string,
    cargo: string,
}

type StateProps = {
    allFilterInfosTeacher: TeacherDTOInfos[],
    filterInfosTeacher: FilterInfosTeacher,
}

const initialState: StateProps = {
    allFilterInfosTeacher: [],
    filterInfosTeacher: {} as FilterInfosTeacher,
}

export const sliceTeacher: Slice<StateProps> = createSlice({
    name: "sliceTeacher",
    initialState,
    reducers: {
        refreshAllFilterInfosTeacher: (state, action: PayloadAction<TeacherDTOInfos[]>) => {
            state.allFilterInfosTeacher = action.payload;
        },

        refreshFilterInfosTeacher: (state, action: PayloadAction<FilterInfosTeacher>) => {
            state.filterInfosTeacher = action.payload;
        },
    }
});

export const { refreshAllFilterInfosTeacher, refreshFilterInfosTeacher } = sliceTeacher.actions;

export default sliceTeacher.reducer;