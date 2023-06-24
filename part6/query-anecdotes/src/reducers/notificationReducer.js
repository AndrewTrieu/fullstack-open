import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data;
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, " ");

  return (
    <NotificationContext.Provider value={{ notification, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch.notification;
};

const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch.dispatch;
};

export { NotificationProvider, useNotificationValue, useNotificationDispatch };
export default NotificationContext;
