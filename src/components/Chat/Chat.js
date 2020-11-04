import { useState, useEffect, useContext, useRef } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { format } from "timeago.js";

import { db } from "../../services/firebase";
import { UserContext } from "../../UserProvider";
import { ErrorContext, reporter } from "../../ErrorCatcher";

import "./Chat.scss";

const getUserName = (user) => user.name ?? user.email ?? "N/A";
const status = (user) => (user.online ? "online" : "offline");

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

const Message = ({ message }) => {
  const poster = message.user;
  return (
    <div className="message">
      <img
        src={poster.avatar}
        className="profile-picture poster-picture"
        alt={`avatar-for-${getUserName(poster)}`}
        referrerPolicy="no-referrer"
      />
      <div className="posted-info">
        <span className="poster-name">{getUserName(poster)}</span>{" "}
        <small>
          <i className="posted-at">{format(message.postedAt)}</i>
        </small>
      </div>
      <div className="posted-message">{message.message}</div>
    </div>
  );
};

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const user = useContext(UserContext);
  const { dispatchError } = useContext(ErrorContext);

  const withDbWriteReporter = reporter(dispatchError, "write-database");
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
            if (e.code === "Enter") {
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
          {messages.map((message) => (
            <li key={message.key} className="message-item">
              <Message message={message} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Chat;
