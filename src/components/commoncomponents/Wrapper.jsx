import { useAppContext } from "../../services/context/AppContext";

const Wrapper = ({children}) => {
    const {expanded}=useAppContext();
  return (

      <div
        className={`p-4 sm:p-8 md:p-16 mx-auto h-[calc(100vh-65px)] overflow-y-auto max-w-[calc(100vw-69px)] ${
          expanded ? "md:max-w-[calc(100vw-289px)]" : "md:max-w-[calc(100vw-69px)]"
        }`}

      >  {children}</div>

  );
};

export default Wrapper;
