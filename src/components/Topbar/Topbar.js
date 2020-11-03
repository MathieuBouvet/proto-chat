import { useContext } from "react";
import { FaPowerOff } from "react-icons/fa";

import { UserContext } from "../../UserProvider";
import { signOut } from "../../services/firebase";

import "./Topbar.scss";

function loggedInClassName(user) {
  return (className) => (user ? className + " logged-in" : className);
}

const Topbar = () => {
  const { user } = useContext(UserContext);
  const getLoggedInClassName = loggedInClassName(user);
  return (
    <header className={getLoggedInClassName("Topbar")}>
      <span className={getLoggedInClassName("app-title")}>proto-chat</span>
      {user && (
        <>
          <img
            className="profile-picture"
            src={user.avatar}
            alt="profile"
            referrerPolicy="no-referrer"
          />
          <span className="user-name">{user.name}</span>
          <button className="logout-button" onClick={signOut}>
            <FaPowerOff className="logout-icon" />
          </button>
        </>
      )}
    </header>
  );
};
export default Topbar;
