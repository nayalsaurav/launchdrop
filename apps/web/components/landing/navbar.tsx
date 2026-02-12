import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="flex bg-white size-10 items-center justify-center rounded-full">
        <Image
          src="/globe.svg"
          alt="LaunchDrop logo"
          width={20}
          height={20}
          className="size-5"
        />
      </div>
    </Link>
  );
};

export default function Navbar() {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl">
      <div className="bg-neutral-900/90 backdrop-blur-md rounded-full border border-white/10 p-1.5 shadow-xl flex items-center justify-between gap-8 md:gap-12">

        {/* Left & Logo */}
        <Logo />

        {/* Right */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button variant="secondary" asChild size="sm" className="rounded-full bg-white text-black hover:bg-white/90 h-10 px-5 font-medium">
            <Link href="/signin">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
