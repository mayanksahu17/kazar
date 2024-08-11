import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scrims crown",
  description: "Tournament plateform for BGMI players , BGMI Tournaments , Get paid for gaming,Don't waste your gaming skills ",
  keywords : [
    "PUBG tournaments",
    "BGMI tournaments",
    "online gaming tournaments",
    "PUBG match schedules",
    "BGMI match schedules",
    "competitive PUBG matches",
    "BGMI competitive matches",
    "esports tournaments",
    "PUBG mobile competitions",
    "BGMI mobile competitions",
    "PUBG gaming events",
    "BGMI gaming events",
    "tournament registration for PUBG",
    "BGMI tournament registration",
    "win real money PUBG",
    "win real money BGMI",
    "PUBG tournament platform",
    "BGMI tournament platform",
    "join PUBG tournament",
    "join BGMI tournament",
    "PUBG squad tournaments",
    "BGMI squad tournaments",
    "duo tournaments PUBG",
    "duo tournaments BGMI",
    "solo tournaments PUBG",
    "solo tournaments BGMI",
    "BGMI tournament app",
    "PUBG tournament app",
    "host PUBG tournaments",
    "host BGMI tournaments",
    "BGMI scrims",
    "PUBG scrims",
    "BGMI match updates",
    "PUBG match updates"
  ]
  
  // icons : {
  //   icon : ["/Icon.png"]
  // }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
        <html lang="en">
        <body className={inter.className}>{children}</body>
        </html>


  );
}
