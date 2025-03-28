import React from "react";
import { Book, FileQuestion, Headphones, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ResourceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
}

const ResourceCard = ({
  icon = <Book className="h-8 w-8 text-primary" />,
  title = "Resource Title",
  description = "Description of the resource and how it can help users.",
  linkText = "Learn More",
  linkUrl = "#",
}: ResourceCardProps) => {
  return (
    <Card className="flex flex-col h-full bg-white">
      <CardHeader>
        <div className="mb-2">{icon}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow"></CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full group" asChild>
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            {linkText}
            <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

const Resources = () => {
  const resources = [
    {
      icon: <Book className="h-8 w-8 text-primary" />,
      title: "Documentation",
      description:
        "Comprehensive guides on how to use OpenCred for credential evaluations.",
      linkText: "View Documentation",
      linkUrl: "/docs",
    },
    {
      icon: <FileQuestion className="h-8 w-8 text-primary" />,
      title: "FAQs",
      description:
        "Answers to commonly asked questions about our platform and services.",
      linkText: "Browse FAQs",
      linkUrl: "/faqs",
    },
    {
      icon: <Headphones className="h-8 w-8 text-primary" />,
      title: "Support",
      description: "Get help from our team of credential evaluation experts.",
      linkText: "Contact Support",
      linkUrl: "/support",
    },
  ];

  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Resources</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access helpful resources to make the most of the OpenCred platform
            for your credential evaluation needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <ResourceCard key={index} {...resource} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;
