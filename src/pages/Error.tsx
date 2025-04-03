import React from "react";
import { useRouteError } from "react-router-dom";
import { GeneralError } from "@/components/errors/general-error";

export default function ErrorPage() {
  const error = useRouteError() as Error;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <GeneralError error={error} />
    </div>
  );
}
