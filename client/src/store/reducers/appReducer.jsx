import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user_role: null,
};

export const appReducer = createSlice({
  name: "app",
  initialState,
  reducers: {
    authenticate: (state, action) => {
      state.isAuthenticated = true;
      state.user_role = action.payload;
    },
    removeAuthentication: (state) => {
      state.isAuthenticated = false;
      state.user_role = null;
    },
  },
});

export const { authenticate, removeAuthentication } = appReducer.actions;

export default appReducer.reducer;
