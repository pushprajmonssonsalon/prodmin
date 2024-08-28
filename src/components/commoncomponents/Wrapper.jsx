import { useAppContext } from "../../services/context/AppContext";

const Wrapper = ({children}) => {
    const {expanded}=useAppContext();
  return (
    
      <div
        style={{
          maxWidth: expanded ? "calc(100vw - 289px)" : "calc(100vw - 69px)"
        }}
        className="p-8 md:p-16 mx-auto h-[calc(100vh-65px)]  overflow-y-auto "
      
      >  {children}</div>
   
  );
};

export default Wrapper;
