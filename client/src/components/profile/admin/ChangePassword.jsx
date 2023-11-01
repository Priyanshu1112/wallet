import { useState } from "react";
import NavSide from "./NavSide";
import { useDispatch, useSelector } from "react-redux";
import { asyncChangePasswordAdmin } from "../../../store/actions/adminActions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [displaySideNav, setDisplaySideNav] = useState("none");
  const { admin } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
  });
  const [error, setError] = useState({});

  const HandleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const ValidateForm = (e) => {
    e.preventDefault();
    setError({});

    if (formData.password === "") {
      setError({ password: "Password is required" });
      return;
    }
    if (formData.password.length < 6 || formData.password.length > 15) {
      setError({
        password: "Password must be between 6 to 15 characters",
      });
      return;
    }
    SubmitForm();
  };

  const SubmitForm = () => {
    console.log(formData);
    const toastId = toast("Changing Password", {
      type: "info",
      autoClose: false,
    });

    dispatch(asyncChangePasswordAdmin(formData))
      .then((status) => {
        if (status == 200) {
          toast.update(toastId, {
            render: "Password changed successfully",
            type: "success",
            autoClose: 3000,
          });
          navigate(`/admin/${admin._id}`);
        } else {
          toast.update(toastId, {
            render: status,
            type: "error",
            autoClose: 3000,
          });
        }
      })
      .catch(() => {
        toast.update(toastId, {
          render: "Error changing password: " + error.message,
          type: "error",
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="w-full h-full">
      <nav className="w-full  px-[2vw] font-bold h-[10vh] bg-[#6d8eef] text-slate-200 flex items-center justify-between">
        <i
          onClick={() => {
            setDisplaySideNav("block");
          }}
          className="ri-menu-line cursor-pointer sm:hidden"
        ></i>
        <p className="hidden sm:block">Stock-Whisperer</p>
        <p className="capitalize">
          {admin?.firstName} {admin?.lastName}
        </p>
        <div className="filler">
          <i
            onClick={() => {
              setDisplaySideNav("block");
            }}
            className="ri-menu-line cursor-pointer hidden sm:block"
          ></i>
        </div>
      </nav>
      <div className="changePassword relative text-center py-[2vh] mx-auto sm:w-[50vw]">
        <p className="text-lg  font-bold tracking-wide mb-[2vh]">
          Change Password
        </p>
        <form
          className="w-[60vw] mx-auto uppercase text-sm font-thin text-start sm:w-[90%]"
          onSubmit={ValidateForm}
          method="post"
        >
          <div className="flex flex-col gap-[1vh] mb-[4vh]">
            <label htmlFor="password">password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="******"
              value={formData.password}
              onChange={HandleInput}
              className="w-full mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline outline-[#F7A630] focus:border-gray-500"
            />
            <small className="text-red-600 capitalize  px-[1vw] text-xs italic">
              {error.password ? error.password : ""}
            </small>
          </div>
          <div className="text-center">
            <button className="text-white bg-[#6d8eef] px-[4vw] rounded-[3vh] py-[1vh]">
              Change Password
            </button>
          </div>
        </form>
        <NavSide
          displaySideNav={displaySideNav}
          setDisplaySideNav={setDisplaySideNav}
        />
      </div>
    </div>
  );
};

export default ChangePassword;
