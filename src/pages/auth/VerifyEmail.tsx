import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (!token) {
          setStatus("error");
          return;
        }
        // TODO: Implement email verification logic
        console.log("Verifying email with token:", token);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStatus("success");
      } catch (error) {
        console.error("Error verifying email:", error);
        setStatus("error");
      }
    };

    verifyEmail();
  }, [token]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Verifying your email</CardTitle>
            <CardDescription>Please wait while we verify your email address.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Verification failed</CardTitle>
            <CardDescription>
              The verification link is invalid or has expired. Please request a new verification link.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col space-y-4">
            <Button asChild className="w-full">
              <Link to="/login">Return to login</Link>
            </Button>
            <div className="text-sm text-center">
              Need a new verification link?{" "}
              <button className="text-blue-600 hover:text-blue-800">
                Resend verification email
              </button>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Email verified</CardTitle>
          <CardDescription>
            Your email has been verified successfully. You can now sign in to your account.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild className="w-full">
            <Link to="/login">Sign in</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 