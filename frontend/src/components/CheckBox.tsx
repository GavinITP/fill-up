import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface TextBoxProps {
  title?: string;
  setInputValue: Dispatch<SetStateAction<boolean>>;
  disabled?: boolean;
  subTitle?: string;
}

export default function CheckBox({
  title,
  setInputValue,
  disabled = false,
  subTitle,
}: TextBoxProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.checked);
  };
  return (
    <div className="flex w-full flex-row items-start gap-3">
      <input
        className="my-1.5 h-4 w-4 rounded-xl accent-black"
        type="checkbox"
        id="checkbox"
        onChange={handleChange}
        disabled={disabled}
      ></input>

      <div className="flex flex-col">
        <label htmlFor="checkbox" className="text-md text-black">
          {title}
        </label>
        {subTitle && <div className="text-md text-gray-400">{subTitle}</div>}
      </div>
    </div>
  );
}
