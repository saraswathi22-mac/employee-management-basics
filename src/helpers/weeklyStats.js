export const getWeeklyStats = (tasks) => ({
  total: tasks.length,
  done: tasks.filter((t) => t.status === "done").length,
  skipped: tasks.filter((t) => t.status === "skipped").length,
  todo: tasks.filter((t) => t.status === "todo").length,
});

export const groupByKey = (tasks, key) =>
  tasks.reduce((acc, task) => {
    acc[task[key]] = (acc[task[key]] || 0) + 1;
    return acc;
  }, {});
