import { useContext } from "react";

import { UserContext } from "../../UserProvider";

import "./Chat.scss";

const Chat = () => {
  const { user } = useContext(UserContext);
  return (
    <main className="Chat">
      <section className="users"></section>
    </main>
  );
};

export default Chat;
