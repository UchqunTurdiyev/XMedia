import "./globals.css";
import MetaPixel from "@/components/MetaPixel";
import LeadModalProvider from "@/components/LeadModal";

const url = process.env.NEXT_PUBLIC_SITE_URL || "https://xmedia.uz";

export const metadata = {
  metadataBase: new URL(url),
  title: "XMEDIA — Infoprodyuserlik, SMM va shaxsiy brend agentligi",
  description:
    "XMEDIA — ijodiy reklama agentligi. SMM, infoprodyuserlik, shaxsiy brend, video prodakshn va target reklama. Daromadingizni media orqali 3–10 barobar oshiramiz.",
  openGraph: {
    title: "XMEDIA — mediabozorimizga xush kelibsiz",
    description: "Kontentdan sotuvgacha — bitta jamoa. Bepul media audit oling.",
    url,
    siteName: "XMEDIA",
    locale: "uz_UZ",
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport = {
  themeColor: "#050705",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body className="grain antialiased">
        <MetaPixel />
        <LeadModalProvider>{children}</LeadModalProvider>
      </body>
    </html>
  );
}
