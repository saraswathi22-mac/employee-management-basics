import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import { addInterviewTask } from "./interviewTaskSlice";
import { getLocalDate, getWeekId } from "../../helpers/dateHelpers";

const AddInterviewTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const today = getLocalDate();

  const [values, setValues] = useState({
    question: "",
    techStack: "React",
    difficulty: "medium",
  });

  const handleAddTask = () => {
  if (!values.question.trim()) return;

  dispatch(
    addInterviewTask({
      id: uuidv4(),
      date: today,
      weekId: getWeekId(today), // ✅ FIX
      question: values.question,
      techStack: values.techStack,
      difficulty: values.difficulty,
      status: "todo",
      isRolledOver: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  );

  navigate("/");
};


  return (
    <div className="mt-12 max-w-xl mx-auto">
      <div className="bg-white shadow-sm border rounded-lg p-6">
        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Add Interview Task
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Add one clear interview-style question for today.
          </p>
        </div>

        {/* Question */}
        <div className="mb-6">
          <TextField
            label="Interview Question"
            value={values.question}
            onChange={(e) => setValues({ ...values, question: e.target.value })}
            inputProps={{
              placeholder: "Explain useEffect cleanup with an example",
            }}
          />
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Tech Stack */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Tech Stack
            </label>
            <select
              value={values.techStack}
              onChange={(e) =>
                setValues({ ...values, techStack: e.target.value })
              }
              className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="React">React</option>
              <option value="JavaScript">JavaScript</option>
              <option value="TypeScript">TypeScript</option>
              <option value="HTML/CSS">HTML / CSS</option>
              <option value="Frontend System Design">
                Frontend System Design
              </option>
            </select>
          </div>

          {/* Difficulty */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Difficulty
            </label>
            <select
              value={values.difficulty}
              onChange={(e) =>
                setValues({ ...values, difficulty: e.target.value })
              }
              className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 capitalize"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>

          <Button onClick={handleAddTask} disabled={!values.question.trim()}>
            Add Task
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddInterviewTask;
