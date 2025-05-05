
import type { TechnicalSkill } from '@/services/expertise';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code } from 'lucide-react';

interface TechnicalExpertiseSectionProps {
  technicalSkills: TechnicalSkill[];
}

export default function TechnicalExpertiseSection({ technicalSkills }: TechnicalExpertiseSectionProps) {
  return (
    <Card className="shadow-sm rounded-lg border border-border">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
          <Code className="h-5 w-5" /> Technical Expertise
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {technicalSkills && technicalSkills.length > 0 ? (
          technicalSkills.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h3 className="text-base font-medium text-accent mb-2">{group.skill_name}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item, itemIndex) => (
                  <Badge key={itemIndex} variant="outline" className="text-sm font-normal">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground italic text-sm">No technical expertise information available.</p>
        )}
      </CardContent>
    </Card>
  );
}
