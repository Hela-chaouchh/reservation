import { createSlice } from "@reduxjs/toolkit";
import { SalleAction } from "../Actions/SalleAction";

const initialState = {
    loading: false,
    error: null,
    success: false,
    salle: {
        id: "",
        nom: "",
        capacite: "",
        estDisponible: "",
    }
};

const SalleSlice = createSlice({
    name: "salle",
    initialState,
    reducers: {},
    extraReducers: {
        [SalleAction.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [SalleAction.fulfilled]: (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.salle = action.payload;
        },
        [SalleAction.rejected]: (state,action)=>{
            state.loading = false;
            state.success = false;
            state.error = action.error.message;
        },
    },
});

export default SalleSlice.reducer;