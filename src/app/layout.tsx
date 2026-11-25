import { getBaseUrl } from "@/seo/base-url";
import type { Metadata } from "next";
import { shell, site } from "@/content/site";
import localFont from "next/font/local";
import { PageMotion } from "@/components/motion/PageMotion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BackgroundDots } from "@/components/BackgroundDots";
import { CopyGuard } from "@/components/CopyGuard";
import { SmoothScroll } from "@/components/motion";
import { SearchDialog } from "@/features/search/SearchDialog";
import "@/features/search/search.css";
import { defaultTheme, themeBootstrap } from "@/lib/theme";
import { introBootstrap } from "@/lib/intro";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = localFont({ src: "../fonts/inter-latin-wght-normal.woff2", variable: "--font-inter", weight: "100 900", display: "swap", preload: false });
const bricolage = localFont({ src: "../fonts/bricolage-grotesque-latin-wdth-normal.woff2", variable: "--font-bricolage", weight: "200 800", display: "swap" });
const instrument = localFont({ src: "../fonts/instrument-serif-latin-400-normal.woff2", variable: "--font-instrument", weight: "400", display: "swap" });

export const metadata: Metadata = {
  metadataBase: getBaseUrl(),
  title: { default: `${site.name} — ${site.role}`, template: `%s — ${site.name}` },
  description: site.intro,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme={defaultTheme} suppressHydrationWarning className={`${inter.variable} ${instrument.variable} ${bricolage.variable}`}>
      <head>
        {/* A parser-blocking inline script sets the root theme before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <script dangerouslySetInnerHTML={{ __html: introBootstrap }} />
      </head>
      <body>
        <BackgroundDots />
        <CopyGuard />
        <SmoothScroll>
          <a className="skip-link" href={shell.mainHref}>{shell.skip}</a>
          <Header />
          <main id="main" tabIndex={-1}>{children}<PageMotion /></main>
          <Footer />
          <SearchDialog />
          {process.env.VERCEL === "1" && <Analytics />}
        </SmoothScroll>
      </body>
    </html>
  );
}
