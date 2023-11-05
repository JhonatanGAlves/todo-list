import { useState } from "react";

import TaskInput from "./task-input/TaskInput";
import Tasks from "./tasks/Tasks";
import { TaskTypes } from "../../types/types";

export default function Main() {
  const getTasksFromStorage =
    JSON.parse(localStorage.getItem("tasks") || "[]").length > 0
      ? JSON.parse(localStorage.getItem("tasks") || "[]")
      : null;
  const [tasks, setTasks] = useState<TaskTypes[]>(getTasksFromStorage ?? []);

  const createTask = (newTaskName: string) => {
    const newTask = {
      taskName: newTaskName,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
  };

  return (
    <main className="flex justify-center -mt-7">
      <div className="flex flex-col items-center px-6 w-full min-[640px]:w-[39.875rem]">
        <TaskInput createTask={createTask} />

        <div className="flex justify-between pt-16 w-full">
          <div className="flex items-center gap-2">
            <label className="text-blue font-bold text-sm">Created tasks</label>
            <span className="py-0.5 px-2 bg-gray-400 text-gray-200 font-bold text-xs rounded-full">
              {tasks.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-purple font-bold text-sm">Completed</label>
            <span className="py-0.5 px-2 bg-gray-400 text-gray-200 font-bold text-xs rounded-full">
              {tasks.length > 0
                ? `${tasks.filter((task) => task.completed).length} of ${
                    tasks.length
                  }`
                : 0}
            </span>
          </div>
        </div>

        <Tasks tasks={tasks} setTasks={setTasks} />
      </div>
    </main>
  );
}
