import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, HelpCircle } from "lucide-react";
import ChatsBot from "@/components/ChatsBot";

const ChatPage = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="bg-card border-b px-4 py-2 flex items-center justify-between">
        <Button variant="ghost" size="sm" asChild>
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
        </div>
      </nav>

      {/* Chat Interface */}
      <div className="flex-1">
        <ChatsBot />
      </div>
    </div>
  );
};

export default ChatPage;