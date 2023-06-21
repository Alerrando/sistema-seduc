import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { TeacherDTOInfos } from "."

type StateProps = {
    allFilterInfosTeacher: TeacherDTOInfos[],
    filterInfosTeacher: TeacherDTOInfos,
}

const initialState: StateProps = {
    allFilterInfosTeacher,
    filterInfosTeacher,
}

export const SliceTeacher = createSlice({
    name: "Slice Teacher",
    initialState,
    reducers: {
        refreshAllFilterInfosTeacher: (state, action: PayloadAction<TeacherDTOInfos[]>) => {
            state.allFilterInfosTeacher = action.payload;
        },

        refreshFilterInfosTeacher: (state, action: PayloadAction<TeacherDTO>) => {
            state.filterInfosTeacher = action.payload;
        },
    }
});

export const { refreshAllFilterInfosTeacher, refreshFilterInfosTeacher } = SliceTeacher.actions;

export default SliceTeacher.reducer;