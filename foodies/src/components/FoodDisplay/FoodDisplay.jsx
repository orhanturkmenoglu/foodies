import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { FoodItem } from "../FoodItem/FoodItem";

export const FoodDisplay = ({ category, searchText }) => {
  const { foodList } = useContext(StoreContext);

  const [foods, setFoods] = useState([]);

  useEffect(() => {
    if (foodList && foodList.length > 0) {
      setFoods(foodList);
      localStorage.setItem("foodList", JSON.stringify(foodList));
    } else {
      const localData = localStorage.getItem("foodList");
      if (localData) setFoods(JSON.parse(localData));
    }
  }, [foodList]);

  const filteredFoods = foods.filter((food) => {
    const matchesCategory = category === "All" || food.category === category;
    const matchesSearch = food.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container my-5">
      <div className="row g-4">
        {filteredFoods && filteredFoods.length > 0 ? (
          filteredFoods.map((item, index) => (
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
          <div className="text-center mt-5 w-100">
            <h4 className="text-muted mb-3">No food found</h4>
            <p className="text-secondary">
              Try selecting another category or search for something else.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
