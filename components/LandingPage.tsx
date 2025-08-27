import { ArrowRight, MessageCircle, Users, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const LandingPage = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "Smart FAQ Assistant",
      description: "Get instant answers to common Nigerian business questions"
    },
    {
      icon: Users,
      title: "Local Business Focus",
      description: "Tailored specifically for Nigerian business regulations and practices"
    },
    {
      icon: Shield,
      title: "Reliable Information",
      description: "Verified answers from trusted business sources and experts"
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Access business guidance anytime, anywhere you need it"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            BizBot
          </h1>
          <p className="text-xl md:text-2xl mb-4 opacity-90">
            Nigerian Business FAQ Assistant
          </p>
          <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
            Get instant, reliable answers to your Nigerian business questions. 
            From registration to compliance, we&#39;ve got you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="primary-gradient hover-lift">
              <Link href="/signup">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="default" className="hover-lift">
              <Link href="/login">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose BizBot?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Designed specifically for Nigerian entrepreneurs and business owners
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover-lift border-0 shadow-lg">
                <div className="w-12 h-12 primary-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-light py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of Nigerian business owners who trust BizBot for their business guidance.
          </p>
          <Button asChild size="lg" className="primary-gradient hover-lift">
            <Link href="/signup">
              Start Chatting Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 BizBot - Nigerian Business FAQ Assistant. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;