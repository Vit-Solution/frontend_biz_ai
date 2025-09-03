// import { ArrowRight, MessageCircle, Users, Shield, Clock } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import Link from 'next/link';
// import { Badge } from './ui/badge';

// const LandingPage = () => {
//   const stats = [
//     { number: '10,000+', label: 'Business Questions Answered' },
//     { number: '5,000+', label: 'Nigerian Entrepreneurs Helped' },
//     { number: '98%', label: 'Customer Satisfaction Rate' },
//   ];

//   const features = [
//     {
//       icon: MessageCircle,
//       title: 'Smart FAQ Assistant',
//       description: 'Get instant answers to common Nigerian business questions',
//     },
//     {
//       icon: Users,
//       title: 'Local Business Focus',
//       description:
//         'Tailored specifically for Nigerian business regulations and practices',
//     },
//     {
//       icon: Shield,
//       title: 'Reliable Information',
//       description: 'Verified answers from trusted business sources and experts',
//     },
//     {
//       icon: Clock,
//       title: '24/7 Availability',
//       description: 'Access business guidance anytime, anywhere you need it',
//     },
//   ];

//   const faqs = [
//     {
//       question: "How accurate is BizAi's business advice?",
//       answer:
//         'Our AI is trained on official Nigerian business regulations, CAC guidelines, and FIRS requirements. All information is regularly updated and verified by local business experts.',
//     },
//     {
//       question: 'Can BizAi help with business registration?',
//       answer:
//         'Yes! BizAi provides complete guidance on CAC registration, including business name search, document preparation, and submission process.',
//     },
//     {
//       question: 'Is my business information secure?',
//       answer:
//         'Absolutely. We use enterprise-grade security measures to protect your data. Your conversations and business information are encrypted and never shared.',
//     },
//     {
//       question: 'What types of businesses does BizAi support?',
//       answer:
//         'BizAi supports all types of Nigerian businesses - from sole proprietorships to limited companies, across all industries and sectors.',
//     },
//   ];

//   const howItWorks = [
//     {
//       step: '1',
//       title: 'Ask Your Question',
//       description:
//         'Simply type your Nigerian business question in our chat interface',
//     },
//     {
//       step: '2',
//       title: 'Get Instant Answer',
//       description:
//         'Our AI analyzes your question and provides accurate, Nigeria-specific guidance',
//     },
//     {
//       step: '3',
//       title: 'Take Action',
//       description:
//         'Follow the clear, actionable steps provided to move your business forward',
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Hero Section */}
//       <section className="hero-gradient text-white py-20 px-4">
//         <div className="container mx-auto text-center">
//           <Badge className="mb-6 bg-white/20 text-white border-white/30">
//             Nigeria&apos;s #1 Business Assistant
//           </Badge>
//           <h1 className="text-4xl md:text-6xl font-bold mb-6">BizAi</h1>
//           <p className="text-xl md:text-2xl mb-4 opacity-90">
//             Nigerian Business FAQ Assistant
//           </p>
//           <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
//             Get instant, reliable answers to your Nigerian business questions.
//             From CAC registration to tax compliance, we&apos;ve got you covered.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
//             <Button asChild size="lg" className="primary-gradient hover-lift">
//               <Link href="/chats">
//                 Try BizAi Now
//                 <ArrowRight className="ml-2 h-5 w-5" />
//               </Link>
//             </Button>
//             {/* <Button asChild size="lg" variant="hero" className="hover-lift">
//               <Link href="/chat">Get Started for free</Link>
//             </Button> */}
//           </div>

