import NavbarComponent from "@/components/ui/Navbar";
import Providers from "@/lib/Providers";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
    title: "Betafore-Task",
    description: "Developer - Jisan Hasan",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Providers>
            <html lang="en">
                <body className="max-w-screen-xl mx-auto pt-3">
                    <Toaster />
                    <NavbarComponent />
                    {children}
                </body>
            </html>
        </Providers>
    );
}
