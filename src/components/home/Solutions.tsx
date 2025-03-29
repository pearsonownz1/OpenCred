import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Building2,
  GraduationCap,
  Scale,
  FileCheck,
  Brain,
  Globe,
} from "lucide-react";

interface SolutionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SolutionCard = ({ icon, title, description = "" }: SolutionCardProps) => {
  return (
    <Card className="bg-white hover:shadow-lg transition-shadow duration-300 h-full">
      <CardHeader>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
          {icon}
        </div>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

interface SolutionsProps {
  title?: string;
  subtitle?: string;
  solutions?: SolutionCardProps[];
}

const Solutions = ({
  title = "Solutions for Every Institution",
  subtitle = "OpenEval provides specialized credential evaluation solutions tailored to your organization's needs.",
  solutions = [
    {
      icon: <GraduationCap size={24} />,
      title: "Universities & Colleges",
      description:
        "Streamline international student admissions with automated credential evaluations that provide accurate US equivalency assessments.",
    },
    {
      icon: <Building2 size={24} />,
      title: "Community Colleges",
      description:
        "Efficiently process transfer credits and international credentials to help students transition smoothly into your programs.",
    },
    {
      icon: <Scale size={24} />,
      title: "Law Firms",
      description:
        "Conduct thorough credential evaluations for immigration cases, ensuring compliance with all legal requirements.",
    },
    {
      icon: <FileCheck size={24} />,
      title: "Licensing Boards",
      description:
        "Verify international qualifications for professional licensing with comprehensive and reliable evaluations.",
    },
    {
      icon: <Brain size={24} />,
      title: "AI-Powered Analysis",
      description:
        "Leverage advanced AI technology to automatically analyze and evaluate international credentials with high accuracy.",
    },
    {
      icon: <Globe size={24} />,
      title: "Global Coverage",
      description:
        "Access evaluations for credentials from over 200 countries and educational systems worldwide.",
    },
  ],
}: SolutionsProps) => {
  return (
    <section className="py-20 px-4 md:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <SolutionCard
              key={index}
              icon={solution.icon}
              title={solution.title}
              description={solution.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
