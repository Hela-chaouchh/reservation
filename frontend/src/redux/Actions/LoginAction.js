import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

export const LoginAction = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        `http://localhost:5000/auth/login`,
        { email, password },
        config
      );
      const { data } = response;

      localStorage.setItem("userToken", data.Token);

      const decodedToken = jwt_decode(data.Token);

      return {
        email: email,
        password: password,
        id: decodedToken.userId,
        token: data.Token,
      };
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);


export const LogoutAction = createAsyncThunk(
  "auth/logout", async (_, { rejectWithValue }) => {
  try {
    localStorage.removeItem("userToken");

  } catch (error) {
    return rejectWithValue(error.message);
  }
});
