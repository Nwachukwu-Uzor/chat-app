import React, { useRef } from "react";

export const Login = ({ handleIdSet }) => {
  const inputRef = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    const value = inputRef.current.value;
    handleIdSet(value);
  };

  return (
    <section className="h-screen w-full flex items-center justify-center">
      <form className="w-full p-2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type here"
          className="input border border-gray-300 focus:border-0 focus:ring-2 w-full"
          ref={inputRef}
        />
        <div className="flex gap-2 mt-2">
          <button className="btn min-w-[150px] bg-blue-600 text-white">
            Login
          </button>
          <button className="btn min-w-[150px] bg-green-600 text-white">
            Add Id
          </button>
        </div>
      </form>
    </section>
  );
};
