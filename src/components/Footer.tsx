import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter Section */}
      <div className="border-b border-background/10">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="font-poppins text-3xl font-bold mb-4">
              Stay Updated with Latest{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Job Opportunities
              </span>
            </h3>
            <p className="text-background/70 text-lg mb-8">
              Subscribe to our newsletter and never miss out on your dream job. Get personalized job alerts delivered to your inbox.
            </p>
            <div className="flex max-w-md mx-auto gap-4">
              <Input 
                type="email" 
                placeholder="Enter your email address"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50 focus:border-primary"
              />
              <Button variant="hero" className="whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <span className="text-lg font-bold text-white">J</span>
              </div>
              <span className="font-poppins text-xl font-bold">JobHunt Pro</span>
            </div>
            <p className="text-background/70 leading-relaxed">
              Revolutionizing job search with AI-powered matching. Connect with your dream career faster than ever before.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6">Quick Links</h4>
            <div className="space-y-3">
              {[
                "Find Jobs",
                "Browse Companies", 
                "Resume Builder",
                "Career Advice",
                "Salary Guide",
                "Interview Tips"
              ].map((link) => (
                <a 
                  key={link}
                  href="#" 
                  className="block text-background/70 hover:text-primary transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6">For Employers</h4>
            <div className="space-y-3">
              {[
                "Post a Job",
                "Browse Resumes",
                "Employer Dashboard",
                "Recruitment Tools",
                "Pricing Plans",
                "Success Stories"
              ].map((link) => (
                <a 
                  key={link}
                  href="#" 
                  className="block text-background/70 hover:text-primary transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-background/70">support@jobhuntpro.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-background/70">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-background/70">
                  123 Innovation Ave,<br />
                  Tech City, TC 12345
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-background/70 text-sm">
              © 2024 JobHunt Pro. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-background/70 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-background/70 hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-background/70 hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;