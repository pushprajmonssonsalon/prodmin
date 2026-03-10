import { BsBoxes, BsQrCode, BsUpload } from "react-icons/bs";
import { FaEdit, FaFileInvoiceDollar, FaRegEdit, FaUser } from "react-icons/fa";
import { GiShop } from "react-icons/gi";
import { GrDeliver } from "react-icons/gr";
import { IoIosDocument } from "react-icons/io";
import { IoBagAdd, IoNotifications } from "react-icons/io5";
import { MdAddBusiness, MdCardMembership, MdCreate } from "react-icons/md";
import { RiVideoAddFill } from "react-icons/ri";
import { TbCreditCardRefund, TbPasswordUser } from "react-icons/tb";

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
    text: "Add Distributer",
    activeItem: "create-distributer",
    icon: <FaUser size={20} />

  },
  {
    text: "PO Orders",
    activeItem: "poorders",
    icon: <GrDeliver size={20} />,
  },
  {
    text: "Distributer PO Orders",
    activeItem: "dbpoorders",
    icon: <GrDeliver size={20} />,
  },
];
const operations = [
  {
    text: "Salon Details (smart salon)",
    activeItem: "salondetsmart",
    icon: <GiShop size={20} />,
  },
  {
     text:"App Orders",
     activeItem:'app-orders',
     icon:<GrDeliver size={20} />
  },
  {
    text: "Salon Details (crm)",
    activeItem: "salondetcrm",
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
    icon: <FaEdit size={20} />,
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
  {
    text: "Push Notification",
    activeItem: "notification",
    icon: <IoNotifications size={20} />,
  },
  {
    text: "Salon Reports",
    activeItem: "salonreports",
    icon: <IoIosDocument size={20} />,
  },
  {
    text: "All Salon Data",
    activeItem: "allsalons",
    icon: <IoIosDocument size={20} />,
  },
  {
    text: "Salon Credentials",
    activeItem: "saloncred",
    icon: <TbPasswordUser size={20} />,
  },
  {
    text: "Edit Membership",
    activeItem: "editmemb",
    icon: <MdCardMembership size={20} />,
  },
];
export const prokeys = [
  {
    text: "Orders",
    activeItem: "Orders",
    icon: <GrDeliver size={20} />,
  },
  {
    text: "Order Details",
    activeItem: "orderdetails",
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
  {
    text: "Product Update",
    activeItem: "productupdate",
    icon: <BsUpload size={20} />,
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
export const salonTypes = {
  "Smart Salon": "Smart Salon",
  "Monsoon Pro": "Monsoon Salon Pro",
  Monsoon: "Monsoon Salon",
}
export const crmroles = {
  finance,
  admin: [...finance, ...operations],
  operations,
};

export const dateFilters = {
  TODAY: "Today",
  YESTERDAY: "YesterDay",
  LAST_7_DAYS: "Last 7 days",
  CURRENT_MONTH: "Current month",
  PAST_MONTH: "Past month"
}

export const productOptions = {
  brand: ["Loreal", "Argatin", "Skinconyc", "Spring H2O"],
  category: ["Beauty", "Personal Care", "Hair care", "Skin Care"],
  subCategory: [
    'Beauty fragrance', 'Bleach cream',
    'Conditioner', 'Essential oil',
    'Facial kit', 'Hair care',
    'Hair color', 'Hair conditioner',
    'Hair mask', 'Hair oil',
    'Hair repair shampoo', 'Hair shampoo',
    'Keratin treatment', 'Menicure and pedicure',
    'Oil', 'Shampoo',
    'Skin care', 'Skin mask',
    'Sunscreen', 'Treatment'
  ]

};

