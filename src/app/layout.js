import { Inter } from "next/font/google";

export const fetchCache = 'force-no-store'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Home",
  description: "Home page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
