import ThemeRegistry from "@/theme/ThemeRegistry";
import "./globals.css";
import { Roboto_Slab } from "next/font/google";

const roboto = Roboto_Slab({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeRegistry>
        <body className={roboto.className}>{children}</body>
      </ThemeRegistry>
    </html>
  );
}
