
import  { Dispatch, SetStateAction, useState } from "react";

const Tags = ({
  tags,
  setTags,
}: {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
}) => {
  const [tag, setTag] = useState("");
  const handleDeleteTag = (i: number) => {
    setTags((prev) => [...prev.slice(0, i), ...prev.slice(i + 1, prev.length)]);
  };
  return (
    <div>
      <div className="flex flex-wrap gap-1 mt-2">
        {tags.map((tag, i) => {
          return (
            <span className="bg-slate-500 text-white rounded-md px-2" key={i}>
              #{tag}{" "}
              <span
                className="text-red-300 cursor-pointer"
                onClick={() => handleDeleteTag(i)}
              >
                X
              </span>
            </span>
          );
        })}
      </div>

      <input
        value={tag}
        onChange={(e) => {
          if (tags.length === 5) return;
          setTag(e.target.value);
        }}
        onKeyDown={(e) => {
          if (tags.length === 5) return;
          if (e.key === "Enter" || e.key === " ") {
            setTags([...tags, tag]);
            setTag("");
          }
        }}
        className="rounded-md border-[1px] mb-3 p-2 text-black border-gray focus:outline-none w-full text-lg mt-2"
        type="text"
        placeholder={
          tags.length === 5
            ? "Max tag reached"
            : "tags: click enter/space to separate"
        }
      />
    </div>
  );
};

export default Tags;
