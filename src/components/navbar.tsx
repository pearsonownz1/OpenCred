"use client"

import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, LogIn, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { smoothScrollTo } from "@/lib/smooth-scroll"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const handleScroll = () => {
      // Update scrolled state
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Update active section based on new structure
      const sections = [
        "hero",
        "problem",
        "solution",
        "benefits",
        "qualification",
        "offer",
        "testimonials",
        "pricing",
        "guarantee",
        "faq",
      ]

      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (!element) return false

        const rect = element.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setIsMenuOpen(false)
    setActiveSection(id)
    smoothScrollTo(id)
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full pt-4 px-4"
    >
      <div
        className={`
          flex items-center justify-between w-full max-w-7xl 
          rounded-full px-6 py-2.5 transition-all duration-300
          ${
            isScrolled
              ? "bg-background/90 backdrop-blur-md shadow-md"
              : "bg-gradient-to-r from-background/80 to-background/90 backdrop-blur-sm shadow-sm"
          }
        `}
      >
        <RouterLink to="/" className="flex items-center space-x-2">
          <div className="bg-primary rounded-md w-8 h-8 flex items-center justify-center">
            <span className="text-primary-foreground font-bold">O</span>
          </div>
          <span className="text-xl font-bold">OpenEval</span>
        </RouterLink>

        <nav className="hidden md:flex items-center gap-8">
          <div className="relative">
            <RouterLink to="#problem" className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === "problem" ? "text-primary" : ""}`} onClick={(e) => handleNavClick(e, "problem")}>
              Problem
              {activeSection === "problem" && (
                <motion.div
                  className="absolute -top-2 left-0 w-4 h-2 bg-primary rounded-t-none rounded-b-full"
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
              )}
            </RouterLink>
          </div>

          <div className="relative">
            <RouterLink to="#solution" className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === "solution" ? "text-primary" : ""}`} onClick={(e) => handleNavClick(e, "solution")}>
              Solution
              {activeSection === "solution" && (
                <motion.div
                  className="absolute -top-2 left-0 w-4 h-2 bg-primary rounded-t-none rounded-b-full"
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
              )}
            </RouterLink>
          </div>

          <div className="relative">
            <RouterLink to="#benefits" className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === "benefits" ? "text-primary" : ""}`} onClick={(e) => handleNavClick(e, "benefits")}>
              Benefits
              {activeSection === "benefits" && (
                <motion.div
                  className="absolute -top-2 left-0 w-4 h-2 bg-primary rounded-t-none rounded-b-full"
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
              )}
            </RouterLink>
          </div>

          <div className="relative">
            <RouterLink to="#pricing" className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === "pricing" ? "text-primary" : ""}`} onClick={(e) => handleNavClick(e, "pricing")}>
              Pricing
              {activeSection === "pricing" && (
                <motion.div
                  className="absolute -top-2 left-0 w-4 h-2 bg-primary rounded-t-none rounded-b-full"
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
              )}
            </RouterLink>
          </div>

          <div className="relative">
            <RouterLink to="#faq" className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === "faq" ? "text-primary" : ""}`} onClick={(e) => handleNavClick(e, "faq")}>
              FAQ
              {activeSection === "faq" && (
                <motion.div
                  className="absolute -top-2 left-0 w-4 h-2 bg-primary rounded-t-none rounded-b-full"
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
              )}
            </RouterLink>
          </div>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" asChild className="hidden md:flex items-center gap-1.5">
            <RouterLink to="/login">
              <LogIn className="h-4 w-4" />
              Log In
            </RouterLink>
          </Button>
          <Button size="sm" className="hidden md:flex items-center gap-1.5" asChild>
            <RouterLink to="/dashboard">
              <ArrowRight className="h-4 w-4" />
              Get Started
            </RouterLink>
          </Button>

          <button className="flex md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden py-4 px-4 bg-background/95 backdrop-blur-md border border-border/50 rounded-xl absolute top-20 left-4 right-4 shadow-lg"
        >
          <nav className="flex flex-col gap-3">
            <RouterLink to="#problem" className={`text-sm font-medium transition-colors hover:text-primary py-2 px-3 rounded-md hover:bg-muted/50 ${activeSection === "problem" ? "text-primary bg-muted/30" : ""}`} onClick={(e) => handleNavClick(e, "problem")}>
              Problem
            </RouterLink>
            <RouterLink to="#solution" className={`text-sm font-medium transition-colors hover:text-primary py-2 px-3 rounded-md hover:bg-muted/50 ${activeSection === "solution" ? "text-primary bg-muted/30" : ""}`} onClick={(e) => handleNavClick(e, "solution")}>
              Solution
            </RouterLink>
            <RouterLink to="#benefits" className={`text-sm font-medium transition-colors hover:text-primary py-2 px-3 rounded-md hover:bg-muted/50 ${activeSection === "benefits" ? "text-primary bg-muted/30" : ""}`} onClick={(e) => handleNavClick(e, "benefits")}>
              Benefits
            </RouterLink>
            <RouterLink to="#pricing" className={`text-sm font-medium transition-colors hover:text-primary py-2 px-3 rounded-md hover:bg-muted/50 ${activeSection === "pricing" ? "text-primary bg-muted/30" : ""}`} onClick={(e) => handleNavClick(e, "pricing")}>
              Pricing
            </RouterLink>
            <RouterLink to="#faq" className={`text-sm font-medium transition-colors hover:text-primary py-2 px-3 rounded-md hover:bg-muted/50 ${activeSection === "faq" ? "text-primary bg-muted/30" : ""}`} onClick={(e) => handleNavClick(e, "faq")}>
              FAQ
            </RouterLink>
            <div className="flex flex-col gap-3 pt-2 border-t mt-2">
              <Button variant="outline" className="w-full flex items-center justify-center gap-1.5" asChild>
                <RouterLink to="/auth/login" onClick={() => setIsMenuOpen(false)}>
                  <LogIn className="h-4 w-4" />
                  Log In
                </RouterLink>
              </Button>
              <Button className="w-full flex items-center justify-center gap-1.5" asChild>
                <RouterLink to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  <ArrowRight className="h-4 w-4" />
                  Get Started
                </RouterLink>
              </Button>
            </div>
          </nav>
        </motion.div>
      )}
    </motion.header>
  )
}
