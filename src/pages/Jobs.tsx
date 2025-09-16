import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JobCard from "@/components/JobCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Jobs = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    fetchJobs();
  }, [searchTerm, locationFilter, typeFilter]);

  const fetchJobs = async () => {
    setLoading(true);
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

      if (searchTerm) {
        query = query.ilike('title', `%${searchTerm}%`);
      }

      if (locationFilter) {
        query = query.ilike('location', `%${locationFilter}%`);
      }

      if (typeFilter) {
        query = query.eq('job_type', typeFilter);
      }

      const { data, error } = await query.order('posted_at', { ascending: false });
      
      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-poppins text-foreground mb-4">
            Find Your Dream Job
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover opportunities that match your skills and aspirations
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl p-6 shadow-elegant mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Input
              placeholder="Location"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={fetchJobs} className="bg-gradient-primary">
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {loading ? 'Loading...' : `Found ${jobs.length} jobs`}
          </p>
        </div>

        {/* Job Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card rounded-xl p-6 animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
                <div className="h-3 bg-muted rounded w-full mb-2"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
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
                posted={new Date(job.posted_at).toLocaleDateString()}
                matchScore={Math.floor(Math.random() * 20) + 80}
                logo={job.companies?.logo_url || ''}
                skills={job.skills || []}
              />
            ))}
          </div>
        )}

        {!loading && jobs.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No jobs found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Jobs;