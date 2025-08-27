'use client';
import { useState } from "react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Mail, Lock, User, UserPlus, Phone, AtSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface SignupData {
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
}

const signup = async (data: SignupData) => {
  const res = await fetch("https://vit-api-ca7a.onrender.com/api/v1/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Signup failed");
  }
  return res.json();
};

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const router = useRouter();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast({
        title: "Account Created Successfully",
        description: "Welcome to BizBot! Please complete your profile.",
      });
      router.push("/profile");
    },
    onError: (error: Error) => {
      toast({
        title: "Signup Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    else if (formData.username.length < 3) newErrors.username = "Username must be at least 3 characters";
    else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) newErrors.username = "Username can only contain letters, numbers, and underscores";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    mutate({
      name: formData.fullName,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
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
              <UserPlus className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Create Your Account</CardTitle>
            <CardDescription>
              Join BizBot to get personalized Nigerian business assistance
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    className="pl-10"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    aria-describedby={errors.fullName ? "fullName-error" : undefined}
                  />
                </div>
                {errors.fullName && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription id="fullName-error">
                      {errors.fullName}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    placeholder="Choose a unique username"
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
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                </div>
                {errors.email && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription id="email-error">
                      {errors.email}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    placeholder="+234 800 000 0000"
                    className="pl-10"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                </div>
                {errors.phone && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription id="phone-error">
                      {errors.phone}
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
                    placeholder="Create a password"
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    className="pl-10"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                  />
                </div>
                {errors.confirmPassword && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription id="confirmPassword-error">
                      {errors.confirmPassword}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 mt-4">
              <Button 
                type="submit" 
                className="w-full primary-gradient hover-lift text-white"
                disabled={isPending}
              >
                {isPending ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
              
              <p className="text-sm text-muted-foreground text-center">
                Already have an account?{" "}
                <Button variant="link" asChild className="p-0 h-auto font-normal !text-primary">
                  <Link href="/login">
                    Sign in here
                  </Link>
                </Button>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;