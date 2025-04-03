import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  icon?: ReactNode;
}

export const EmptyState = ({
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  icon,
}: EmptyStateProps) => {
  const ActionButton = () => {
    if (!actionLabel) return null;

    if (actionHref) {
      return (
        <Button asChild>
          <Link to={actionHref}>{actionLabel}</Link>
        </Button>
      );
    }

    return <Button onClick={onAction}>{actionLabel}</Button>;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] text-center p-4 rounded-lg border bg-card">
      {icon && <div className="mb-4">{icon}</div>}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
      <ActionButton />
    </div>
  );
};
