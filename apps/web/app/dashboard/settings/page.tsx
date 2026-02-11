"use client";

import { authClient } from "@/lib/auth-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOut } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function SettingsPage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/sign-in";
  };

  if (isPending) {
    return <SettingsPageSkeleton />;
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Your personal account information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
                <AvatarFallback className="text-lg">
                  {user?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>

            <Separator />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={user?.name || ""} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue={user?.email || ""} disabled />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              Profile updates are managed through your authentication provider.
            </p>
          </CardFooter>
        </Card>

        {/* Session Section */}
        <Card>
          <CardHeader>
            <CardTitle>Session</CardTitle>
            <CardDescription>
              Manage your active session.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border p-4 gap-4">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Sign Out</p>
                <p className="text-xs text-muted-foreground">
                  End your current session and return to the sign-in page.
                </p>
              </div>
              <Button variant="outline" onClick={handleSignOut} className="w-full sm:w-auto">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>
              Irreversible and destructive actions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border border-destructive/50 p-4 gap-4">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Delete Account</p>
                <p className="text-xs text-muted-foreground">
                  Permanently delete your account and all associated data.
                </p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full sm:w-auto">Delete Account</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove all your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SettingsPageSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
      <div>
        <Skeleton className="h-8 w-32" />
        <Skeleton className="mt-1 h-4 w-64" />
      </div>
      <div className="grid gap-6">
        <Skeleton className="h-[300px] w-full rounded-xl" />
        <Skeleton className="h-[150px] w-full rounded-xl" />
        <Skeleton className="h-[150px] w-full rounded-xl" />
      </div>
    </div>
  );
}
