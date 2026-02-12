"use client";

import { useMemo } from "react";
import { Player } from "@remotion/player";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { SearchIcon, RocketIcon, Loader2, MousePointer2, Command, Atom } from "lucide-react";
import { cn } from "@/lib/utils";

const Cursor = ({ x, y, click }: { x: number; y: number; click: boolean }) => {
    return (
        <div
            style={{
                transform: `translate(${x}px, ${y}px) scale(${click ? 0.8 : 1})`,
            }}
            className="absolute top-0 left-0 z-50 transition-transform duration-100 will-change-transform pointer-events-none"
        >
            <MousePointer2 className="size-4 fill-black text-white drop-shadow-md" />
        </div>
    );
};

const ReactSticker = () => (
    <div className="absolute bottom-2 right-4 rotate-12 opacity-80 z-20 pointer-events-none">
        <div className="size-8 rounded-full bg-[#20232a] flex items-center justify-center shadow-sm border border-white/10">
            <Atom className="size-5 text-[#61dafb] animate-[spin_10s_linear_infinite]" />
        </div>
    </div>
);

const OneClickScene = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Sequence Stages
    // 0-80: Search Engine
    // 80-100: Transition to App
    // 100-240: App Interaction (Type URL + Deploy)

    // 1. Search Engine Stage
    const searchOpacity = interpolate(frame, [80, 90], [1, 0]);
    const appOpacity = interpolate(frame, [80, 90], [0, 1]);

    const searchTerm = "launchdrop";
    const searchTypeProgress = interpolate(frame, [10, 40], [0, 1], { extrapolateRight: "clamp" });
    const currentSearch = searchTerm.substring(0, Math.floor(searchTypeProgress * searchTerm.length));

    // 2. App Interaction Stage
    // 120-180: Type Repo URL
    // 180-210: Move to Deploy
    // 210-220: Click
    // 220+: Loading

    const repoUrl = "github.com/user/project";
    const repoTypeProgress = interpolate(frame, [120, 180], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const currentRepo = repoUrl.substring(0, Math.floor(repoTypeProgress * repoUrl.length));

    const isClicked = frame >= 210 && frame < 220;
    const isDeploying = frame >= 220;
    const buttonScale = isClicked ? 0.95 : 1;

    // Cursor Logic
    const cursorX = interpolate(
        frame,
        [0, 50, 60, 120, 180, 215],
        [300, 160, 160, 100, 160, 160],
        { extrapolateRight: "clamp", easing: Easing.bezier(0.25, 0.1, 0.25, 1) }
    );

    const cursorY = interpolate(
        frame,
        [0, 50, 60, 120, 180, 215],
        [240, 133, 133, 50, 150, 150],
        { extrapolateRight: "clamp", easing: Easing.bezier(0.25, 0.1, 0.25, 1) }
    );

    const searchClick = frame >= 60 && frame < 70;
    const clickState = searchClick || isClicked;


    return (
        <AbsoluteFill className="bg-background overflow-hidden">
            {/* Search Engine View */}
            <div style={{ opacity: searchOpacity }} className="absolute inset-0 bg-white flex flex-col items-center pt-16">
                <div className="text-2xl font-bold tracking-tight mb-4"><span className="text-blue-500">G</span><span className="text-red-500">o</span><span className="text-yellow-500">o</span><span className="text-blue-500">g</span><span className="text-green-500">l</span><span className="text-red-500">e</span></div>
                <div className="w-3/4 max-w-[240px] border rounded-full px-4 py-2 flex items-center gap-2 shadow-sm text-xs">
                    <SearchIcon className="size-3 text-gray-400" />
                    <span>{currentSearch}</span>
                    {frame > 10 && frame < 45 && <span className="w-px h-3 bg-black animate-pulse" />}
                </div>
                <div className="mt-4 space-y-2 w-3/4 max-w-[240px] opacity-0" style={{ opacity: frame > 50 ? 1 : 0 }}>
                    <div className="bg-blue-600 h-1.5 w-1/3 rounded-full mb-1" /> {/* Title imitating link */}
                    <div className="bg-gray-200 h-1 w-full rounded-full" />
                    <div className="bg-gray-200 h-1 w-2/3 rounded-full" />
                </div>
            </div>

            {/* Launchdrop App View */}
            <div style={{ opacity: appOpacity }} className="absolute inset-0 bg-background flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-[280px] space-y-4">
                    <div className="space-y-1.5">
                        <div className="h-3 w-1/3 rounded bg-primary/20" />
                        <div className="h-1.5 w-2/3 rounded bg-muted" />
                    </div>

                    {/* Input Area */}
                    <div className={cn(
                        "flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-2 transition-colors",
                        frame >= 100 && frame < 185 ? "border-primary ring-1 ring-primary/20 bg-background" : "border-transparent"
                    )}>
                        <SearchIcon className="size-3.5 text-muted-foreground" />
                        <span className="text-xs font-medium text-foreground">
                            {currentRepo}
                            {frame > 120 && frame < 180 && (frame % 10 < 5) && (
                                <span className="ml-[1px] inline-block h-3 w-0.5 align-middle bg-primary" />
                            )}
                        </span>
                        {currentRepo.length === 0 && <span className="text-muted-foreground/50 absolute left-9 text-xs">Paste GitHub URL...</span>}
                    </div>

                    {/* Button */}
                    <div className="flex justify-center">
                        <div
                            style={{ transform: `scale(${buttonScale})` }}
                            className={cn(
                                "flex items-center gap-2 rounded-md px-6 py-2 font-medium text-xs text-primary-foreground shadow-lg transition-colors duration-200",
                                isDeploying ? "bg-muted text-muted-foreground w-full justify-center" : "bg-primary w-full justify-center"
                            )}
                        >
                            {isDeploying ? (
                                <>
                                    <Loader2 className="size-3.5 animate-spin" />
                                    <span>Deploying...</span>
                                </>
                            ) : (
                                <>
                                    <RocketIcon className="size-3.5" />
                                    <span>Deploy Now</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Cursor x={cursorX} y={cursorY} click={clickState} />
        </AbsoluteFill>
    );
};

export const RemotionOneClickVisual = () => {
    return (
        <div className="relative w-full max-w-[320px] shadow-2xl rounded-lg border border-neutral-200 dark:border-neutral-800">
            {/* Laptop Lid Wrapper to include Sticker */}
            <div className="relative overflow-hidden rounded-t-lg bg-neutral-900">
                {/* Laptop Header */}
                <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-3 py-2 relative z-10">
                    <div className="size-2 rounded-full bg-red-500/80" />
                    <div className="size-2 rounded-full bg-yellow-500/80" />
                    <div className="size-2 rounded-full bg-green-500/80" />
                    <div className="mx-auto flex h-5 w-2/3 items-center justify-center rounded bg-black/40 text-[9px] text-neutral-400">
                        launchdrop.nayalsaurav.in
                    </div>
                </div>

                {/* Screen Content */}
                <div className="relative aspect-[16/10] w-full bg-background">
                    <Player
                        component={OneClickScene}
                        durationInFrames={300}
                        compositionWidth={320}
                        compositionHeight={200}
                        fps={30}
                        loop
                        autoPlay
                        controls={false}
                        className="size-full"
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>
            </div>

            {/* Laptop Base */}
            <div className="relative z-10 -mt-[1px] bg-neutral-200 dark:bg-neutral-800 h-2 rounded-b-lg border-t border-white/10 mx-auto w-full shadow-md">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-neutral-300 dark:bg-neutral-700 rounded-b-sm" />
                <ReactSticker />
            </div>
        </div>
    );
};
