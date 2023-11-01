import { useEffect, useState } from "react";
import NavSide from "./NavSide";
import { useDispatch, useSelector } from "react-redux";
import { asyncUpdateAdmin } from "../../../store/actions/adminActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = () => {
  const [displaySideNav, setDisplaySideNav] = useState("none");
  const { admin } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [error, setError] = useState({});
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    if (admin) {
      setFormData({
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        // password: "",
      });
    }
  }, [admin]);

  const HandleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const ValidateForm = (e) => {
    e.preventDefault();
    setError({});

    if (formData.firstName === "") {
      setError({ firstName: "First Name is required" });
      return;
    }
    if (formData.lastName === "") {
      setError({ lastName: "Last Name is required" });
      return;
    }
    if (formData.email === "") {
      setError({ email: "Email is required" });
      return;
    }
    if (!emailPattern.test(formData.email)) {
      setError({ email: "Please fill a valid email address" });
      return;
    }

    SubmitForm();
  };

  const SubmitForm = () => {
    const toastId = toast("Updating Admin", { type: "info", autoClose: false });
    console.log(formData);
    dispatch(asyncUpdateAdmin(formData))
      .then((status) => {
        if (status == 200) {
          toast.update(toastId, {
            render: "Admin added successfully",
            type: "success",
            autoClose: 3000,
          });
        } else if (status == 409) {
          setError({ email: "Email already in use!" });
          toast.update(toastId, {
            render: "Email already exists!",
            type: "error",
            autoClose: 3000,
          });
        } else {
          toast.update(toastId, {
            render: "Error adding user: " + error.message,
            type: "error",
            autoClose: 3000,
          });
        }
      })
      .catch(() => {
        toast.update(toastId, {
          render: "Error adding user: " + error.message,
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
      <div className="text-center p-[2vh] relative sm:w-[50vw] mx-auto">
        <p className="text-lg font-bold mb-[2vh] ">Edit Profile</p>

        <form
          className="w-[60vw] mx-auto uppercase text-sm font-thin text-start sm:w-[90%]"
          onSubmit={ValidateForm}
          method="post"
        >
          <div className="flex flex-col gap-[1vh] mb-[4vh]">
            <label htmlFor="firstName">firstName</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              placeholder="John"
              onChange={HandleInput}
              className="w-full mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline outline-[#F7A630] focus:border-gray-500"
            />
            <small className="text-slate-300 capitalize bg-red-500 px-[1vw] text-xs italic">
              {error.firstName ? error.firstName : ""}
            </small>
          </div>
          <div className="flex flex-col gap-[1vh] mb-[4vh]">
            <label htmlFor="lastName">lastName</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Doe"
              value={formData.lastName}
              onChange={HandleInput}
              className="w-full mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline outline-[#F7A630] focus:border-gray-500"
            />
            <small className="text-slate-300 capitalize bg-red-500 px-[1vw] text-xs italic">
              {error.lastName ? error.lastName : ""}
            </small>
          </div>
          <div className="flex flex-col gap-[1vh] mb-[4vh]">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={HandleInput}
              className="w-full mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline outline-[#F7A630] focus:border-gray-500"
            />
            <small className="text-slate-300 capitalize bg-red-500 px-[1vw] text-xs italic">
              {error.email ? error.email : ""}
            </small>
          </div>

          <div className="text-center">
            <button className="text-white bg-[#6d8eef] px-[4vw] rounded-[3vh] py-[1vh]">
              Edit Profile
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

export default EditProfile;
