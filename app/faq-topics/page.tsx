'use client';
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, MessageCircle, FileText, Users, Building2, Scale, CreditCard, TrendingUp, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

const FAQTopicsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const faqTopics = [
    {
      id: "business-registration",
      title: "Business Registration",
      description: "CAC registration, business names, incorporation procedures",
      icon: Building2,
      questionsCount: 15,
      color: "bg-blue-100 text-blue-800"
    },
    {
      id: "tax-compliance",
      title: "Tax & Compliance",
      description: "FIRS registration, VAT, company income tax, PAYE",
      icon: Scale,
      questionsCount: 22,
      color: "bg-green-100 text-green-800"
    },
    {
      id: "permits-licenses",
      title: "Permits & Licenses",
      description: "Trade permits, NAFDAC, SON, professional licenses",
      icon: FileText,
      questionsCount: 18,
      color: "bg-purple-100 text-purple-800"
    },
    {
      id: "employment-law",
      title: "Employment & Labor",
      description: "Hiring, contracts, pension, minimum wage, labor laws",
      icon: Users,
      questionsCount: 12,
      color: "bg-orange-100 text-orange-800"
    },
    {
      id: "banking-finance",
      title: "Banking & Finance",
      description: "Business accounts, loans, forex, CBN regulations",
      icon: CreditCard,
      questionsCount: 20,
      color: "bg-indigo-100 text-indigo-800"
    },
    {
      id: "insurance",
      title: "Insurance",
      description: "Business insurance, employee benefits, NAICOM",
      icon: Shield,
      questionsCount: 8,
      color: "bg-red-100 text-red-800"
    },
    {
      id: "import-export",
      title: "Import & Export",
      description: "Customs, NAFDAC, SON, export procedures, trade",
      icon: TrendingUp,
      questionsCount: 14,
      color: "bg-teal-100 text-teal-800"
    },
    {
      id: "general-business",
      title: "General Business",
      description: "Business plans, partnerships, contracts, disputes",
      icon: MessageCircle,
      questionsCount: 25,
      color: "bg-yellow-100 text-yellow-800"
    }
  ];

  const filteredTopics = faqTopics.filter(topic =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" asChild>
            <Link href="/profile">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Profile
            </Link>
          </Button>
          <Button asChild className="primary-gradient">
            <Link href="/chat">Start Chat</Link>
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nigerian Business FAQ Topics
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse our comprehensive collection of frequently asked questions about doing business in Nigeria
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              aria-label="Search FAQ topics"
              placeholder="Search FAQ topics..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTopics.map((topic) => (
            <Card
              key={topic.id}
              className="hover-lift cursor-pointer border-0 shadow-lg transition-all duration-200 hover:shadow-xl"
              onClick={() => router.push(`/faq-topics/${topic.id}`)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 primary-gradient rounded-lg flex items-center justify-center mb-3">
                    <topic.icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="secondary" className={topic.color}>
                    {topic.questionsCount} FAQs
                  </Badge>
                </div>
                <CardTitle className="text-lg">{topic.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm mb-4">
                  {topic.description}
                </CardDescription>
                <Button variant="outline" className="w-full">
                  View FAQs
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTopics.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No topics found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search term or browse all available topics.
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-16 bg-primary-light rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Can&#39;t find what you&#39;re looking for?
          </h2>
          <p className="text-muted-foreground mb-6">
            Ask BizAi directly in our chat interface for personalized assistance
          </p>
          <Button asChild size="lg" className="primary-gradient hover-lift">
            <Link href="/chat">
              <MessageCircle className="mr-2 h-5 w-5" />
              Ask BizAi Now
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FAQTopicsPage;