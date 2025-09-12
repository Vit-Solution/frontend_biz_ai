// import { useLocation } from "react-router-dom";
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, MessageCircle, LogIn, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import SignoutButton from './SignoutButton';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // const isActive = (path: string) => pathname === path;

  // const NavLink = ({
  //   to,
  //   children,
  //   className = '',
  //   onClick,
  // }: {
  //   to: string;
  //   children: React.ReactNode;
  //   className?: string;
  //   onClick?: () => void;
  // }) => (
  //   <Link
  //     href={to}
  //     className={`text-sm font-medium transition-colors hover:text-primary ${
  //       isActive(to) ? 'text-primary' : 'text-muted-foreground'
  //     } ${className}`}
  //     onClick={onClick}
  //   >
  //     {children}
  //   </Link>
  // );

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 primary-gradient rounded-lg flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg hidden sm:inline-block">
              BizAI
            </span>
          </Link>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* <Button variant="ghost" size="sm" asChild> */}
              {isAuthenticated ? (
                <SignoutButton />
                
              ) : (
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                </Button>
              )}
              {/* <Link href="/login">Login</Link> */}
            {/* </Button> */}
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
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] bg-white"
            >
              <div className="flex flex-col space-y-4 mt-8">
                <div className="border-t pt-4 space-y-2">
                  {isAuthenticated ? (
                    <SignoutButton />
                  ) : (
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <LogIn className="mr-2 h-4 w-4" />
                        Login
                      </Link>
                    </Button>
                  )}
                  <Button
                    className="w-full justify-start primary-gradient"
                    asChild
                  >
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
