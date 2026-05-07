import { Navbar } from "@/components/landing/navbar";
import { HeroCarousel } from "@/components/landing/hero-carousel";
import { StatsBar } from "@/components/landing/stats-bar";
import { QuemSomos } from "@/components/landing/quem-somos";
import { ComoFunciona } from "@/components/landing/como-funciona";
import { Especialidades } from "@/components/landing/especialidades";
import { PlataformaSection } from "@/components/landing/plataforma";
import { Parceiros } from "@/components/landing/parceiros";
import { Sobre } from "@/components/landing/sobre";
import { Depoimentos } from "@/components/landing/depoimentos";
import { MVV } from "@/components/landing/mvv";
import { FAQ } from "@/components/landing/faq";
import { Doacoes } from "@/components/landing/doacoes";
import { Contato } from "@/components/landing/contato";
import { Footer } from "@/components/landing/footer";
import { DoacaoModal } from "@/components/landing/doacao-modal";

export default function HomePage() {
    return (
        <>
            <Navbar />
            <HeroCarousel />
            <StatsBar />
            <QuemSomos />
            <ComoFunciona />
            <Especialidades />
            <PlataformaSection />
            <Parceiros />
            <Sobre />
            <Depoimentos />
            <MVV />
            <FAQ />
            <Doacoes />
            <Contato />
            <Footer />
            <DoacaoModal />
        </>
    );
}
