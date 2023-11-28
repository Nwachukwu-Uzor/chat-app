import { Sidebar, OpenConversation } from "../components";

export const Dashboard = ({ id }) => {
  return (
    <section className="flex">
      <Sidebar id={id} />
      <OpenConversation id={id}/>
    </section>
  );
};
