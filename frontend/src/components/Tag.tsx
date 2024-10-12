import CloseIcon from "@mui/icons-material/Close";

export default function Tag(props: {
  color: string;
  label: string;
  action?: Function;
}) {
  let colorString: string = "";

  if (props.color === "red") colorString = "bg-red-300 text-red-800";
  else if (props.color === "green") colorString = "bg-[#C5E1A5] text-[#33691E]";
  else if (props.color === "blue") colorString = "bg-sky-300 text-sky-700";
  else if (props.color === "gray") colorString = "bg-gray-200 text-black";

  return (
    <div
      className={`flex w-fit flex-row items-center justify-center gap-2 rounded-full ${props.action ? "pl-2 pr-1" : "px-3"} py-[0.3rem] text-xs font-normal ${colorString}`}
    >
      {props.label}
      {props.action && (
        <button
          className="flex items-center justify-center rounded-full bg-zinc-400 p-[0.1rem] text-gray-200"
          onClick={() => {
            if (props.action) props.action();
          }}
        >
          <CloseIcon className="text-xs" />
        </button>
      )}
    </div>
  );
}
