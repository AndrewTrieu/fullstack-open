import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    showNotification(state, action) {
      return action.payload;
    },
    hideNotification(state, action) {
      return "";
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export const setNotification = (text) => {
  return (dispatch) => {
    dispatch(showNotification(text));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
  };
};
export default notificationSlice.reducer;
