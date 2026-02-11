"use client";

import { useProjects } from "@/hooks/use-projects";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { FolderGit2, Search, Settings, LayoutDashboard } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data: projects } = useProjects();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const navigate = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-full max-w-sm justify-start rounded-md text-sm text-muted-foreground sm:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        Search...
        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search projects..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Pages">
            <CommandItem onSelect={() => navigate("/dashboard")}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Overview
            </CommandItem>
            <CommandItem onSelect={() => navigate("/dashboard/projects")}>
              <FolderGit2 className="mr-2 h-4 w-4" />
              All Projects
            </CommandItem>
            <CommandItem onSelect={() => navigate("/dashboard/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </CommandItem>
          </CommandGroup>

          {projects && projects.length > 0 && (
            <CommandGroup heading="Projects">
              {projects.map((project) => (
                <CommandItem
                  key={project.id}
                  onSelect={() => navigate(`/dashboard/projects/${project.id}`)}
                >
                  <FolderGit2 className="mr-2 h-4 w-4" />
                  {project.name}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
