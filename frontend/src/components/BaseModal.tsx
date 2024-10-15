export default function BaseModal(props: {
  children: JSX.Element;
  isOpened: boolean;
  onClose: () => void;
}) {
  return (
    props.isOpened && (
      <div className="fixed inset-0 z-[98] flex h-screen w-screen items-center justify-center">
        <div className="absolute z-[99] rounded-xl bg-white shadow-lg">
          {props.children}
        </div>
        <div
          className="z-[98] h-full w-full bg-[#00000020] backdrop-blur-sm"
          onClick={props.onClose}
        />
      </div>
    )
  );
}
