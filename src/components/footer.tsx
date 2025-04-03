"use client"

import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram, Mail, MapPin, Phone, ArrowRight } from "lucide-react"

// Update the footer to remove the "stay updated" form and add colored circle backgrounds to social links
export function Footer() {
  // Footer columns
  const footerColumns = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "Solutions", href: "#solutions" },
        { name: "How It Works", href: "#how-it-works" },
        { name: "Pricing", href: "#" },
        { name: "Case Studies", href: "#" },
      ],
      color: "bg-blue-500",
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Contact", href: "#" },
        { name: "Partners", href: "#" },
      ],
      color: "bg-green-500",
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#" },
        { name: "Help Center", href: "#" },
        { name: "API Reference", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
      ],
      color: "bg-orange-500",
    },
  ]

  // Social media links with colors
  const socialLinks = [
    { icon: Facebook, href: "#", bgColor: "bg-blue-500", hoverBgColor: "hover:bg-blue-600", label: "Facebook" },
    { icon: Twitter, href: "#", bgColor: "bg-blue-400", hoverBgColor: "hover:bg-blue-500", label: "Twitter" },
    { icon: Linkedin, href: "#", bgColor: "bg-blue-600", hoverBgColor: "hover:bg-blue-700", label: "LinkedIn" },
    { icon: Instagram, href: "#", bgColor: "bg-pink-500", hoverBgColor: "hover:bg-pink-600", label: "Instagram" },
  ]

  return (
    <footer className="bg-muted py-20 border-t relative overflow-hidden">
      {/* Add decorative orbs */}
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-blue-500/10 orb orb-large"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 rounded-full bg-green-500/10 orb orb-medium"></div>
      <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-orange-500/10 orb orb-small"></div>
      <div className="absolute bottom-1/4 left-1/3 w-8 h-8 rounded-full bg-purple-500/10 orb orb-tiny"></div>

      <div className="container relative z-10">
        {/* Top section with logo and description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 pb-16 border-b">
          {/* Logo and description */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary rounded-md w-10 h-10 flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">O</span>
              </div>
              <span className="text-2xl font-bold">OpenEval</span>
            </div>

            <p className="text-muted-foreground max-w-md">
              Transforming international credential evaluation with AI-powered solutions. OpenEval helps institutions
              process and verify international academic credentials with speed, accuracy, and confidence.
            </p>

            {/* Contact information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-5 w-5 text-blue-500" />
                <span>contact@openeval.com</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-5 w-5 text-green-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground md:col-span-2">
                <MapPin className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <span>123 Evaluation St, San Francisco, CA 94103</span>
              </div>
            </div>
          </div>

          {/* Social media links with colored circle backgrounds */}
          <div className="flex flex-col items-start lg:items-end justify-center">
            <h3 className="text-xl font-bold mb-6">Connect With Us</h3>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  to={social.href}
                  className={`${social.bgColor} ${social.hoverBgColor} text-white p-3 rounded-full transition-colors`}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer navigation columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
          {footerColumns.map((column, index) => (
            <div key={index} className="space-y-6 relative pt-8">
              {/* Colored orb indicator */}
              <div
                className={`absolute top-0 left-0 w-10 h-10 rounded-full ${column.color} transform -translate-y-1/2`}
              ></div>

              <h3 className="text-lg font-bold">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="h-4 w-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section with copyright and additional links */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p> 2024 OpenEval. All rights reserved.</p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="hover:text-primary transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
