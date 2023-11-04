import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import TaskCard from "./task-card/TaskCard";
import { TaskTypes } from "../../../types/types";

interface TasksProps {
  tasks: TaskTypes[];
}

export default function Tasks({ tasks }: TasksProps) {
  return tasks.length > 0 ? (
    <div className="w-full mt-6 flex flex-col gap-3">
      {tasks.map((task, index) => (
        <TaskCard key={index} taskName={task.taskName} />
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
