import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: sessionStorage.getItem("role"),
};

const roleSlice = createSlice({
  name: "logged",
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
      sessionStorage.setItem("role", action.payload);
    },
    clearRole: (state) => {
      state.role = null;
      sessionStorage.removeItem("role");
    },
  },
});

export const { setRole, clearRole } = roleSlice.actions;

export default roleSlice.reducer;
