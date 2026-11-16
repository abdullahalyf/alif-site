import { getBaseUrl } from "@/seo/base-url";
import type { Metadata } from "next";
import { shell, site } from "@/content/site";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/motion";
import { SearchDialog } from "@/features/search/SearchDialog";
import "@/features/search/search.css";
import "./globals.css";

const inter = localFont({ src: "../fonts/inter-latin-wght-normal.woff2", variable: "--font-inter", weight: "100 900", display: "swap" });
const instrument = localFont({
  src: [
    { path: "../fonts/instrument-serif-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/instrument-serif-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument", display: "swap",
});

export const metadata: Metadata = {
  metadataBase: getBaseUrl(),
  title: { default: `${site.name} — ${site.role}`, template: `%s — ${site.name}` },
  description: site.intro,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${instrument.variable}`}>
      <body>
        <SmoothScroll>
          <a className="skip-link" href={shell.mainHref}>{shell.skip}</a>
          <Header />
          <main id="main" tabIndex={-1}>{children}</main>
          <Footer />
          <SearchDialog />
        </SmoothScroll>
      </body>
    </html>
  );
}
