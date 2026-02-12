import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import { ThemeProvider } from "./theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Launchdrop - Deploy Static Sites Instantly",
  description: "The fastest way to deploy static websites. Drag, drop, and launch your React vite site in seconds.",
  openGraph: {
    title: "Launchdrop - Deploy Static Sites Instantly",
    description: "The fastest way to deploy static websites. Drag, drop, and launch your React vite site in seconds.",
    url: "https://launchdrop.nayalsaurav.in",
    siteName: "Launchdrop",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Launchdrop - Deploy Static Sites Instantly",
    description: "The fastest way to deploy static websites. Drag, drop, and launch your React vite  site in seconds.",
    creator: "@nayalsaurav", // Placeholder
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <>
              {children}
            </>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
