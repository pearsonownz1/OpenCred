import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface NavbarProps {
  showAuthModal?: () => void;
}

const Navbar = ({ showAuthModal = () => {} }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container flex items-center justify-between h-20 px-4 mx-auto">
        {/* Logo */}
        <Link to="/">
          <Logo className="text-2xl" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {/* Solutions Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-1">
                <span>Solutions</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link to="/solutions/universities" className="w-full">
                  For Universities
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/solutions/law-firms" className="w-full">
                  For Law Firms
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/solutions/case-studies" className="w-full">
                  Case Studies
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Features Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-1">
                <span>Features</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link to="/features/ai-evaluation" className="w-full">
                  AI-Powered Evaluation
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/features/document-management" className="w-full">
                  Document Management
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/features/collaboration" className="w-full">
                  Collaboration Tools
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Resources Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-1">
                <span>Resources</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link to="/resources/documentation" className="w-full">
                  Documentation
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/resources/faqs" className="w-full">
                  FAQs
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/resources/support" className="w-full">
                  Support
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Authentication Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" onClick={showAuthModal}>
            Sign In
          </Button>
          <Button onClick={showAuthModal}>Sign Up</Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-600" />
          ) : (
            <Menu className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden bg-white border-t border-gray-200 transition-all duration-300 ease-in-out overflow-hidden",
          isMenuOpen ? "max-h-screen py-4" : "max-h-0",
        )}
      >
        <div className="container px-4 mx-auto space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">Solutions</p>
            <Link
              to="/solutions/universities"
              className="block px-2 py-1 text-sm hover:text-primary"
            >
              For Universities
            </Link>
            <Link
              to="/solutions/law-firms"
              className="block px-2 py-1 text-sm hover:text-primary"
            >
              For Law Firms
            </Link>
            <Link
              to="/solutions/case-studies"
              className="block px-2 py-1 text-sm hover:text-primary"
            >
              Case Studies
            </Link>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">Features</p>
            <Link
              to="/features/ai-evaluation"
              className="block px-2 py-1 text-sm hover:text-primary"
            >
              AI-Powered Evaluation
            </Link>
            <Link
              to="/features/document-management"
              className="block px-2 py-1 text-sm hover:text-primary"
            >
              Document Management
            </Link>
            <Link
              to="/features/collaboration"
              className="block px-2 py-1 text-sm hover:text-primary"
            >
              Collaboration Tools
            </Link>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">Resources</p>
            <Link
              to="/resources/documentation"
              className="block px-2 py-1 text-sm hover:text-primary"
            >
              Documentation
            </Link>
            <Link
              to="/resources/faqs"
              className="block px-2 py-1 text-sm hover:text-primary"
            >
              FAQs
            </Link>
            <Link
              to="/resources/support"
              className="block px-2 py-1 text-sm hover:text-primary"
            >
              Support
            </Link>
          </div>

          <div className="pt-4 space-y-3">
            <Button
              variant="outline"
              className="w-full"
              onClick={showAuthModal}
            >
              Sign In
            </Button>
            <Button className="w-full" onClick={showAuthModal}>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
