import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button";
import {
  addInterviewTask,
  editInterviewTask,
  deleteInterviewTask,
} from "./interviewTaskSlice";

const InterviewTaskList = () => {
  const dispatch = useDispatch();
  const interviewTasks = useSelector((store) => store.interviewTasks);

  // -------- Dates --------
  const today = new Date().toISOString().split("T")[0];

  const getYesterday = () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split("T")[0];
  };

  const yesterday = getYesterday();

  // -------- Selected Date --------
  const [selectedDate, setSelectedDate] = useState(today);

  const isToday = selectedDate === today;
  const isPastDay = selectedDate < today;

  // -------- Filters --------
  const filteredTasks = interviewTasks.filter(
    (task) => task.date === selectedDate,
  );

  const unfinishedYesterdayTasks = interviewTasks.filter(
    (task) => task.date === yesterday && task.status === "todo",
  );

  // -------- Progress (only for today) --------
  const totalTasks = filteredTasks.length;
  const completedTasks = filteredTasks.filter(
    (task) => task.status === "done",
  ).length;

  const progressPercent =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // -------- Actions --------
  const updateStatus = (id, status) => {
    dispatch(
      editInterviewTask({
        id,
        updates: { status },
      }),
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
        }),
      );
    });
  };

  // -------- Weekly Summary Helpers --------
const getWeekId = (dateStr) => {
  const date = new Date(dateStr);
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDays = Math.floor(
    (date - firstDayOfYear) / (24 * 60 * 60 * 1000)
  );
  const week = Math.ceil(
    (pastDays + firstDayOfYear.getDay() + 1) / 7
  );
  return `${date.getFullYear()}-W${week}`;
};

const currentWeekId = getWeekId(today);

// -------- Weekly Aggregation --------
const weeklyTasks = interviewTasks.filter(
  (task) => getWeekId(task.date) === currentWeekId
);

const weeklyStats = {
  total: weeklyTasks.length,
  done: weeklyTasks.filter((t) => t.status === "done").length,
  skipped: weeklyTasks.filter((t) => t.status === "skipped").length,
  todo: weeklyTasks.filter((t) => t.status === "todo").length,
};

const techStackStats = weeklyTasks.reduce((acc, task) => {
  acc[task.techStack] = (acc[task.techStack] || 0) + 1;
  return acc;
}, {});

const difficultyStats = weeklyTasks.reduce((acc, task) => {
  acc[task.difficulty] = (acc[task.difficulty] || 0) + 1;
  return acc;
}, {});


  // -------- UI --------
  return (
    <div>
      {/* Top Actions */}
      <div className="flex gap-3 items-center">
        <Link to="/add-task">
          <Button>Add Interview Task</Button>
        </Link>

        {isToday && unfinishedYesterdayTasks.length > 0 && (
          <Button onClick={rolloverUnfinishedTasks}>
            Roll over unfinished tasks
          </Button>
        )}
      </div>

      {/* Date Picker */}
      <div className="mt-6">
        <label className="text-sm font-medium text-gray-700">
          View tasks for date:
        </label>
        <input
          type="date"
          value={selectedDate}
          max={today}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="ml-3 border px-2 py-1 rounded"
        />
      </div>

      {/* Progress (Today only) */}
      {isToday && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <p className="text-sm font-medium text-gray-700">
            Today&apos;s Progress
          </p>

          <div className="flex items-center gap-4 mt-2">
            <div className="w-full bg-gray-300 h-2 rounded">
              <div
                className="bg-green-500 h-2 rounded"
                style={{
                  width: `${progressPercent}%`,
                }}
              />
            </div>

            <span className="text-sm font-semibold">{progressPercent}%</span>
          </div>

          <p className="text-xs text-gray-600 mt-1">
            {completedTasks} of {totalTasks} tasks completed
          </p>
        </div>
      )}

      {/* Header */}
      <h2 className="mt-6 text-lg font-semibold text-gray-700">
        {isToday
          ? "Today's Interview Tasks"
          : `Interview Tasks on ${selectedDate}`}
      </h2>

      {/* Task List */}
      <div className="grid gap-4 mt-4">
        {filteredTasks.length ? (
          filteredTasks.map((task) => (
            <div
              key={task.id}
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
                  <p className="text-xs text-gray-500 mt-1">
                    🔒 Read-only (past day)
                  </p>
                )}
              </div>

              {!isPastDay && (
                <div className="flex flex-col gap-2 items-end">
                  {task.status === "todo" && (
                    <>
                      <button
                        onClick={() => updateStatus(task.id, "done")}
                        className="text-green-600 text-sm"
                      >
                        Mark Done
                      </button>

                      <button
                        onClick={() => updateStatus(task.id, "skipped")}
                        className="text-yellow-600 text-sm"
                      >
                        Skip
                      </button>
                    </>
                  )}

                  <Link
                    to={`/edit-task/${task.id}`}
                    className="text-blue-600 text-sm"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-600 mt-6">No interview tasks for this date</p>
        )}
      </div>
      <div className="mt-10 bg-gray-100 p-5 rounded">
  <h2 className="text-lg font-semibold text-gray-800">
    Weekly Summary ({currentWeekId})
  </h2>

  <p className="text-sm text-gray-600 mt-1">
    Total Tasks: {weeklyStats.total}
  </p>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
    <div>
      <p className="text-sm font-medium">Done</p>
      <p className="text-lg font-bold text-green-600">
        {weeklyStats.done}
      </p>
    </div>

    <div>
      <p className="text-sm font-medium">Skipped</p>
      <p className="text-lg font-bold text-yellow-600">
        {weeklyStats.skipped}
      </p>
    </div>

    <div>
      <p className="text-sm font-medium">Pending</p>
      <p className="text-lg font-bold text-gray-600">
        {weeklyStats.todo}
      </p>
    </div>

    <div>
      <p className="text-sm font-medium">Completion</p>
      <p className="text-lg font-bold text-blue-600">
        {weeklyStats.total === 0
          ? "0%"
          : `${Math.round(
              (weeklyStats.done / weeklyStats.total) * 100
            )}%`}
      </p>
    </div>
  </div>

  {/* Tech Stack */}
  <div className="mt-6">
    <h3 className="font-medium text-gray-700">
      Tech Stack Coverage
    </h3>
    <ul className="text-sm mt-2">
      {Object.entries(techStackStats).map(
        ([stack, count]) => (
          <li key={stack}>
            {stack}: {count}
          </li>
        )
      )}
    </ul>
  </div>

  {/* Difficulty */}
  <div className="mt-4">
    <h3 className="font-medium text-gray-700">
      Difficulty Distribution
    </h3>
    <ul className="text-sm mt-2">
      {Object.entries(difficultyStats).map(
        ([level, count]) => (
          <li key={level}>
            {level}: {count}
          </li>
        )
      )}
    </ul>
  </div>
</div>

    </div>
  
);
};

export default InterviewTaskList;
