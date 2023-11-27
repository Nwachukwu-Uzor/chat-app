import { useConversationContext } from "../context";

export const Conversations = () => {
  const { conversations, selectConversion } = useConversationContext();
  return (
    <ul>
      {conversations.map((conversation, index) => {
        <li key={index} onClick={() => selectConversion(index)} className="bg-blue-600">
          {conversation.recipients.map((r) => r.name).join(", ")}
        </li>;
      })}
    </ul>
  );
};
