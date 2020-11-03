import { useState, useEffect } from "react";
import { FaTelegramPlane } from "react-icons/fa";

import { db } from "../../services/firebase";

import "./Chat.scss";

const getUserName = (user) => user.name ?? user.email ?? "N/A";
const status = (user) => (user.online ? "online" : "offline");

const User = ({ user }) => (
  <li className={`user ${status(user)}`} title={status(user)}>
    <img
      src={user.avatar}
      className="profile-picture"
      alt={`avatar-for-${getUserName(user)}`}
      referrerPolicy="no-referrer"
    />
    {getUserName(user)}
  </li>
);

const Chat = () => {
  const [users, setUsers] = useState([]);
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

  const onlineUsers = users.filter((user) => user.online);
  const offlineUsers = users.filter((user) => !user.online);

  return (
    <main className="Chat">
      <section className="users">
        <h2>users</h2>
        <ul className="user-list">
          {onlineUsers.map((user) => (
            <User key={user.uid} user={user} />
          ))}
          {offlineUsers.map((user) => (
            <User key={user.uid} user={user} />
          ))}
        </ul>
      </section>
      <section className="input-container">
        <input type="text" className="message-input" />
        <button className="send-button">
          <FaTelegramPlane className="send-icon" />
          send
        </button>
      </section>
    </main>
  );
};

export default Chat;
