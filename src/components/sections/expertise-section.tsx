
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge'; // Using Badge for skills display
import { Lightbulb } from 'lucide-react';

interface ExpertiseSectionProps {
  skills: string[];
}

export default function ExpertiseSection({ skills }: ExpertiseSectionProps) {
  return (
    <Card className="shadow-sm rounded-lg border border-border">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
          <Lightbulb className="h-5 w-5" /> Expertise
        </CardTitle>
      </CardHeader>
      <CardContent>
        {skills && skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-sm font-normal">
                {skill}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground italic text-sm">No expertise information available.</p>
        )}
      </CardContent>
    </Card>
  );
}
