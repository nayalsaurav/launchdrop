import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="border-t border-t-white/10 mt-12 relative overflow-hidden">
      <div className="max-w-7xl flex flex-col justify-end mx-auto min-h-[15rem] relative p-4 py-10 group">

        {/* Bottom Section */}
        <div className="flex flex-col gap-2 md:gap-1 items-center justify-center md:flex-row md:items-center md:justify-between px-4 md:px-0">
          <p className="text-base text-muted-foreground text-center md:text-left">
            ©2026 LaunchDrop. All rights reserved.
          </p>

          <nav className="flex gap-4">
            <a
              href="https://nayalsaurav.in?utm_source=launchdrop&utm_medium=footer&utm_campaign=launchdrop&ref=launchdrop"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-muted-foreground hover:text-foreground transition-colors duration-300 hover:text-underline"
            >
              Developed by Saurav Nayal
            </a>
          </nav>
        </div>
      </div>

      {/* Background Big Text */}
      <div
        className="bg-gradient-to-b from-foreground/15 via-foreground/5 to-transparent bg-clip-text text-transparent leading-none absolute left-1/2 -translate-x-1/2 bottom-[-10%] font-extrabold tracking-tighter pointer-events-none select-none text-center px-4"
        style={{ fontSize: "clamp(3rem, 15vw, 12rem)", maxWidth: "95vw" }}
      >
        LAUNCHDROP
      </div>
      {/* Bottom Blur Overlay */}
      <div className="bg-gradient-to-t from-background via-background/80 blur-[1em] to-background/40 absolute bottom-12 w-full h-16 " />
    </footer>
  );
};
