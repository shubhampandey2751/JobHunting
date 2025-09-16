import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, DollarSign, Building, Bookmark } from "lucide-react";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  matchScore: number;
  logo: string;
  skills: string[];
}

const JobCard = ({ 
  title, 
  company, 
  location, 
  type, 
  salary, 
  posted, 
  matchScore, 
  logo, 
  skills 
}: JobCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-gradient-card border-0 animate-fade-in">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-sm">
              <span className="text-white font-semibold text-lg">
                {company.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="font-poppins font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                {title}
              </h3>
              <p className="text-muted-foreground font-medium">{company}</p>
            </div>
          </div>
          
          {/* Match Score */}
          <div className="flex items-center space-x-2">
            <Badge 
              variant="secondary" 
              className={`${
                matchScore >= 90 ? 'bg-success/20 text-success' :
                matchScore >= 70 ? 'bg-warning/20 text-warning' :
                'bg-primary/20 text-primary'
              } font-semibold`}
            >
              {matchScore}% Match
            </Badge>
            <Button variant="ghost" size="icon" className="hover:text-primary">
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Job Details */}
        <div className="space-y-3 mb-4">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Building className="h-4 w-4" />
              <span>{type}</span>
            </div>
            <div className="flex items-center space-x-1">
              <DollarSign className="h-4 w-4" />
              <span>{salary}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{posted}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs border-primary/20 text-primary hover:bg-primary/10"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <Button variant="outline" className="flex-1 mr-2">
            View Details
          </Button>
          <Button variant="gradient" className="flex-1 ml-2">
            Apply Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;