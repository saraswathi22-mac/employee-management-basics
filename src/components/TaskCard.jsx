import { Link } from "react-router-dom";

const TaskCard = ({ task, isPastDay, onStatusChange, onDelete }) => (
  <div
    className={`p-4 rounded flex justify-between ${
      isPastDay ? "bg-gray-100 opacity-70" : "bg-gray-200"
    }`}
  >
    <div>
      <h3 className="font-medium text-gray-800">{task.question}</h3>

      <p className="text-sm text-gray-600">
        {task.techStack} • {task.difficulty}
      </p>

      <p className="text-xs mt-1">
        Status: <span className="font-semibold">{task.status}</span>
      </p>

      {task.isRolledOver && (
        <p className="text-xs text-orange-500 mt-1">
          Rolled over from previous day
        </p>
      )}

      {isPastDay && (
        <p className="text-xs text-gray-500 mt-1">🔒 Read-only (past day)</p>
      )}
    </div>

    {!isPastDay && (
      <div className="flex flex-col gap-2 items-end">
        {task.status === "todo" && (
          <button
            onClick={() => onStatusChange(task.id, "done")}
            className="text-green-600 text-sm"
          >
            Mark Done
          </button>
        )}

        <Link to={`/edit-task/${task.id}`} className="text-blue-600 text-sm">
          Edit
        </Link>

        <button
          onClick={() => onDelete(task.id)}
          className="text-red-600 text-sm"
        >
          Delete
        </button>
      </div>
    )}
  </div>
);

export default TaskCard;
