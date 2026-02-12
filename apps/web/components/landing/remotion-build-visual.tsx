"use client";

import { useMemo } from "react";
import { Player } from "@remotion/player";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { cn } from "@/lib/utils";

const BuildLogLine = ({ text, color = "text-neutral-400", delay }: { text: string; color?: string; delay: number }) => {
  const frame = useCurrentFrame();
  const opacity = Math.min(1, Math.max(0, (frame - delay) / 10));

  return (
    <div style={{ opacity }} className={cn("font-mono text-[10px]", color)}>
      {text}
    </div>
  );
};

const TerminalScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logs = [
    { text: "> git clone https://github.com/user/project", delay: 0, color: "text-blue-400" },
    { text: "Cloning into 'project'...", delay: 15 },
    { text: "remote: Enumerating objects: 142, done.", delay: 30 },
    { text: "remote: Total 142 (delta 3), reused 0 (delta 0)", delay: 45 },
    { text: "Receiving objects: 100% (142/142), done.", delay: 60, color: "text-green-400" },
    { text: "> npm install", delay: 80, color: "text-yellow-400" },
    { text: "added 864 packages in 2s", delay: 110 },
    { text: "> npm run build", delay: 130, color: "text-purple-400" },
    { text: "vite v5.0.0 building for production...", delay: 150 },
    { text: "transforming...", delay: 165 },
    { text: "✓ 42 modules transformed.", delay: 180, color: "text-green-400" },
    { text: "rendering chunks...", delay: 200 },
    { text: "dist/index.html   0.45 kB │ gzip: 0.28 kB", delay: 220 },
    { text: "dist/assets/index.js   142.3 kB │ gzip: 42.1 kB", delay: 235 },
    { text: "✓ built in 542ms", delay: 250, color: "text-green-400 font-bold" },
    { text: "Deploying to edge...", delay: 270, color: "text-blue-400" },
    { text: "✓ Deployment complete: https://project.launchdrop.nayalsaurav.in", delay: 300, color: "text-green-400 font-bold" },
  ];

  // Scroll effect
  const translateY = Math.max(0, (frame - 100) * 0.5); // Start scrolling later

  return (
    <AbsoluteFill className="bg-neutral-950 p-4 font-mono text-neutral-400">
      <div className="flex flex-col gap-1" style={{ transform: `translateY(-${translateY}px)` }}>
        {logs.map((log, i) => (
          <BuildLogLine key={i} text={log.text} color={log.color} delay={log.delay} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const RemotionBuildVisual = () => {
  return (
    <div className="overflow-hidden rounded-xl border bg-neutral-950 shadow-xl dark:bg-black w-full max-w-[320px]">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-3 py-2">
        <div className="size-2 rounded-full bg-red-500/50" />
        <div className="size-2 rounded-full bg-yellow-500/50" />
        <div className="size-2 rounded-full bg-green-500/50" />
        <div className="ml-2 text-[10px] text-neutral-500 font-mono">build-log.txt</div>
      </div>
      <div className="relative aspect-[4/3] w-full">
        <Player
          component={TerminalScene}
          durationInFrames={350}
          compositionWidth={320}
          compositionHeight={240}
          fps={30}
          loop
          autoPlay
          controls={false}
          className="size-full"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};
