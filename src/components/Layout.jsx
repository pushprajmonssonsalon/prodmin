import React, { useState } from 'react'
import  { SidebarItem } from './SideBar'
import Sidebar from './SideBar'
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { IoStatsChartOutline } from "react-icons/io5";

const Layout = ({children}) => {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState('Dashboard');

  const handleItemClick = (item) => {
    setActiveItem(item);
    navigate(`/${item}`)
  };
  return (
    <div className='bg-gray-300 w-screen h-screen flex'>
        <Sidebar>
        <SidebarItem icon={<IoStatsChartOutline size={20}/>} text="Dashboard" active={activeItem === 'Dashboard'} onClick={() => handleItemClick('Dashboard')}/>
        <SidebarItem icon={<HiOutlineShoppingCart size={20}/>} text="Orders" active={activeItem === 'Orders'} onClick={() => handleItemClick('Orders')}/>
        </Sidebar>
        <main>{children}</main>
    </div>
  )
}

export default Layout