import { Card, CardContent } from "@/components/ui/card";
import { 
  Brain, 
  FileText, 
  Target, 
  Shield, 
  Zap, 
  Users,
  TrendingUp,
  Award
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Matching",
      description: "Our advanced AI analyzes your resume and matches you with jobs that perfectly align with your skills and experience.",
      color: "text-purple-500"
    },
    {
      icon: FileText,
      title: "Resume Analysis",
      description: "Get detailed insights on your resume's strengths and areas for improvement with our intelligent scanning system.",
      color: "text-blue-500"
    },
    {
      icon: Target,
      title: "Eligibility Checker",
      description: "Instantly see if you meet the requirements for any job with our comprehensive eligibility assessment tool.",
      color: "text-green-500"
    },
    {
      icon: Shield,
      title: "Privacy Protected",
      description: "Your personal information and resume data are encrypted and protected with enterprise-grade security.",
      color: "text-red-500"
    },
    {
      icon: Zap,
      title: "Quick Applications",
      description: "Apply to multiple jobs with just one click using our streamlined application process.",
      color: "text-yellow-500"
    },
    {
      icon: Users,
      title: "Company Insights",
      description: "Access detailed company profiles, culture insights, and employee reviews before applying.",
      color: "text-indigo-500"
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Track your career progress and get personalized recommendations for skill development.",
      color: "text-pink-500"
    },
    {
      icon: Award,
      title: "Success Guarantee",
      description: "95% of our users find their dream job within 3 months using our platform.",
      color: "text-orange-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-poppins text-4xl font-bold text-foreground mb-4">
            Why Choose{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              JobHunt Pro?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of job searching with our cutting-edge features designed to accelerate your career journey.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm border-0 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary/10 mb-4">
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                </div>
                <h3 className="font-poppins font-semibold text-lg text-foreground mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;