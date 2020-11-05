import { useContext } from "react";
import PropTypes from "prop-types";
import { AiOutlineCloseCircle } from "react-icons/ai";

import { ErrorContext } from "../../ErrorCatcher";

import "./ErrorListener.scss";

const ErrorListener = ({ domain, className, title, children }) => {
  const { errors, dispatchError } = useContext(ErrorContext);

  return errors[domain] ? (
    <div className={`ErrorListener ${className}`}>
      <div className="header">
        {title}{" "}
        <button
          className="dismiss-error-button"
          onClick={() =>
            dispatchError({ type: "DISMISS_ERROR", payload: { domain } })
          }
          title="dismiss error"
        >
          <AiOutlineCloseCircle />
        </button>
      </div>
      <p className="body">{children}</p>
    </div>
  ) : null;
};

ErrorListener.propTypes = {
  domain: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  className: PropTypes.string,
};

export default ErrorListener;
