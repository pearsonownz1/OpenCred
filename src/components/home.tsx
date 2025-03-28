import React, { useState } from "react";
import { Dialog } from "@/components/ui/dialog";

// Import components
import Navbar from "./layout/Navbar";
import Hero from "./home/Hero";
import Solutions from "./home/Solutions";
import Features from "./home/Features";
import Testimonials from "./home/Testimonials";
import Resources from "./home/Resources";
import Footer from "./layout/Footer";
import AuthModal from "./auth/AuthModal";

const Home = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"signIn" | "signUp">(
    "signIn",
  );

  const handleOpenAuthModal = (tab: "signIn" | "signUp" = "signIn") => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar showAuthModal={handleOpenAuthModal} />

      {/* Hero Section */}
      <Hero />

      {/* Solutions Section */}
      <Solutions />

      {/* Features Section */}
      <Features />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Resources Section */}
      <Resources />

      {/* Footer */}
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
