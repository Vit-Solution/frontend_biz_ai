// import { useLocation } from "react-router-dom";
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, MessageCircle, User, HelpCircle, LogIn, UserPlus, Home } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const NavLink = ({ to, children, className = "", onClick }: { to: string; children: React.ReactNode; className?: string; onClick?: () => void }) => (
    <Link 
      href={to} 
      className={`text-sm font-medium transition-colors hover:text-primary ${
        isActive(to) ? 'text-primary' : 'text-muted-foreground'
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );

  const MobileNavLink = ({ to, children, icon: Icon }: { to: string; children: React.ReactNode; icon: React.ElementType }) => (
    <Link 
      href={to} 
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        isActive(to) 
          ? 'bg-primary text-primary-foreground' 
          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
      }`}
      onClick={() => setIsOpen(false)}
    >
      <Icon className="h-4 w-4" />
      {children}
    </Link>
  );

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 primary-gradient rounded-lg flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg hidden sm:inline-block">BizAI</span>
          </Link>

          {/* Desktop Navigation */}
          {/* <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavLink to="/">Home</NavLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Help Center</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[300px]">
                      <NavigationMenuLink asChild>
                        <NavLink to="/faq-topics" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">FAQ Topics</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Browse Nigerian business FAQ categories
                          </p>
                        </NavLink>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <NavLink to="/chat" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Ask BizAi</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Get instant answers to your questions
                          </p>
                        </NavLink>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavLink to="/profile">Profile</NavLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div> */}

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button size="sm" className="primary-gradient text-white" asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white">
              <div className="flex flex-col space-y-4 mt-8">
                {/* <div className="flex items-center space-x-2 mb-6">
                  <div className="w-8 h-8 primary-gradient rounded-lg flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-bold text-lg">BizAi</span>
                </div>

                <div className="space-y-2">
                  <MobileNavLink to="/" icon={Home}>Home</MobileNavLink>
                  <MobileNavLink to="/faq-topics" icon={HelpCircle}>FAQ Topics</MobileNavLink>
                  <MobileNavLink to="/chat" icon={MessageCircle}>Ask BizAi</MobileNavLink>
                  <MobileNavLink to="/profile" icon={User}>Profile</MobileNavLink>
                </div> */}

                <div className="border-t pt-4 space-y-2">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </Link>
                  </Button>
                  <Button className="w-full justify-start primary-gradient" asChild>
                    <Link href="/signup" onClick={() => setIsOpen(false)}>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Sign Up
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;