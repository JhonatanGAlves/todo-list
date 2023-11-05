import { useState } from "react";

import TaskInput from "./task-input/TaskInput";
import Tasks from "./tasks/Tasks";
import { TaskTypes } from "../../types/types";
import GlobalNotification from "../global-notification/GlobalNotification";

export default function Main() {
  const getTasksFromStorage =
    JSON.parse(localStorage.getItem("tasks") || "[]").length > 0
      ? JSON.parse(localStorage.getItem("tasks") || "[]")
      : null;
  const [tasks, setTasks] = useState<TaskTypes[]>(getTasksFromStorage ?? []);

  // Notification Alerts
  const [
    showCreatedTaskNotificationAlert,
    setShowCreatedTaskNotificationAlert,
  ] = useState<boolean>(false);
  const [
    showUpdatedTaskNotificationAlert,
    setShowUpdatedTaskNotificationAlert,
  ] = useState<boolean>(false);
  const [
    showCompletedTaskNotificationAlert,
    setShowCompletedTaskNotificationAlert,
  ] = useState<boolean>(false);
  const [
    showDeletedTaskNotificationAlert,
    setShowDeletedTaskNotificationAlert,
  ] = useState<boolean>(false);
  const [showError, setShowError] = useState<{
    message: string;
    error: boolean;
  }>({ message: "", error: false });

  const createTask = (newTaskName: string) => {
    const newTask = {
      taskName: newTaskName,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
    setShowCreatedTaskNotificationAlert(true);
  };

  return (
    <main className="flex justify-center pb-16 bg-gray-600">
      <div className="flex flex-col items-center -mt-7 px-6 w-full min-[640px]:w-[39.875rem]">
        <TaskInput
          createTask={createTask}
          tasks={tasks}
          setShowError={setShowError}
        />

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

        <Tasks
          tasks={tasks}
          setTasks={setTasks}
          setShowUpdatedTaskNotificationAlert={
            setShowUpdatedTaskNotificationAlert
          }
          setShowCompletedTaskNotificationAlert={
            setShowCompletedTaskNotificationAlert
          }
          setShowDeletedTaskNotificationAlert={
            setShowDeletedTaskNotificationAlert
          }
          setShowError={setShowError}
        />
      </div>

      <GlobalNotification
        show={showCreatedTaskNotificationAlert}
        message="The task has been created successfully"
        description="Let's go! Focus on your goals."
        onClose={setShowCreatedTaskNotificationAlert}
      />
      <GlobalNotification
        show={showUpdatedTaskNotificationAlert}
        message="The task has been updated successfully"
        description="Now your task has a new name."
        onClose={setShowUpdatedTaskNotificationAlert}
      />
      <GlobalNotification
        show={showCompletedTaskNotificationAlert}
        message="The task has been completed successfully"
        description="Congratulations on completing this task."
        onClose={setShowCompletedTaskNotificationAlert}
      />
      <GlobalNotification
        show={showDeletedTaskNotificationAlert}
        message="The task has been deleted successfully"
        description="Remember, you are capable of anything!"
        onClose={setShowDeletedTaskNotificationAlert}
      />
      <GlobalNotification
        show={showError.error}
        message={showError.message}
        description="Please understand the message above and try again."
        type="error"
        onClose={(close) => setShowError({ message: "", error: close })}
      />
    </main>
  );
}
