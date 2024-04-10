"use client";
import { useRouter } from "next/navigation";
import { badgeVariants } from "./badge";
import { cn } from "@/lib/utils";

export const TagsList = ({ tags }: { tags: string[] }) => {
  const router = useRouter();
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          className={cn(badgeVariants())}
          key={tag}
          onClick={() => {
            router.push(`/?search=${tag}`);
          }}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};
