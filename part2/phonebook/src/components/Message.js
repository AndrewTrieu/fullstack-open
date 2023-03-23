const Message = ({ message }) => {
  if (message === null) {
    return null;
  } else if (message.includes("Added") || message.includes("Updated")) {
    return <div className="success-message">{message}</div>;
  } else {
    return <div className="error-message">{message}</div>;
  }
};

export default Message;
