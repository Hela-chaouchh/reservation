import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const SalleAction = createAsyncThunk(
    "salles/SalleAction",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("userToken");
            const config = {
                headers: {
                    "User-Auth-Token": token,
                },
            };
            const response = await axios.get(
                "http://localhost:5000/salles/salles",
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