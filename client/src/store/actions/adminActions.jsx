import axios from "../../utils/Axios";
import {
  addUsers,
  authenticateAdmin,
  removeAdminAuthentication,
} from "../reducers/adminReducer";
import { authenticate, removeAuthentication } from "../reducers/appReducer";

export const asyncSignInAdmin = (admin) => async (dispatch) => {
  try {
    const res = await axios.post("/admin/signIn-admin", admin);
    // console.log(data);
    if (res.status == 200) {
      dispatch(authenticate("admin"));
      dispatch(authenticateAdmin(res.data.user));
      return 200;
    }
  } catch (error) {
    console.log(error);
    if (error.request.status == 404) {
      if (
        error.response.data.message == "Admin not found with this email address"
      ) {
        return error.response.data.message;
      }
    }
    if (error.request.status == 500) {
      if (error.response.data.message == "Wrong Credentials") {
        return error.response.data.message;
      }
    }
  }
};

export const asyncGetAllUsers = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/admin/all-users");
    // console.log(data);
    dispatch(addUsers(data));
  } catch (error) {
    console.log(error);
  }
};

export const asyncAddUser = (user) => async (dispatch) => {
  try {
    const data = await axios.post("/admin/add-user", user);
    if (data.status == 200) {
      dispatch(asyncGetAllUsers());
      return 200;
    }
  } catch (error) {
    if (
      error.response.data.errName == "MongoServerError" &&
      error.response.data.message.includes("E11000 duplicate key")
    ) {
      return 409;
    }
    return error.response.data.message;
  }
};

export const asyncUpdateUser = (user) => async (dispatch) => {
  try {
    const data = await axios.put(`/admin/update-user/${user.id}`, user);
    if (data.status == 200) {
      dispatch(asyncGetAllUsers());
      return 200;
    }
  } catch (error) {
    console.log(error);
    if (
      error.response.data.errName == "MongoServerError" &&
      error.response.data.message.includes("E11000 duplicate key")
    ) {
      return 409;
    }
    return error.response.data.message;
  }
};

export const asyncLogOut = () => async (dispatch) => {
  try {
    const data = await axios.get("/admin/logOut-admin");
    if (data.status == 200) {
      dispatch(removeAuthentication());
      dispatch(removeAdminAuthentication());
      return 200;
    }
  } catch (error) {
    console.log(error);
  }
};

export const asyncDeleteUsers = (id) => async (dispatch) => {
  try {
    const data = await axios.delete(`/admin/delete-user/${id}`);
    console.log(data);
    if (data.status == 200) {
      dispatch(asyncGetAllUsers());
      return 200;
    }
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};

export const asyncUpdateAdmin = (admin) => async (dispatch) => {
  try {
    const data = await axios.put("/admin/update-admin", admin);
    // console.log(data);
    if (data.status == 200) {
      dispatch(authenticateAdmin(data.data.admin));
      return 200;
    }
  } catch (error) {
    console.log(error);
    if (
      error.response.data.errName == "MongoServerError" &&
      error.response.data.message.includes("E11000 duplicate key")
    ) {
      return 409;
    }
    return error.response.data.message;
  }
};

export const asyncChangePasswordAdmin = (password) => async () => {
  try {
    const data = await axios.put("/admin/change-password", password);
    if (data.status == 200) {
      return 200;
    }
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};
