import { useState } from "react";

import {
  ArrowPathRoundedSquareIcon,
  ArrowRightOnRectangleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import { MessageAlertTypes, TaskTypes } from "../../../../types/types";
import { validateTaskName } from "../../../../utils/utils";

interface TaskCardProps {
  taskName: string;
  index: number;
  isChecked: boolean;
  tasks: TaskTypes[];
  setTasks: (tasks: TaskTypes[]) => void;
  setShowSuccessNotificationAlert: (
    showSuccessNotificationAlert: MessageAlertTypes
  ) => void;
  setShowErrorNotificationAlert: (
    showErrorNotificationAlert: MessageAlertTypes
  ) => void;
}

export default function TaskCard({
  taskName,
  index,
  isChecked,
  tasks,
  setTasks,
  setShowSuccessNotificationAlert,
  setShowErrorNotificationAlert,
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
        return setShowErrorNotificationAlert({
          message: "A task with the same name already exists!",
          description: "Please understand the message above and try again.",
          showAlert: true,
        });
      }

      currentTasks[index].taskName = newName;
      setEditingTask(false);
      setShowSuccessNotificationAlert({
        message: "The task has been updated successfully",
        description: "Now your task has a new name.",
        showAlert: true,
      });
    } else {
      currentTasks[index].completed = !currentTasks[index].completed;

      currentTasks[index].completed &&
        setShowSuccessNotificationAlert({
          message: "The task has been completed successfully",
          description: "Congratulations on completing this task.",
          showAlert: true,
        });
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
    setShowSuccessNotificationAlert({
      message: "The task has been deleted successfully",
      description: "Remember, you are capable of anything!",
      showAlert: true,
    });
  };

  return (
    <div
      className={`${
        isChecked ? "border-gray-500" : "border-gray-400"
      } w-full flex justify-between p-4 bg-gray-500 hover:bg-gray-500/80 transition-all rounded-lg border border-solid border-gray-400`}
    >
      <input
        className={`appearance-none outline-none cursor-pointer ${
          editingTask ? "w-[28.45px] min-[420px]:w-[1.125rem]" : ""
        } h-[1.125rem] w-[1.125rem] self-start mt-1.5 rounded-full relative border border-solid border-blue hover:border-blue-dark hover:bg-blue-dark/20 checked:bg-purple-dark checked:border-purple-dark checked:hover:bg-purple checked:hover:border-purple checked:before:content-['\\2713'] checked:before:text-[0.85rem] checked:before:text-gray-100 checked:before:absolute checked:before:right-[2px] checked:before:top-[-2px] transition-all`}
        type="checkbox"
        checked={isChecked}
        onChange={() => updateTask(index)}
      />
      {editingTask ? (
        <input
          className="mx-3 px-2 w-full min-[420px]:flex-1 outline-none rounded-sm text-gray-200 bg-gray-400/30 border border-solid border-gray-400"
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
