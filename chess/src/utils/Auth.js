import axios from 'axios'

export async function getCsrfToken(){
    try{
        const response = await axios.get(
            "http://127.0.0.1:8000/api/get-csrf-token/",
            { withCredentials: true }
          );
          return response.data.csrfToken;
    } catch (error) {
    return { message: "Error getting the token:", error: error};
}
}
