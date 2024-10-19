export default function Link(props: { title: string; href: string }) {
  return (
    <a
      className="text-lightblue-500 underline hover:text-lightblue-700"
      href={props.href}
    >
      {props.title}
    </a>
  );
}
