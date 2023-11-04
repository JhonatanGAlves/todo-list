import { TrashIcon } from "@heroicons/react/24/outline";
import { TaskTypes } from "../../../../types/types";

interface TaskCardProps {
  taskName: string;
  index: number;
  isChecked: boolean;
  tasks: TaskTypes[];
  setTasks: (tasks: TaskTypes[]) => void;
}

export default function TaskCard({
  taskName,
  index,
  isChecked,
  tasks,
  setTasks,
}: TaskCardProps) {
  const handleCompletedTask = (index: number) => {
    const currentTasks = [...tasks];
    currentTasks[index].completed = !currentTasks[index].completed;

    setTasks(currentTasks);
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
        onChange={() => handleCompletedTask(index)}
      />
      <span
        className={`px-3 flex-1 ${
          isChecked
            ? "line-through text-gray-300"
            : "no-underline text-gray-100"
        }`}
      >
        {taskName}
      </span>
      <button className="outline-none self-start py-[5px] px-1.5 text-gray-300 hover:text-danger hover:bg-gray-400 hover:rounded transition-all">
        <TrashIcon width={18} />
      </button>
    </div>
  );
}
