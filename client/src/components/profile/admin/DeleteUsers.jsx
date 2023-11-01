import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncDeleteUsers,
  asyncGetAllUsers,
} from "../../../store/actions/adminActions";
import NavSide from "./NavSide";
import { toast } from "react-toastify";

const DeleteUsers = () => {
  const dispatch = useDispatch();
  const [displaySideNav, setDisplaySideNav] = useState("none");
  const { users, admin } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(asyncGetAllUsers());
  }, []);

  const DeleteUserHandler = (id) => {
    const toastId = toast("Deleting User", { type: "info", autoClose: false });

    dispatch(asyncDeleteUsers(id))
      .then((status) => {
        if (status == 200) {
          toast.update(toastId, {
            render: "User deleted successfully",
            type: "success",
            autoClose: 3000,
          });
        } else {
          toast.update(toastId, {
            render: status,
            type: "error",
            autoClose: 3000,
          });
        }
      })
      .catch((error) => {
        toast.update(toastId, {
          render: "Error deleting user: " + error.message,
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
      <div className="text-center p-[2vh] relative mx-auto sm:w-[50vw]">
        <p className="text-lg font-bold tracking-wide mb-[2vh]">Delete Users</p>

        {users?.map((user, ind) => {
          return ind % 2 === 0 ? (
            <div
              key={ind}
              className="w-full text-start flex items-center justify-between mb-[1.5vh]"
            >
              <p className="capitalize">
                {user.firstName} {user.lastName}
              </p>
              <div className="flex items-center text-end gap-[2vmax]">
                <p>Balance : Rs {user.balance}</p>
                <button
                  onClick={() => {
                    DeleteUserHandler(user._id);
                  }}
                  className="text-sm px-[2vw] py-[.5vh] bg-red-700 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div
              key={ind}
              className="w-full bg-slate-200 flex justify-between mb-[1.5vh]"
            >
              <p className="capitalize text-start">
                {user.firstName} {user.lastName}
              </p>
              <div className="flex items-center gap-[2vmax] text-end">
                <p>Balance : Rs {user.balance}</p>
                <button
                  onClick={() => {
                    DeleteUserHandler(user._id);
                  }}
                  className="text-sm px-[2vw] py-[.5vh] bg-red-700 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
        <NavSide
          displaySideNav={displaySideNav}
          setDisplaySideNav={setDisplaySideNav}
        />
      </div>
    </div>
  );
};

export default DeleteUsers;
