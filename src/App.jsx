import { Route, Routes } from "react-router-dom";
import AddInterviewTask from "./features/interviewTasks/AddInterviewTask";
import EditInterviewTask from "./features/interviewTasks/EditInterviewTask";
import InterviewTaskList from "./features/interviewTasks/InterviewTaskList";

function App() {
  return (
    <div className="container mx-auto px-2 max-w-5xl pt-10 md:pt-32">
      <h1 className="text-center font-bold text-2xl text-gray-700">
        Interview Task Management
      </h1>
      <Routes>
        <Route path="/" element={<InterviewTaskList />} />
        <Route path="/add-task" element={<AddInterviewTask />} />
        <Route path="/edit-task/:id" element={<EditInterviewTask />} />
      </Routes>
    </div>
  );
}

export default App;
