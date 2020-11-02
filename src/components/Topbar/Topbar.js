import { useContext } from "react";
import { UserContext } from "../../UserProvider";
import { signOut } from "../../services/firebase";
import { FaPowerOff } from "react-icons/fa";
import "./Topbar.scss";

function loggedInClassName(user) {
  return (className) => (user ? className + " logged-in" : className);
}

const Topbar = () => {
  const user = useContext(UserContext);
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
          <button className="logout-button">
            <FaPowerOff className="logout-icon" onClick={signOut} />
          </button>
        </>
      )}
    </header>
  );
};
export default Topbar;
