import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth/authSlice";
import proyectoReducer from "../proyectos/proyetoSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    proyectos: proyectoReducer,
  },
});
