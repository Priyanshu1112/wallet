import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    authenticateUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    removeUserAuthentication: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { authenticateUser, removeUserAuthentication } =
  userReducer.actions;

export default userReducer.reducer;
