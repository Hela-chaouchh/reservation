import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const reservationAction = createAsyncThunk(
  "reservation/reservationAction",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      const config = {
        headers: {
          "User-Auth-Token": token,
        },
      };
      const response = await axios.get(
        "http://localhost:5000/reservation/reservations",
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




export const AddReservationAction = createAsyncThunk(
  "reservation/AddReservationAction",
  async (reservation, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      const config = {
        headers: {
          "User-Auth-Token": token,
        },
      };
      const response = await axios.post(
        "http://localhost:5000/reservation/createReservations",
        reservation,
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



export const UpdateReservationAction = createAsyncThunk(
  "reservation/UpdateReservationAction",
  async (reservation, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      const config = {
        headers: {
          "User-Auth-Token": token,
        },
      };
      const id =reservation.id;
      const response = await axios.put(
        `http://localhost:5000/reservation/updateReservation/${id}`,
        reservation,
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




export const DeleteReservationAction = createAsyncThunk(
  "reservation/DeleteReservationAction",
  async (reservationId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      const config = {
        headers: {
          "User-Auth-Token": token,
        },
      };

      const response = await axios.delete(
        `http://localhost:5000/reservation/deleteReservation/${reservationId}`,
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


export const ReservationBySalleIdAction = createAsyncThunk(
  "reservation/ReservationBySalleIdAction",
  async (salleId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      const config = {
        headers: {
          "Admin-Auth-Token": token,
        },
      };

      const response = await axios.get(
        `http://localhost:5000/reservation/reservationsBySalle/${salleId}`,
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


