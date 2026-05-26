import type { Metadata } from "next";
import { Poppins, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const devanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pahuna Ghar Homestay | Best Homestay in Tansen, Palpa Nepal",
  description:
    "Experience authentic Nepali hospitality at Pahuna Ghar Homestay in Tansen-5, Kailashnagar, Palpa. Eco-luxury boutique mountain retreat with stunning views, cultural experiences, and warm Palpali hospitality.",
  keywords: [
    "Best Homestay in Palpa",
    "Homestay in Tansen",
    "Palpa accommodation",
    "Nepali cultural homestay",
    "Pahuna Ghar",
    "Tansen homestay",
    "eco-luxury homestay Nepal",
    "mountain retreat Palpa",
  ],
  authors: [{ name: "Pahuna Ghar Homestay" }],
  creator: "Pahuna Ghar Homestay",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pahunagharhomestay.com",
    siteName: "Pahuna Ghar Homestay",
    title: "Pahuna Ghar Homestay | Authentic Palpali Hospitality",
    description:
      "Nature, comfort, culture, and peace in the heart of Tansen. Book your stay at Pahuna Ghar Homestay.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pahuna Ghar Homestay - Tansen, Palpa Nepal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pahuna Ghar Homestay | Tansen, Palpa Nepal",
    description: "Experience authentic Nepali hospitality in Tansen, Palpa.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://pahunagharhomestay.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${devanagari.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              name: "Pahuna Ghar Homestay",
              description:
                "Eco-luxury boutique homestay in Tansen, Palpa, Nepal",
              url: "https://pahunagharhomestay.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Tansen-5, Kailashnagar",
                addressLocality: "Palpa",
                addressCountry: "NP",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 27.8734405,
                longitude: 83.537326,
              },
              priceRange: "$$",
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
