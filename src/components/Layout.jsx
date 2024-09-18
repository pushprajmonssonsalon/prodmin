import { useEffect, useState } from "react";
import { SidebarItem } from "./SideBar";
import Sidebar from "./SideBar";
import { useLocation, useNavigate } from "react-router-dom";
import { crmroles, prokeys } from "../services/utils/roles";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.substring(1); // get the current path without the leading "/"
  const [activeItem, setActiveItem] = useState(currentPath || "Dashboard");
  console.log(currentPath, activeItem, "activeItem path");

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
  const activeRole = localStorage.getItem("role") || "admin";
  return (
    <div className="bg-[#e7ecef] w-screen h-screen  flex">
      <Sidebar>
        {isAdminCrm ? (
          <>
            {crmroles[activeRole]?.map((item, index) => (
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
            {prokeys.map((item, idx) => {
              return (
                <SidebarItem
                  key={idx}
                  icon={item.icon}
                  text={item.text}
                  active={activeItem === item.activeItem}
                  onClick={() => handleItemClick(item.activeItem)}
                />
              );
            })}
          </>
        )}
      </Sidebar>
      <main className="flex-grow bg-panel bg-cover box-border">{children}</main>
    </div>
  );
};

export default Layout;
