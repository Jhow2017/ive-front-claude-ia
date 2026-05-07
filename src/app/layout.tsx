import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Instituto Verde Esperança",
    description:
        "Atendimento multidisciplinar especializado em crianças autistas, com plataforma integrada para famílias e profissionais.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="font-sans antialiased">{children}</body>
        </html>
    );
}
