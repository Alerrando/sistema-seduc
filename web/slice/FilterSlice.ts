import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit"
import { SchoolDTOInfos, SchoolInfos, TeacherDTOInfos } from "."
import { DatasTypes } from "../src/Components/Filter"

type FilterInfosTeacher = {
    id: number,
    name: string,
    cpf: string,
    sede: string,
    cargo: string,
}

type StateProps = {
    allFilterInfosTeacher: TeacherDTOInfos[],
    allFilterInfosSchool: SchoolDTOInfos[],
    filterInfosTeacher: FilterInfosTeacher,
    filterInfosSchool: SchoolInfos,
    filterStartEndDate: DatasTypes,
}

const initialState: StateProps = {
    allFilterInfosTeacher: [],
    allFilterInfosSchool: [],
    filterInfosTeacher: {} as FilterInfosTeacher,
    filterInfosSchool: {} as SchoolInfos,
    filterStartEndDate: {} as DatasTypes,
}

export const sliceFilter: Slice<StateProps> = createSlice({
    name: "sliceFilter",
    initialState,
    reducers: {
        refreshAllFilterInfosTeacher: (state, action: PayloadAction<TeacherDTOInfos[]>) => {
            state.allFilterInfosTeacher = action.payload;
        },

        refreshAllFilterInfosSchool: (state, action: PayloadAction<SchoolDTOInfos[]>) => {
            state.allFilterInfosSchool = action.payload;
        },

        refreshFilterInfosTeacher: (state, action: PayloadAction<FilterInfosTeacher>) => {
            state.filterInfosTeacher = action.payload;
        },

        refreshFilterInfosSchool: (state, action: PayloadAction<SchoolInfos>) => {
            state.filterInfosSchool = action.payload;
        },

        refreshFilterStartEndDate: (state, action: PayloadAction<DatasTypes>) => {
            state.filterStartEndDate = action.payload;
        },
    }
});

export const { refreshAllFilterInfosTeacher, refreshAllFilterInfosSchool, refreshFilterInfosTeacher, refreshFilterInfosSchool, refreshFilterStartEndDate } = sliceFilter.actions;

export default sliceFilter.reducer;