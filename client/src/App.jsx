import { Dashboard, Login } from "./pages";
import { useLocalStorage } from "./hooks";
import {
  ContactsContextProvider,
  ConversationContextProvider,
  SocketContextProvider,
} from "./context";

const App = () => {
  const [id, setId] = useLocalStorage("id");

  const dashboard = (
    <SocketContextProvider id={id}>
      <ContactsContextProvider>
        <ConversationContextProvider id={id}>
          <Dashboard id={id} />
        </ConversationContextProvider>
      </ContactsContextProvider>
    </SocketContextProvider>
  );

  return id ? dashboard : <Login handleIdSet={setId} />;
};

export default App;
