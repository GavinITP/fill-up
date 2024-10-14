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

  if (color === "red") colorStyle = "bg-red-500 text-white";
  else if (color === "yellow") colorStyle = "bg-amber-500 text-white";
  else if (color === "green") colorStyle = "bg-lime-500 text-white";
  else if (color === "blue") colorStyle = "bg-sky-600 text-white";
  else if (color === "gray") colorStyle = "bg-zinc-400 text-white";
  else if (color === "blue-line")
    colorStyle = "border-2 border-sky-600 bg-white text-sky-500";

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
