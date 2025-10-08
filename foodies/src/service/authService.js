import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const registerUser = async (data) => {
   // eslint-disable-next-line no-useless-catch
   try {
     const response = await axios.post(API_URL + "/users/register", data);
     console.log("registerUser response :",response);
    return response;
   } catch (error) {
    throw error;
   }
}



export const login =async (data) =>{
       // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.post(API_URL+"/auth/login",data);
      return response;
    }catch(error) {
        throw error;
    }
}