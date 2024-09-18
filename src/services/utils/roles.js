import { BsBoxes, BsQrCode } from "react-icons/bs";
import { FaEdit, FaFileInvoiceDollar, FaRegEdit } from "react-icons/fa";
import { GiShop } from "react-icons/gi";
import { GrDeliver } from "react-icons/gr";
import { IoBagAdd } from "react-icons/io5";
import { MdAddBusiness, MdCreate } from "react-icons/md";
import { RiVideoAddFill } from "react-icons/ri";
import { TbCreditCardRefund } from "react-icons/tb";

const finance = [
  {
    text: "Invoices",
    activeItem: "dash-board",
    icon: <FaFileInvoiceDollar size={20} />,
  },
  {
    text: "Settelment",
    activeItem: "Settelment",
    icon: <TbCreditCardRefund size={20} />,
  },
  {
    text: "PO Orders",
    activeItem: "poorders",
    icon: <GrDeliver size={20} />,
  },
];
const operations = [
  {
    text: "Salon Details",
    activeItem: "salondet",
    icon: <GiShop size={20} />,
  },
  {
    text: "Add Salon",
    activeItem: "salonadd",
    icon: <MdAddBusiness size={20} />,
  },
  {
    text: "Add Product",
    activeItem: "prodadd",
    icon: <IoBagAdd size={20} />,
  },
  {
    text: "Add Vedio",
    activeItem: "vedioadd",
    icon: <RiVideoAddFill size={20} />,
  },
  {
    text: "Edit Vedio",
    activeItem: "vedioedit",
    icon: <FaEdit size={20}/>,
  },
  {
    text: "Edit Bulk Product",
    activeItem: "prodbedit",
    icon: <FaEdit size={20} />,
  },
  {
    text: "Edit Product",
    activeItem: "prodedit",
    icon: <FaEdit size={20} />,
  },
];
export const prokeys =[
  {
    text: "Orders",
    activeItem: "Orders",
    icon: <GrDeliver size={20} />,
  },
  {
    text: "Products",
    activeItem: "Products",
    icon: <BsBoxes size={20} />,
  },
  {
    text: "Edit Status",
    activeItem: "Edit",
    icon: <FaRegEdit size={20} />,
  },
  {
    text: "Add Product",
    activeItem: "Add",
    icon: <MdCreate size={20} />,
  },
  {
    text: "Product QrCodes",
    activeItem: "productqr",
    icon: <BsQrCode size={20} />,
  },
];

export const crmLinks = [
  "dash-board",

  "settelment",

  "poorders",

  "salondet",

  "salonadd",

  "prodadd",

  "salon",
];
export const salonTypes =[
 "Smart Salon",
"Monsoon Salon",
"Monsoon Salon Pro",
]
export const crmroles = {
  finance,
  admin: [...finance, ...operations],
  operations,
};
