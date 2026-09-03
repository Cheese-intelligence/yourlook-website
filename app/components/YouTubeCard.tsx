import H3 from "./H3";
import P from "./P";
import PillCard from "./PillCard";

interface YouTubeCardProps {
  title: string;
  description: string;
  videoId: string;
}

export function YouTubeCard({ title, description, videoId }: YouTubeCardProps) {
  return (
    <PillCard className="gap-3 grid p-5">
      <div className="space-y-1">
        <H3>{title}</H3>
        <P>{description}</P>
      </div>

      <div className="relative overflow-hidden rounded-xl bg-black/5 aspect-3/4 w-full">
        <iframe
          className="w-full h-full rounded-xl border-0"
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </PillCard>
  );
}
