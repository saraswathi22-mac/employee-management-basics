import { getWeeklyStats, groupByKey } from "../helpers/weeklyStats";

const WeeklySummary = ({ tasks, weekId }) => {
  const stats = getWeeklyStats(tasks);
  const techStackStats = groupByKey(tasks, "techStack");
  const difficultyStats = groupByKey(tasks, "difficulty");

  return (
    <div className="mt-10 bg-gray-100 p-5 rounded">
      <p className="text-sm text-gray-600">
        Weekly Summary ({weekId})
      </p>

      {/* counts + lists exactly as before */}
    </div>
  );
};

export default WeeklySummary;
