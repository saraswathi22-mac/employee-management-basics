import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { deleteInterviewTask } from "./interviewTaskSlice";

const InterviewTaskList = () => {
  const dispatch = useDispatch();
  const interviewTasks = useSelector(
    (store) => store.interviewTasks
  );

  const today = new Date().toISOString().split("T")[0];

  const todaysTasks = interviewTasks.filter(
    (task) => task.date === today
  );

  const handleDelete = (id) => {
    dispatch(deleteInterviewTask({ id }));
  };

  return (
    <div>
      <Link to="/add-task">
        <Button>Add Interview Task</Button>
      </Link>

      <h2 className="mt-6 text-lg font-semibold text-gray-700">
        Today&apos;s Interview Tasks
      </h2>

      <div className="grid gap-4 mt-4">
        {todaysTasks.length ? (
          todaysTasks.map((task) => (
            <div
              key={task.id}
              className="bg-gray-200 p-4 rounded flex justify-between"
            >
              <div>
                <h3 className="font-medium text-gray-800">
                  {task.question}
                </h3>

                <p className="text-sm text-gray-600">
                  {task.techStack} • {task.difficulty}
                </p>

                <p className="text-xs text-gray-500">
                  Status: {task.status}
                </p>
              </div>

              <div className="flex gap-3 items-center">
                <Link to={`/edit-task/${task.id}`}>
                  <button className="text-blue-600">Edit</button>
                </Link>

                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 mt-6">
            No interview tasks planned for today
          </p>
        )}
      </div>
    </div>
  );
};

export default InterviewTaskList;
