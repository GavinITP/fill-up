export default function Button({
  color,
  label,
  onClick,
  isBold = false,
}: {
  color: string;
  label: string;
  onClick: () => void;
  isBold?: boolean;
}) {
  let colorStyle: string = "";

  if (color === "red") colorStyle = "bg-newred-500 text-white";
  else if (color === "yellow") colorStyle = "bg-newyellow-800 text-white";
  else if (color === "green") colorStyle = "bg-lightgreen-500 text-white";
  else if (color === "blue") colorStyle = "bg-lightblue-700 text-white";
  else if (color === "gray") colorStyle = "bg-newgray-400 text-white";
  else if (color === "blue-line")
    colorStyle = "border-2 border-lightblue-500 bg-white text-lightblue-500";

  const fontWeight: string = isBold ? "font-bold" : "font-normal";

  return (
    <button
      className={`w-full rounded-lg px-6 py-3 text-lg ${fontWeight} hover:shadow-lg ${colorStyle} box-border`}
      onClick={() => {
        onClick();
      }}
    >
      {label}
    </button>
  );
}
