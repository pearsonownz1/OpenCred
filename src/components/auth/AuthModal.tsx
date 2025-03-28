import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Lock, User, CheckCircle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const signUpSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

interface AuthModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  defaultTab?: "signIn" | "signUp";
}

const AuthModal = ({
  isOpen = true,
  onClose = () => {},
  defaultTab = "signIn",
}: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<
    "signIn" | "signUp" | "verification"
  >(defaultTab);
  const [email, setEmail] = useState("");

  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSignInSubmit = (values: z.infer<typeof signInSchema>) => {
    console.log("Sign in values:", values);
    // Handle sign in logic here
  };

  const onSignUpSubmit = (values: z.infer<typeof signUpSchema>) => {
    console.log("Sign up values:", values);
    setEmail(values.email);
    setActiveTab("verification");
    // Handle sign up logic here
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            {activeTab === "signIn"
              ? "Welcome Back"
              : activeTab === "signUp"
                ? "Create an Account"
                : "Verify Your Email"}
          </DialogTitle>
          <DialogDescription className="text-center mb-4">
            {activeTab === "signIn"
              ? "Sign in to access your OpenCred account"
              : activeTab === "signUp"
                ? "Join OpenCred to start evaluating credentials"
                : "We sent a verification link to your email"}
          </DialogDescription>
        </DialogHeader>

        {activeTab !== "verification" && (
          <Tabs
            defaultValue={activeTab}
            className="w-full"
            onValueChange={(value) =>
              setActiveTab(value as "signIn" | "signUp")
            }
          >
            <TabsList className="grid grid-cols-2 w-full mb-6">
              <TabsTrigger value="signIn">Sign In</TabsTrigger>
              <TabsTrigger value="signUp">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signIn" className="space-y-4">
              <Form {...signInForm}>
                <form
                  onSubmit={signInForm.handleSubmit(onSignInSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={signInForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <FormControl>
                            <Input
                              placeholder="email@example.com"
                              className="pl-10"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signInForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              className="pl-10"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="text-right">
                    <Button variant="link" className="p-0 h-auto" type="button">
                      Forgot password?
                    </Button>
                  </div>
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="signUp" className="space-y-4">
              <Form {...signUpForm}>
                <form
                  onSubmit={signUpForm.handleSubmit(onSignUpSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={signUpForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <FormControl>
                            <Input
                              placeholder="John Doe"
                              className="pl-10"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signUpForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <FormControl>
                            <Input
                              placeholder="email@example.com"
                              className="pl-10"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signUpForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              className="pl-10"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signUpForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              className="pl-10"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Create Account
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        )}

        {activeTab === "verification" && (
          <div className="space-y-6 py-4">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="rounded-full bg-primary/10 p-4">
                <CheckCircle className="h-12 w-12 text-primary" />
              </div>
              <p className="text-center text-sm text-muted-foreground">
                We've sent a verification link to{" "}
                <span className="font-medium text-foreground">{email}</span>.
                Please check your inbox and click the link to verify your email
                address.
              </p>
            </div>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setActiveTab("signIn")}
              >
                Back to Sign In
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Didn't receive an email?{" "}
                <Button variant="link" className="p-0 h-auto text-xs">
                  Resend verification email
                </Button>
              </p>
            </div>
          </div>
        )}

        <div className="mt-4 text-center text-sm text-muted-foreground">
          {activeTab === "signIn" ? (
            <p>
              Don't have an account?{" "}
              <Button
                variant="link"
                className="p-0 h-auto"
                onClick={() => setActiveTab("signUp")}
              >
                Sign up
              </Button>
            </p>
          ) : activeTab === "signUp" ? (
            <p>
              Already have an account?{" "}
              <Button
                variant="link"
                className="p-0 h-auto"
                onClick={() => setActiveTab("signIn")}
              >
                Sign in
              </Button>
            </p>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
