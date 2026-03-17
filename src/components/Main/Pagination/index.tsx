type PageItem =
  | { type: "page"; value: number; active?: boolean }
  | { type: "ellipsis" }
  | { type: "prev" }
  | { type: "next" };

const items: PageItem[] = [
  { type: "prev" },
  { type: "page", value: 1, active: true },
  { type: "page", value: 2 },
  { type: "page", value: 3 },
  { type: "ellipsis" },
  { type: "page", value: 8 },
  { type: "next" },
];

export default function Pagination() {
  return (
    <div className="flex justify-center items-center gap-2">
      {items.map((item, index) => {
        if (item.type === "ellipsis") {
          return <span className="text-[#6E767D] text-[16px] leading-[6" key={index}>...</span>;
        }

        if (item.type === "prev") {
          return <button className="w-9 h-9 flex justify-start items-center" key={index}>
            <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 10L0 5L5 0L6.16667 1.16667L2.33333 5L6.16667 8.83333L5 10Z" fill="#6E767D"/>
            </svg>

          </button>;
        }

        if (item.type === "next") {
          return <button className="w-9 h-9 flex justify-end items-center" key={index}>
            <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.83333 5L0 1.16667L1.16667 0L6.16667 5L1.16667 10L0 8.83333L3.83333 5Z" fill="#6E767D"/>
            </svg>
          </button>;
        }

        return (
            <button
                key={index}
                className={`w-9 h-9 rounded-full border-none cursor-pointer flex items-center justify-center ${item.active ? "bg-[#2196f3] text-white shadow-[0_6px_14px_rgba(59,130,246,0.45)]" : "bg-transparent text-[#333]"}`}
            >
                {item.value}
            </button>
        );
      })}
    </div>
  );
}