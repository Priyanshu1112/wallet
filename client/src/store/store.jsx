import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import adminReducer from "./reducers/adminReducer";
import appReducer from "./reducers/appReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    app: appReducer,
  },
});
