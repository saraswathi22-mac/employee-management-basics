import { configureStore } from "@reduxjs/toolkit";
import interviewTaskReducer from "../features/interviewTasks/interviewTaskSlice";

export const store = configureStore({
  reducer: {
    interviewTasks: interviewTaskReducer,
  },
});

// Persist to localStorage on every change
store.subscribe(() => {
  localStorage.setItem(
    "interviewTasks",
    JSON.stringify(store.getState().interviewTasks),
  );
});
