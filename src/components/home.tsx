import React, { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { HeroSection } from "@/components/hero-section";
import { ProblemStatement } from "@/components/problem-statement";
import { SolutionOverview } from "@/components/solution-overview";
import { CoreFeatures } from "@/components/core-features";
import { BenefitsSection } from "@/components/benefits-section";
import { QualificationSection } from "@/components/qualification-section";
import { OfferSection } from "@/components/offer-section";
import { Testimonials } from "@/components/testimonials";
import { PricingSection } from "@/components/pricing-section";
import { FaqSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { StatsSection } from "@/components/stats-section";
import { TrustedBy } from "@/components/trusted-by";
import { HowItWorks } from "@/components/how-it-works";
import { GuaranteeSection } from "@/components/guarantee-section";
import { InstitutionSolutions } from "@/components/institution-solution";
import { CallToAction } from "@/components/call-to-action";
import AuthModal from "./auth/AuthModal";

const Home = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"signIn" | "signUp">("signIn");

  const handleOpenAuthModal = (tab: "signIn" | "signUp" = "signIn") => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar showAuthModal={handleOpenAuthModal} />
      <main className="overflow-hidden">
        {/* Above the fold */}
        <HeroSection />
        <StatsSection />

        {/* The problem section */}
        <section id="problem">
          <ProblemStatement />
        </section>

        {/* Solution and features */}
        <section id="solution">
          <SolutionOverview />
          <CoreFeatures />
          <HowItWorks />
        </section>

        {/* Benefits and qualifications */}
        <section id="benefits">
          <BenefitsSection />
        </section>

        <section id="qualification">
          <QualificationSection />
        </section>

        {/* Institution solution */}
        <section id="institutions">
          <InstitutionSolutions />
        </section>

        {/* Offer and pricing */}
        <section id="offer">
          <OfferSection />
          <CallToAction />
        </section>

        {/* Social proof */}
        <section id="testimonials">
          <Testimonials />
        </section>

        {/* Pricing plans */}
        <section id="pricing">
          <PricingSection />
        </section>

        {/* FAQ */}
        <section id="faq">
          <FaqSection />
        </section>
      </main>

      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleCloseAuthModal}
        defaultTab={authModalTab}
      />
    </div>
  );
};

export default Home;
