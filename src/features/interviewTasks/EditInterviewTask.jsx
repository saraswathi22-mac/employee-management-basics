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

  const interviewTasks = useSelector(
    (store) => store.interviewTasks
  );

  const existingInterviewTask = interviewTasks.find(
    (task) => task.id === id
  );

  const [values, setValues] = useState({
    question: existingInterviewTask?.question || "",
    techStack: existingInterviewTask?.techStack || "React",
    difficulty: existingInterviewTask?.difficulty || "medium",
  });

  const handleEditInterviewTask = () => {
    if (!values.question) return;

    dispatch(
      editInterviewTask({
        id,
        updates: {
          question: values.question,
          techStack: values.techStack,
          difficulty: values.difficulty,
        },
      })
    );

    navigate("/");
  };

  return (
    <div className="mt-10 max-w-xl mx-auto">
      <TextField
        label="Interview Question"
        value={values.question}
        onChange={(e) =>
          setValues({ ...values, question: e.target.value })
        }
        inputProps={{
          type: "text",
          placeholder: "Explain useEffect cleanup",
        }}
      />

      {/* UI dropdowns will come next */}
      <Button onClick={handleEditInterviewTask}>Edit Task</Button>
    </div>
  );
};

export default EditInterviewTask;
