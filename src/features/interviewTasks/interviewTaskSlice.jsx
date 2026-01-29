import { createSlice } from "@reduxjs/toolkit";

const loadInitialState = () => {
  try {
    const data = localStorage.getItem("interviewTasks");
    return data ? JSON.parse(data) : [];
  } catch {
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
      const { id, updates } = action.payload;
      const task = state.find((t) => t.id === id);
      if (task) {
        Object.assign(task, updates, {
          updatedAt: new Date().toISOString(),
        });
      }
    },

    deleteInterviewTask: (state, action) => {
      return state.filter((t) => t.id !== action.payload.id);
    },
  },
});

export const {
  addInterviewTask,
  editInterviewTask,
  deleteInterviewTask,
} = interviewTaskSlice.actions;

export default interviewTaskSlice.reducer;
