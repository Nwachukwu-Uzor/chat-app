import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const socketContext = createContext();

export const SocketContextProvider = ({ id, children }) => {
  const [socket, setSocket] = useState(null);


  useEffect(() => {
    const newSocket = io("http://localhost:5000", {
        query: {id}
    })
    setSocket(newSocket)

    return () => newSocket.close();
  }, [id]);
  return <socketContext.Provider value={{socket}}>{children}</socketContext.Provider>;
};

export const useSocketContext = () => {
  return useContext(socketContext);
};
