import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../services/utils/session";

const Selection = () => {
  const navigate = useNavigate();
  const valid = (key) => {
    const t = localStorage.getItem(key);
    return t && !isTokenExpired(t) ? t : null;
  };
  const crmToken = valid("crmtoken");
  const proToken = valid("protoken");
  const frnToken = valid("frntoken");
  const handleSelection = (value) => {
    localStorage.setItem("isAdmin", value);
    if (value === "crm" && crmToken) navigate("/dash-board");
    else if (value === "website" && proToken) navigate("/orders");
    else if (value === "franchise" && frnToken) navigate("/franchise");
    else if (value === "website") {
      navigate("/pro-salon-cart/login");
    } else if (value === "crm") {
      navigate("/crm/login");
    } else if (value === "franchise") {
      navigate("/franchise/login");
    }
  };
  return (
    <div className="w-screen h-screen bg-selectbg bg-cover flex justify-center items-center">
      <div className="md:w-1/3 flex flex-col gap-y-14">
        <div
          className="w-full bg-[#ef233c] text-center px-5 py-5 text-[#e5e5e5] font-serif font-semibold text-3xl cursor-pointer hover:scale-x-110 hover:text-white transition-all duration-300 ease-in-out rounded-lg shadow-xl"
          onClick={() => handleSelection("website")}
        >
          PRO Salon Kart
        </div>
        <div
          className="w-full bg-[#ef233c] text-center px-5 py-5 text-[#e5e5e5] font-serif font-semibold text-3xl cursor-pointer hover:scale-x-110 hover:text-white transition-all duration-300 ease-in-out rounded-lg shadow-xl"
          onClick={() => handleSelection("crm")}
        >
          CRM
        </div>
        <div
          className="w-full bg-[#ef233c] text-center px-5 py-5 text-[#e5e5e5] font-serif font-semibold text-3xl cursor-pointer hover:scale-x-110 hover:text-white transition-all duration-300 ease-in-out rounded-lg shadow-xl"
          onClick={() => handleSelection("franchise")}
        >
          Franchise
        </div>
      </div>
    </div>
  );
};

export default Selection;
