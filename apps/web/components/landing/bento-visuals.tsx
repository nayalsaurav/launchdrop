import {
  CheckCircle2Icon,
  GlobeIcon,
  LayoutDashboardIcon,
  TerminalIcon,
  SearchIcon,
  CommandIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

import { motion } from "motion/react";
import { Globe } from "@/components/ui/globe";

export const OneClickDeployVisual = () => {
  return (
    <div className="w-full max-w-[320px] overflow-hidden rounded-xl border bg-background shadow-xl dark:bg-black">
      {/* Mac Window Header */}
      <div className="flex items-center gap-1.5 border-b bg-muted/30 px-3 py-2.5">
        <div className="size-2.5 rounded-full bg-red-500/80" />
        <div className="size-2.5 rounded-full bg-yellow-500/80" />
        <div className="size-2.5 rounded-full bg-green-500/80" />
      </div>

      {/* Browser Content */}
      <div className="p-4 bg-muted/5">
        <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2 shadow-sm">
          <SearchIcon className="size-4 text-muted-foreground opacity-50" />
          <div className="flex items-center text-sm text-foreground">
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: "auto" }}
              transition={{
                duration: 2,
                ease: "linear",
                delay: 0.5,
              }}
              className="overflow-hidden whitespace-nowrap inline-block"
            >
              github.com/user/project
            </motion.span>
            <motion.div
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="ml-0.5 h-4 w-0.5 bg-primary"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <Button size="sm" className="w-full font-medium shadow-md">
            Deploy Project
          </Button>
        </div>
      </div>
    </div>
  );
};

export const BuildProcessVisual = () => {
  return (
    <div className="w-full max-w-[320px] overflow-hidden rounded-xl border bg-neutral-950 font-mono text-[10px] text-neutral-400 shadow-xl dark:bg-black">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-3 py-2">
        <div className="size-2 rounded-full bg-red-500/50" />
        <div className="size-2 rounded-full bg-yellow-500/50" />
        <div className="size-2 rounded-full bg-green-500/50" />
      </div>
      <div className="space-y-1 p-3">
        <div className="flex gap-2">
          <span>&gt;</span>
          <span className="text-blue-400">git clone</span> repo...
        </div>
        <div className="flex gap-2">
          <span>&gt;</span>
          <span className="text-yellow-400">npm install</span>
        </div>
        <div className="flex gap-2 text-green-400">
          <span>✔</span>
          <span>Dependencies installed</span>
        </div>
        <div className="flex gap-2">
          <span>&gt;</span>
          <span className="text-purple-400">npm run build</span>
        </div>
      </div>
    </div>
  );
};

export const ManualDeployVisual = () => {
  return (
    <div className="flex w-full flex-col gap-3 max-w-[280px]">
      <div className="flex items-center justify-between rounded-xl border bg-background/50 p-3 shadow-sm">
        <span className="text-sm font-medium">Auto-deploy</span>
        <Switch checked={false} />
      </div>
      <Button className="w-full shadow-md" variant="default">
        Trigger Deployment
      </Button>
    </div>
  );
};

export const LiveLinkVisual = () => {
  return (
    <div className="relative w-full max-w-[320px] flex flex-col justify-center items-center shadow-2xl rounded-lg">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
        {/* Browser Top Bar */}
        <div className="flex items-center gap-2 border-b bg-white/80 dark:bg-black/20 px-3 py-2">
          <div className="flex gap-1.5">
            <div className="size-2 rounded-full bg-red-500/80" />
            <div className="size-2 rounded-full bg-yellow-500/80" />
            <div className="size-2 rounded-full bg-green-500/80" />
          </div>
          <div className="flex bg-white dark:bg-neutral-900 h-5 w-full items-center justify-center rounded text-[10px] text-neutral-500 shadow-sm transition-all">
            <GlobeIcon className="mr-1.5 size-2.5 opacity-50" />
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: "auto" }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="overflow-hidden whitespace-nowrap inline-block max-w-[140px]"
            >
              project.launchdrop.nayalsaurav.in
            </motion.span>
          </div>
        </div>

        {/* Browser Content (Screen) */}
        <div className="relative flex flex-col gap-2 p-4 bg-white dark:bg-neutral-950 h-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.2, duration: 0.4 }}
            className="w-full space-y-2"
          >
            <div className="h-8 w-24 rounded bg-primary/20" />
            <div className="space-y-1.5">
              <div className="h-2 w-full rounded bg-neutral-100 dark:bg-neutral-800" />
              <div className="h-2 w-5/6 rounded bg-neutral-100 dark:bg-neutral-800" />
              <div className="h-2 w-4/6 rounded bg-neutral-100 dark:bg-neutral-800" />
            </div>
            <div className="mt-2 flex gap-2">
              <div className="h-6 w-20 rounded bg-primary/20" />
              <div className="h-6 w-20 rounded bg-neutral-100 dark:bg-neutral-800" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Laptop Base */}
      <div className="-mt-[1px] mx-auto h-3 w-[110%] rounded-b-lg rounded-t-none border border-neutral-200 bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 shadow-md flex items-center justify-center relative z-10">
        <div className="h-0.5 w-16 rounded-full bg-neutral-400/30" />
      </div>
    </div>
  );
};



export const GlobalDistributionVisual = () => {
  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden pt-2">
      <Globe />
    </div>
  );
};

export const DashboardVisual = () => {
  return (
    <div className="w-full max-w-[300px] space-y-2 rounded-xl border bg-background p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-primary/10 p-1.5">
            <CommandIcon className="size-4 text-primary" />
          </div>
          <span className="text-sm font-medium">project-alpha</span>
        </div>
        <Badge variant="secondary" className="bg-green-500/10 text-green-600 hover:bg-green-500/20">
          Live
        </Badge>
      </div>
      <div className="grid grid-cols-3 gap-2 py-2">
        <div className="rounded-lg bg-muted/50 p-2 text-center">
          <div className="text-[10px] text-muted-foreground">Visits</div>
          <div className="font-semibold text-xs">24k</div>
        </div>
        <div className="rounded-lg bg-muted/50 p-2 text-center">
          <div className="text-[10px] text-muted-foreground">Bandwidth</div>
          <div className="font-semibold text-xs">12GB</div>
        </div>
        <div className="rounded-lg bg-muted/50 p-2 text-center">
          <div className="text-[10px] text-muted-foreground">Duration</div>
          <div className="font-semibold text-xs">120ms</div>
        </div>
      </div>
    </div>
  );
};
