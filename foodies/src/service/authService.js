import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const registerUser = async (data) => {
   // eslint-disable-next-line no-useless-catch
   try {
     const response = await axios.post(API_URL + "/register", data);
    return response;
   } catch (error) {
    throw error;
   }
}
