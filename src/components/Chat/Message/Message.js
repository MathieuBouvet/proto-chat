import PropTypes from "prop-types";
import { format } from "timeago.js";

import { getUserName } from "../helpers";

import "./Message.scss";

const Message = ({ message, poster, postedAt }) => {
  return (
    <div className="Message">
      <img
        src={poster.avatar}
        className="profile-picture poster-picture"
        alt={`avatar-for-${getUserName(poster)}`}
        referrerPolicy="no-referrer"
      />
      <div className="posted-info">
        <span className="poster-name">{getUserName(poster)}</span>{" "}
        <small>
          <i className="posted-at">{format(postedAt)}</i>
        </small>
      </div>
      <div className="posted-message">{message}</div>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.string.isRequired,
  postedAt: PropTypes.number.isRequired,
  poster: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    email: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default Message;
