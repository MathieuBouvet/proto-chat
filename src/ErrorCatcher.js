import { createContext, useReducer } from "react";

const ErrorContext = createContext(null);

const errorReducer = (state, action) => {
  switch (action.type) {
    case "REPORT_ERROR": {
      console.log(action.payload.error);
      return { ...state, [action.payload.domain]: action.payload.error };
    }
    case "DISMISS_ERROR": {
      if (state[action.payload.domain] == null) {
        return state;
      }
      return { ...state, [action.payload.domain]: null };
    }
    default: {
      return state;
    }
  }
};

const ErrorCatcher = ({ children }) => {
  const [errors, errorReporter] = useReducer(errorReducer, {});

  return (
    <ErrorContext.Provider value={{ errors, errorReporter }}>
      {children}
    </ErrorContext.Provider>
  );
};

function createError(domain, error) {
  return {
    type: "REPORT_ERROR",
    payload: { domain, error },
  };
}

function dismiss(domain) {
  return {
    type: "DISMISS_ERROR",
    payload: { domain },
  };
}

export default ErrorCatcher;
export { ErrorContext, createError, dismiss };
