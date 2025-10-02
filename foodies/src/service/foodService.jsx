import axios from "axios";

const API_URL = "http://localhost:8080/api/foods";

export const fetchFoodList = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/foods");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error",error);
    throw error;
  }
};
