import CloseIcon from "@mui/icons-material/Close";

export default function Tag(props: {
  color: string;
  label: string;
  action?: Function;
}) {
  let colorString: string = "";

  if (props.color === "red") colorString = "bg-newred-200 text-newred-900";
  else if (props.color === "green")
    colorString = "bg-lightgreen-200 text-lightgreen-900";
  else if (props.color === "blue")
    colorString = "bg-lightblue-200 text-lightblue-900";
  else if (props.color === "gray") colorString = "bg-newgray-200 text-black";

  return (
    <div
      className={`flex w-fit flex-row items-center justify-center gap-2 rounded-full ${props.action ? "pl-2 pr-1" : "px-3"} py-[0.3rem] text-xs font-normal ${colorString}`}
    >
      {props.label}
      {props.action && (
        <button
          className="text-newgray-200 flex items-center justify-center rounded-full bg-zinc-400 p-[0.1rem]"
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
