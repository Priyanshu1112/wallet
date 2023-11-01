import { useDispatch } from "react-redux";
import { asyncLogOut } from "../../../store/actions/adminActions";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const NavSide = ({ displaySideNav, setDisplaySideNav }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  return (
    <div
      className="w-full h-[90vh]  bg-[rgba(0,0,0,0.8)] text-white absolute left-0 top-0 sm:w-[20vw] sm:left-[55vw] sm:shadow-2xl"
      style={{ display: `${displaySideNav}`, transition: ".3s all" }}
    >
      <div className="w-[60%] navSide h-full bg-white flex flex-col text-slate-700 text-lg gap-[3vh] sm:w-[100%]">
        <div className="text-end text-lg px-[2vw]">
          <button
            onClick={() => {
              setDisplaySideNav("none");
            }}
          >
            <i className="ri-close-line"></i>
          </button>
        </div>
        {location.pathname.includes("/edit-profile") ? (
          <p
            onClick={() => {
              navigate(`/admin/${id}`);
            }}
          >
            Users
          </p>
        ) : (
          <p
            onClick={() => {
              navigate(`/admin/${id}/edit-profile`);
            }}
          >
            Edit Profile
          </p>
        )}

        {location.pathname.includes("/change-password") ? (
          <p
            onClick={() => {
              navigate(`/admin/${id}`);
            }}
          >
            Users
          </p>
        ) : (
          <p
            onClick={() => {
              navigate(`/admin/${id}/change-password`);
            }}
          >
            Change Password
          </p>
        )}

        {location.pathname.includes("/delete-users") ? (
          <p
            onClick={() => {
              navigate(`/admin/${id}`);
            }}
          >
            Users
          </p>
        ) : (
          <p
            onClick={() => {
              navigate(`/admin/${id}/delete-users`);
            }}
          >
            Delete Users
          </p>
        )}

        <p
          onClick={() => {
            dispatch(asyncLogOut());
          }}
        >
          Logout
        </p>
      </div>
    </div>
  );
};

export default NavSide;
