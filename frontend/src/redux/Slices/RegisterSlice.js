import { createSlice } from "@reduxjs/toolkit";
import { registerAction } from "../Actions/RegisterAction";

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
  success: false,
};

const registerSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    // register user
    [registerAction.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerAction.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // registration successful
      state.userInfo = payload;
    },
    [registerAction.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});
export default registerSlice.reducer;
