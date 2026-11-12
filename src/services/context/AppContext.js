import { createContext, useContext, useState } from "react";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [expanded, setExpanded] = useState(
    // start collapsed on small screens so content isn't squeezed
    typeof window === "undefined" ? true : window.innerWidth >= 768
  );
  return <AppContext.Provider value={{expanded,setExpanded}}>{children}</AppContext.Provider>;
};
export const useAppContext = () => useContext(AppContext);
export default AppContextProvider;
