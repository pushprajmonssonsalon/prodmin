import { createContext, useContext, useState } from "react";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [expanded, setExpanded] = useState(true);
  return <AppContext.Provider value={{expanded,setExpanded}}>{children}</AppContext.Provider>;
};
export const useAppContext = () => useContext(AppContext);
export default AppContextProvider;
