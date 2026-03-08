import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  isloading: false,
  error: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    iniciarSesion: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isloading = false;
      //Guarda informacion del usuario por sesion
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    cerrarSesion: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    errorSesion: (state, action) => {
      state.error = action.payload;
      state.isloading = false;
    },
  },
});
export const { iniciarSesion, cerrarSesion, errorSesion } = authSlice.actions;
export default authSlice.reducer;
