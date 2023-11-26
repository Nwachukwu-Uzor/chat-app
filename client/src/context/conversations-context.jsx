import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks";
import { useContactsContext } from ".";

const conversationContext = createContext();

export const ConversationContextProvider = ({ children }) => {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );
  const { contacts } = useContactsContext();
  const createNewConversation = (recipients) => {
    setConversations((previousConversations) => [
      ...previousConversations,
      { recipients, messages: [] },
    ]);
  };

  // const formattedConversations = conversations.map(conversation => {
  //   const contact = contacts.find(cnt => cnt.id === conv)
  // })
  return (
    <conversationContext.Provider
      value={{ createNewConversation, conversations }}
    >
      {children}
    </conversationContext.Provider>
  );
};

export const useConversationContext = () => {
  return useContext(conversationContext);
};
