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
    type: "theory",
    difficulty: "medium",
    estimatedTime: 30,
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
        inputProps={{ placeholder: "Explain useEffect cleanup" }}
      />

      <Button onClick={handleAddTask}>Add Task</Button>
    </div>
  );
};

export default AddInterviewTask;
