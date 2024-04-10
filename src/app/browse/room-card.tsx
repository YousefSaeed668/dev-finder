"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TagsList } from "@/components/tags-list";
import { Room } from "@/db/schema";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { splitTags } from "@/lib/utils";
export function RoomCard({ room }: { room: Room }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <TagsList tags={splitTags(room.tags)} />

        {room.githubRepo && (
          <Link
            href={room.githubRepo}
            target="_blank"
            rel="noopener noreferrer" // for security when use target="_blank"
            className="flex items-center gap-2"
          >
            <GithubIcon />
            Github Project
          </Link>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
