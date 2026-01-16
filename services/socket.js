import { io } from "socket.io-client";

let socket;
// Host token management
const HOST_TOKEN_KEY = "quiz_host_token";
const HOST_ROOM_KEY = "quiz_host_room";

export const setHostCredentials = (roomCode, hostToken) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(HOST_TOKEN_KEY, hostToken);
    sessionStorage.setItem(HOST_ROOM_KEY, roomCode);
  }
};

export const getHostCredentials = () => {
  if (typeof window !== "undefined") {
    return {
      hostToken: sessionStorage.getItem(HOST_TOKEN_KEY),
      roomCode: sessionStorage.getItem(HOST_ROOM_KEY),
    };
  }
  return { hostToken: null, roomCode: null };
};

export const clearHostCredentials = () => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(HOST_TOKEN_KEY);
    sessionStorage.removeItem(HOST_ROOM_KEY);
  }
};

export const isValidHost = (roomCode) => {
  const creds = getHostCredentials();
  return creds.roomCode === roomCode && creds.hostToken !== null;
};

export const connectSocket = () => {
  if (!socket) {
    const config = useRuntimeConfig();
    console.log("Connecting to socket at:", config.public.apiBaseUrl);
    const url = config.public.apiBaseUrl || "http://localhost:3001";
    socket = io(url, {
      autoConnect: true,
      reconnection: true,
    });
  } else if (!socket.connected) {
    socket.connect();
  }
  return socket;
};

export const useSocket = () => {
  if (!socket) {
    return connectSocket();
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket && socket.connected) {
    socket.disconnect();
  }
};
