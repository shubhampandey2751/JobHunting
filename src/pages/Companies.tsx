import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Users, Building2 } from "lucide-react";

const Companies = () => {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCompanies();
  }, [searchTerm]);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('companies')
        .select(`
          *,
          jobs!inner (
            id
          )
        `);

      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,industry.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      
      // Count jobs for each company
      const companiesWithJobCount = await Promise.all(
        (data || []).map(async (company) => {
          const { count } = await supabase
            .from('jobs')
            .select('*', { count: 'exact', head: true })
            .eq('company_id', company.id)
            .eq('is_active', true);
          
          return { ...company, jobCount: count || 0 };
        })
      );

      setCompanies(companiesWithJobCount);
    } catch (error) {
      console.error('Error fetching companies:', error);
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
            Explore Companies
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover amazing companies and their open positions
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search companies or industries..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {loading ? 'Loading...' : `Found ${companies.length} companies`}
          </p>
        </div>

        {/* Companies Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-muted rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-3 bg-muted rounded w-full mb-2"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <Card key={company.id} className="hover:shadow-elegant transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                      {company.logo_url ? (
                        <img 
                          src={company.logo_url} 
                          alt={company.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <Building2 className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{company.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {company.location || 'Multiple locations'}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {company.description || 'No description available'}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {company.industry || 'Technology'}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-3 w-3 mr-1" />
                      {company.size || '1,000+'}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">
                      {company.jobCount} open position{company.jobCount !== 1 ? 's' : ''}
                    </span>
                    <Button variant="outline" size="sm">
                      View Jobs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && companies.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No companies found
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

export default Companies;