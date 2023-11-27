import { useState } from "react";
import { useContactsContext, useConversationContext } from "../context";

export const NewConversationModal = ({ handleClose }) => {
  const [selectedContacts, setSelectedContact] = useState([]);
  const { contacts } = useContactsContext();
  const { createNewConversation } = useConversationContext();

  const handleSubmit = (event) => {
    event.preventDefault();
    createNewConversation(selectedContacts);
    handleClose();
  };

  const handleSelectContact = (contactId) => {
    setSelectedContact((previousSelectedContacts) => {
      if (previousSelectedContacts.includes(contactId)) {
        return previousSelectedContacts.filter((id) => id !== contactId);
      }
      return [...previousSelectedContacts, contactId];
    });
  };
  return (
    <div>
      <h2 className="font-semibold text-lg">Create Contact</h2>
      <form onSubmit={handleSubmit} className="my-2 flex flex-col gap-2">
        {contacts.map((contact) => (
          <div className="flex items-center gap-1" key={contact.id}>
            <label className="font-semibold" htmlFor={`contact-${contact.id}`}>
              {contact.name}
            </label>
            <input
              type="checkbox"
              value={selectedContacts.includes(contact.id)}
              className="checkbox checkbox-primary"
              onChange={() => handleSelectContact(contact.id)}
              id={`contact-${contact.id}`}
            />
          </div>
        ))}

        <button
          className="btn w-full rounded-none bg-blue-600 hover:bg-blue-600 text-white hover:opacity-60"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
};
