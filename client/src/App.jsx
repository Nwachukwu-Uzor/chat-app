import { Dashboard, Login } from "./pages";
import { useLocalStorage } from "./hooks";
import {
  ContactsContextProvider,
  ConversationContextProvider,
} from "./context";

const App = () => {
  const [id, setId] = useLocalStorage("id");

  const dashboard = (
    <ContactsContextProvider>
      <ConversationContextProvider>
        <Dashboard id={id} />
      </ConversationContextProvider>
    </ContactsContextProvider>
  );

  return id ? dashboard : <Login handleIdSet={setId} />;
};

export default App;
