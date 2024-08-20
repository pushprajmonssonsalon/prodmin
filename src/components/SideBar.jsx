import { RiMenuFold3Line2, RiMenuUnfold3Fill } from "react-icons/ri";
import { useContext, createContext } from "react";
import CustomPopover from "./commoncomponents/PopOver";
import ProLogo from '../assets/proLogo.png';
import SmallProLogo from '../assets/smallPro.png';
import { useAppContext } from "../services/context/AppContext";
const SidebarContext = createContext()

export default function Sidebar({ children }) {
  const {expanded, setExpanded} = useAppContext();
  
  return (
    <aside className="h-screen sidebar">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={ProLogo}
            className={`overflow-hidden transition-all text-black ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <RiMenuFold3Line2 size={20}/> : <RiMenuUnfold3Fill  size={20}/>}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src={SmallProLogo}
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Pro Salon Cart</h4>
              <span className="text-xs text-gray-600">enquiry@theprofessionalworld.com</span>
            </div>
            <CustomPopover />
          </div>
        </div>
      </nav>
    </aside>
  )
}

export function SidebarItem({ icon, text, active, alert,onClick }) {
  const { expanded } = useContext(SidebarContext)
  // console.log("expanded", expanded,text,active,alert,onClick)
  
  return (
    <li
      onClick={onClick}
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium h-[40px]  rounded-md cursor-pointer
        transition-all ease-in duration-100 delay-75 group
        ${
          active
            ? "bg-gradient-to-tr  from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden font-serif transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  )
}