import { Badge } from "../../ui";
export default function PropertyTags({ tags = [] }) {
  if (!tags.length) return null;
  return <div className="flex flex-wrap gap-2">{tags.map((t) => <Badge key={t} tone="primary">{t}</Badge>)}</div>;
}
