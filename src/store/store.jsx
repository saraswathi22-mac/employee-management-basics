import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../features/employees/employeeSlice";

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
});

// Persist to localStorage on every change
store.subscribe(() => {
  localStorage.setItem("employees", JSON.stringify(store.getState().employees));
});
