
import type { EducationEntry } from '@/services/education';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Calendar, Building } from 'lucide-react'; // Using Building for Institution
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

interface EducationSectionProps {
  educationEntries: EducationEntry[] | null;
}

// Helper function to format date range (handles year only or year-month)
function formatDateRange(startDate: string, endDate?: string | null): string {
    const formatYear = (dateStr: string): string => {
        try {
            // Check if it's just a year "YYYY"
            if (/^\d{4}$/.test(dateStr)) {
                return dateStr;
            }
            // Check if it's "YYYY-MM"
            if (/^\d{4}-\d{2}$/.test(dateStr)) {
                 const [year, month] = dateStr.split('-');
                 const date = new Date(parseInt(year), parseInt(month) - 1);
                 // Format to "Short Month YYYY" if needed, or keep as year only
                 // return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
                 return year; // Sticking to year only for simplicity unless specified otherwise
            }
            return dateStr; // Fallback
        } catch (e) {
             console.warn(`Could not parse year from date: ${dateStr}`);
             return dateStr;
        }
    };

    const startFormatted = formatYear(startDate);
    const endFormatted = endDate && endDate !== "Present" ? formatYear(endDate) : "Present"; // "Present" might not apply to education often

    // Handle cases where start and end might be the same year or if end date is missing
     if (startFormatted === endFormatted || !endDate) {
         return startFormatted;
     }


    return `${startFormatted} - ${endFormatted}`;
}


export default function EducationSection({ educationEntries }: EducationSectionProps) {
  if (!educationEntries || educationEntries.length === 0) {
    return (
       <Card className="shadow-md rounded-lg border border-border">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
               <GraduationCap className="h-6 w-6" /> Education
            </CardTitle>
          </CardHeader>
          <CardContent>
             <Alert variant="destructive">
               <Terminal className="h-4 w-4" />
               <AlertTitle>No Education Data</AlertTitle>
               <AlertDescription>
                 Could not load education data or no information is available.
               </AlertDescription>
             </Alert>
          </CardContent>
       </Card>
    );
  }

  return (
    <Card className="shadow-md rounded-lg border border-border">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
          <GraduationCap className="h-6 w-6" /> Education
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {educationEntries.map((edu) => (
          <div key={edu.id} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
            <h3 className="text-xl font-semibold text-foreground">{edu.degree}</h3>
            <div className="flex items-center space-x-2 text-muted-foreground mt-1">
               <Building className="h-4 w-4" />
               <span>{edu.institution}</span>
            </div>
             <div className="flex items-center space-x-2 text-muted-foreground mt-1 text-sm">
                <Calendar className="h-4 w-4" />
                <span>{formatDateRange(edu.start_date, edu.end_date)}</span>
             </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
