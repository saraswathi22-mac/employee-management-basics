import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  addInterviewTask,
  editInterviewTask,
  deleteInterviewTask,
} from "./interviewTaskSlice";

// helpers
import {
  getLocalDate,
  getYesterday,
  getWeekId,
} from "../../helpers/dateHelpers";

// components
import DatePicker from "../../components/DatePicker";
import DailyProgress from "../../components/DailyProgress";
import TaskCard from "../../components/TaskCard";
import WeeklySummary from "../../components/WeeklySummary";
import TopActions from "../../components/TopActions";

const InterviewTaskList = () => {
  const dispatch = useDispatch();
  const interviewTasks = useSelector((store) => store.interviewTasks);

  // -------- UI State --------
  const [showWeeklySummary, setShowWeeklySummary] = useState(false);

  // -------- Dates --------
  const today = getLocalDate();
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

  // -------- Progress --------
  const completedTasks = filteredTasks.filter(
    (task) => task.status === "done",
  ).length;

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

  // -------- Weekly Data --------
  const currentWeekId = getWeekId(today);
  const weeklyTasks = interviewTasks.filter(
    (task) => getWeekId(task.date) === currentWeekId,
  );

  // -------- UI --------
  return (
    <div className="mt-6 space-y-10">
      {/* Top Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <TopActions
          isToday={isToday}
          hasUnfinishedYesterday={unfinishedYesterdayTasks.length > 0}
          onRollover={rolloverUnfinishedTasks}
        />

        <DatePicker
          selectedDate={selectedDate}
          max={today}
          onChange={setSelectedDate}
        />
      </div>

      {/* Daily Progress */}
      {isToday && (
        <div className="max-w-3xl">
          <DailyProgress
            completed={completedTasks}
            total={filteredTasks.length}
          />
        </div>
      )}

      {/* Section Header */}
      <div className="border-b pb-2">
        <h2 className="text-lg font-semibold text-gray-800">
          {isToday
            ? "Today's Interview Tasks"
            : `Interview Tasks on ${selectedDate}`}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {isPastDay
            ? "Past days are read-only to keep progress honest"
            : "Focus on completing today's planned questions"}
        </p>
      </div>

      {/* Task List */}
      <div className="grid gap-4">
        {filteredTasks.length ? (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              isPastDay={isPastDay}
              onStatusChange={updateStatus}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="border border-dashed rounded-lg p-6 text-center bg-gray-50">
            <p className="text-gray-600">No interview tasks for this date</p>
            {isToday && (
              <p className="text-sm text-gray-500 mt-1">
                Add a task to plan your preparation
              </p>
            )}
          </div>
        )}
      </div>

      {/* Weekly Summary */}
      <div className="pt-8 border-t">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            Weekly Summary
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({currentWeekId})
            </span>
          </h2>

          <button
            onClick={() => setShowWeeklySummary((prev) => !prev)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            {showWeeklySummary ? "Hide summary" : "Show summary"}
          </button>
        </div>

        {showWeeklySummary && (
          <div className="mt-4">
            <WeeklySummary tasks={weeklyTasks} weekId={currentWeekId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewTaskList;
