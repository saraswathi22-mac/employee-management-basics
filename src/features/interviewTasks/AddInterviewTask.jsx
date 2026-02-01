import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import { addInterviewTask } from "./interviewTaskSlice";

const AddInterviewTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  const [values, setValues] = useState({
    question: "",
    techStack: "React",
    difficulty: "medium",
  });

  const handleAddTask = () => {
    if (!values.question) return;

    dispatch(
      addInterviewTask({
        id: uuidv4(),
        date: today,
        weekId: "2026-W01",
        ...values,
        status: "todo",
        isRolledOver: false,
        notes: "",
        confidenceLevel: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    );

    navigate("/");
  };

  return (
    <div className="mt-12 max-w-xl mx-auto">
      {/* Card */}
      <div className="bg-white shadow-sm border rounded-lg p-6">
        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Add Interview Task
          </h2>
        </div>

        {/* Input */}
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
