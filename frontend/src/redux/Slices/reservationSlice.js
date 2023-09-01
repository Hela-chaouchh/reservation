import { createSlice } from "@reduxjs/toolkit";
import { reservationAction, ReservationBySalleIdAction } from "../Actions/reservationAction";

const initialState = {
  loading: false,
  error: null,
  success: false,
  reservation: {
    id: "",
    startTime: "",
    endTime: "",
    sujet: "",
    salleId: "",
    userId: "",
  }
};

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {},
  extraReducers: {
    [reservationAction.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    [reservationAction.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.reservation = action.payload;
    },

    [reservationAction.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error.message;
    },

//////////////////////////////////////////
    [ReservationBySalleIdAction.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [ReservationBySalleIdAction.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.reservation = action.payload;
    },
    [ReservationBySalleIdAction.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error.message;
    },
  },
});

export default reservationSlice.reducer;
