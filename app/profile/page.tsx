'use client';
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, User, Save, Building2, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    businessType: "",
    businessDescription: "",
    location: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate save process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been saved successfully!",
      });
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const businessTypes = [
    "Sole Proprietorship",
    "Partnership", 
    "Limited Liability Company",
    "Public Limited Company",
    "Non-Profit Organization",
    "Other"
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-2xl">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" asChild>
            <Link href="/chat">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Chat
            </Link>
          </Button>
          <Button asChild>
            <Link href="/faq-topics">FAQ Topics</Link>
          </Button>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center">
            <div className="w-16 h-16 primary-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Your Profile</CardTitle>
            <CardDescription>
              Update your business information to get more personalized assistance
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <User className="mr-2 h-5 w-5 text-primary" />
                  Personal Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
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
                      />
                    </div>
                  </div>
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
                    />
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Building2 className="mr-2 h-5 w-5 text-primary" />
                  Business Information
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    placeholder="Enter your business name"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange("businessName", e.target.value)}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type</Label>
                    <select
                      id="businessType"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      value={formData.businessType}
                      onChange={(e) => handleInputChange("businessType", e.target.value)}
                    >
                      <option value="">Select business type</option>
                      {businessTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="City, State"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessDescription">Business Description</Label>
                  <Textarea
                    id="businessDescription"
                    placeholder="Briefly describe your business and what you do..."
                    className="min-h-[100px] resize-y"
                    value={formData.businessDescription}
                    onChange={(e) => handleInputChange("businessDescription", e.target.value)}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full primary-gradient hover-lift"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving Profile...
                  </div>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Profile
                  </>
                )}
              </Button>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;