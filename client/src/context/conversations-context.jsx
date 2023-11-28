import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks";
import { useContactsContext } from ".";

const conversationContext = createContext();

export const ConversationContextProvider = ({ children, id }) => {
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

  const addMessageToConversation = ({ recipients, text, sender }) => {
    const newMessage = { text, sender };
    setConversations((previousConversations) => {
      let madeChanges = false;
      const newConversations = previousConversations.map((conversation) => {
        if (arrayEquality(conversation.recipients, recipients)) {
          madeChanges = true;
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage],
          };
        }
        return conversation;
      });
      if (!madeChanges) {
        return [
          ...previousConversations,
          { recipients: recipients, messages: [newMessage] },
        ];
      }
      return newConversations;
    });
  };

  const sendMessage = (recipients, text) => {
    addMessageToConversation({ recipients, text, sender: id });
  };

  console.log(contacts);
  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((cont) => cont.id === recipient);
      const name = contact ? contact.name : recipient;
      return { id: recipient, name };
    });
    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((cont) => cont.id === message.sender);
  
      const name = (contact && contact.name) || message.sender;
      const fromMe = message.sender === id;
      return { ...message, senderName: name, fromMe };
    });
    const selected = selectedConversationIndex === index;
    return { ...conversation, recipients, selected, messages };
  });

  return (
    <conversationContext.Provider
      value={{
        createNewConversation,
        conversations: formattedConversations,
        selectConversion: setSelectedConversationIndex,
        selectedConversation: formattedConversations[selectedConversationIndex],
        sendMessage,
      }}
    >
      {children}
    </conversationContext.Provider>
  );
};

export const useConversationContext = () => {
  return useContext(conversationContext);
};

const arrayEquality = (a, b) => {
  if (a.length !== b.length) {
    return false;
  }
  a.sort();
  b.sort();
  return a.every((element, index) => element === b[index]);
};

console.log(arrayEquality([1, 2, 3], [1, 3, 2]));
