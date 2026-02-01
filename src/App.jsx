import { Route, Routes } from "react-router-dom";
import AddInterviewTask from "./features/interviewTasks/AddInterviewTask";
import EditInterviewTask from "./features/interviewTasks/EditInterviewTask";
import InterviewTaskList from "./features/interviewTasks/InterviewTaskList";

function App() {
  return (
    <div className="container mx-auto max-w-5xl px-3 pt-10 md:pt-28">
      {/* App Header */}
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Interview Prep Planner
        </h1>

        <p className="mt-2 text-sm md:text-base text-gray-600">
          Plan daily interview questions, track progress, and review weekly
          performance
        </p>
      </header>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<InterviewTaskList />} />
        <Route path="/add-task" element={<AddInterviewTask />} />
        <Route path="/edit-task/:id" element={<EditInterviewTask />} />
      </Routes>
    </div>
  );
}

export default App;
