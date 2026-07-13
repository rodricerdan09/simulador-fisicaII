"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";

import { cn } from "@/lib/utils";

interface VideoEmbedProps {
  videoId: string;
  title: string;
  duration: string;
}

export function VideoEmbed({ videoId, title, duration }: VideoEmbedProps) {
  const [open, setOpen] = useState(false);
  const thumbnail = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-4 p-3 text-left transition-colors hover:bg-slate-800/50"
      >
        <div className="relative h-20 w-32 flex-shrink-0 overflow-hidden rounded-lg">
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white">
            {duration}
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-cyan-500/90 p-2 text-slate-950 shadow-lg">
              {open ? <X className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-50">{title}</p>
          <p className="text-xs text-slate-500">Ver en YouTube</p>
        </div>
      </button>

      <div
        className={cn(
          "grid transition-all duration-300",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="aspect-video w-full border-t border-slate-800">
            {open && (
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
