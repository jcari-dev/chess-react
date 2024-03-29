import axios from "axios";

import endpoints from "./Endpoints";

export async function getCsrfToken() {
  try {
    const response = await axios.get(`${endpoints.getCsrfToken}`, {
      withCredentials: true,
    });
    return response.data.csrfToken;
  } catch (error) {
    return { message: "Error getting the token:", error: error };
  }
}
