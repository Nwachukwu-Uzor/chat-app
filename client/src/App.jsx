import React, { useState } from "react";
import { Login } from "./pages";

const App = () => {
  const [id, setId] = useState(null);
  return (
    <>
      <Login handleIdSet={setId} />
    </>
  );
};

export default App;
