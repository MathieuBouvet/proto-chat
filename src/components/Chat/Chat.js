import { useState, useEffect, useContext, useRef } from "react";
import { FaTelegramPlane } from "react-icons/fa";

import { db } from "../../services/firebase";
import { UserContext } from "../../UserProvider";
import { ErrorContext, createReporter } from "../../ErrorCatcher";
import ErrorListener from "../ErrorListener";
import Message from "./Message";
import { getUserName, status } from "./helpers";

import "./Chat.scss";

const messageSender = (user) => async (message) => {
  if (message !== "") {
    await db.ref("messages").push({ user, message, postedAt: Date.now() });
  }
};

const User = ({ user }) => (
  <div className={`user ${status(user)}`} title={status(user)}>
    <img
      src={user.avatar}
      className="profile-picture"
      alt={`avatar-for-${getUserName(user)}`}
      referrerPolicy="no-referrer"
    />
    {getUserName(user)}
  </div>
);

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const user = useContext(UserContext);
  const { dispatchError } = useContext(ErrorContext);

  const withDbWriteReporter = createReporter(dispatchError, "write-database");
  const sendMessage = withDbWriteReporter(messageSender(user));

  const messagesContainerRef = useRef(null);

  useEffect(() => {
    const usersRef = db.ref("users");
    usersRef.on("value", (snapshot) => {
      const users = [];
      snapshot.forEach((child) => {
        users.push({ ...child.val(), uid: child.key });
      });
      setUsers(users);
    });

    return () => usersRef.off();
  }, []);

  useEffect(() => {
    const messagesRef = db.ref("messages");
    messagesRef.on("value", (snapshot) => {
      const messages = [];
      snapshot.forEach((child) => {
        messages.push({ ...child.val(), key: child.key });
      });
      setMessages(messages);
    });
    return () => messagesRef.off();
  }, []);

  useEffect(() => {
    if (messagesContainerRef.current != null) {
      messagesContainerRef.current.scrollTo(
        0,
        messagesContainerRef.current.scrollHeight
      );
    }
  });

  const onlineUsers = users.filter((user) => user.online);
  const offlineUsers = users.filter((user) => !user.online);

  return (
    <main className="Chat">
      <section className="users">
        <h2>users</h2>
        <ul className="user-list">
          {onlineUsers.map((user) => (
            <li key={user.uid}>
              <User user={user} />
            </li>
          ))}
          {offlineUsers.map((user) => (
            <li key={user.uid}>
              <User user={user} />
            </li>
          ))}
        </ul>
      </section>
      <section className="input-container">
        <input
          type="text"
          className="message-input"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.code === "Enter" || e.code === "NumpadEnter") {
              sendMessage(currentMessage);
              setCurrentMessage("");
            }
          }}
        />
        <button
          className="send-button"
          onClick={() => {
            sendMessage(currentMessage);
            setCurrentMessage("");
          }}
        >
          <FaTelegramPlane className="send-icon" />
          send
        </button>
      </section>
      <section className="messages" ref={messagesContainerRef}>
        <ul className="message-list">
          {messages.map(({ message, user, postedAt, key }) => (
            <li key={key} className="message-item">
              <Message message={message} poster={user} postedAt={postedAt} />
            </li>
          ))}
        </ul>
        <ErrorListener
          className="write-database-error-listener"
          domain="write-database"
          title="Send Error"
        >
          An error occured while trying to send the message. This is most likely
          a network error, so you should try again.
        </ErrorListener>
      </section>
    </main>
  );
};

export default Chat;
