import axios from "axios";
import { getCsrfToken } from "./Auth";

import endpoints from "./Endpoints";

async function CreateRoom() {
  try {
    const data = {
      testing: "Hi",
    };
    const token = await getCsrfToken();
    const response = await axios.post(
      `${endpoints.createRoom}`,

      data,

      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": token,
        },
        withCredentials: true,
      }
    );
    if (response.data && response.data.roomId) {
      return response.data.roomId;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

async function JoinRoom(userId, roomId) {
  try {
    const data = { userId: userId, roomId: roomId };

    const token = await getCsrfToken();
    const response = await axios.post(
      `${endpoints.joinRoom}`,

      data,

      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": token,
        },
        withCredentials: true,
      }
    );
    if (response.data && response.data.roomId) {
      return response.data.roomId;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

export { CreateRoom, JoinRoom };
