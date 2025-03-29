import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Brain,
  FileText,
  Users,
  Shield,
  BarChart,
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({
  icon,
  title,
  description = "Feature description",
}: FeatureCardProps) => {
  return (
    <div className="flex flex-col p-6 rounded-lg border border-border bg-card shadow-sm hover:shadow-md transition-all duration-200">
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <Button
        variant="ghost"
        className="w-fit p-0 h-auto text-primary flex items-center gap-1 mt-auto group"
      >
        Learn more{" "}
        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Evaluation",
      description:
        "Our advanced AI analyzes international credentials and generates accurate US equivalency reports in minutes.",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Document Management",
      description:
        "Securely store, organize, and access all student documents with our intuitive document management system.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Collaboration Tools",
      description:
        "Work together seamlessly with team members on evaluations with real-time collaboration features.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure & Compliant",
      description:
        "Rest easy knowing all data is encrypted and our platform meets the highest security standards.",
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: "Detailed Analytics",
      description:
        "Gain insights into evaluation trends and processing times with comprehensive analytics.",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Custom Reports",
      description:
        "Generate branded, professional reports that can be easily shared with students and institutions.",
    },
  ];

  return (
    <section className="w-full py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for Modern Credential Evaluation
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            OpenEval combines cutting-edge technology with intuitive design to
            streamline your credential evaluation process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" className="rounded-full">
            Explore All Features <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Features;
