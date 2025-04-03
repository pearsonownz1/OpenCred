"use client"

import { type ReactNode, useRef } from "react"
import { motion, useInView, type Variant } from "framer-motion"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
}

export function AnimatedSection({ children, className, delay = 0, direction = "up" }: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const getDirectionVariants = () => {
    const variants: Record<string, Variant> = {
      hidden: {},
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
          duration: 0.5,
          delay: delay,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    }

    if (direction === "up") {
      variants.hidden = { opacity: 0, y: 40 }
    } else if (direction === "down") {
      variants.hidden = { opacity: 0, y: -40 }
    } else if (direction === "left") {
      variants.hidden = { opacity: 0, x: 40 }
    } else if (direction === "right") {
      variants.hidden = { opacity: 0, x: -40 }
    } else {
      variants.hidden = { opacity: 0 }
    }

    return variants
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getDirectionVariants()}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedText({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggeredContainer({
  children,
  className,
  delay = 0,
  staggerChildren = 0.1,
}: {
  children: ReactNode
  className?: string
  delay?: number
  staggerChildren?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerChildren,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggeredItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  )
}

