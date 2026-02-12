"use client";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { AnimatedBeam } from "@/components/landing/animated-beam";
import RocketIcon from "@/components/ui/rocket-icon";
import GithubCopilotIcon from "@/components/ui/github-copilot-icon";
import CpuIcon from "@/components/ui/cpu-icon";
import GlobeIcon from "@/components/ui/globe-icon";
import { motion } from "motion/react";

export default function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <div className="mb-5 flex justify-center">
            <Badge variant="default">How it works</Badge>
          </div>
          <h2 className="text-3xl font-semibold text-balance md:text-5xl">
            Deploy in seconds, scale globally.
          </h2>
          <p className="text-muted-foreground mt-6 text-base text-balance md:text-lg">
            Simply sign up, connect your GitHub repository, and let us handle the build.
            Your high-performance site will be live on the edge in seconds.
          </p>
        </div>

        <div className="hidden md:block relative" ref={containerRef}>
          <div className="grid grid-cols-4 gap-4 relative z-10">
            <div className="relative">
              <div ref={div1Ref} className="border-border bg-background relative z-10 mx-auto flex size-14 items-center justify-center rounded-full border-2 transition-transform hover:scale-110 cursor-pointer shadow-sm">
                <RocketIcon size={28} />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-lg font-semibold text-balance text-foreground">Sign Up</h3>
                <p className="text-muted-foreground mt-2 text-sm text-balance">
                  Create your account and jump into the dashboard instantly.
                </p>
              </div>
            </div>

            <div className="relative">
              <div ref={div2Ref} className="border-border bg-background relative z-10 mx-auto flex size-14 items-center justify-center rounded-full border-2 transition-transform hover:scale-110 cursor-pointer shadow-sm">
                <GithubCopilotIcon  size={28} />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-lg font-semibold text-balance text-foreground">Add GitHub Repo</h3>
                <p className="text-muted-foreground mt-2 text-sm text-balance">
                  Connect your repository or paste your Vite project URL.
                </p>
              </div>
            </div>

            <div className="relative">
              <div ref={div3Ref} className="border-border bg-background relative z-10 mx-auto flex size-14 items-center justify-center rounded-full border-2 transition-transform hover:scale-110 cursor-pointer shadow-sm">
                <CpuIcon size={28} />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-lg font-semibold text-balance text-foreground">We Build</h3>
                <p className="text-muted-foreground mt-2 text-sm text-balance">
                  We handle the install, build, and edge-native optimization.
                </p>
              </div>
            </div>

            <div className="relative">
              <div ref={div4Ref} className="border-border bg-background relative z-10 mx-auto flex size-14 items-center justify-center rounded-full border-2 transition-transform hover:scale-110 cursor-pointer shadow-sm">
                <GlobeIcon size={28} />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-lg font-semibold text-balance text-foreground">Get Live Link</h3>
                <p className="text-muted-foreground mt-2 text-sm text-balance">
                  Your high-performance site is live and global in seconds.
                </p>
              </div>
            </div>
          </div>

          {/* Animated Beams */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div1Ref}
            toRef={div2Ref}
            duration={3}
            curvature={40}
            pathColor="gray"
            pathWidth={3}
            pathOpacity={0.1}
            gradientStartColor="#00E5FF"
            gradientStopColor="#1200FF"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div2Ref}
            toRef={div3Ref}
            duration={3}
            curvature={-40}
            pathColor="gray"
            pathWidth={3}
            pathOpacity={0.1}
            gradientStartColor="#FF00D6"
            gradientStopColor="#FF4D00"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div3Ref}
            toRef={div4Ref}
            duration={3}
            curvature={40}
            pathColor="gray"
            pathWidth={3}
            pathOpacity={0.1}
            gradientStartColor="#00FF94"
            gradientStopColor="#007CF0"
          />
        </div>

        {/* Mobile View */}
        <MobileTimeline />
      </div>
    </section>
  );
}




const steps = [
  {
    step: "01",
    title: "Create Account",
    desc: "Sign up in seconds and access your dashboard instantly.",
    icon: RocketIcon,
  },
  {
    step: "02",
    title: "Connect Repository",
    desc: "Paste your GitHub Vite project URL.",
    icon: GithubCopilotIcon,
  },
  {
    step: "03",
    title: "Auto Build",
    desc: "We install dependencies and optimize your app.",
    icon: CpuIcon,
  },
  {
    step: "04",
    title: "Deploy Live",
    desc: "Your site goes live with a shareable link.",
    icon: GlobeIcon,
  },
]

function MobileTimeline() {
  return (
    <div className="md:hidden relative py-10 px-6">
      <div className="relative space-y-14">

        {/* Background line */}
        <div className="absolute left-6 top-2 bottom-2 w-[2px] bg-border" />

        {/* Animated progress line */}
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute left-6 top-2 w-[2px] bg-gradient-to-b from-primary via-primary/60 to-transparent"
        />

        {steps.map((item, i) => {
          const Icon = item.icon

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative flex items-start gap-6 group"
            >
              {/* Icon Circle */}
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-background border border-primary/30 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                <Icon size={18} className="text-primary" />
              </div>

              {/* Card */}
              <div className="flex-1 rounded-2xl border bg-background/70 backdrop-blur-md p-6 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                <span className="text-xs tracking-widest font-semibold text-primary/70">
                  STEP {item.step}
                </span>

                <h3 className="mt-2 text-lg font-semibold">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
