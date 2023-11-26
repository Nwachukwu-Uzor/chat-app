import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks";

const contactsContext = createContext();

export const ContactsContextProvider = ({ children }) => {
  const [contacts, setContacts] = useLocalStorage("contacts", []);

  const createNewContact = (name, id) => {
    setContacts((previousContacts) => [...previousContacts, { name, id }]);
  };
  return (
    <contactsContext.Provider value={{ contacts, createNewContact }}>
      {children}
    </contactsContext.Provider>
  );
};

export const useContactsContext = () => {
  return useContext(contactsContext);
};
