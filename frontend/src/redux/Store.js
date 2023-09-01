import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/LoginSlice";
import registerReducer from "./Slices/RegisterSlice";
import reservationReducer from "./Slices/reservationSlice";
import salleReducer from "./Slices/SalleSlice";
import userReducer from "./Slices/UserSlice";

const store = configureStore({
  reducer: {
    login: authReducer,
    register: registerReducer,
    reservations: reservationReducer,
    salle: salleReducer,
    user: userReducer,
  },
});

export default store;
