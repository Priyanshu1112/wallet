import { useDispatch, useSelector } from "react-redux";
import { asyncLogOutUser } from "../../../store/actions/userActions";

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className="w-full h-full">
      <nav className="w-full  px-[2vw] font-bold h-[10vh] bg-[#6d8eef] text-slate-200 flex items-center justify-between">
        <div className="filler w-[1.5vw] sm:w-max">
          <p className="hidden sm:block">Stock-Whisperer</p>
        </div>
        <p className="capitalize">
          {user?.firstName} {user?.lastName}
        </p>
        <p
          className="text-sm font-thin cursor-pointer"
          onClick={() => {
            dispatch(asyncLogOutUser());
          }}
        >
          <i className="ri-user-line me-1 "></i>Logout
        </p>
      </nav>
      <div className="w-[70%] mx-auto mt-[5vh] text-slate-700 py-[4vh] px-[4vw] flex flex-col gap-[2vh] rounded shadow-lg sm:w-[50vw]">
        <p>
          Name : {user?.firstName} {user?.lastName}
        </p>
        <p>Email : {user?.email}</p>
        <p>Balance : Rs {user?.balance}</p>
      </div>
    </div>
  );
};

export default UserProfile;
