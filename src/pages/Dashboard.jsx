import React from 'react'
import Layout from '../components/Layout'
import TopBar from '../components/commoncomponents/TopBar'
import CustomCard from '../components/commoncomponents/Card'
import { BsCartCheckFill } from "react-icons/bs";
import { ImStatsBars2 } from "react-icons/im";
import { TfiStatsUp } from "react-icons/tfi";
import { HiShoppingBag } from "react-icons/hi2";
const Dashboard = () => {
  return (
    <Layout>
    <div className='w-full flex flex-col'>
      <TopBar title="Dashboard"/>
      <div className='w-[90%] mx-auto my-10 flex justify-between items-center'>
        <CustomCard icon={<BsCartCheckFill />} title="Today's Orders" price="1000" bg="#8338ec"/>
        <CustomCard icon={<HiShoppingBag />} title="Total Orders" price="1000" bg="#a2d2ff"/>
        <CustomCard icon={<ImStatsBars2 />} title="Today's Revenues" price="1000" bg="#ffbe0b"/>
        <CustomCard icon={<TfiStatsUp />} title="Total Revenues" price="1000" bg="#38b000"/>
      </div>
    </div>
    </Layout>
  )
}

export default Dashboard