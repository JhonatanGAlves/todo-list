import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

import TaskCard from "./task-card/TaskCard";
import { MessageErrorTypes, TaskTypes } from "../../../types/types";

interface TasksProps {
  tasks: TaskTypes[];
  setTasks: (task: TaskTypes[]) => void;
  setShowUpdatedTaskNotificationAlert: (show: boolean) => void;
  setShowCompletedTaskNotificationAlert: (show: boolean) => void;
  setShowDeletedTaskNotificationAlert: (show: boolean) => void;
  setShowError: (showError: MessageErrorTypes) => void;
}

export default function Tasks({
  tasks,
  setTasks,
  setShowUpdatedTaskNotificationAlert,
  setShowCompletedTaskNotificationAlert,
  setShowDeletedTaskNotificationAlert,
  setShowError,
}: TasksProps) {
  return tasks.length > 0 ? (
    <div className="w-full mt-6 flex flex-col gap-3">
      {tasks.map((task, index) => (
        <TaskCard
          key={index}
          index={index}
          taskName={task.taskName}
          isChecked={task.completed}
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
      ))}
    </div>
  ) : (
    <div className="w-full mt-6 py-16 border-t border-solid border-gray-400 rounded-lg">
      <div className="mx-auto flex flex-col items-center gap-4 text-gray-300">
        <ClipboardDocumentListIcon width={56} />
        <p className="text-center">
          <b>You don't have tasks registered yet</b>
          <br />
          Create tasks and organize your to-do items
        </p>
      </div>
    </div>
  );
}
