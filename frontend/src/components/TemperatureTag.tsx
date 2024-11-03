import Tag from "./Tag";

export default function TemperatureTag({ label }: { label: string }) {
  const labelMap: { [key: string]: string } = {
    "hot": "ร้อน",
    "cold": "เย็น",
    "room temperature": "อุณหภูมิห้อง",
  };

  const colorMap: { [key: string]: string } = {
    "ร้อน": "red",
    "เย็น": "blue",
    "อุณหภูมิห้อง": "green",
  };

  const translatedLabel = labelMap[label] || label;

  const color = colorMap[translatedLabel] || "gray";

  return <Tag color={color} label={translatedLabel} />;
}
