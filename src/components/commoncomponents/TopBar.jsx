import React from 'react'

const TopBar = ({title}) => {
  return (
    <div className='w-full h-[65px] bg-white flex justify-start items-center px-5 '>
        <h1 className='text-xl font-semibold font-mono'>{title}</h1>
    </div>
  )
}

export default TopBar