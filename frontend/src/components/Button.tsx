export interface ButtonProps {
  id?: string;
  color: string;
  label: string;
  onClick: () => void;
  isBold?: boolean;
  disabled?: boolean;
}

export default function Button({
  color,
  label,
  onClick,
  isBold = false,
  disabled = false,
}: ButtonProps) {
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
      disabled={disabled}
      className={`w-full rounded-lg px-6 py-3 text-lg ${fontWeight} box-border ${disabled ? "cursor-not-allowed bg-gray-400 text-gray-600" : `${colorStyle} hover:shadow-lg`}`}
      onClick={() => {
        onClick();
      }}
    >
      {label}
    </button>
  );
}
