import { FaEdit, FaFileInvoiceDollar } from "react-icons/fa";
import { GiShop } from "react-icons/gi";
import { GrDeliver } from "react-icons/gr";
import { IoBagAdd } from "react-icons/io5";
import { MdAddBusiness } from "react-icons/md";
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
    text: "Edit Product",
    activeItem: "prodedit",
    icon: <FaEdit size={20} />,
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
export const crmroles = {
  finance,
  admin: [...finance, ...operations],
  operations,
};
