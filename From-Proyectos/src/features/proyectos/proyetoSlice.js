import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  proyectos: [
    {
      key: "1",
      titulo: "proyecto 1",
      area: "Ciencias",
      institucion: "instituto 1",
      estado: "Activo",
    },
    {
      key: "2",
      titulo: "proyecto 2",
      area: "Artes",
      institucion: "instituto 2",
      estado: "Inactivo",
    },
    {
      key: "3",
      titulo: "proyecto 3",
      area: "Fisica",
      institucion: "instituto 3",
      estado: "Formulado",
    },
    {
      key: "4",
      titulo: "proyecto 4",
      area: "Sociales",
      institucion: "instituto 4",
      estado: "Finalizado",
    },
  ],
  isLoding: false,
  error: null,
};
export const proyectoSlice = createSlice({
  name: "proyectos",
  initialState,
  reducers: {
    agregarProyecto: (state, action) => {
      state.proyectos.push(action.payload);
    },
    eliminarProyecto: (state, action) => {
      state.proyectos = state.proyectos.filter(
        (proyecto) => proyecto.key !== action.payload,
      );
    },
    editarProyecto: (state, action) => {
      state.proyectos = state.proyectos.map((proyecto) => {
        if (proyecto.key === action.payload.key) {
          return action.payload;
        }
        return proyecto;
      });
    },
  },
});
export default proyectoSlice.reducer;
export const { agregarProyecto, eliminarProyecto, editarProyecto } =
  proyectoSlice.actions;
