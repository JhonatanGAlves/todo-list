import { TrashIcon } from "@heroicons/react/24/outline";

export default function TaskCard() {
  return (
    <div className="w-full flex justify-between p-4 bg-gray-500 rounded-lg border border-solid border-gray-500">
      <input
        className="checked appearance-none outline-none cursor-pointer w-[1.125rem] h-[1.125rem] self-start mt-1.5 rounded-full relative border border-solid border-blue hover:border-blue-dark hover:bg-blue-dark/20 checked::before:text-gray-100 checked:bg-purple-dark checked:border-purple-dark checked:hover:bg-purple checked:hover:border-purple checked:before:content-['\2713'] checked:before:text-[0.85rem] checked:before:text-gray-100 checked:before:absolute checked:before:right-[1px] checked:before:top-[-2px] transition-all"
        type="checkbox"
      />
      <span className="text-gray-100 px-3 flex-1">
        Integer urna interdum massa libero auctor neque turpis turpis semper.
        Duis vel sed fames integer.
      </span>
      <button className="outline-none self-start py-[5px] px-1.5 text-gray-300 hover:text-danger hover:bg-gray-400 hover:rounded transition-all">
        <TrashIcon width={18} />
      </button>
    </div>
  );
}
