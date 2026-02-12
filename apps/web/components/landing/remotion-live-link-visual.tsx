"use client";

import { useMemo } from "react";
import { Player } from "@remotion/player";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring, Easing } from "remotion";
import { GlobeIcon, Smartphone, Monitor, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const LiveLinkScene = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Sequence Stages
    // 0-90: Build -> Launch
    // 90-180: Reveal URL
    // 180-270: Share Effect
    // 270-360: Final Lockup

    // --- Stage 1: Build -> Launch ---
    const appCardScale = interpolate(frame, [0, 45, 90], [0.95, 1, 0.95], { extrapolateRight: "clamp" });
    const appCardOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
    const appCardY = interpolate(frame, [0, 60, 90], [20, 0, -20], { extrapolateRight: "clamp", easing: Easing.bezier(0.25, 0.1, 0.25, 1) });

    // Light Beam
    const beamOpacity = interpolate(frame, [45, 60, 80], [0, 0.6, 0]);
    const beamHeight = interpolate(frame, [45, 80], [0, 100]);

    // --- Stage 2: Reveal URL ---
    const pillOpacity = interpolate(frame, [90, 110], [0, 1], { extrapolateRight: "clamp" });
    const pillY = interpolate(frame, [90, 120], [40, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.5)) });
    const pillScale = interpolate(frame, [90, 120], [0.8, 1], { extrapolateRight: "clamp" });

    // Live Dot
    const dotOpacity = interpolate(frame, [110, 130], [0, 1], { extrapolateRight: "clamp" });

    // --- Stage 3: Share Effect ---
    const shareProgress = interpolate(frame, [180, 240], [0, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.exp) });
    const shareOpacity = interpolate(frame, [180, 200], [0, 1], { extrapolateRight: "clamp" });

    // Targets positions relative to center
    const target1X = interpolate(shareProgress, [0, 1], [0, -80]);
    const target1Y = interpolate(shareProgress, [0, 1], [0, -60]);

    const target2X = interpolate(shareProgress, [0, 1], [0, 80]);
    const target2Y = interpolate(shareProgress, [0, 1], [0, -60]);

    const target3Y = interpolate(shareProgress, [0, 1], [0, 70]);

    // --- Stage 4: Final Lockup ---
    const finalFadeOut = interpolate(frame, [280, 300], [1, 0.1], { extrapolateRight: "clamp" });
    const finalTextOpacity = interpolate(frame, [290, 320], [0, 1], { extrapolateRight: "clamp" });

    return (
        <AbsoluteFill className="bg-[#0A0A0B] flex items-center justify-center p-8 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#0A0A0B]/50 to-[#0A0A0B]" />

            {/* Scene Container */}
            <div className="relative w-full h-full flex items-center justify-center" style={{ opacity: finalFadeOut }}>

                {/* Light Beam */}
                <div
                    style={{ opacity: beamOpacity, height: `${beamHeight}%` }}
                    className="absolute top-0 w-1 bg-gradient-to-b from-transparent via-blue-500 to-blue-500/0 blur-sm z-10"
                />

                {/* App Card */}
                <div
                    style={{
                        opacity: appCardOpacity,
                        transform: `translateY(${appCardY}px) scale(${appCardScale})`
                    }}
                    className="absolute z-20 w-48 h-32 rounded-xl bg-neutral-900/80 border border-white/10 backdrop-blur-md shadow-2xl flex items-center justify-center"
                >
                    <div className="space-y-2 w-3/4">
                        <div className="h-2 w-1/3 bg-neutral-700 rounded-full" />
                        <div className="h-1.5 w-full bg-neutral-800 rounded-full" />
                        <div className="h-1.5 w-2/3 bg-neutral-800 rounded-full" />
                    </div>
                </div>

                {/* URL Pill - Center */}
                <div
                    style={{
                        opacity: pillOpacity,
                        transform: `translateY(${pillY}px) scale(${pillScale})`
                    }}
                    className="absolute z-30 flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-blue-500/30 backdrop-blur-xl shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)]"
                >
                    <GlobeIcon className="size-3 text-blue-400" />
                    <span className="text-xs font-mono text-blue-100">myapp.launchdrop.nayalsaurav.in</span>
                    <div style={{ opacity: dotOpacity }} className="flex items-center gap-1 pl-1 border-l border-white/10 ml-1">
                        <div className="size-1.5 rounded-full bg-green-500 animate-pulse" />
                    </div>
                </div>

                {/* Share Target 1 - Browser */}
                <div
                    style={{
                        opacity: shareOpacity,
                        transform: `translate(${target1X}px, ${target1Y}px)`
                    }}
                    className="absolute z-10 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900/90 border border-white/5 backdrop-blur-md"
                >
                    <Monitor className="size-3 text-neutral-400" />
                </div>

                {/* Share Target 2 - Mobile */}
                <div
                    style={{
                        opacity: shareOpacity,
                        transform: `translate(${target2X}px, ${target2Y}px)`
                    }}
                    className="absolute z-10 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900/90 border border-white/5 backdrop-blur-md"
                >
                    <Smartphone className="size-3 text-neutral-400" />
                </div>

                {/* Share Target 3 - Teammate */}
                <div
                    style={{
                        opacity: shareOpacity,
                        transform: `translate(0px, ${target3Y}px)`
                    }}
                    className="absolute z-10 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900/90 border border-white/5 backdrop-blur-md"
                >
                    <UserCircle className="size-3 text-neutral-400" />
                </div>
            </div>

            {/* Final Lockup Text */}
            <div
                style={{ opacity: finalTextOpacity }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center z-40"
            >
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-2">
                    🚀 Instant Live Link
                </h3>
                <p className="text-xs text-neutral-400 max-w-[200px]">
                    Every deployment gets a shareable .launchdrop.nayalsaurav.in URL
                </p>
            </div>
        </AbsoluteFill>
    );
};

export const RemotionLiveLinkVisual = () => {
    return (
        <div className="relative w-full max-w-[320px] aspect-[4/3] shadow-2xl rounded-xl overflow-hidden border border-neutral-800 bg-[#0A0A0B]">
            <Player
                component={LiveLinkScene}
                durationInFrames={360}
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
    );
};
