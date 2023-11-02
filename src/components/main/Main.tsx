import SearchBox from "./searchbox/SearchBox";

export default function Main() {
  return (
    <main className="flex justify-center">
      <div className="flex flex-col items-center gap-16 px-4 w-full min-[640px]:w-[39.875rem]">
        <SearchBox />
      </div>
    </main>
  );
}
