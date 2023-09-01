import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerAction = createAsyncThunk(
  "auth/register",
  async ({ nom, prenom, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
       const response = await axios.post(
        `http://localhost:5000/auth/register`,
        { nom, prenom, email, password },
        config
      );
      
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
