import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroProps {
  title?: string;
  subtitle?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  features?: string[];
}

const Hero = ({
  title = "Transform Your Credential Evaluation Process",
  subtitle = "OpenEval empowers universities and law firms with AI-powered international credential evaluations, providing accurate US equivalency assessments in minutes, not weeks.",
  primaryCTA = "Get Started",
  secondaryCTA = "Learn More",
  features = [
    "AI-powered credential analysis",
    "Instant US equivalency reports",
    "Secure document management",
    "Collaborative evaluation workflow",
  ],
}: HeroProps) => {
  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left content */}
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">{subtitle}</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
              {primaryCTA} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-300"
              asChild
            >
              <Link to="/dashboard" className="flex items-center">
                Take a Tour <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="pt-4">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right content - Real Dashboard Image */}
        <div className="flex-1 relative">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
            <div className="bg-indigo-600 p-4 text-white font-medium">
              Credential Evaluation Dashboard
            </div>
            <div className="overflow-hidden">
              <img
                src="/dashboard-screenshot.png"
                alt="OpenEval Dashboard Interface"
                className="w-full h-auto object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80";
                }}
              />
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-indigo-100 rounded-full z-[-1]"></div>
          <div className="absolute -top-6 -left-6 w-16 h-16 bg-indigo-200 rounded-full z-[-1]"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
