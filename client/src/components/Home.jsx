import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full sm:flex">
      <div className=" flex-col gap-[5vh] items-center justify-center hidden sm:flex">
        <span className="px-4 max-w-max mx-auto font-bold text-[4vmin] text-[#6d8eef]  border-[#F9CE2E] border-b-2 ">
          Stock-Whisperer
        </span>
        <div className="text-center px-[3vw] text-[#6d8eef] ">
          <p className="text-[2.5vmin] font-bold ">
            Discover the <span className="text-[#F9CE2E]">Power</span> of
            <span className="text-[#F9CE2E]"> Investing</span>
          </p>
          <p className="text-[2vmin] mt-[2vh]">
            Unleash financial potential through smart investing with our
            innovative stock market
            <span className="border-[#F9CE2E] border-b-[1px] ml-[-2vw] pl-[3vw] pe-[1vw] sm:pl-[2.5vw]">
              wallet app
            </span>
            <span className="text-[#F9CE2E]">.</span>
          </p>
        </div>
        <div>
          <button
            onClick={() => {
              navigate("/users/signIn");
            }}
            className="signInBtn px-[4vw] me-[2vw] rounded-[3vh] text-white py-[1vh] bg-[#6d8eef]"
          >
            Sign In
          </button>
          <button
            onClick={() => {
              navigate("/admin");
            }}
            className="signInBtn px-[4vw] rounded-[3vh] text-white py-[1vh] bg-[#6d8eef]"
          >
            Admin
          </button>
        </div>
      </div>
      <div
        className="w-full h-[65vh] pt-[5vh] flex flex-col justify-between  sm:w-[60vw] sm:h-screen"
        style={{
          backgroundImage: `url('images/HomePage.jpg')`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      >
        <span className="px-4 max-w-max mx-auto font-bold text-lg text-[#6d8eef]  border-[#F9CE2E] border-b-2 sm:hidden">
          Stock-Market-Wallet
        </span>
        <div className="text-center px-[3vw] text-[#6d8eef] sm:hidden">
          <p className="text-md font-bold ">
            Discover the <span className="text-[#F9CE2E]">Power</span> of
            <span className="text-[#F9CE2E]"> Investing</span>
          </p>
          <p className="text-sm mt-[2vh]">
            Unleash financial potential through smart investing with our
            innovative stock market
            <span className="border-[#F9CE2E] border-b-[1px] ml-[-2vw] pl-[3vw] pe-[1vw]">
              wallet app
            </span>
            <span className="text-[#F9CE2E]">.</span>
          </p>
        </div>
      </div>
      <div className="h-[35vh] flex items-center justify-center sm:hidden">
        <button
          onClick={() => {
            navigate("/users/signIn");
          }}
          className="signInBtn px-[5vw] rounded-[3vh] text-white me-[3vw] py-[1vh] bg-[#6d8eef]"
        >
          Sign In
        </button>
        <button
          onClick={() => {
            navigate("/admin");
          }}
          className="signInBtn px-[4vw] rounded-[3vh] text-white py-[1vh] bg-[#6d8eef]"
        >
          Admin
        </button>
      </div>
    </div>
  );
};

export default Home;
