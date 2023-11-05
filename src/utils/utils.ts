import { TaskTypes } from "../types/types";

export const validateTaskName = (
  newTaskName: string,
  tasks: TaskTypes[]
): boolean => {
  return [...tasks].some((task) => task.taskName === newTaskName);
};
