import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";

const FeaturedJobs = () => {
  const jobs = [
    {
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $160k",
      posted: "2 hours ago",
      matchScore: 95,
      logo: "TC",
      skills: ["React", "TypeScript", "Next.js", "Tailwind"]
    },
    {
      title: "Product Designer",
      company: "Design Studio",
      location: "Remote",
      type: "Contract",
      salary: "$80k - $100k",
      posted: "4 hours ago",
      matchScore: 87,
      logo: "DS",
      skills: ["Figma", "Sketch", "Prototyping", "User Research"]
    },
    {
      title: "Data Scientist",
      company: "AI Innovations",
      location: "New York, NY",
      type: "Full-time",
      salary: "$140k - $180k",
      posted: "1 day ago",
      matchScore: 78,
      logo: "AI",
      skills: ["Python", "Machine Learning", "SQL", "TensorFlow"]
    },
    {
      title: "DevOps Engineer",
      company: "CloudTech",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$110k - $140k",
      posted: "2 days ago",
      matchScore: 91,
      logo: "CT",
      skills: ["AWS", "Docker", "Kubernetes", "Terraform"]
    },
    {
      title: "Mobile App Developer",
      company: "AppBuilders",
      location: "Los Angeles, CA",
      type: "Full-time",
      salary: "$100k - $130k",
      posted: "3 days ago",
      matchScore: 83,
      logo: "AB",
      skills: ["React Native", "Flutter", "iOS", "Android"]
    },
    {
      title: "Backend Engineer",
      company: "ServerTech",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$115k - $145k",
      posted: "5 days ago",
      matchScore: 89,
      logo: "ST",
      skills: ["Node.js", "Python", "PostgreSQL", "Redis"]
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-poppins text-4xl font-bold text-foreground mb-4">
            Featured Jobs{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              For You
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover handpicked opportunities that match your skills and career aspirations perfectly.
          </p>
        </div>

        {/* Jobs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {jobs.map((job, index) => (
            <div 
              key={index} 
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <JobCard {...job} />
            </div>
          ))}
        </div>

        {/* View All Jobs */}
        <div className="text-center">
          <Button variant="gradient" size="lg" className="font-semibold">
            View All Jobs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;