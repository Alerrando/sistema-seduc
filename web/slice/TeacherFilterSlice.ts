import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { TeacherDTOInfos, TeacherValuesDefault, TeacherInfos } from "."

type StateProps = {
    allFilterInfosTeacher: TeacherDTOInfos[],
    filterInfosTeacher: TeacherInfos,
}

const initialState: StateProps = {
    allFilterInfosTeacher: [],
    filterInfosTeacher: {} as TeacherInfos,
}

export const SliceTeacher = createSlice({
    name: "Slice Teacher",
    initialState,
    reducers: {
        refreshAllFilterInfosTeacher: (state, action: PayloadAction<TeacherDTOInfos[]>) => {
            state.allFilterInfosTeacher = action.payload;
        },

        refreshFilterInfosTeacher: (state, action: PayloadAction<TeacherInfos>) => {
            state.filterInfosTeacher = action.payload;
        },
    }
});

export const { refreshAllFilterInfosTeacher, refreshFilterInfosTeacher } = SliceTeacher.actions;

export default SliceTeacher.reducer;