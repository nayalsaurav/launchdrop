"use client";
import Link from "next/link";
import { Rocket, Zap, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {

    const handleGithubSignIn = async () => {
        try {
            await authClient.signIn.social({
                provider: "github",
                callbackURL: "http://localhost:3000/" 
            })
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="flex min-h-screen w-full font-sans text-foreground antialiased overflow-auto">
      <div className="hidden lg:flex relative w-1/2 bg-black border-r border-border items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--background)_1px,transparent_1px),linear-gradient(to_bottom,var(--background)_1px,transparent_1px)] bg-[size:40px_40px] opacity-10"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 p-16 max-w-2xl">
          <div className="mb-8">
            <span className="inline-flex items-center justify-center p-3 bg-primary/5 rounded-xl border border-primary/10 backdrop-blur-sm mb-8">
              <Rocket className="text-secondary w-8 h-8" />
            </span>
          </div>
          <blockquote className="space-y-8">
            <p className="text-5xl font-bold leading-tight tracking-tight text-white/90">
              "The fastest way to go from idea to production."
            </p>
            <footer className="text-xl text-muted-foreground font-light">
              Join thousands of developers deploying static apps with zero config.
            </footer>
          </blockquote>
          
          <div className="mt-16 flex items-center gap-4 text-sm font-medium text-muted-foreground">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-background bg-zinc-700"></div>
              <div className="w-10 h-10 rounded-full border-2 border-background bg-zinc-600"></div>
              <div className="w-10 h-10 rounded-full border-2 border-background bg-zinc-500"></div>
              <div className="w-10 h-10 rounded-full border-2 border-background bg-zinc-400 flex items-center justify-center text-xs text-black font-bold">+2k</div>
            </div>
            <span>Developers shipping daily</span>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col relative bg-background">
        <div className="absolute top-0 right-0 p-8">
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Back to Home
          </Link>
        </div>
        
        <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-20 xl:px-24">
          <div className="w-full max-w-sm space-y-8">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
                <Zap className="text-primary-foreground w-7 h-7" />
              </div>
              <h2 className="text-3xl font-bold text-foreground tracking-tight">LaunchDrop</h2>
              <p className="mt-2 text-sm text-muted-foreground">Sign in to your dashboard</p>
            </div>

            <div className="mt-8 space-y-6">
              <Button 
                variant="default"
                className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-md flex gap-3"
                onClick={handleGithubSignIn}
              >
                <Github className="w-5 h-5 fill-current" />
                <span>
                    Sign in with GitHub
                </span>
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="px-2 bg-background text-muted-foreground font-medium">Secure Access</span>
                </div>
              </div>

              <p className="text-xs text-center text-muted-foreground max-w-xs mx-auto leading-relaxed">
                By continuing, you agree to LaunchDrop's <Link href="#" className="underline hover:text-foreground">Terms of Service</Link> and <Link href="#" className="underline hover:text-foreground">Privacy Policy</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
