import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface TextBoxProps {
  title?: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  disabled?: boolean; // `boolean` in lowercase
}

export default function TextBox({
  title,
  setInputValue,
  disabled = false, // Default value for `disabled` here
}: TextBoxProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // Pass input value to the parent
  };

  return (
    <div className="flex w-full flex-col items-start justify-start gap-1">
      {title && <h6 className="text-lg font-normal text-black">{title}</h6>}
      <input
        type="text"
        className="w-full rounded-md border border-gray-300 p-2 focus:outline-sky-500"
        placeholder="Enter text here"
        onChange={handleChange} // Trigger on change
        disabled={disabled}
      />
    </div>
  );
}
