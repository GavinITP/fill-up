import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface TextBoxProps {
  title?: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
  placeholder?: string;
}

export default function TextBox({
  title,
  setInputValue,
  disabled = false,
  placeholder,
}: TextBoxProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex w-full flex-col items-start justify-start gap-1">
      {title && <h6 className="text-lg font-normal text-black">{title}</h6>}
      <input
        type="text"
        className="w-full rounded-lg border border-gray-300 p-3 focus:outline-sky-500"
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
}
