import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks";
import { useContactsContext } from ".";

const conversationContext = createContext();

export const ConversationContextProvider = ({ children }) => {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);

  const { contacts } = useContactsContext();
  const createNewConversation = (recipients) => {
    setConversations((previousConversations) => [
      ...previousConversations,
      { recipients, messages: [] },
    ]);
  };

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((cont) => cont.id === recipient);
      const name = contact ? contact.name : recipient;
      return { id: recipient, name };
    });
    const selected = selectedConversationIndex === index;
    return { ...conversation, recipients, selected };
  });
  return (
    <conversationContext.Provider
      value={{
        createNewConversation,
        conversations: formattedConversations,
        selectConversion: setSelectedConversationIndex,
      }}
    >
      {children}
    </conversationContext.Provider>
  );
};

export const useConversationContext = () => {
  return useContext(conversationContext);
};
