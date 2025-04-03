"use client"

import { motion } from "framer-motion"
import { AnimatedSection } from "./animations"

export function TrustedBy() {
  // Sample logos - in a real implementation, these would be actual images
  const trustedCompanies = [
    { name: "Harvard University", logo: "H" },
    { name: "Stanford University", logo: "S" },
    { name: "MIT", logo: "MIT" },
    { name: "University of California", logo: "UC" },
    { name: "Yale University", logo: "Y" },
    { name: "Princeton University", logo: "P" },
  ]

  return (
    <section className="py-12 border-t border-b border-border/10 bg-muted/10">
      <div className="container">
        <AnimatedSection className="text-center mb-8">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Trusted by leading institutions
          </p>
        </AnimatedSection>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {trustedCompanies.map((company, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-center"
            >
              <div className="h-12 w-auto flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
                {/* In a real implementation, this would be an image */}
                <div className="bg-muted/50 h-12 w-24 md:w-32 rounded-md flex items-center justify-center text-xl font-bold text-muted-foreground">
                  {company.logo}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

