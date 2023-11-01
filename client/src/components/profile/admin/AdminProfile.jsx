import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetAllUsers } from "../../../store/actions/adminActions";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import NavSide from "./NavSide";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState("none");
  const [displayEditUser, setDisplayEditUser] = useState("none");
  const [displaySideNav, setDisplaySideNav] = useState("none");
  const [userData, setUserData] = useState("");
  const { users, admin } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(asyncGetAllUsers());
  }, []);

  return (
    <div className="w-full h-full ">
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
        <p className="text-lg font-bold tracking-wider">Users</p>
        <button
          onClick={() => {
            setDisplay("block");
          }}
          className="text-[#6d8eef] text-sm border-[#6d8eef] border-b-[1px] px-[2vw] mb-[2vh]"
        >
          Add User
        </button>
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
                    setUserData(user);
                    setDisplayEditUser("block");
                  }}
                  className="text-sm px-[2vw] py-[.5vh] bg-[#6d8eef] text-white rounded"
                >
                  Edit
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
                    setUserData(user);
                    setDisplayEditUser("block");
                  }}
                  className="text-sm px-[2vw] py-[.5vh] bg-[#6d8eef] text-white rounded"
                >
                  Edit
                </button>
              </div>
            </div>
          );
        })}
        <EditUser
          userData={userData}
          displayEditUser={displayEditUser}
          setDisplayEditUser={setDisplayEditUser}
        />
        <AddUser display={display} setDisplay={setDisplay} />
        <NavSide
          displaySideNav={displaySideNav}
          setDisplaySideNav={setDisplaySideNav}
        />
      </div>
    </div>
  );
};

export default AdminProfile;
