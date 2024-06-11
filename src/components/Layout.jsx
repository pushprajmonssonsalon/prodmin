import React, { useEffect, useState } from "react";
import { SidebarItem } from "./SideBar";
import Sidebar from "./SideBar";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { IoStatsChartOutline } from "react-icons/io5";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.substring(1); // get the current path without the leading "/"
  const [activeItem, setActiveItem] = useState(currentPath || "Dashboard");

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
  return (
    <div className="bg-[#e7ecef] w-screen h-screen flex ">
      <Sidebar>
        {isAdminCrm ? (
          <>
            <SidebarItem
              icon={<IoStatsChartOutline size={20} />}
              text="Dashboard"
              active={activeItem === "dash-board"}
              onClick={() => handleItemClick("dash-board")}
            />
            {/* <SidebarItem
              icon={<IoStatsChartOutline size={20} />}
              text="Reports"
              active={activeItem === "Reports"}
              onClick={() => handleItemClick("Reports")}
            /> */}
          </>
        ) : (
          <>
            <SidebarItem
              icon={<IoStatsChartOutline size={20} />}
              text="Dashboard"
              active={activeItem === "Dashboard"}
              onClick={() => handleItemClick("Dashboard")}
            />
            <SidebarItem
              icon={<HiOutlineShoppingCart size={20} />}
              text="Orders"
              active={activeItem === "Orders"}
              onClick={() => handleItemClick("Orders")}
            />
          </>
        )}
      </Sidebar>
      <main className="flex-grow bg-panel bg-cover box-border">{children}</main>
    </div>
  );
};

export default Layout;
