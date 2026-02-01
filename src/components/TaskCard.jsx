import { Link } from "react-router-dom";

const TaskCard = ({ task, isPastDay, onStatusChange, onDelete }) => {
  console.log(task)
  const techStack = task.techStack;
  const difficulty = task.difficulty;
console.log('a',task)
  return (
    <div
      className={`rounded-lg border p-4 flex justify-between gap-4 ${
        isPastDay
          ? "bg-gray-50 border-gray-200 opacity-75"
          : "bg-white border-gray-300 shadow-sm"
      }`}
    >
      {/* Task Details */}
      <div className="space-y-1.5">
        <h3 className="font-medium text-gray-900 leading-snug">
          {task.question}
        </h3>

        {/* Tech stack + difficulty */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="px-2 py-0.5 rounded bg-gray-100">
            {techStack}
          </span>
          <span className="text-gray-400">•</span>
          <span className="capitalize">
            {difficulty}
          </span>
        </div>

        {/* Status */}
        <p className="text-xs text-gray-600">
          Status:{" "}
          <span
            className={`font-semibold ${
              task.status === "done"
                ? "text-green-600"
                : task.status === "skipped"
                ? "text-yellow-600"
                : "text-gray-700"
            }`}
          >
            {task.status}
          </span>
        </p>

        {task.isRolledOver && (
          <p className="text-xs text-orange-500">
            ⏭ Rolled over from previous day
          </p>
        )}

        {isPastDay && (
          <p className="text-xs text-gray-500">
            🔒 Read-only (past day)
          </p>
        )}
      </div>

      {/* Actions */}
      {!isPastDay && (
        <div className="flex flex-col items-end gap-2 text-sm">
          {task.status === "todo" && (
            <button
              onClick={() => onStatusChange(task.id, "done")}
              className="text-green-600 hover:text-green-700"
            >
              Mark Done
            </button>
          )}

          <Link
            to={`/edit-task/${task.id}`}
            className="text-blue-600 hover:text-blue-700"
          >
            Edit
          </Link>

          <button
            onClick={() => onDelete(task.id)}
            className="text-red-600 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
