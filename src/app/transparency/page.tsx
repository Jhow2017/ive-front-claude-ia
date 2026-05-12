import type { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/transparency/hero";
import { KpiStrip } from "@/components/transparency/kpi-strip";
import { PageTabs } from "@/components/transparency/page-tabs";
import { Identification } from "@/components/transparency/identification";
import { Governance } from "@/components/transparency/governance";
import { Financials } from "@/components/transparency/financials";
import { Agreements } from "@/components/transparency/agreements";
import { Documents } from "@/components/transparency/documents";
import { Certifications } from "@/components/transparency/certifications";
import { Ombudsman } from "@/components/transparency/ombudsman";
import { LgpdStrip } from "@/components/transparency/lgpd-strip";

export const metadata: Metadata = {
    title: "Transparência · Instituto Verde Esperança",
    description:
        "Demonstrações financeiras, convênios públicos, documentos institucionais, governança e canais de ouvidoria do Instituto Verde Esperança.",
};

export default function TransparencyPage() {
    return (
        <>
            <Navbar solid />
            <main className="pt-[68px]">
                <Hero />
                <KpiStrip />
                <PageTabs />
                <Identification />
                <Governance />
                <Financials />
                <Agreements />
                <Documents />
                <Certifications />
                <Ombudsman />
                <LgpdStrip />
            </main>
            <Footer />
        </>
    );
}
