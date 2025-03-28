import React from "react";
import { User, Building2, GraduationCap } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  institution: string;
  avatarUrl?: string;
  type: "university" | "law";
}

const Testimonial = ({
  quote = "OpenCred has transformed how we evaluate international credentials. The AI-powered analysis saves us countless hours and provides consistent results.",
  author = "Jane Smith",
  role = "Admissions Director",
  institution = "State University",
  avatarUrl,
  type = "university",
}: TestimonialProps) => {
  return (
    <Card className="h-full bg-white border border-gray-200">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="mb-4 text-gray-600">
          <svg
            className="h-8 w-8 text-primary/70 mb-2"
            fill="currentColor"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
          <p className="text-base leading-relaxed">{quote}</p>
        </div>
        <div className="mt-auto flex items-center">
          <Avatar className="h-10 w-10 mr-3 border border-gray-200">
            <AvatarImage src={avatarUrl} alt={author} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {author
                .split(" ")
                .map((name) => name[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{author}</p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              {role} • {institution}
              {type === "university" ? (
                <GraduationCap className="h-3 w-3" />
              ) : (
                <Building2 className="h-3 w-3" />
              )}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Testimonials = () => {
  const testimonials: TestimonialProps[] = [
    {
      quote:
        "OpenCred has transformed how we evaluate international credentials. The AI-powered analysis saves us countless hours and provides consistent results.",
      author: "Jane Smith",
      role: "Admissions Director",
      institution: "State University",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      type: "university",
    },
    {
      quote:
        "The platform's intuitive interface makes it easy for our team to manage student documents and track evaluation progress. It's been a game-changer for our international admissions process.",
      author: "Michael Johnson",
      role: "Dean of Admissions",
      institution: "Pacific Law School",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      type: "law",
    },
    {
      quote:
        "We've reduced our credential evaluation time by 75% since implementing OpenCred. The accuracy of the AI analysis is impressive and has helped us make better admissions decisions.",
      author: "Sarah Williams",
      role: "International Student Coordinator",
      institution: "Tech Institute",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      type: "university",
    },
    {
      quote:
        "OpenCred provides detailed equivalency reports that are easy to understand and share with our admissions committee. The collaborative tools have streamlined our entire workflow.",
      author: "David Chen",
      role: "Managing Partner",
      institution: "Global Legal Associates",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      type: "law",
    },
    {
      quote:
        "The security features give us peace of mind when handling sensitive student documents. OpenCred has thought of everything an institution needs for credential evaluation.",
      author: "Emily Rodriguez",
      role: "Registrar",
      institution: "Metropolitan University",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      type: "university",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by leading universities and law firms around the world to
            streamline their credential evaluation process.
          </p>
        </div>

        <div className="relative px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3 pl-4 pr-4"
                >
                  <Testimonial {...testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-6" />
            <CarouselNext className="-right-6" />
          </Carousel>
        </div>

        <div className="mt-12 text-center">
          <div className="flex justify-center items-center space-x-8">
            <div className="flex items-center">
              <GraduationCap className="h-5 w-5 mr-2 text-primary" />
              <span className="text-sm font-medium">50+ Universities</span>
            </div>
            <div className="flex items-center">
              <Building2 className="h-5 w-5 mr-2 text-primary" />
              <span className="text-sm font-medium">30+ Law Firms</span>
            </div>
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2 text-primary" />
              <span className="text-sm font-medium">10,000+ Evaluations</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
