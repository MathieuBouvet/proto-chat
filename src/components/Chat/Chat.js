import { useState, useEffect } from "react";

import { db } from "../../services/firebase";

import "./Chat.scss";

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
  return (
    <main className="Chat">
      <section className="users">
        <h3>Users</h3>
        <ul>
          {users.map((user) => (
            <li key={user.uid}>
              {user.online ? "online" : "offline"}
              {" - "}
              {user.name}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Chat;
