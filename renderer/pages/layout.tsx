import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
{/* <AnimatedCursor
    innerSize={20}
    outerSize={20}
    color='193, 11, 111'
    outerAlpha={0.2}
    innerScale={0.7}
    outerScale={3}
    clickables={['a', 'button', '.link']}
/> */}