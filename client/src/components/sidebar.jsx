import { useRef, useState } from "react";
import {
  Contacts,
  Conversations,
  NewContactModal,
  NewConversationModal,
} from ".";

const CONVERSATIONS_KEY = "CONVERSATIONS";
const CONTACTS_KEY = "CONTACTS";

export const Sidebar = ({ id }) => {
  const [activeTab, setActiveTab] = useState(CONVERSATIONS_KEY);
  const closeBtnRef = useRef();

  const handleOpenModal = () => {
    const element = document.getElementById("my_modal_2");
    if (element) {
      element.showModal();
    }
  };

  const handleClose = () => {
    if (closeBtnRef.current) {
      closeBtnRef.current.click();
    }
  };
  return (
    <>
      <aside className="w-[250px] flex flex-col items-center pt-2 h-screen">
        <div role="tablist" className="tabs tabs-boxed tabs-md">
          <button
            role="tab"
            className={`tab ${
              activeTab === CONVERSATIONS_KEY ? "tab-active" : ""
            }`}
            onClick={() => setActiveTab(CONVERSATIONS_KEY)}
          >
            Conversations
          </button>
          <button
            role="tab"
            className={`tab ${activeTab === CONTACTS_KEY ? "tab-active" : ""}`}
            onClick={() => setActiveTab(CONTACTS_KEY)}
          >
            Contacts
          </button>
        </div>
        <div className="mt-2 flex-1 w-full  border-r border-r-gray-300 flex flex-col">
          {activeTab === CONTACTS_KEY ? <Contacts /> : null}
          {activeTab === CONVERSATIONS_KEY ? <Conversations /> : null}

          <div className="mt-auto">
            <h2>
              <strong>Your Id</strong>: {id}
            </h2>
            <button
              className="btn w-full rounded-none bg-blue-600 hover:bg-blue-600 text-white hover:opacity-60"
              onClick={handleOpenModal}
            >
              New {activeTab === CONVERSATIONS_KEY ? "Conversation" : "Contact"}
            </button>
          </div>
        </div>
      </aside>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <button className="ml-auto" onClick={handleClose}>X</button>
          {activeTab === CONVERSATIONS_KEY ? (
            <NewConversationModal />
          ) : (
            <NewContactModal handleClose={handleClose} />
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button ref={closeBtnRef}>close</button>
        </form>
      </dialog>
    </>
  );
};
