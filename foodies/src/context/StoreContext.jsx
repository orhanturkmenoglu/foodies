import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { fetchFoodList } from "./../service/foodService";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await fetchFoodList();
      setFoodList(data);
    }
    loadData();
  }, []);

  const contextValue = {
    foodList,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
