import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { FoodItem } from "../FoodItem/FoodItem";

export const FoodDisplay = () => {
  const { foodList } = useContext(StoreContext);

  return (
    <div className="container my-4">
      <div className="row">
        {foodList && foodList.length > 0 ? (
          foodList.map((item, index) => (
            <FoodItem
              key={index}
              name={item.name}
              description={item.description}
              id={item.id}
              price={item.price}
              imageUrl={item.imageUrl}
            />
          ))
        ) : (
          <div className="text-center mt-4 w-100">
            <h4>No food found</h4>
          </div>
        )}
      </div>
    </div>
  );
};
