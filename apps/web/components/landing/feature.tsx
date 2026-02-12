"use client"
import {
  CloudyIcon,
  LockOpenIcon,
  ArrowUp10Icon,
  FingerprintIcon,
  GlobeIcon,
  LayoutDashboardIcon,
  RocketIcon,
  GitBranchIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  ManualDeployVisual,

  GlobalDistributionVisual,
  DashboardVisual,
} from "./bento-visuals";
import { RemotionBuildVisual } from "./remotion-build-visual";
import { RemotionOneClickVisual } from "./remotion-one-click-visual";
import { RemotionLiveLinkVisual } from "./remotion-live-link-visual";

const features = [
  {
    title: "One-Click Deployment",
    description:
      "Paste your GitHub repository URL and deploy instantly. No configuration files or pipeline setup required.",
    visual: <RemotionOneClickVisual />,
    className: "md:col-span-2",
  },
  {
    title: "Automatic Build Process",
    description:
      "We install dependencies and run npm run build automatically, generating your production-ready /dist output.",
    visual: <RemotionBuildVisual />,
    className: "md:col-span-1 md:row-span-1",
  },
  // {
  //   title: "Controlled Manual Deployments",
  // ... rest of the file
  //   description:
  //     "You decide when to deploy. No automatic rebuilds or unexpected releases — full control from your dashboard.",
  //   visual: <ManualDeployVisual />,
  //   className: "md:col-span-1",
  // },
  {
    title: "Instant Live Link",
    description:
      "Every deployment gets a shareable .launchdrop.nayalsaurav.in URL, ready for testing, demos, or production use.",
    visual: <RemotionLiveLinkVisual />,
    className: "md:col-span-2",
  },
  {
    title: "Global Static Delivery",
    description:
      "Your static assets are served over HTTPS and delivered efficiently worldwide for fast, reliable performance.",
    visual: <GlobalDistributionVisual />,
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Clean Deployment Dashboard",
    description:
      "Track build status, view logs, redeploy manually, and manage all your projects in one minimal interface.",
    visual: <DashboardVisual />,
    className: "md:col-span-1 md:row-span-2",
  },
];

export default function FeatureSection() {
  return (
    <section className="py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <header className="mx-auto max-w-2xl lg:text-center">
          <Badge variant="outline" className="text-indigo-600">
            Features
          </Badge>
          <h3 className="font-heading font-bold mt-4 text-3xl sm:text-4xl">
            Deploy static Vite projects — the simple way
          </h3>
          <p className="text-muted-foreground mt-6 text-lg">
            Launchdrop is built specifically for static Vite apps. Paste your GitHub repo,
            we build it, and give you a live link — no CI/CD pipelines required.
          </p>
        </header>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={cn(
                  "group relative flex flex-col justify-between overflow-hidden rounded-xl bg-background dark:bg-[oklch(0.25_0.005_49.25)] p-6 border transition-all",
                  feature.className
                )}
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold tracking-tight leading-none mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>

                <div className="flex grow items-end justify-center min-h-[200px]">
                  {feature.visual}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
