import { createSlice } from "@reduxjs/toolkit";

const loadInitialState = () => {
  try {
    const data = localStorage.getItem("interviewTasks");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};

const initialState = loadInitialState();

const interviewTaskSlice = createSlice({
  name: "interviewTasks",
  initialState,
  reducers: {
    addInterviewTask: (state, action) => {
      state.push(action.payload);
    },
    editInterviewTask: (state, action) => {
      const { id, name, email } = action.payload;
      const existingInterviewTask = state.find(
        (interviewTask) => interviewTask.id === id
      );
      if (existingInterviewTask) {
        existingInterviewTask.name = name;
        existingInterviewTask.email = email;
      }
    },
    deleteInterviewTask: (state, action) => {
      const { id } = action.payload;
      return state.filter(
        (interviewTask) => interviewTask.id !== id
      );
    },
  },
});

export const {
  addInterviewTask,
  editInterviewTask,
  deleteInterviewTask,
} = interviewTaskSlice.actions;

export default interviewTaskSlice.reducer;
