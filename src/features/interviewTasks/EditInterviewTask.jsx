import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import { editInterviewTask } from "./interviewTaskSlice";

const EditInterviewTask = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const interviewTasks = useSelector((store) => store.interviewTasks);

  const existingTask = interviewTasks.find(
    (task) => task.id === id
  );

  const [values, setValues] = useState({
    question: existingTask?.question || "",
    techStack: existingTask?.techStack || "React",
    difficulty: existingTask?.difficulty || "medium",
  });

  const handleEditTask = () => {
    if (!values.question.trim()) return;

    dispatch(
      editInterviewTask({
        id,
        updates: {
          question: values.question,
          techStack: values.techStack,
          difficulty: values.difficulty,
          updatedAt: new Date().toISOString(),
        },
      })
    );

    navigate("/");
  };

  return (
    <div className="mt-12 max-w-xl mx-auto">
      <div className="bg-white shadow-sm border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Edit Interview Task
        </h2>

        {/* Question */}
        <div className="mb-6">
          <TextField
            label="Interview Question"
            value={values.question}
            onChange={(e) =>
              setValues({ ...values, question: e.target.value })
            }
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
        <div className="flex justify-end gap-3">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-gray-600"
          >
            Cancel
          </button>

          <Button onClick={handleEditTask}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditInterviewTask;
