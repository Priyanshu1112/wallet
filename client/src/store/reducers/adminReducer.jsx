import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  admin: null,
  users: null,
};

export const adminReducer = createSlice({
  name: "admin",
  initialState,
  reducers: {
    authenticateAdmin: (state, action) => {
      state.isAuthenticated = true;
      state.admin = action.payload;
    },
    removeAdminAuthentication: (state) => {
      state.isAuthenticated = false;
      state.admin = null;
    },
    addUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { authenticateAdmin, removeAdminAuthentication, addUsers } =
  adminReducer.actions;

export default adminReducer.reducer;
