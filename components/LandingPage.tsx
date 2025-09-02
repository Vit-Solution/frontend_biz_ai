import { ArrowRight, MessageCircle, Users, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { Badge } from './ui/badge';

const LandingPage = () => {
  const stats = [
    { number: '10,000+', label: 'Business Questions Answered' },
    { number: '5,000+', label: 'Nigerian Entrepreneurs Helped' },
    { number: '98%', label: 'Customer Satisfaction Rate' },
  ];

  const features = [
    {
      icon: MessageCircle,
      title: 'Smart FAQ Assistant',
      description: 'Get instant answers to common Nigerian business questions',
    },
    {
      icon: Users,
      title: 'Local Business Focus',
      description:
        'Tailored specifically for Nigerian business regulations and practices',
    },
    {
      icon: Shield,
      title: 'Reliable Information',
      description: 'Verified answers from trusted business sources and experts',
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Access business guidance anytime, anywhere you need it',
    },
  ];

  const faqs = [
    {
      question: "How accurate is BizAi's business advice?",
      answer:
        'Our AI is trained on official Nigerian business regulations, CAC guidelines, and FIRS requirements. All information is regularly updated and verified by local business experts.',
    },
    {
      question: 'Can BizAi help with business registration?',
      answer:
        'Yes! BizAi provides complete guidance on CAC registration, including business name search, document preparation, and submission process.',
    },
    {
      question: 'Is my business information secure?',
      answer:
        'Absolutely. We use enterprise-grade security measures to protect your data. Your conversations and business information are encrypted and never shared.',
    },
    {
      question: 'What types of businesses does BizAi support?',
      answer:
        'BizAi supports all types of Nigerian businesses - from sole proprietorships to limited companies, across all industries and sectors.',
    },
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Ask Your Question',
      description:
        'Simply type your Nigerian business question in our chat interface',
    },
    {
      step: '2',
      title: 'Get Instant Answer',
      description:
        'Our AI analyzes your question and provides accurate, Nigeria-specific guidance',
    },
    {
      step: '3',
      title: 'Take Action',
      description:
        'Follow the clear, actionable steps provided to move your business forward',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-white/20 text-white border-white/30">
            Nigeria&apos;s #1 Business Assistant
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">BizAi</h1>
          <p className="text-xl md:text-2xl mb-4 opacity-90">
            Nigerian Business FAQ Assistant
          </p>
          <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
            Get instant, reliable answers to your Nigerian business questions.
            From CAC registration to tax compliance, we&apos;ve got you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="primary-gradient hover-lift">
              <Link href="/chats">
                Try BizAi Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            {/* <Button asChild size="lg" variant="hero" className="hover-lift">
              <Link href="/chat">Get Started for free</Link>
            </Button> */}
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose BizAI?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Designed specifically for Nigerian entrepreneurs and business
              owners
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 text-center hover-lift border-0 shadow-lg"
              >
                <div className="w-12 h-12 primary-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How BizAi Works */}
      <section className="py-20 px-4 hero-gradient">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How BizAi Works
            </h2>
            <p className="text-xl text-white max-w-2xl mx-auto">
              Get business guidance in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 primary-gradient rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {step.title}
                </h3>
                <p className="text-white">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Quick answers to common questions about BizAi
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6 border-0 shadow-lg">
                <h3 className="text-lg font-semibold mb-3 text-foreground">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-gradient text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of Nigerian business owners who trust BizAi for
            their business guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
            >
              <Link href="/signup">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button> */}
            <Button asChild size="lg" variant="hero" className="hover-lift">
              <Link href="/chats">Ask BizAi Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 BizAI - Nigerian Business FAQ Assistant. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
