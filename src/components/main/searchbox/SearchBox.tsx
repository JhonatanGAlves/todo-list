import { PlusCircleIcon } from "@heroicons/react/24/outline";

export default function SearchBox() {
  return (
    <div className="flex gap-2 w-full">
      <input
        className="outline-none border border-solid border-gray-700 rounded-lg w-full p-4 text-gray-100 placeholder:text-gray-300 bg-gray-500"
        type="search"
        name="search-box"
        placeholder="Add a new task"
      />
      <button className="text-gray-100 flex justify-center items-center gap-2 p-4 bg-blue-dark hover:bg-blue transition-all rounded-lg">
        <span className="font-bold text-sm">Create</span>
        <PlusCircleIcon width={16} strokeWidth={2.5} />
      </button>
    </div>
  );
}
