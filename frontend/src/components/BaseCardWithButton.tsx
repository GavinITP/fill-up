import Button, { ButtonProps } from "./Button";

export default function BaseCardWithButton(props: {
  children: JSX.Element;
  buttonList: ButtonProps[];
}) {
  return (
    <div className="border-newgray-200 flex w-full flex-row items-start justify-between divide-x-2 rounded-xl border bg-white shadow-lg hover:shadow-xl">
      {props.children}
      <div className="flex w-[12.5rem] flex-col items-center justify-between gap-3 px-4 py-6">
        {props.buttonList.map((button) => {
          return <Button {...button} />;
        })}
      </div>
    </div>
  );
}
