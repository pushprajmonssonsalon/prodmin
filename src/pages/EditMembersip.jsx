import { useState } from "react";
import Layout from "../components/Layout";
import TopBar from "../components/commoncomponents/TopBar";
import Wrapper from "../components/commoncomponents/Wrapper";
import {
  GET_USER_DETAILS,
  UPDATE_MEMBERSHIP,
} from "../services/crm/user.service";
import CommonTable from "../components/table/CommonTable";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const EditMembersip = () => {
  const [searchParams] = useSearchParams();
  const param = searchParams.get("phoneNumber");
  const [phoneNumber, setPhoneNumber] = useState(param);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  const cols = [
    {
      label: "Membership Name",
      id: "name",
      isEditable: false,
    },

    {
      label: "Credit Left",
      id: "creditsLeft",
      isEditable: true,
    },
    {
      label: "Joined On",
      id: "createdAt",
      isEditable: false,
      date: true,
    },
    {
      label: "Expiring On",
      id: "validTo",
      isEditable: true,
      date: true,
    },
  ];

  const getUserDetails = (value) => {
    GET_USER_DETAILS({
      phoneNumber: value,
    })
      .then((res) => {
        setUserDetails(res);
      })
      .catch((err) => {});
  };

  const handleChangePhone = (e) => {
    const { value } = e.target;
    if (value.length <= 10) {
      setPhoneNumber(e.target.value);

      if (value.length === 10) {
        navigate(`?phoneNumber=${value}`);
        getUserDetails(value);
      }
    }
  };

  const updateMembership = async (item) => {
    const payload = { ...item, phoneNumber };
    try {
      const res = await UPDATE_MEMBERSHIP(payload);
      if (res) {
        setUserDetails((prev)=>({...prev,activeMembership:res?.activeMembership}));
        toast.success("updated")
        return true
      }
      throw new Error("Update failed");
    } catch (error) {
      throw new Error("Update failed");
    }
  };

  const rows = userDetails?.activeMembership?.map((elm) => ({
    ...elm,
  }));

  return (
    <>
      <Layout>
        <div className="w-full flex flex-col ">
          <TopBar title="Edit Membership" />
        </div>
        <Wrapper>
          <div className="w-full">
            <div className="flex items-center justify-center">
              <div className="flex items-center flex-col relative mb-5">
                <label className="font-medium self-start text-md mb-2">
                  Phone Number
                </label>
                <div className="flex gap-6 items-center justify-center">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="p-2 border border-gray-200"
                    value={phoneNumber}
                    onChange={handleChangePhone}
                  />
                  <button
                    onClick={() => getUserDetails(phoneNumber)}
                    className="bg-black h-[40px] w-[150px] rounded-[5px] text-white font-medium flex items-center justify-center"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full  my-6">
              <h2 className="font-semibold text-4xl text-black text-center mb-5">
                Active Memberships
              </h2>
              <div className="  h-full  mx-auto p-4  ">
                <CommonTable
                  rows={rows}
                  cols={cols}
                  onUpdate={updateMembership}
                />
              </div>
            </div>
          </div>
        </Wrapper>
      </Layout>
    </>
  );
};

export default EditMembersip;
