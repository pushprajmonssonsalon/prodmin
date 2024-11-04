import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TopBar from "../components/commoncomponents/TopBar";
import Wrapper from "../components/commoncomponents/Wrapper";
import { GET_SALONS_CREDENTIALS } from "../services/crm/user.service";
import { BiHide, BiShow } from "react-icons/bi";

const SalonCredentials = () => {
  const [salons, setSalons] = useState([]);
  const [showPassword, setShowPassword] = useState(null);

  const fetchSalons = async () => {
    try {
      const res = await GET_SALONS_CREDENTIALS();
      setSalons(res);
    } catch (error) {}
  };

  useEffect(() => {
    fetchSalons();
  }, []);
  return (
    <>
      <Layout>
        <div className="w-full flex flex-col">
          <TopBar title="Salons Credentials" />
        </div>
        <Wrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {salons.slice(1).map((salon, idx) => {
              return (
                <div
                  key={idx}
                  className="bg-white border p-6 rounded-md shadow-md "
                >
                  <h2 className="font-medium text-black text-2xl mb-3">
                    {salon?.type}
                  </h2>
                  <p className="font-normal text-black text-lg mb-3">
                    {salon?.address1}
                    {" " + salon?.address2}
                  </p>
                  <div className="border-t-2 border-gray-200 mb-5 " />
                  <input
                    value={salon?.phoneNumber}
                    type="number"
                    readOnly
                    className="border rounded w-full border-gray-200 text-gray-500 outline-none px-3 h-[45px] py-1  mb-3"
                  />
                  <div className="relative ">
                    <input
                      value={salon?.password}
                      type={showPassword === idx ? "text" : "password"}
                      readOnly
                      className="border rounded text-gray-500 border-gray-200 outline-none px-3 h-[45px] py-1 w-full"
                    />
                    {showPassword === idx ? (
                      <button onClick={() => setShowPassword(null)}>
                        <BiHide className="absolute right-2 top-[12px] text-gray-500 text-xl " />
                      </button>
                    ) : (
                      <button onClick={() => setShowPassword(idx)}>
                        <BiShow className="absolute right-2 top-[12px] text-gray-500 text-xl " />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Wrapper>
      </Layout>
    </>
  );
};

export default SalonCredentials;
