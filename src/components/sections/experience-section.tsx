
import type { ExperienceEntry } from '@/services/experience';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, MapPin, Calendar } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

interface ExperienceSectionProps {
  experiences: ExperienceEntry[] | null;
}

// Helper function to format date range
function formatDateRange(startDate: string, endDate?: string | null): string {
    const formatYearMonth = (dateStr: string) => {
        try {
            // Handles "YYYY-MM" or "YYYY"
             if (dateStr.includes('-')) {
                const [year, month] = dateStr.split('-');
                const date = new Date(parseInt(year), parseInt(month) -1);
                 return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
             } else {
                 // Assume it's just the year "YYYY"
                 return dateStr;
             }
        } catch (e) {
            console.warn(`Could not parse date: ${dateStr}`);
            return dateStr; // Return original string if parsing fails
        }
    };

    const startFormatted = formatYearMonth(startDate);
    const endFormatted = endDate && endDate !== "Present" ? formatYearMonth(endDate) : "Present";

    return `${startFormatted} - ${endFormatted}`;
}


export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  if (!experiences || experiences.length === 0) {
    return (
       <Card className="shadow-md rounded-lg border border-border">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-primary">Experience</CardTitle>
          </CardHeader>
          <CardContent>
             <Alert variant="destructive">
               <Terminal className="h-4 w-4" />
               <AlertTitle>No Experience Data</AlertTitle>
               <AlertDescription>
                 Could not load experience data or no experience information is available.
               </AlertDescription>
             </Alert>
          </CardContent>
       </Card>
    );
  }

  return (
    <Card className="shadow-md rounded-lg border border-border">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-primary">Experience</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {experiences.map((exp) => (
          <div key={exp._id} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
            <h3 className="text-xl font-semibold text-foreground">{exp.title}</h3>
            <div className="flex items-center space-x-2 text-muted-foreground mt-1">
               <Building className="h-4 w-4" />
               <span>{exp.company}</span>
            </div>
             <div className="flex items-center space-x-2 text-muted-foreground mt-1 text-sm">
               <MapPin className="h-4 w-4" />
               <span>{exp.location}</span>
             </div>
             <div className="flex items-center space-x-2 text-muted-foreground mt-1 text-sm">
                <Calendar className="h-4 w-4" />
                <span>{formatDateRange(exp.start_date, exp.end_date)}</span>
             </div>

            {/* Display descriptions directly */}
            {exp.description && exp.description.length > 0 && (
              <div className="mt-4 space-y-4">
                {exp.description.map((desc, index) => (
                  <div key={index}>
                    <h4 className="text-base font-medium text-accent mb-2">{desc.role}</h4>
                    <ul className="list-disc space-y-1 pl-6 text-foreground/90 text-sm">
                      {desc.details.map((detail, detailIndex) => (
                        <li key={detailIndex}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
