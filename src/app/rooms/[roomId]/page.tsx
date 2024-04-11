import { Badge } from "@/components/ui/badge";
import { TagsList } from "@/components/tags-list";
import { getRoom } from "@/data-access/rooms";
import { GithubIcon, Tags } from "lucide-react";
import Link from "next/link";
import { DevFinderVideo } from "./video-player";
import { splitTags } from "@/lib/utils";
import { unstable_noStore } from "next/cache";

const RoomPage = async (props: { params: { roomId: string } }) => {
  const roomId = props.params.roomId;
  unstable_noStore();

  const room = await getRoom(roomId);
  if (!room) {
    return <div>No Room Of This ID Found</div>;
  }
  return (
    <div className="grid lg:grid-cols-4 min-h-screen overflow-auto">
      <div className="lg:col-span-3 lg:p-4 pr-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
          <DevFinderVideo room={room} />
        </div>
      </div>
      <div className=" lg:col-span-1 lg:p-4 pl-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
          <h1 className="text-base">{room.name}</h1>
          {room.githubRepo && (
            <Link
              href={room.githubRepo}
              target="_blank"
              rel="noopener noreferrer" // for security when use target="_blank"
              className="flex items-center gap-2 text-center text-sm"
            >
              <GithubIcon />
              Github Project
            </Link>
          )}
          <p className="text-base text-gray-600">{room.description}</p>
          <TagsList tags={splitTags(room.tags)} />
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
