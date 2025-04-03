import React from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GeneralErrorProps {
  error: Error;
  reset?: () => void;
}

export const GeneralError = ({ error, reset }: GeneralErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-4">
      <AlertCircle className="h-16 w-16 text-destructive mb-4" />
      <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        {error.message || "An unexpected error occurred. Please try again later."}
      </p>
      {reset && (
        <Button onClick={reset} variant="default">
          Try Again
        </Button>
      )}
    </div>
  );
};
