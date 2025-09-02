"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Mail, Lock, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

interface SignInData {
  username: string;
  password: string;
}

const signin = async (data: SignInData) => {
  console.log("Sending signin data:", data);

  const res = await fetch("/api/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  console.log("Response status:", res.status);

  if (!res.ok) {
    let errorMsg = `Signin failed with status ${res.status}`;
    try {
      const error = await res.json();
      console.log("Error response:", error);
      errorMsg = error.message || error.error || error.detail || errorMsg;
    } catch (e) {
      console.error("Error parsing error response:", e);
    }
    throw new Error(errorMsg);
  }

  return res.json();
};



const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const router = useRouter();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: signin, 
    onSuccess: () => {
      toast({
        title: "Login Successful",
        description: "Welcome back to BizAI!",
      });
      router.push("/profile");
    },
    onError: (error: Error) => {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.username) {
      newErrors.username = "username is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.username)) {
      newErrors.username = "username is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    mutate({
      username: formData.username,
      password: formData.password,
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Landing */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center">
            <div className="w-16 h-16 primary-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your BizAi account to continue
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    aria-describedby={errors.username ? "username-error" : undefined}
                  />
                </div>
                {errors.username && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription id="username-error">
                      {errors.username}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    aria-describedby={errors.password ? "password-error" : undefined}
                  />
                </div>
                {errors.password && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription id="password-error">
                      {errors.password}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full primary-gradient hover-lift"
                disabled={isPending}
              >
                {isPending ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
              
              <p className="text-sm text-muted-foreground text-center">
                New to BizAi?{" "}
                <Button variant="link" asChild className="p-0 h-auto font-normal text-primary">
                  <Link href="/signup">Create an account</Link>
                </Button>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;