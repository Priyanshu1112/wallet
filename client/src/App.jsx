import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import UsersSignIn from "./components/auth/UsersSignIn";
import AdminSignIn from "./components/auth/AdminSignIn";
import AdminProfile from "./components/profile/admin/AdminProfile";
import UserProfile from "./components/profile/user/UserProfile";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetCurrent } from "./store/actions/appActions";
import DeleteUsers from "./components/profile/admin/DeleteUsers";
import EditProfile from "./components/profile/admin/EditProfile";
import ChangePassword from "./components/profile/admin/ChangePassword";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user_role } = useSelector((state) => state.app);
  const { admin } = useSelector((state) => state.admin);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      if (user_role == "admin") {
        navigate(`/admin/${admin._id}`);
      } else if (user_role == "user") {
        navigate(`/user/${user._id}`);
      }
    } else if (location.pathname == "/admin") {
      return;
    } else if (!unAuthenticatedRoutes(location.pathname)) {
      navigate("/");
      dispatch(asyncGetCurrent());
    }
  }, [isAuthenticated]);

  const unAuthenticatedRoutes = (path) => {
    return path.includes("/signIn");
  };

  return (
    <div className="w-screen h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminSignIn />} />
        <Route path="/users/signIn" element={<UsersSignIn />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/admin/:id" element={<AdminProfile />} />
        <Route path="/admin/:id/delete-users" element={<DeleteUsers />} />
        <Route path="/admin/:id/edit-profile" element={<EditProfile />} />
        <Route path="/admin/:id/change-password" element={<ChangePassword />} />
      </Routes>
    </div>
  );
}

export default App;
