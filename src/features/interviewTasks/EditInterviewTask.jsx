import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import { editInterviewTask } from "./interviewTaskSlice";

const EditInterviewTask = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const interviewTasks = useSelector((store) => store.interviewTasks);

  const existingInterviewTask = interviewTasks.find((task) => task.id === id);

  const [values, setValues] = useState({
    question: existingInterviewTask?.question || "",
    techStack: existingInterviewTask?.techStack || "React",
    difficulty: existingInterviewTask?.difficulty || "medium",
  });

  const handleEditInterviewTask = () => {
    if (!values.question.trim()) return;

    dispatch(
      editInterviewTask({
        id,
        updates: {
          question: values.question,
          techStack: values.techStack,
          difficulty: values.difficulty,
        },
      }),
    );

    navigate("/");
  };

  return (
    <div className="mt-12 max-w-xl mx-auto">
      {/* Card */}
      <div className="bg-white border rounded-lg shadow-sm p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Edit Interview Task
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Update the question if you want to refine or clarify it.
          </p>
        </div>

        {/* Input */}
        <div className="mb-6">
          <TextField
            label="Interview Question"
            value={values.question}
            onChange={(e) => setValues({ ...values, question: e.target.value })}
            inputProps={{
              type: "text",
              placeholder: "Explain useEffect cleanup with an example",
            }}
          />

          <p className="text-xs text-gray-500 mt-2">
            Tip: Keep it concise and explainable in under 10 minutes.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>

          <Button
            onClick={handleEditInterviewTask}
            disabled={!values.question.trim()}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditInterviewTask;
