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
  const [errors, dispatch] = useReducer(errorReducer, {});
  const errorReporter = (domain) => (func) => async (...params) => {
    try {
      await func(...params);
      dispatch({ type: "DISMISS_ERROR", payload: { domain } });
    } catch (error) {
      dispatch({
        type: "REPORT_ERROR",
        payload: { domain, error: error.toJSON() },
      });
    }
  };
  return (
    <ErrorContext.Provider value={{ errors, errorReporter }}>
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorCatcher;
export { ErrorContext };
