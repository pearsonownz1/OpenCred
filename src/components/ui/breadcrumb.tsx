import * as React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

interface BreadcrumbProps {
  children?: React.ReactNode;
  className?: string;
}

interface BreadcrumbListProps {
  children?: React.ReactNode;
  className?: string;
}

interface BreadcrumbItemProps {
  children?: React.ReactNode;
  className?: string;
}

interface BreadcrumbLinkProps
  extends React.ComponentPropsWithoutRef<typeof Link> {
  asChild?: boolean;
  children?: React.ReactNode;
  className?: string;
}

interface BreadcrumbPageProps {
  children?: React.ReactNode;
  className?: string;
}

interface BreadcrumbSeparatorProps {
  children?: React.ReactNode;
  className?: string;
}

function Breadcrumb({ children, className, ...props }: BreadcrumbProps) {
  return (
    <nav
      aria-label="breadcrumb"
      className={cn("flex flex-wrap items-center", className)}
      {...props}
    >
      {children}
    </nav>
  );
}

function BreadcrumbList({
  children,
  className,
  ...props
}: BreadcrumbListProps) {
  return (
    <ol
      className={cn("flex flex-wrap items-center gap-1.5 break-words", className)}
      {...props}
    >
      {children}
    </ol>
  );
}

function BreadcrumbItem({
  children,
  className,
  ...props
}: BreadcrumbItemProps) {
  return (
    <li className={cn("inline-flex items-center gap-1.5", className)} {...props}>
      {children}
    </li>
  );
}

function BreadcrumbLink({
  children,
  className,
  asChild = false,
  ...props
}: BreadcrumbLinkProps) {
  const Comp = asChild ? Slot : Link;

  return (
    <Comp
      className={cn("text-muted-foreground hover:text-foreground", className)}
      {...props}
    >
      {children}
    </Comp>
  );
}

function BreadcrumbPage({
  children,
  className,
  ...props
}: BreadcrumbPageProps) {
  return (
    <span
      className={cn("text-foreground font-medium", className)}
      aria-current="page"
      {...props}
    >
      {children}
    </span>
  );
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: BreadcrumbSeparatorProps) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children || <ChevronRight className="text-muted-foreground" />}
    </li>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
