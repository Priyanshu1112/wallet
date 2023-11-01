import axios from "../../utils/Axios";
import { authenticate, removeAuthentication } from "../reducers/appReducer";
import {
  authenticateUser,
  removeUserAuthentication,
} from "../reducers/userReducer";

export const asyncSignInUser = (user) => async (dispatch) => {
  try {
    const res = await axios.post("/user/signIn-user", user);
    if (res.status == 200) {
      dispatch(authenticate("user"));
      dispatch(authenticateUser(res.data.user));
      return 200;
    }
  } catch (error) {
    console.log(error);
    if (error.request.status == 404) {
      if (
        error.response.data.message == "User not found with this email address"
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

export const asyncLogOutUser = () => async (dispatch) => {
  try {
    const data = await axios.post("/user/logOut-user");
    console.log(data);
    if (data.status == 200) {
      dispatch(removeAuthentication());
      dispatch(removeUserAuthentication());
    }
  } catch (error) {
    console.log(error);
  }
};
