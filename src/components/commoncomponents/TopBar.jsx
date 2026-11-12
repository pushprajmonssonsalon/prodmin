import React from 'react'

const TopBar = ({title}) => {
  return (
    <div className='w-full h-[65px] bg-white flex justify-start items-center px-3 sm:px-5 '>
        <h1 className='text-base sm:text-xl font-semibold font-mono truncate'>{title}</h1>
    </div>
  )
}

export default TopBar