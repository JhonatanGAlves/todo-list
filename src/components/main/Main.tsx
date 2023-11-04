import SearchBox from "./searchbox/SearchBox";
import Tasks from "./tasks/Tasks";

export default function Main() {
  return (
    <main className="flex justify-center">
      <div className="flex flex-col items-center px-6 w-full min-[640px]:w-[39.875rem]">
        <SearchBox />

        <div className="flex justify-between pt-16 w-full">
          <div className="flex items-center gap-2">
            <label className="text-blue font-bold text-sm">Created tasks</label>
            <span className="py-0.5 px-2 bg-gray-400 text-gray-200 font-bold text-xs rounded-full">
              0
            </span>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-purple font-bold text-sm">Completed</label>
            <span className="py-0.5 px-2 bg-gray-400 text-gray-200 font-bold text-xs rounded-full">
              0
            </span>
          </div>
        </div>

        <Tasks />
      </div>
    </main>
  );
}
