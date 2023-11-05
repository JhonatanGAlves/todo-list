import { useState } from "react";

import {
  ArrowPathRoundedSquareIcon,
  ArrowRightOnRectangleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import { MessageErrorTypes, TaskTypes } from "../../../../types/types";
import { validateTaskName } from "../../../../utils/utils";

interface TaskCardProps {
  taskName: string;
  index: number;
  isChecked: boolean;
  tasks: TaskTypes[];
  setTasks: (tasks: TaskTypes[]) => void;
  setShowUpdatedTaskNotificationAlert: (show: boolean) => void;
  setShowCompletedTaskNotificationAlert: (show: boolean) => void;
  setShowDeletedTaskNotificationAlert: (show: boolean) => void;
  setShowError: (showError: MessageErrorTypes) => void;
}

export default function TaskCard({
  taskName,
  index,
  isChecked,
  tasks,
  setTasks,
  setShowUpdatedTaskNotificationAlert,
  setShowCompletedTaskNotificationAlert,
  setShowDeletedTaskNotificationAlert,
  setShowError,
}: TaskCardProps) {
  const [editingTask, setEditingTask] = useState(false);
  const [newTaskName, setNewTaskName] = useState(taskName);

  const updateTask = (index: number, newName?: string) => {
    const currentTasks = [...tasks];

    if (newName) {
      const isThereAlreadyATaskWithTheSameName = validateTaskName(
        newName,
        tasks
      );

      if (isThereAlreadyATaskWithTheSameName) {
        return setShowError({
          message: "A task with the same name already exists!",
          error: true,
        });
      }

      currentTasks[index].taskName = newName;
      setEditingTask(false);
      setShowUpdatedTaskNotificationAlert(true);
    } else {
      currentTasks[index].completed = !currentTasks[index].completed;

      currentTasks[index].completed &&
        setShowCompletedTaskNotificationAlert(true);
    }

    setTasks(currentTasks);
    localStorage.setItem("tasks", JSON.stringify([...currentTasks]));
  };

  const deleteTask = (index: number) => {
    const tasksWithoutTheTaskDeleted = [...tasks].filter(
      (_, idx) => idx !== index
    );

    setTasks(tasksWithoutTheTaskDeleted);
    localStorage.setItem(
      "tasks",
      JSON.stringify([...tasksWithoutTheTaskDeleted])
    );
    setShowDeletedTaskNotificationAlert(true);
  };

  return (
    <div
      className={`${
        isChecked ? "border-gray-500" : "border-gray-400"
      } w-full flex justify-between p-4 bg-gray-500 hover:bg-gray-500/80 transition-all rounded-lg border border-solid border-gray-400`}
    >
      <input
        className="appearance-none outline-none cursor-pointer w-[1.125rem] h-[1.125rem] self-start mt-1.5 rounded-full relative border border-solid border-blue hover:border-blue-dark hover:bg-blue-dark/20 checked::before:text-gray-100 checked:bg-purple-dark checked:border-purple-dark checked:hover:bg-purple checked:hover:border-purple checked:before:content-['\2713'] checked:before:text-[0.85rem] checked:before:text-gray-100 checked:before:absolute checked:before:right-[1px] checked:before:top-[-2px] transition-all"
        type="checkbox"
        checked={isChecked}
        onChange={() => updateTask(index)}
      />
      {editingTask ? (
        <input
          className="mx-3 px-2 flex-1 outline-none rounded-sm text-gray-200 bg-gray-400/30 border border-solid border-gray-400"
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
        />
      ) : (
        <span
          className={`px-3 flex-1 ${
            isChecked
              ? "line-through text-gray-300"
              : "no-underline text-gray-100"
          }`}
        >
          {taskName}
        </span>
      )}
      <button
        className={`${
          editingTask &&
          newTaskName === taskName &&
          "text-gray-300/60 hover:text-gray-300/60 hover:bg-opacity-0 cursor-not-allowed"
        } outline-none self-start py-[5px] px-1.5 text-gray-300 hover:text-blue hover:bg-gray-400 hover:rounded transition-all`}
        onClick={() => {
          newTaskName !== taskName
            ? updateTask(index, newTaskName)
            : setEditingTask(true);
        }}
        disabled={editingTask && newTaskName === taskName}
      >
        {editingTask ? (
          <ArrowPathRoundedSquareIcon width={18} />
        ) : (
          <PencilSquareIcon width={18} />
        )}
      </button>

      {editingTask && (
        <button
          className={`outline-none self-start py-[5px] px-1.5 text-gray-300 hover:text-blue hover:bg-gray-400 hover:rounded transition-all`}
          onClick={() => {
            setEditingTask(false);
            setNewTaskName(taskName);
          }}
        >
          <ArrowRightOnRectangleIcon width={18} />
        </button>
      )}

      <button
        className="outline-none self-start py-[5px] px-1.5 text-gray-300 hover:text-danger hover:bg-gray-400 hover:rounded transition-all"
        onClick={() => deleteTask(index)}
      >
        <TrashIcon width={18} />
      </button>
    </div>
  );
}
