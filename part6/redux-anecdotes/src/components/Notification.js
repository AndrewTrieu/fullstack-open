import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const style = {
    padding: 10,
    borderWidth: 1,
    color: "green",
  };

  return <div style={style}>{notification}</div>;
};

export default Notification;
