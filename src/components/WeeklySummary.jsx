import { getWeeklyStats, groupByKey } from "../helpers/weeklyStats";

const WeeklySummary = ({ tasks, weekId }) => {
  const stats = getWeeklyStats(tasks);
  const techStackStats = groupByKey(tasks, "techStack");
  const difficultyStats = groupByKey(tasks, "difficulty");

  const completionPercent =
    stats.total === 0 ? 0 : Math.round((stats.done / stats.total) * 100);

  return (
    <div className="mt-6 rounded-lg border bg-white p-6 shadow-sm space-y-6 mb-5">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <StatCard label="Total" value={stats.total} />
        <StatCard label="Done" value={stats.done} color="green" />
        <StatCard label="Pending" value={stats.todo} color="gray" />
      </div>

      {/* Completion */}
      <div>
        <p className="text-sm font-medium text-gray-700">Completion Rate</p>
        <div className="mt-2 flex items-center gap-4">
          <div className="w-full h-2.5 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-blue-500 transition-all"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-gray-700">
            {completionPercent}%
          </span>
        </div>
      </div>

      {/* Breakdown */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Tech Stack */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Tech Stack Coverage
          </h4>

          {Object.keys(techStackStats).length ? (
            <ul className="space-y-1 text-sm text-gray-600">
              {Object.entries(techStackStats).map(([stack, count]) => (
                <li key={stack} className="flex justify-between">
                  <span>{stack}</span>
                  <span className="font-medium">{count}</span>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyText text="No tasks this week" />
          )}
        </div>

        {/* Difficulty */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Difficulty Distribution
          </h4>

          {Object.keys(difficultyStats).length ? (
            <ul className="space-y-1 text-sm text-gray-600">
              {Object.entries(difficultyStats).map(([level, count]) => (
                <li key={level} className="flex justify-between capitalize">
                  <span>{level}</span>
                  <span className="font-medium">{count}</span>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyText text="No data available" />
          )}
        </div>
      </div>
    </div>
  );
};

/* ---------- Small UI Helpers ---------- */

const StatCard = ({ label, value, color = "gray" }) => {
  const colorMap = {
    green: "text-green-600",
    yellow: "text-yellow-600",
    gray: "text-gray-700",
  };

  return (
    <div className="rounded border bg-gray-50 p-3 text-center">
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`text-lg font-semibold ${colorMap[color]}`}>{value}</p>
    </div>
  );
};

const EmptyText = ({ text }) => (
  <p className="text-sm text-gray-500 italic">{text}</p>
);

export default WeeklySummary;