//           {/* Stats */}
//           <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
//             {stats.map((stat, index) => (
//               <div key={index} className="text-center">
//                 <div className="text-3xl md:text-4xl font-bold mb-2">
//                   {stat.number}
//                 </div>
//                 <div className="text-white/80">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 px-4">
//         <div className="container mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
//               Why Choose BizAI?
//             </h2>
//             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//               Designed specifically for Nigerian entrepreneurs and business
//               owners
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {features.map((feature, index) => (
//               <Card
//                 key={index}
//                 className="p-6 text-center hover-lift border-0 shadow-lg"
//               >
//                 <div className="w-12 h-12 primary-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
//                   <feature.icon className="h-6 w-6 text-white" />
//                 </div>
//                 <h3 className="text-xl font-semibold mb-3 text-foreground">
//                   {feature.title}
//                 </h3>
//                 <p className="text-muted-foreground">{feature.description}</p>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How BizAi Works */}
//       <section className="py-20 px-4 hero-gradient">
//         <div className="container mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//               How BizAi Works
//             </h2>
//             <p className="text-xl text-white max-w-2xl mx-auto">
//               Get business guidance in 3 simple steps
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
//             {howItWorks.map((step, index) => (
//               <div key={index} className="text-center">
//                 <div className="w-16 h-16 primary-gradient rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
//                   {step.step}
//                 </div>
//                 <h3 className="text-xl font-semibold mb-3 text-white">
//                   {step.title}
//                 </h3>
//                 <p className="text-white">{step.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* FAQ */}
//       <section className="py-20 px-4">
//         <div className="container mx-auto max-w-4xl">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
//               Frequently Asked Questions
//             </h2>
//             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//               Quick answers to common questions about BizAi
//             </p>
//           </div>

//           <div className="space-y-6">
//             {faqs.map((faq, index) => (
//               <Card key={index} className="p-6 border-0 shadow-lg">
//                 <h3 className="text-lg font-semibold mb-3 text-foreground">
//                   {faq.question}
//                 </h3>
//                 <p className="text-muted-foreground">{faq.answer}</p>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="hero-gradient text-white py-20 px-4">
//         <div className="container mx-auto text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">
//             Ready to Get Started?
//           </h2>
//           <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
//             Join thousands of Nigerian business owners who trust BizAi for
//             their business guidance.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             {/* <Button
//               asChild
//               size="lg"
//               className="bg-white text-primary hover:bg-white/90"
//             >
//               <Link href="/signup">
//                 Start Free Trial
//                 <ArrowRight className="ml-2 h-5 w-5" />
//               </Link>
//             </Button> */}
//             <Button asChild size="lg" variant="hero" className="hover-lift">
//               <Link href="/chats">Ask BizAi Now</Link>
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-muted py-8 px-4">
//         <div className="container mx-auto text-center">
//           <p className="text-muted-foreground">
//             © 2024 BizAI - Nigerian Business FAQ Assistant. All rights reserved.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;

import {
  ArrowRight,
  MessageCircle,
  Users,
  Shield,
  Clock,
  Smartphone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { Badge } from './ui/badge';

const LandingPage = () => {
  const stats = [
    { number: '15,000+', label: 'Business Questions Answered' },
    { number: '7,500+', label: 'Nigerian Entrepreneurs Served' },
    { number: '98.5%', label: 'Customer Satisfaction Rate' },
    { number: '24/7', label: 'Available Support' },
  ];

  const features = [
    {
      icon: Users,
      title: 'Built for Nigerian Business Environment',
      description:
        'Get answers tailored specifically to Nigerian regulations, CAC requirements, FIRS guidelines, and local business practices.',
    },
    {
      icon: MessageCircle,
      title: 'Instant Expert Guidance',
      description:
        'No more waiting days for business consultants. Get immediate, accurate answers to questions about registration, taxes, licensing, and more.',
    },
    {
      icon: Shield,
      title: 'Secure & Confidential',
      description:
        'Your business information is protected with bank-level encryption. All conversations remain private and secure.',
    },
    {
      icon: Smartphone,
      title: 'Multiple Access Points',
      description:
        'Choose how you want help: Full-featured Web Chat dashboard or quick answers via WhatsApp messaging.',
    },
  ];

  const faqs = [
    {
      question: "How accurate is BizAi's business information?",
      answer:
        'BizAi is trained on official sources including CAC guidelines, FIRS regulations, and current Nigerian business laws. Our database is updated regularly to reflect the latest changes in business requirements.',
    },
    {
      question: 'Can BizAi replace a business lawyer or consultant?',
      answer:
        'BizAi provides general guidance and information. For complex legal matters or official document preparation, we recommend consulting with qualified Nigerian business professionals.',
    },
    {
      question: 'Is there a cost to use BizAi?',
      answer:
        'Basic business guidance is free. Premium features and detailed consultation packages are available for businesses needing comprehensive support.',
    },
    {
      question: 'How quickly will I get answers?',
      answer:
        'Most questions are answered instantly. Complex queries may take 2-3 minutes for thorough research and response.',
    },
    {
      question: 'What if I need follow-up clarification?',
      answer:
        'You can ask follow-up questions anytime. BizAi remembers your conversation context to provide consistent, relevant answers.',
    },
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Ask Your Question',
      description:
        'Type your Nigerian business question using Web Chat or send a WhatsApp message. Be specific for the best results.',
    },
    {
      step: '2',
      title: 'Get Expert Answer',
      description:
        'Our AI analyzes your question against the latest Nigerian business regulations and provides accurate, actionable guidance.',
    },
    {
      step: '3',
      title: 'Take Confident Action',
      description:
        'Follow clear, step-by-step instructions tailored to your specific business situation and location in Nigeria.',
    },
  ];

  const commonQuestions = [
    {
      category: 'Business Registration',
      questions: [
        'How do I register my business with CAC?',
        'What documents do I need for limited liability company registration?',
        'How much does business name registration cost?',
      ],
    },
    {
      category: 'Tax & Compliance',
      questions: [
        'What are my VAT obligations as a small business?',
        'When do I need to file annual returns?',
        'How do I get a Tax Identification Number (TIN)?',
      ],
    },
    {
      category: 'Operations & Growth',
      questions: [
        'What licenses do I need to start a restaurant in Lagos?',
        'How do I import goods into Nigeria legally?',
        'What are the requirements for hiring employees?',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-white/20 text-white border-white/30">
            Nigeria&apos;s Most Trusted AI Business Assistant
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">BizAi</h1>
          <p className="text-xl md:text-2xl mb-4 opacity-90">
            Get Instant Answers to Your Nigerian Business Questions
          </p>
          <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
            Whether you&apos;re starting a new business or growing an existing
            one, BizAi provides expert guidance on CAC registration, tax
            compliance, business licensing, and more. Access reliable Nigerian
            business information through Web Chat or WhatsApp - whenever you
            need it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="primary-gradient hover-lift">
              <Link href="/chats">
                Start Web Chat
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="hero" className="hover-lift">
              <Link href="https://wa.me/+15551700820?text=Hi%20BizAi!%20I%27m%20interested%20in%20getting%20help%20with%20my%20Nigerian%20business.">
                Ask on WhatsApp
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
              Why Nigerian Business Owners Choose BizAi
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Trusted by thousands of entrepreneurs across Nigeria
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

      {/* Common Questions Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Common Questions We Answer
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real examples of questions Nigerian entrepreneurs ask BizAi
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {commonQuestions.map((category, index) => (
              <Card key={index} className="p-6 border-0 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  {category.category}
                </h3>
                <ul className="space-y-3">
                  {category.questions.map((question, qIndex) => (
                    <li key={qIndex} className="text-muted-foreground text-sm">
                      &quot;{question}&quot;
                    </li>
                  ))}
                </ul>
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
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Simple 3-Step Process
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
                <p className="text-white/90">{step.description}</p>
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
              Everything you need to know about using BizAi
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
            Ready to Grow Your Nigerian Business?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of successful Nigerian entrepreneurs who rely on
            BizAi for trusted business guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="primary-gradient hover-lift">
              <Link href="/chats">
                Start Web Chat
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="hero" className="hover-lift">
              <Link href="https://wa.me/+15551700820?text=Hi%20BizAi!%20I%27m%20interested%20in%20getting%20help%20with%20my%20Nigerian%20business.">
                Ask on WhatsApp
              </Link>
            </Button>
          </div>

          {/* <div className="mt-8 text-center">
            <h3 className="text-lg font-semibold mb-4">
              Still Have Questions?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm opacity-80">
              <span> Email: support@bizai.ng</span>
              <span> Phone: +234-XXX-XXXX-XXX</span>
              <span> Available: 24/7 Support</span>
            </div>
          </div> */}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12 px-4">
        <div className="container mx-auto">
          {/* <div className="text-center mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">About BizAi</h3>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              BizAi is Nigeria&apos;s leading AI-powered business assistant, designed specifically for the Nigerian business environment. We combine artificial intelligence with deep knowledge of Nigerian regulations to help entrepreneurs make informed decisions and grow successful businesses.
            </p>
          </div> */}
          <div className="text-center">
            <p className="text-muted-foreground">
              © 2025 BizAi - Nigeria&apos;s Smart Business Assistant. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
