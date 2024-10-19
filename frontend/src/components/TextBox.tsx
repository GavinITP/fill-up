import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface TextBoxProps {
  title?: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
  placeholder?: string;
  isTextArea?: boolean;
}

export default function TextBox({
  title,
  setInputValue,
  disabled = false,
  placeholder,
  isTextArea = false,
}: TextBoxProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex w-full flex-col items-start justify-start gap-1">
      {title && <h6 className="text-lg font-normal text-black">{title}</h6>}
      {!isTextArea && <input
        type="text"
        className="focus:outline-lightblue-200 w-full rounded-lg border border-gray-300 p-3"
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled}
      />}
      {isTextArea && <textarea
        className="focus:outline-lightblue-200 w-full rounded-lg border border-gray-300 p-3"
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled}
      />}
    </div>
  );
}
