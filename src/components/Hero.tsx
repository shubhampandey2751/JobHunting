import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Briefcase, Users, Target, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import JobCard from "./JobCard";

const Hero = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!jobTitle.trim()) return;
    
    setIsSearching(true);
    try {
      let query = supabase
        .from('jobs')
        .select(`
          *,
          companies (
            name,
            logo_url,
            location
          )
        `)
        .eq('is_active', true);

      if (jobTitle.trim()) {
        query = query.ilike('title', `%${jobTitle}%`);
      }

      if (location.trim()) {
        query = query.ilike('location', `%${location}%`);
      }

      const { data, error } = await query.limit(6);
      
      if (error) throw error;
      setSearchResults(data || []);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (jobTitle.trim()) {
      const timeoutId = setTimeout(handleSearch, 500);
      return () => clearTimeout(timeoutId);
    } else {
      setSearchResults([]);
    }
  }, [jobTitle, location]);

  return (
    <section className="relative overflow-hidden bg-gradient-secondary pt-20 pb-32">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10" />
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl animate-float" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl animate-float" style={{ animationDelay: "1s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="font-poppins text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Find Your{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Dream Job
                </span>{" "}
                with AI-Powered Matching
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg font-inter">
                Upload your resume and let our intelligent system match you with jobs that perfectly fit your skills and career goals.
              </p>
            </div>

            {/* Search Bar */}
            <div className="space-y-6">
              <div className="flex w-full max-w-2xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-elegant p-2 border border-white/20">
                <div className="flex-1 flex items-center space-x-2 px-4">
                  <Briefcase className="h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Job title or keyword"
                    className="border-0 focus-visible:ring-0 bg-transparent placeholder:text-muted-foreground"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>
                <div className="h-10 w-px bg-border"></div>
                <div className="flex-1 flex items-center space-x-2 px-4">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Location"
                    className="border-0 focus-visible:ring-0 bg-transparent placeholder:text-muted-foreground"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <Button 
                  size="lg" 
                  className="rounded-xl px-8 bg-gradient-primary hover:opacity-90 transition-opacity"
                  onClick={handleSearch}
                  disabled={isSearching}
                >
                  <Search className="h-5 w-5 mr-2" />
                  {isSearching ? 'Searching...' : 'Search Jobs'}
                </Button>
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="mt-8 w-full max-w-6xl mx-auto">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Found {searchResults.length} jobs matching "{jobTitle}"
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults.map((job) => (
                      <JobCard
                        key={job.id}
                        title={job.title}
                        company={job.companies?.name || 'Company'}
                        location={job.location || 'Remote'}
                        type={job.job_type || 'Full-time'}
                        salary={job.salary_min && job.salary_max 
                          ? `$${job.salary_min.toLocaleString()} - $${job.salary_max.toLocaleString()}`
                          : 'Competitive'
                        }
                        posted="2 days ago"
                        matchScore={Math.floor(Math.random() * 20) + 80}
                        logo={job.companies?.logo_url || ''}
                        skills={job.skills || []}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 animate-scale-in">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <span className="font-poppins text-2xl font-bold text-foreground">50K+</span>
                </div>
                <p className="text-sm text-muted-foreground">Active Jobs</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="font-poppins text-2xl font-bold text-foreground">100K+</span>
                </div>
                <p className="text-sm text-muted-foreground">Job Seekers</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span className="font-poppins text-2xl font-bold text-foreground">95%</span>
                </div>
                <p className="text-sm text-muted-foreground">Match Success</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="Professional working on laptop in modern office" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-primary/10" />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg border animate-float">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-success/20 flex items-center justify-center">
                  <span className="text-success font-semibold">✓</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Resume Matched!</p>
                  <p className="text-xs text-muted-foreground">98% compatibility</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-lg border animate-float" style={{ animationDelay: "1s" }}>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">New Job Alert</p>
                  <p className="text-xs text-muted-foreground">Senior Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;