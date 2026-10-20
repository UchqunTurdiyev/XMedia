import { Montserrat } from "next/font/google";
import "./globals.css";
import MetaPixel from "@/components/MetaPixel";
import LeadModalProvider from "@/components/LeadModal";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const url = process.env.NEXT_PUBLIC_SITE_URL || "https://xmedia.uz";
const title = "XMEDIA — shifokor va ekspertlar uchun media agentlik";
const description =
  "Shaxsiy brend, SMM, video prodakshn va target reklama — bitta jamoada. 40+ mutaxassis, 150+ loyiha. Bepul media audit oling.";

export const metadata = {
  metadataBase: new URL(url),
  title,
  description,
  openGraph: {
    title,
    description,
    url,
    siteName: "XMEDIA",
    locale: "uz_UZ",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "XMEDIA" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
  icons: { icon: "/favicon.svg" },
};

export const viewport = {
  themeColor: "#050705",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz" className={montserrat.variable}>
      <body className="grain antialiased">
        <MetaPixel />
        <LeadModalProvider>{children}</LeadModalProvider>
      </body>
    </html>
  );
}
