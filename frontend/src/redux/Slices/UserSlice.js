import { createSlice } from "@reduxjs/toolkit";
import { UserProfileAction, GetUsersAction, UpdateUserAction } from "../Actions/UserAction";


const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        error: null,
        success: false,
        user: {
            id: "",
            nom: "",
            prenom: "",
            email: "",
            password: "",
            role: "",
        }

    },

    reducers: {},
    extraReducers: {
        [UserProfileAction.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [UserProfileAction.fulfilled]: (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload;
        },
        [UserProfileAction.rejected]: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.error.message;
        },
        ////////////////////
        [GetUsersAction.fulfilled]: (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload;
        },
        /////////////////
        [UpdateUserAction.fulfilled]: (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload;
        }
    }
})

export default userSlice.reducer;
