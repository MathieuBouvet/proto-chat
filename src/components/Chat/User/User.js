import PropTypes from "prop-types";

import { getUserName, status } from "../helpers";

import "./User.scss";

const User = ({ user }) => (
  <div className={`User ${status(user)}`} title={status(user)}>
    <img
      src={user.avatar}
      className="profile-picture"
      alt={`avatar-for-${getUserName(user)}`}
      referrerPolicy="no-referrer"
    />
    {getUserName(user)}
  </div>
);

User.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    online: PropTypes.bool.isRequired,
    email: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default User;
