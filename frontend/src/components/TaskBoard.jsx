import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    completion_rate: 0,
    current_streak: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_BASE}/tasks`);
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks");
      console.error(err);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE}/tasks/stats`);
      if (!response.ok) throw new Error("Failed to fetch stats");
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTaskTitle }),
      });

      if (!response.ok) throw new Error("Failed to add task");

      setNewTaskTitle("");
      await fetchTasks();
      await fetchStats();
    } catch (err) {
      setError("Failed to add task");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = async (taskId, currentStatus) => {
    const previousTasks = [...tasks];
    const wasAllComplete = tasks.every((t) => t.completed);

    try {
      // Optimistic update
      setTasks(
        tasks.map((t) =>
          t.id === taskId ? { ...t, completed: !currentStatus } : t
        )
      );

      const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !currentStatus }),
      });

      if (!response.ok) throw new Error("Failed to update task");

      await fetchStats();

      // Check if all tasks are now complete (and weren't before)
      const updatedTasks = await fetch(`${API_BASE}/tasks`).then((r) =>
        r.json()
      );
      const allComplete =
        updatedTasks.length > 0 && updatedTasks.every((t) => t.completed);

      if (allComplete && !wasAllComplete) {
        triggerCelebration();
      }
    } catch (err) {
      setTasks(previousTasks);
      setError("Failed to update task");
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    const previousTasks = [...tasks];

    try {
      setTasks(tasks.filter((t) => t.id !== taskId));

      const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete task");

      await fetchStats();
    } catch (err) {
      setTasks(previousTasks);
      setError("Failed to delete task");
      console.error(err);
    }
  };

  const triggerCelebration = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 0,
      colors: ["#FF0000", "#000000", "#FFFFFF"],
      shapes: ["square", "circle"],
    };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const completionPercentage = stats.completion_rate;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-7xl font-display font-bold mb-4 tracking-tight">
          <span className="bg-brutal-black text-brutal-white px-6 py-3 inline-block transform -rotate-1 border-4 border-brutal-black shadow-brutal-lg">
            TASK
          </span>
          <span className="bg-brutal-red text-brutal-white px-6 py-3 inline-block transform rotate-1 border-4 border-brutal-black shadow-brutal-lg ml-2">
            BOARD
          </span>
        </h1>
        <p className="text-xl font-mono font-bold mt-6 uppercase tracking-wider">
          GET. STUFF. DONE. 💀
        </p>
      </div>

      {/* Main Card */}
      <div className="brutal-card p-8 mb-8 animate-slide-up">
        {/* Stats Bar */}
        <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="brutal-stat p-6">
            <div className="text-5xl font-display font-bold">{stats.total}</div>
            <div className="text-sm font-mono uppercase tracking-wider mt-2">
              Total
            </div>
          </div>
          <div className="brutal-stat-black p-6">
            <div className="text-5xl font-display font-bold">
              {stats.completed}
            </div>
            <div className="text-sm font-mono uppercase tracking-wider mt-2">
              Done
            </div>
          </div>
          <div className="brutal-stat p-6">
            <div className="text-5xl font-display font-bold">
              {stats.pending}
            </div>
            <div className="text-sm font-mono uppercase tracking-wider mt-2">
              Pending
            </div>
          </div>
          <div className="brutal-stat-black p-6">
            <div className="text-5xl font-display font-bold">
              🔥 {stats.current_streak}
            </div>
            <div className="text-sm font-mono uppercase tracking-wider mt-2">
              Streak
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 brutal-card p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-mono font-bold uppercase">
              Progress
            </span>
            <span className="text-3xl font-display font-bold bg-brutal-red text-brutal-white px-4 py-1 border-2 border-brutal-black">
              {completionPercentage.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-brutal-gray border-4 border-brutal-black h-10 relative overflow-hidden">
            <div
              className="h-full bg-brutal-red border-r-4 border-brutal-black transition-all duration-500 ease-out flex items-center justify-end pr-2"
              style={{ width: `${completionPercentage}%` }}
            >
              {completionPercentage > 10 && (
                <span className="font-mono font-bold text-brutal-white text-xs uppercase">
                  ▶
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Add Task Form */}
        <form onSubmit={handleAddTask} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="TYPE YOUR TASK HERE..."
              className="flex-1 brutal-input px-6 py-4 text-lg uppercase placeholder:text-brutal-gray-dark"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !newTaskTitle.trim()}
              className="brutal-button px-8 py-4 text-brutal-white text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-brutal"
            >
              {loading ? "..." : "ADD +"}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mb-4 brutal-card p-4 bg-brutal-red text-brutal-white animate-shake">
            <p className="font-mono font-bold uppercase">{error}</p>
          </div>
        )}

        {/* Task List */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-16 brutal-card">
              <div className="text-8xl mb-6">📋</div>
              <p className="text-2xl font-display font-bold uppercase">
                No Tasks Yet!
              </p>
              <p className="text-lg font-mono mt-2">
                Add one above to start crushing it
              </p>
            </div>
          ) : (
            tasks.map((task, index) => (
              <div
                key={task.id}
                className="group flex items-center gap-4 p-6 brutal-card-hover animate-pop"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Checkbox */}
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleTask(task.id, task.completed)}
                    className="w-8 h-8 border-4 border-brutal-black cursor-pointer appearance-none checked:bg-brutal-red checked:border-brutal-black focus:outline-none focus:ring-4 focus:ring-brutal-red focus:ring-offset-2"
                    id={`task-${task.id}`}
                  />
                  {task.completed && (
                    <label
                      htmlFor={`task-${task.id}`}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <span className="text-brutal-white text-2xl font-bold leading-none">
                        ✓
                      </span>
                    </label>
                  )}
                </div>

                {/* Task Title */}
                <span
                  className={`flex-1 text-xl font-display font-bold transition-all uppercase ${
                    task.completed
                      ? "line-through text-brutal-gray-dark"
                      : "text-brutal-black"
                  }`}
                >
                  {task.title}
                </span>

                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 px-6 py-3 bg-brutal-black text-brutal-white border-4 border-brutal-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-brutal-sm transition-all duration-100 font-mono font-bold uppercase text-sm"
                >
                  DELETE
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Message */}
        {tasks.length > 0 && stats.current_streak >= 3 && (
          <div className="mt-8 text-center brutal-card bg-brutal-red p-6">
            <p className="text-brutal-white font-display font-bold text-2xl uppercase animate-pulse">
              🔥 {stats.current_streak}-TASK STREAK! UNSTOPPABLE! 🔥
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
