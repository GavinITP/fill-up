import { ChangeEvent } from "react";
import BaseModal from "./BaseModal";

export default function BaseModalWithInput(props: {
  children: JSX.Element; //for action button
  title: string;
  instruction: string;
  textInput: string;
  disabled: boolean;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  isOpened: boolean;
  onClose: () => void;
  color: string;
}) {
  return (
    <BaseModal isOpened={props.isOpened} onClose={props.onClose}>
      <div className="flex h-fit w-[40vw] flex-col items-start justify-between gap-4 p-6">
        <h2
          className={`text-3xl font-bold ${props.color === "red" ? "text-newred-500" : "text-lightblue-900"}`}
        >
          {props.title}
        </h2>
        <div className="flex w-full flex-col gap-1">
          <span className="text-base font-normal text-zinc-500">
            {props.instruction}
          </span>
          <textarea
            id="message"
            rows={6}
            className="w-full rounded-lg border border-gray-300 p-2.5 text-base text-black"
            disabled={props.disabled}
            value={props.textInput}
            onChange={props.onChange}
          />
        </div>
        <div className="mt-4 flex w-full flex-row justify-end gap-2">
          {props.children}
        </div>
      </div>
    </BaseModal>
  );
}
