import React, { useRef, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import "./FranchiseLayout.css";
import { IoLogOutOutline, IoReorderThree } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const FranchiseLayout = ({ children }) => {
    const navigate =useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);
    const handleShowSidebar = () => {
        setIsSidebarOpen(true);
    };


    const handleRemoveSidebar = () => {
        setIsSidebarOpen(false);
    };

    const handleToggleSidebar = () => {
        if (isSidebarOpen) {
            // Add `slide-in-right` class, remove `slide-in-left` if present
            if (sidebarRef?.current) {
                if (sidebarRef?.current?.classList?.contains("slide-in-left"))
                    sidebarRef?.current?.classList?.remove("slide-in-left");

                sidebarRef?.current?.classList?.add("slide-in-right");

            }
            setTimeout(() => {
                setIsSidebarOpen(false)

            }, 600)
        } else {
            // Add `slide-in-left` class, remove `slide-in-right` if present
            if (sidebarRef?.current) {
                if (!sidebarRef?.current?.classList?.contains("slide-in-right"))
                    sidebarRef?.current?.classList?.add("slide-in-left");
                if (sidebarRef?.current?.classList?.contains("slide-in-right"))
                    sidebarRef?.current?.classList?.remove("slide-in-right");

            }
            setTimeout(() => {
                setIsSidebarOpen(true)

            }, 100)
        }

    };
    // Clone children and add props
    const childrenWithProps = React.Children.map(children, (child) =>
        React.cloneElement(child, { isSidebarOpen, handleToggleSidebar })
    );
    const handleLogout = () => {

        localStorage.removeItem("frntoken");


        navigate("/login");
    };
    return (
        <>

            <div className="  overflow-x-hidden overflow-y-auto">
                {/* Sidebar */}
                <div className="flex items-center w-full justify-between">
                    <button
                        onClick={handleToggleSidebar}
                        className="p-2 text-[2.7rem]  text-gray-600 font-medium  transition self-start"
                    >

                        <IoReorderThree />

                    </button>
                    <button
                    onClick={handleLogout}
                        className="p-2  hover:text-red-500 mr-5 text-[2.7rem]  text-gray-600 font-medium  transition self-start"
                    >

                        <IoLogOutOutline />


                    </button>
                </div>


                {isSidebarOpen && <aside
                    className={`h-full   fixed top-0 bottom-0 left-0 right-0 w-full bg-black/40 z-[10]  "
                        }`}
                    aria-label="Sidebar"
                >


                    <div ref={sidebarRef} className="h-full  slide-in-left relative bg-white  w-[250px]  px-3 py-4 ">
                        <button
                            onClick={handleToggleSidebar}
                            className="p-2 absolute rounded-r-[100px] -right-[30px] z-[12] text-sm bg-white transition self-start"
                        >
                            <MdOutlineClose />

                        </button>
                        <ul className="space-y-2 font-medium">
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                                >
                                    <svg
                                        className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 21"
                                    >
                                        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                    </svg>
                                    <span className="ms-3">Dashboard</span>
                                </a>
                            </li>
                            {/* Add more list items here */}
                        </ul>
                    </div>

                </aside>
                }
                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Toggle Button */}


                    {/* Main Content */}
                    <main className="w-full  px-3">          {childrenWithProps}
                    </main>
                </div>
            </div>
        </>
    )
}

export default FranchiseLayout