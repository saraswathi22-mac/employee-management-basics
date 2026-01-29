import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import {
  addInterviewTask,
  editInterviewTask,
  deleteInterviewTask,
} from "./interviewTaskSlice";

const InterviewTaskList = () => {
  const dispatch = useDispatch();
  const interviewTasks = useSelector(
    (store) => store.interviewTasks
  );

  // -------- Dates --------
  const today = new Date().toISOString().split("T")[0];

  const getYesterday = () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split("T")[0];
  };

  const yesterday = getYesterday();

  // -------- Filters --------
  const todaysTasks = interviewTasks.filter(
    (task) => task.date === today
  );

  const unfinishedYesterdayTasks = interviewTasks.filter(
    (task) =>
      task.date === yesterday && task.status === "todo"
  );

  // -------- Actions --------
  const updateStatus = (id, status) => {
    dispatch(
      editInterviewTask({
        id,
        updates: { status },
      })
    );
  };

  const handleDelete = (id) => {
    dispatch(deleteInterviewTask({ id }));
  };

  const rolloverUnfinishedTasks = () => {
    if (!unfinishedYesterdayTasks.length) return;

    unfinishedYesterdayTasks.forEach((task) => {
      dispatch(
        addInterviewTask({
          ...task,
          id: crypto.randomUUID(),
          date: today,
          status: "todo",
          isRolledOver: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      );
    });
  };

  // -------- UI --------
  return (
    <div>
      <div className="flex gap-3">
        <Link to="/add-task">
          <Button>Add Interview Task</Button>
        </Link>

        {unfinishedYesterdayTasks.length > 0 && (
          <Button onClick={rolloverUnfinishedTasks}>
            Roll over unfinished tasks
          </Button>
        )}
      </div>

      <h2 className="mt-6 text-lg font-semibold text-gray-700">
        Today&apos;s Interview Tasks
      </h2>

      <div className="grid gap-4 mt-4">
        {todaysTasks.length ? (
          todaysTasks.map((task) => {
            const isLocked = task.date < today;

            return (
              <div
                key={task.id}
                className={`p-4 rounded flex justify-between ${
                  isLocked
                    ? "bg-gray-100 opacity-60"
                    : "bg-gray-200"
                }`}
              >
                <div>
                  <h3 className="font-medium text-gray-800">
                    {task.question}
                  </h3>

                  <p className="text-sm text-gray-600">
                    {task.techStack} • {task.difficulty}
                  </p>

                  <p className="text-xs mt-1">
                    Status:{" "}
                    <span className="font-semibold">
                      {task.status}
                    </span>
                  </p>

                  {task.isRolledOver && (
                    <p className="text-xs text-orange-500 mt-1">
                      Rolled over from previous day
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2 items-end">
                  {!isLocked && task.status === "todo" && (
                    <>
                      <button
                        onClick={() =>
                          updateStatus(task.id, "done")
                        }
                        className="text-green-600 text-sm"
                      >
                        Mark Done
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(task.id, "skipped")
                        }
                        className="text-yellow-600 text-sm"
                      >
                        Skip
                      </button>
                    </>
                  )}

                  {!isLocked && (
                    <>
                      <Link
                        to={`/edit-task/${task.id}`}
                        className="text-blue-600 text-sm"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(task.id)
                        }
                        className="text-red-600 text-sm"
                      >
                        Delete
                      </button>
                    </>
                  )}

                  {isLocked && (
                    <span className="text-xs text-gray-500">
                      🔒 Locked
                    </span>
                  )}
                </div>
              </div>
            );
          })
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
