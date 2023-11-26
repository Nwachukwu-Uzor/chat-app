import { useRef } from "react";
import { useContactsContext } from "../context";

export const NewContactModal = ({ handleClose }) => {
  const idRef = useRef();
  const nameRef = useRef();

  const { createNewContact } = useContactsContext();

  const handleSubmit = (event) => {
    event.preventDefault();
    createNewContact(nameRef.current.value, idRef.current.value);
    nameRef.current.value = "";
    idRef.current.value = "";
    handleClose();
  };
  
  return (
    <div>
      <h2 className="font-semibold text-lg">Create Contact</h2>
      <form onSubmit={handleSubmit} className="my-2 flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <label className="font-semibold" htmlFor="userId">
            Id:
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input border border-gray-300 focus:border-0 focus:ring-2 w-full"
            ref={idRef}
            required
            id="userId"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold" htmlFor="username">
            Name:
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input border border-gray-300 focus:border-0 focus:ring-2 w-full"
            ref={nameRef}
            required
            id="username"
          />
        </div>
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
