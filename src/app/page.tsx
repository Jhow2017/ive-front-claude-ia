import { Navbar } from "@/components/landing/navbar";
import { HeroCarousel } from "@/components/landing/hero-carousel";
import { StatsBar } from "@/components/landing/stats-bar";
import { WhoWeAre } from "@/components/landing/who-we-are";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Specialties } from "@/components/landing/specialties";
import { PlatformSection } from "@/components/landing/platform";
import { Partners } from "@/components/landing/partners";
import { About } from "@/components/landing/about";
import { Testimonials } from "@/components/landing/testimonials";
import { MVV } from "@/components/landing/mvv";
import { FAQ } from "@/components/landing/faq";
import { Donations } from "@/components/landing/donations";
import { Contact } from "@/components/landing/contact";
import { Footer } from "@/components/landing/footer";
import { DonationModal } from "@/components/landing/donation-modal";

export default function HomePage() {
    return (
        <>
            <Navbar />
            <HeroCarousel />
            <StatsBar />
            <WhoWeAre />
            <HowItWorks />
            <Specialties />
            <PlatformSection />
            <Partners />
            <About />
            <Testimonials />
            <MVV />
            <FAQ />
            <Donations />
            <Contact />
            <Footer />
            <DonationModal />
        </>
    );
}
