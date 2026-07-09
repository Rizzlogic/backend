import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => navigate("/catalog"), 200);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#FFFDF9" }}
    >
      <div
        onClick={handleClick}
        className={`w-[90px] h-[90px] flex items-center justify-center text-3xl cursor-pointer select-none
                    bg-[#FFDE4D] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                    transition-all duration-150
                    ${clicked ? "scale-90 shadow-none translate-x-[4px] translate-y-[4px]" : "hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"}`}
      >
        🛒
      </div>
    </div>
  );
}