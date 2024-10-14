import Tag from "./Tag";

export default function TemperatureTag(props: { label: string }) {
  let color = "gray";

  if (props.label === "ร้อน") color = "red";
  else if (props.label === "เย็น") color = "blue";
  else if (props.label === "อุณหภูมิห้อง") color = "green";

  return <Tag color={color} label={props.label} />;
}
