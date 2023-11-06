import { useState } from "react";

import TaskInput from "./task-input/TaskInput";
import Tasks from "./tasks/Tasks";
import { MessageAlertTypes, TaskTypes } from "../../types/types";
import GlobalNotification from "../global-notification/GlobalNotification";

export default function Main() {
  const getTasksFromStorage =
    JSON.parse(localStorage.getItem("tasks") || "[]").length > 0
      ? JSON.parse(localStorage.getItem("tasks") || "[]")
      : null;
  const [tasks, setTasks] = useState<TaskTypes[]>(getTasksFromStorage ?? []);
  const [showSuccessNotificationAlert, setShowSuccessNotificationAlert] =
    useState<MessageAlertTypes>({
      message: "",
      showAlert: false,
      description: "",
    });
  const [showErrorNotificationAlert, setShowErrorNotificationAlert] =
    useState<MessageAlertTypes>({
      message: "",
      showAlert: false,
      description: "",
    });
  const [loading, setLoading] = useState(false);

  const createTask = (newTaskName: string) => {
    const newTask = {
      taskName: newTaskName,
      completed: false,
      createdAt: new Date(),
    };

    const randomTimeout = Math.floor(Math.random() * 1000) + 1000; // from 1000 to 2000

    setTimeout(() => {
      setTasks([...tasks, newTask]);
      localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
      setShowSuccessNotificationAlert({
        message: "The task has been created successfully",
        description: "Let's go! Focus on your goals.",
        showAlert: true,
      });
      setLoading(false);
    }, randomTimeout);
  };

  return (
    <main className="flex justify-center pb-16 bg-gray-600">
      <div className="flex flex-col items-center -mt-7 px-6 w-full min-[640px]:w-[39.875rem]">
        <TaskInput
          createTask={createTask}
          tasks={tasks}
          setShowErrorNotificationAlert={setShowErrorNotificationAlert}
          loading={loading}
          setLoading={setLoading}
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
          setShowSuccessNotificationAlert={setShowSuccessNotificationAlert}
          setShowErrorNotificationAlert={setShowErrorNotificationAlert}
        />
      </div>

      <GlobalNotification
        show={showSuccessNotificationAlert.showAlert}
        message={showSuccessNotificationAlert.message}
        description={showSuccessNotificationAlert.description}
        onClose={(close) =>
          setShowSuccessNotificationAlert({
            message: "",
            showAlert: close,
            description: "",
          })
        }
      />
      <GlobalNotification
        show={showErrorNotificationAlert.showAlert}
        message={showErrorNotificationAlert.message}
        description={showErrorNotificationAlert.description}
        type="error"
        onClose={(close) =>
          setShowErrorNotificationAlert({
            message: "",
            showAlert: close,
            description: "",
          })
        }
      />
    </main>
  );
}
