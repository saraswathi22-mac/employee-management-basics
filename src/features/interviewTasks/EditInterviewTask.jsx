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

  const existingInterviewTask = interviewTasks.find((interviewTask) => interviewTask.id === id);

  const [values, setValues] = useState({
    name: existingInterviewTask?.name || "",
    email: existingInterviewTask?.email || "",
  });

  const handleEditInterviewTask = () => {
    if (!values.name || !values.email) return;

    dispatch(
      editInterviewTask({
        id,
        name: values.name,
        email: values.email,
      }),
    );

    navigate("/");
  };

  return (
    <div className="mt-10 max-w-xl mx-auto">
      <TextField
        label="Name"
        value={values.name}
        onChange={(e) => setValues({ ...values, name: e.target.value })}
        inputProps={{ type: "text", placeholder: "Jhon Doe" }}
      />

      <br />

      <TextField
        label="Email"
        value={values.email}
        onChange={(e) => setValues({ ...values, email: e.target.value })}
        inputProps={{ type: "email", placeholder: "jhondoe@mail.com" }}
      />

      <Button onClick={handleEditInterviewTask}>Edit</Button>
    </div>
  );
};

export default EditInterviewTask;
