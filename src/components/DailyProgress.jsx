const DailyProgress = ({ completed, total }) => {
  const percent =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="mt-6 rounded-lg border bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-800">
          Today&apos;s Progress
        </p>
        <span className="text-sm font-semibold text-gray-700">
          {percent}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mt-3">
        <div className="w-full h-2.5 rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-green-500 transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <p className="mt-2 text-xs text-gray-500">
        {completed} of {total} tasks completed today
      </p>
    </div>
  );
};

export default DailyProgress;
