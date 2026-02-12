import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, PlayIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VideoModal } from "./video-modal";
import GithubCopilotIcon from "../ui/github-copilot-icon";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32 bg-[#f8fafc] dark:bg-transparent">
      {/* Top Fade Grid Background */}
      <div
        className="absolute inset-0 z-0 opacity-100 dark:opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e2e8f0 1px, transparent 1px),
            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
          `,
          backgroundSize: "20px 30px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <header className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Badge variant="default" className="px-3 py-1 mb-2">
              Ship Faster
              <ArrowUpRight className="ml-1 h-3 w-3" />
            </Badge>
            <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl">
              The fastest way to go from idea to production.
            </h1>
            <p className="text-muted-foreground mb-10 max-w-[540px] text-lg leading-relaxed text-balance">
              Join thousands of developers deploying static apps with zero config.
              Streamline your deployment workflow and manage everything from one powerful dashboard.
            </p>
            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              <Button variant="primary" asChild size="lg">
                <Link href="/signin">Get Started for Free</Link>
              </Button>
              <Button variant="outline" asChild size="lg">
                <Link href="https://github.com/nayalsaurav/launchdrop" target="_blank" rel="noopener noreferrer">
                  <GithubCopilotIcon />
                  Star on GitHub
                </Link>
              </Button>
            </div>
          </header>
          <figure className="relative group lg:ml-auto">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl backdrop-blur-sm">
              <Image
                src="https://images.unsplash.com/photo-1763503834047-ac85c4105c0b?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="LaunchDrop Dashboard Preview"
                width={1200}
                height={675}
                priority
                className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="scale-90 opacity-90 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                  <VideoModal videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
                </div>
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
