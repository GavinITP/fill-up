export default function Button(props: {
  color: string;
  label: string;
  onClick: Function;
}) {
  let colorStyle: string = "";

  if (props.color === "red") colorStyle = "bg-red-500 text-white";
  else if (props.color === "yellow") colorStyle = "bg-amber-500 text-white";
  else if (props.color === "green") colorStyle = "bg-lime-500 text-white";
  else if (props.color === "blue") colorStyle = "bg-sky-600 text-white";
  else if (props.color === "gray") colorStyle = "bg-zinc-400 text-white";
  else if (props.color === "blue-line")
    colorStyle = "border-2 border-sky-600 bg-white text-sky-500";

  return (
    <button
      className={`w-full rounded-lg px-6 py-4 text-base font-bold hover:shadow-lg ${colorStyle} box-border`}
      onClick={() => {
        props.onClick();
      }}
    >
      {props.label}
    </button>
  );
}
