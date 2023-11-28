import { useRef } from "react";
import { IoIosSend } from "react-icons/io";
import { useConversationContext } from "../context";

export const OpenConversation = ({ id }) => {
  const { selectedConversation, sendMessage } = useConversationContext();

  const inputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(
      selectedConversation.recipients.map((r) => r.id),
      inputRef.current.value
    );
    inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col flex-1 h-screen relative">
      {selectedConversation ? (
        <ul className="w-full flex flex-col gap-1 mb-10 mt-2 px-2">
          {selectedConversation.messages.map((message, index) => (
            <li
              key={index}
              className={`w-fit max-w-[70%] ${
                message.fromMe ? "self-end" : "self-start"
              } bg-gray-100 py-1 px-3 rounded-md`}
            >
              <span className="font-semibold mb-0.5">
                {message.fromMe ? "You" : message.senderName}
              </span>
              <p>{message?.text}</p>
            </li>
          ))}
        </ul>
      ) : null}
      <form
        className="absolute left-0 w-full bottom-0 p-2 flex gap-1"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="input border border-gray-400 w-full focus:border-none focus:ring-2 focus:ring-blue-300"
          ref={inputRef}
          required
        />
        <button
          className="btn bg-black hover:bg-black hover:opacity-70 text-white "
          type="submit"
        >
          Send <IoIosSend />
        </button>
      </form>
    </div>
  );
};
