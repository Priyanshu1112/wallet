import { useState } from "react";
import { useDispatch } from "react-redux";
import { asyncSignInAdmin } from "../../store/actions/adminActions";
import { toast } from "react-toastify";

const AdminSignIn = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { admin, isAuthenticated } = useSelector((state) => state.admin);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const HandleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const ValidateForm = (e) => {
    e.preventDefault();
    setError({});
    if (!formData.email) {
      setError({ email: "Email is required!" });
      return;
    }
    if (!emailPattern.test(formData.email)) {
      setError({ email: "Please fill a valid email address" });
      return;
    }
    if (!formData.password) {
      setError({ password: "Password is required!" });
      return;
    }
    if (formData.password.length < 6) {
      setError({ password: "Password must be atleat 6 characters" });
      return;
    }
    SubmitForm();
  };

  const SubmitForm = () => {
    console.log(formData);
    setIsLoading(true);

    dispatch(asyncSignInAdmin(formData))
      .then((status) => {
        if (status != 200) {
          if (status == "Admin not found with this email address") {
            setError({ email: "Invalid email!" });
            toast("Invalid email!", { type: "error", autoClose: 3000 });
          } else if (status == "Wrong Credentials") {
            setError({ password: "Wrong Credentials!" });
            toast("Wrong Credentials!", { type: "error", autoClose: 3000 });
          }
        }
        setIsLoading(false);
      })
      .catch(() => {
        toast("Error signing in: " + error.message, {
          type: "error",
          autoClose: 3000,
        });
        setIsLoading(false);
      });
  };

  return (
    <div
      className="w-full h-full "
      style={{
        backgroundImage: `url('../../../public/images/UserSignIn.jpg')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="flex flex-col justify-center w-full h-full"
        style={{ background: "rgba(0,0,0,0.7)" }}
      >
        <span className="px-4 mb-[2vh] max-w-max mx-auto font-bold text-lg text-[#6d8eef]  border-[#F9CE2E] border-b-2 ">
          Admin Sign-In
        </span>
        <form
          className="w-[90%] text-slate-200 uppercase text-sm  mx-auto sm:w-[40vw]"
          onSubmit={ValidateForm}
          method="post"
        >
          <div className="flex flex-col gap-[1vh] mb-[4vh]">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="admin@example.com"
              value={formData.email}
              onChange={HandleInput}
              className="w-full mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline outline-[#F7A630] focus:border-gray-500"
            />
            <small className="text-slate-300 capitalize bg-red-500 px-[1vw] text-xs italic">
              {error.email ? error.email : ""}
            </small>
          </div>
          <div className="flex flex-col gap-[1vh] mb-[4vh]">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="******"
              value={formData.password}
              onChange={HandleInput}
              className="w-full mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline outline-[#F7A630] focus:border-gray-500"
            />
            <small className="text-slate-300 capitalize bg-red-500 px-[1vw] text-xs italic">
              {error.password ? error.password : ""}
            </small>
          </div>

          <div className="text-center">
            <button
              disabled={isLoading}
              className="px-[5vw] rounded-[3vh] text-white py-[1vh] "
              style={{ backgroundColor: `${isLoading ? "grey" : "#6d8eef"}` }}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSignIn;
