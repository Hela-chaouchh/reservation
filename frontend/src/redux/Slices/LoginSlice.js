import { createSlice } from "@reduxjs/toolkit";
import { LoginAction, LogoutAction } from "../Actions/LoginAction";

const userToken =localStorage.getItem("userToken");
const initialState = {
  loading: false,
  userInfo: {
    id: "",
    email: "",
    password: "",
  },
  userToken,
  error: null,
  success: false,
};

const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: {
    [LoginAction.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [LoginAction.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.userToken = action.payload.token;
      state.userInfo = action.payload;
    },
    [LoginAction.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    ///////////////////////////
    [LogoutAction.fulfilled]: (state) => {
      state.loading = false;
      state.userInfo = {
        id: "",
        email: "",
      };
      localStorage.setItem("userToken", "")
      state.userToken=localStorage.getItem("userToken")
      state.error = null;
      state.success = false;
    },
  },
});
export default LoginSlice.reducer;
