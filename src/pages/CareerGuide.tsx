import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  TrendingUp, 
  Users, 
  Target, 
  Lightbulb, 
  CheckCircle,
  ArrowRight,
  Star
} from "lucide-react";

const CareerGuide = () => {
  const careerPaths = [
    {
      title: "Software Engineering",
      description: "Build applications, systems, and solutions that power the digital world",
      level: "Entry to Senior",
      growth: "+15%",
      averageSalary: "$95,000 - $180,000",
      skills: ["JavaScript", "Python", "React", "Node.js", "AWS"],
      hot: true,
    },
    {
      title: "Data Science",
      description: "Analyze complex data to drive business insights and decision-making",
      level: "Mid to Senior",
      growth: "+22%",
      averageSalary: "$105,000 - $200,000",
      skills: ["Python", "SQL", "Machine Learning", "Statistics", "Tableau"],
      hot: true,
    },
    {
      title: "Product Management",
      description: "Lead product strategy and coordinate cross-functional teams",
      level: "Mid to Executive",
      growth: "+19%", 
      averageSalary: "$115,000 - $220,000",
      skills: ["Strategy", "Analytics", "Leadership", "Design Thinking", "Agile"],
      hot: false,
    },
    {
      title: "UX/UI Design",
      description: "Create intuitive and beautiful user experiences for digital products",
      level: "Entry to Senior",
      growth: "+13%",
      averageSalary: "$70,000 - $140,000",
      skills: ["Figma", "Sketch", "Prototyping", "User Research", "Design Systems"],
      hot: false,
    },
  ];

  const skillDevelopmentTips = [
    {
      icon: BookOpen,
      title: "Continuous Learning",
      description: "Stay updated with industry trends and new technologies",
      actions: ["Take online courses", "Read industry blogs", "Attend webinars"],
    },
    {
      icon: Users,
      title: "Build Your Network",
      description: "Connect with professionals in your field",
      actions: ["Join professional associations", "Attend meetups", "Use LinkedIn effectively"],
    },
    {
      icon: Target,
      title: "Set Clear Goals",
      description: "Define short-term and long-term career objectives",
      actions: ["Create a 5-year plan", "Set quarterly milestones", "Track your progress"],
    },
    {
      icon: Lightbulb,
      title: "Gain Experience",
      description: "Build practical skills through projects and work",
      actions: ["Work on side projects", "Volunteer for new responsibilities", "Seek mentorship"],
    },
  ];

  const interviewTips = [
    "Research the company and role thoroughly",
    "Prepare specific examples using the STAR method",
    "Practice common interview questions",
    "Prepare thoughtful questions to ask the interviewer",
    "Follow up with a thank-you email within 24 hours",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-poppins text-foreground mb-4">
            Career Guide
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Navigate your career journey with expert insights, growth paths, and practical advice
          </p>
        </div>

        {/* Popular Career Paths */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Popular Career Paths</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {careerPaths.map((career, index) => (
              <Card key={index} className="relative hover:shadow-elegant transition-shadow">
                {career.hot && (
                  <Badge className="absolute -top-2 -right-2 bg-gradient-primary">
                    <Star className="h-3 w-3 mr-1" />
                    Hot
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {career.title}
                    <Badge variant="outline">{career.level}</Badge>
                  </CardTitle>
                  <p className="text-muted-foreground">{career.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">{career.growth} growth</span>
                      </div>
                      <span className="text-sm font-medium text-primary">{career.averageSalary}</span>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Key Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {career.skills.map((skill, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button className="w-full bg-gradient-primary">
                      Explore Path
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Skill Development */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Skill Development Tips</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillDevelopmentTips.map((tip, index) => (
              <Card key={index} className="text-center hover:shadow-elegant transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                    <tip.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{tip.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {tip.actions.map((action, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Interview Tips */}
        <section className="mb-12">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Interview Success Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {interviewTips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6 bg-gradient-primary">
                  Get Interview Prep Guide
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Market Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
                      Growing Fields
                    </h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      AI/ML, Cybersecurity, Cloud Computing, and Data Science are experiencing 
                      rapid growth with high demand for skilled professionals.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                      Remote Work Trends
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      70% of companies now offer remote or hybrid work options, 
                      expanding opportunities across geographic boundaries.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                      Skill Premium
                    </h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Professionals with cross-functional skills earn 20-30% more 
                      than those with specialized skills alone.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-primary rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Advance Your Career?</h2>
          <p className="text-xl mb-6 opacity-90">
            Start building your professional future today with personalized guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Create Career Plan
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              Find Mentor
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CareerGuide;