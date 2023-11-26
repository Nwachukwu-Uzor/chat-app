import { useContactsContext } from "../context";

export const Contacts = () => {
  const { contacts } = useContactsContext();
  return (
    <ul>
      {contacts.map((contact) => (
        <li key={contact.id}>{contact.name}</li>
      ))}
    </ul>
  );
};
