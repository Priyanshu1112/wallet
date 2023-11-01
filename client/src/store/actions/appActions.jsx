import axios from "../../utils/Axios";
import { authenticateAdmin } from "../reducers/adminReducer";
import { authenticate } from "../reducers/appReducer";
import { authenticateUser } from "../reducers/userReducer";

export const asyncGetCurrent = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/");
    if (data.user_role == "admin") {
      dispatch(authenticate("admin"));
      dispatch(authenticateAdmin(data.admin));
    } else if (data.user_role == "user") {
      dispatch(authenticate("user"));
      dispatch(authenticateUser(data.user));
    }
  } catch (error) {
    console.log(error);
  }
};
