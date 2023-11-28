import { useEffect, useRef, useCallback } from "react";
import { IoIosSend } from "react-icons/io";
import { useConversationContext } from "../context";

export const OpenConversation = () => {
  const { selectedConversation, sendMessage } = useConversationContext();

  const inputRef = useRef();

  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView();
    }
  }, []);

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
        <>
          <ul className="w-full flex flex-col gap-1 h-[90vh] pb-2 mt-2 px-2 overflow-auto">
            {selectedConversation.messages.map((message, index) => (
              <li
                key={index}
                className={`w-fit max-w-[70%] ${
                  message.fromMe ? "self-end bg-blue-700 text-white" : "self-start bg-gray-100 text-black"
                }  py-1 px-3 rounded-md`}
                ref={
                  index === selectedConversation.messages.length - 1
                    ? setRef
                    : undefined
                }
              >
                <span className={`font-semibold mb-0.5`}>
                  {message.fromMe ? "You" : message.senderName}
                </span>
                <p>{message?.text}</p>
              </li>
            ))}
          </ul>
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
        </>
      ) : (
        <h2 className="m-auto px-2 text-xl text-gray-500">
          Please create a conversation...
        </h2>
      )}
    </div>
  );
};
