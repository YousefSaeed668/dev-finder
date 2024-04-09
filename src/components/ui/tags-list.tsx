import { Badge } from "./badge";
export function splitTags(tags: string) {
  return tags.split(",").map((tag) => tag.trim());
}
export const TagsList = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((language) => (
        <Badge className="w-fit" key={language}>
          {language}
        </Badge>
      ))}
    </div>
  );
};
