import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const UserProfileAction = createAsyncThunk(
  "/user/UserProfileAction",
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      const config = {
        headers: {
          "User-Auth-Token": token,
        },
      };
      const response = await axios.get(
        `http://localhost:5000/user/userProfile/${userId}`,
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


export const GetUsersAction = createAsyncThunk(
  "user/GetUsersAction",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      const config = {
        headers: {
          "Admin-Auth-Token": token,
        },
      };
      const response = await axios.get(
        "http://localhost:5000/user/users",
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


export const UpdateUserAction = createAsyncThunk(
  "user/UpdateUserAction",
  async ( user,  { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      const config = {
        headers: {
          "User-Auth-Token": token,
        },
      };
      const id=user.id;
      
      const response = await axios.put(
        `http://localhost:5000/user/updateUser/${id}`,
        user,
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
