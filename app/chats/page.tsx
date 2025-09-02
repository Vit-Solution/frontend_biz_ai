import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, HelpCircle, MessageCircle } from "lucide-react";
import ChatsBot from "@/components/ChatsBot";

const ChatPage = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="bg-card border-b px-4 py-2 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 primary-gradient rounded-lg flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg hidden sm:inline-block">BizAI</span>
          </Link>
        {/* <Button variant="ghost" size="sm" asChild>
          <Link href="/faq-topics">
            <ArrowLeft className="mr-2 h-4 w-4" />
            FAQ Topics
          </Link>
        </Button>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/faq-topics">
              <HelpCircle className="mr-2 h-4 w-4" />
              Browse FAQs
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/profile">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Link>
          </Button>
        </div> */}
      </nav>

      {/* Chat Interface */}
      <div className="flex-1">
        <ChatsBot />
      </div>
    </div>
  );
};

export default ChatPage;