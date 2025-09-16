import { Button } from "@/components/ui/button";
import { Search, Bell, User, Menu, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Header = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<{ first_name?: string; last_name?: string } | null>(null);

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const { data } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', user.id)
          .single();
        setProfile(data);
      };
      fetchProfile();
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <span className="text-lg font-bold text-white">J</span>
            </div>
            <span className="font-poppins text-xl font-bold text-foreground">
              JobHunt Pro
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/jobs" className="text-muted-foreground hover:text-primary transition-colors">
              Find Jobs
            </Link>
            <Link to="/companies" className="text-muted-foreground hover:text-primary transition-colors">
              Companies
            </Link>
            <Link to="/resume-builder" className="text-muted-foreground hover:text-primary transition-colors">
              Resume Builder
            </Link>
            <Link to="/career-guide" className="text-muted-foreground hover:text-primary transition-colors">
              Career Guide
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <Bell className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" />
                        <AvatarFallback>
                          {profile?.first_name?.[0] || user.email?.[0]?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden md:inline">
                        {profile?.first_name && profile?.last_name 
                          ? `${profile.first_name} ${profile.last_name}`
                          : user.email?.split('@')[0]
                        }
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/signin">
                  <Button variant="outline" className="hidden md:flex">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="hero">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;