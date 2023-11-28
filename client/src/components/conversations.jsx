import { useConversationContext } from "../context";

export const Conversations = () => {
  const { conversations, selectConversion } = useConversationContext();
  return (
    <ul>
      {conversations.map((conversation, index) => (
        <li
          key={index}
          onClick={() => selectConversion(index)}
          className={`${
            conversation.selected ? "bg-blue-700 text-white hover:bg-blue-700" : "text-blue-700"
          } btn w-full rounded-none`}
        >
          {conversation.recipients.map((r) => r.name).join(",")}
        </li>
      ))}
    </ul>
  );
};
