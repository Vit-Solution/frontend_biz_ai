'use client';
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Search,
  MessageCircle,
  Building2,
  Scale,
  FileText,
  Users,
  CreditCard,
  Shield,
  TrendingUp,
} from 'lucide-react';

const FAQDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  type FAQ = {
    id: string;
    question: string;
    category: string;
  };

  type Topic = {
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    faqs: FAQ[];
  };

  const topicData: { [key: string]: Topic } = {
    'business-registration': {
      title: 'Business Registration',
      description: 'CAC registration, business names, incorporation procedures',
      icon: Building2,
      faqs: [
        {
          id: '1',
          question: 'How do I register a business name in Nigeria?',
          category: 'Business Name Registration',
        },
        {
          id: '2',
          question: 'What documents are required for CAC registration?',
          category: 'Documentation',
        },
        {
          id: '3',
          question:
            'How much does it cost to register a limited liability company?',
          category: 'Costs',
        },
        {
          id: '4',
          question:
            'What is the difference between business name and company registration?',
          category: 'Types',
        },
        {
          id: '5',
          question: 'How long does CAC registration take?',
          category: 'Timeline',
        },
        {
          id: '6',
          question: 'Can a foreigner register a business in Nigeria?',
          category: 'Foreign Investment',
        },
        {
          id: '7',
          question:
            'What is the minimum share capital for company registration?',
          category: 'Requirements',
        },
        {
          id: '8',
          question: 'How do I reserve a company name with CAC?',
          category: 'Name Reservation',
        },
      ],
    },
    'tax-compliance': {
      title: 'Tax & Compliance',
      description: 'FIRS registration, VAT, company income tax, PAYE',
      icon: Scale,
      faqs: [
        {
          id: '1',
          question: 'How do I register for VAT in Nigeria?',
          category: 'VAT Registration',
        },
        {
          id: '2',
          question: 'What is the current VAT rate in Nigeria?',
          category: 'Tax Rates',
        },
        {
          id: '3',
          question: 'When is company income tax due?',
          category: 'Filing Deadlines',
        },
        {
          id: '4',
          question: 'How do I calculate PAYE for employees?',
          category: 'PAYE',
        },
        {
          id: '5',
          question: 'What are the penalties for late tax filing?',
          category: 'Penalties',
        },
        {
          id: '6',
          question: "Do I need to register with FIRS if I'm a small business?",
          category: 'Small Business',
        },
        {
          id: '7',
          question: 'How do I get a Tax Identification Number (TIN)?',
          category: 'TIN Registration',
        },
        {
          id: '8',
          question: 'What tax incentives are available for startups?',
          category: 'Incentives',
        },
      ],
    },
    'import-export': {
      title: 'Import & Export',
      description: 'Customs, NAFDAC, SON, export procedures, trade',
      icon: TrendingUp,
      faqs: [
        {
          id: '1',
          question: 'What documents do I need to import goods into Nigeria?',
          category: 'Import Documentation',
        },
        {
          id: '2',
          question: 'How do I get a NAFDAC permit for food imports?',
          category: 'NAFDAC Requirements',
        },
        {
          id: '3',
          question: 'What is the process for clearing goods at Nigerian ports?',
          category: 'Customs Clearance',
        },
        {
          id: '4',
          question: 'How do I register for export incentives?',
          category: 'Export Incentives',
        },
        {
          id: '5',
          question: 'What are the current import duty rates?',
          category: 'Import Duties',
        },
        {
          id: '6',
          question: 'How do I get a SON certificate for imported products?',
          category: 'SON Certification',
        },
        {
          id: '7',
          question: 'What is the PAAR process for import/export?',
          category: 'PAAR',
        },
        {
          id: '8',
          question: 'How do I obtain an import license?',
          category: 'Import License',
        },
      ],
    },
    'permits-licenses': {
      title: 'Permits & Licenses',
      description: 'Trade permits, NAFDAC, SON, professional licenses',
      icon: FileText,
      faqs: [
        {
          id: '1',
          question: 'What business permits do I need to operate in Nigeria?',
          category: 'General Permits',
        },
        {
          id: '2',
          question: 'How do I get a trade permit from my local government?',
          category: 'Trade Permits',
        },
        {
          id: '3',
          question: 'What professional licenses are required for consultancy?',
          category: 'Professional Licenses',
        },
        {
          id: '4',
          question: 'How do I register with regulatory bodies in my industry?',
          category: 'Industry Registration',
        },
      ],
    },
    'employment-law': {
      title: 'Employment & Labor',
      description: 'Hiring, contracts, pension, minimum wage, labor laws',
      icon: Users,
      faqs: [
        {
          id: '1',
          question: 'What is the current minimum wage in Nigeria?',
          category: 'Minimum Wage',
        },
        {
          id: '2',
          question: 'How do I register employees for pension?',
          category: 'Pension',
        },
        {
          id: '3',
          question: 'What should be included in an employment contract?',
          category: 'Employment Contracts',
        },
        {
          id: '4',
          question: 'What are the statutory deductions for employees?',
          category: 'Deductions',
        },
      ],
    },
    'banking-finance': {
      title: 'Banking & Finance',
      description: 'Business accounts, loans, forex, CBN regulations',
      icon: CreditCard,
      faqs: [
        {
          id: '1',
          question: 'What documents do I need to open a business bank account?',
          category: 'Bank Accounts',
        },
        {
          id: '2',
          question: 'How do I access foreign exchange for business?',
          category: 'Foreign Exchange',
        },
        {
          id: '3',
          question: 'What are the CBN requirements for fintech companies?',
          category: 'CBN Regulations',
        },
        {
          id: '4',
          question: 'How do I apply for a business loan?',
          category: 'Business Loans',
        },
      ],
    },
    insurance: {
      title: 'Insurance',
      description: 'Business insurance, employee benefits, NAICOM',
      icon: Shield,
      faqs: [
        {
          id: '1',
          question:
            'What types of business insurance are mandatory in Nigeria?',
          category: 'Mandatory Insurance',
        },
        {
          id: '2',
          question: 'How do I register with NAICOM as an insurance broker?',
          category: 'NAICOM Registration',
        },
        {
          id: '3',
          question: 'What is the Employee Compensation Act?',
          category: 'Employee Benefits',
        },
      ],
    },
    'general-business': {
      title: 'General Business',
      description: 'Business plans, partnerships, contracts, disputes',
      icon: MessageCircle,
      faqs: [
        {
          id: '1',
          question: 'How do I write a business plan for Nigerian market?',
          category: 'Business Planning',
        },
        {
          id: '2',
          question:
            'What are the legal requirements for business partnerships?',
          category: 'Partnerships',
        },
        {
          id: '3',
          question: 'How do I protect my intellectual property in Nigeria?',
          category: 'IP Protection',
        },
        {
          id: '4',
          question: 'What should I include in a business contract?',
          category: 'Contracts',
        },
      ],
    },
  };

  const topicId =
    typeof params.id === 'string'
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : '';
  const currentTopic = topicData[topicId || ''];

  if (!currentTopic) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="container mx-auto max-w-4xl text-center py-20">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Topic Not Found
          </h1>
          <Button asChild>
            <Link href="/faq-topics">Back to FAQ Topics</Link>
          </Button>
        </div>
      </div>
    );
  }

  const filteredFAQs = currentTopic.faqs.filter(
    (faq: FAQ) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFAQClick = (question: string) => {
    router.push(`/chat?question=${encodeURIComponent(question)}`);
  };

  const Icon = currentTopic.icon;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" asChild>
            <Link href="/faq-topics">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Topics
            </Link>
          </Button>
          <Button asChild className="primary-gradient">
            <Link href="/chat">Start New Chat</Link>
          </Button>
        </div>

        {/* Topic Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 primary-gradient rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {currentTopic.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {currentTopic.description}
          </p>
          <Badge variant="secondary" className="mt-4">
            {currentTopic.faqs.length} Frequently Asked Questions
          </Badge>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search FAQs..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* FAQs List */}
        <div className="space-y-4">
          {filteredFAQs.map((faq: FAQ) => (
            <Card
              key={faq.id}
              className="hover-lift cursor-pointer border-0 shadow-md transition-all duration-200 hover:shadow-lg"
              onClick={() => handleFAQClick(faq.question)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <Badge variant="outline" className="mb-2">
                    {faq.category}
                  </Badge>
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg leading-relaxed text-left">
                  {faq.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="flex items-center text-primary">
                  Click to ask BizBot this question
                  <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No FAQs found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search term or browse all available questions.
            </p>
            <Button onClick={() => setSearchTerm('')}>Show All FAQs</Button>
          </div>
        )}

        {/* Quick Chat CTA */}
        <div className="mt-16 bg-primary-light rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Have a specific question?
          </h2>
          <p className="text-muted-foreground mb-6">
            Chat directly with BizBot for personalized answers to your Nigerian
            business questions
          </p>
          <Button asChild size="lg" className="primary-gradient hover-lift">
            <Link href="/chat">
              <MessageCircle className="mr-2 h-5 w-5" />
              Start Custom Chat
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FAQDetailPage;
