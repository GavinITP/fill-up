import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface TextBoxProps {
  title?: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
  placeholder?: string;
  isTextArea?: boolean;
  isNumber?: boolean;
  numberMin?: number;
  numberMax?: number;
}

export default function TextBox({
  title,
  setInputValue,
  disabled = false,
  placeholder,
  isTextArea = false,
  isNumber = false,
  numberMin,
  numberMax
}: TextBoxProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const enforceMinMax = (el: { value: string; min: string; max: string; }) => {
    if (el.value != "") {
      if (parseInt(el.value) < parseInt(el.min)) {
        el.value = el.min;
      }
      if (parseInt(el.value) > parseInt(el.max)) {
        el.value = el.max;
      }
    }
  }

  return (
    <div className="flex w-full flex-col items-start justify-start gap-1">
      {title && <h6 className="text-lg font-normal text-black">{title}</h6>}
      {!isTextArea && <input
        type={isNumber ? "number" : "text"}
        className="focus:outline-lightblue-200 w-full rounded-lg border border-gray-300 p-3"
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled}
        min={isNumber ? numberMin : undefined}
        max={isNumber ? numberMax : undefined}
        onKeyUp={isNumber ? (e) => enforceMinMax(e.currentTarget) : undefined}
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
