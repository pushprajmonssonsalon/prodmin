import { useEffect, useState } from "react";
import { SidebarItem } from "./SideBar";
import Sidebar from "./SideBar";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { MdCreate } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { crmroles } from "../services/utils/roles";
import { BsBoxes } from "react-icons/bs";
import { GrDeliver } from "react-icons/gr";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.substring(1); // get the current path without the leading "/"
  const [activeItem, setActiveItem] = useState(currentPath || "Dashboard");
  console.log(currentPath,activeItem,"activeItem path")
 
  useEffect(() => {
    setActiveItem(currentPath || "Dashboard");
  }, [currentPath]);

  const handleItemClick = (item) => {
    if (item !== activeItem) {
      setActiveItem(item);
      navigate(`/${item}`);
    }
  };
  const isAdminCrm = localStorage.getItem("isAdmin") === "crm";
  const activeRole =localStorage.getItem("role")||"admin";
  return (
    <div className="bg-[#e7ecef] w-screen h-screen  flex">
      <Sidebar >
        {isAdminCrm ? (
          <>
           
          {crmroles[activeRole]?.map((item,index)=>(
            <SidebarItem
              icon={item.icon}
              text={item.text} 
              active={activeItem === item.activeItem}
              onClick={() => handleItemClick(item.activeItem)}
            />
          ))} 
           
         
          </>
        ) : (
          <>
            {/* <SidebarItem
              icon={<IoStatsChartOutline size={20} />}
              text="Dashboard"
              active={activeItem === "Dashboard"}
              onClick={() => handleItemClick("Dashboard")}
            /> */}
            <SidebarItem
              icon={<GrDeliver size={20} />}
              text="Orders"
              active={activeItem === "Orders"}
              onClick={() => handleItemClick("Orders")}
            />
            <SidebarItem
              icon={<BsBoxes size={20} />}
              text="Products"
              active={activeItem === "Products"}
              onClick={() => handleItemClick("Products")}
            />
            <SidebarItem
              icon={<FaRegEdit size={20} />}
              text="Edit Status"
              active={activeItem === "Edit"}
              onClick={() => handleItemClick("Edit")}
            />

            <SidebarItem
              icon={<MdCreate size={20} />}
              text="Add Product"
              active={activeItem === "Add"}
              onClick={() => handleItemClick("Add")}
            />
          </>
        )}
      </Sidebar>
      <main className="flex-grow bg-panel bg-cover box-border">{children}</main>
    </div>
  );
};

export default Layout;
