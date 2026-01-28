import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.push(action.payload);
    },
    editEmployee: (state, action) => {
      const { id, name, email } = action.payload;
      const existingEmployee = state.find((employee) => employee.id === id);
      if (existingEmployee) {
        existingEmployee.name = name;
        existingEmployee.email = email;
      }
    },
    deleteEmployee: (state, action) => {
      const { id } = action.payload;
      return state.filter((employee) => employee.id !== id);
    },
  },
});

export const { addEmployee, editEmployee, deleteEmployee } =
  employeeSlice.actions;

export default employeeSlice.reducer;
