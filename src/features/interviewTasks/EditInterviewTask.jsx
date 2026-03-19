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

  const interviewTasks = useSelector((state) => state.interviewTasks);

  const existingTask = interviewTasks.find((t) => t.id === id);

  const [values, setValues] = useState({
    question: existingTask?.question || "",
    techStack: existingTask?.techStack || "React",
    difficulty: existingTask?.difficulty || "medium",
  });

  // 🔥 Detect changes (important UX)
  const isChanged =
    values.question !== existingTask?.question ||
    values.techStack !== existingTask?.techStack ||
    values.difficulty !== existingTask?.difficulty;

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
    <div className="min-h-[80vh] flex items-start justify-center px-4 py-10 bg-gray-50">
      <div className="w-full max-w-xl">
        {/* 🔷 Card */}
        <div className="bg-white border rounded-xl p-6 space-y-6 shadow-sm hover:shadow-md transition">
          
          {/* 🔷 Header */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Edit Interview Task
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Update your task details
            </p>
          </div>

          {/* 🔷 Question */}
          <TextField
            label="Interview Question"
            value={values.question}
            onChange={(e) =>
              setValues({ ...values, question: e.target.value })
            }
            inputProps={{
              placeholder: "Explain closures with example",
              autoFocus: true,
            }}
            error={!values.question.trim() && "Question is required"}
          />

          {/* 🔷 Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                className="
                  rounded-lg border border-gray-300 px-3 py-2 text-sm
                  bg-white text-gray-800
                  transition outline-none
                  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
                "
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
                className="
                  rounded-lg border border-gray-300 px-3 py-2 text-sm
                  bg-white text-gray-800 capitalize
                  transition outline-none
                  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
                "
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          {/* 🔷 Actions */}
          <div className="flex items-center justify-between pt-2">
            
            {/* Cancel */}
            <button
              onClick={() => navigate("/")}
              className="text-sm text-gray-500 hover:text-gray-700 transition"
            >
              Cancel
            </button>

            {/* Save */}
            <Button
              onClick={handleEditTask}
              disabled={!isChanged || !values.question.trim()}
            >
              💾 Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInterviewTask;