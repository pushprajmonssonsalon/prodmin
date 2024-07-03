import React, { useState } from "react";
import Layout from "../components/Layout";
import TopBar from "../components/commoncomponents/TopBar";
import InputTextArea from "../components/commoncomponents/InputTextArea";
import { Button } from "@mui/material";
import { EDIT_ORDER_STATUS, EDIT_STOCK_QUANTITY } from "../services/pro/user.service";
import toast from "react-hot-toast";

const EditOrder = () => {
  const [ids, setIds] = useState("");
  const [status, setStatus] = useState("");
  const [stockIds, setStockIds] = useState("");
  const [quantity, setQuantity] = useState("");
  console.log("ids", ids);
  console.log("status", status);

  const handleStatus = async () => {
    const orderIds = ids
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id !== "");

    const editstatus = await EDIT_ORDER_STATUS({ orderIds, status });
    if (editstatus) {
      toast.success("Successfully edited!");
      setIds("");
      setStatus("");
    }
    console.log("edit status", editstatus);
  };

  const handleQuantityStatus =async()=>{
    const stockId = stockIds.split(",").map((id)=>id.trim()).filter((id)=>id!=="");
    const quantitystatus = await EDIT_STOCK_QUANTITY({skucodes:stockId,qty:+quantity});
    if(quantitystatus) toast.success("Successfully Updated Stocks!")
  }
  return (
    <Layout>
      <div className="w-full flex flex-col">
        <TopBar title="Edit Status" />
        <div className="w-[90%] mx-auto flex items-center">
          <div className="w-[60%] mx-auto my-5">
            <InputTextArea label="Enter id's" value={ids} setProperty={setIds} />
          </div>
          <div className="w-[20%] mx-auto my-5 relative">
            <InputTextArea
              label="Enter Status"
              value={status}
              setProperty={setStatus}
            />
            {status && (
              <div className="absolute w-full top-16 bg-white shadow-xl flex flex-col px-2 py-1 rounded-lg z-10">
                <l1>{"1 --> Placed"}</l1>
                <l1>{"2 --> Cancelled"}</l1>
                <l1>{"3 --> Received"}</l1>
                <l1>{"4 --> RTO"}</l1>
                <l1>{"7 --> Shipped"}</l1>
              </div>
            )}
          </div>
          <div>
            <Button variant="contained" onClick={handleStatus}>Submit</Button>
          </div>
        </div>
        <div className="w-[90%] mx-auto flex items-center">
          <div className="w-[60%] mx-auto my-5">
            <InputTextArea label="Enter stock id's" value={stockIds} setProperty={setStockIds} />
          </div>
          <div className="w-[20%] mx-auto my-5  relative">
            <InputTextArea
              label="Enter Quantity"
              value={quantity}
              setProperty={setQuantity}
            />
            {quantity && (
              <div className="absolute w-full top-16 bg-white shadow-xl flex flex-col px-2 py-1 rounded-lg z-20">
                <l1>{"0 --> Out of stock"}</l1>
                <l1>{"1 --> Available Stock"}</l1>
              </div>
            )}
          </div>
          <div>
            <Button variant="contained" onClick={handleQuantityStatus}>Submit</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditOrder;


