
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react'; // Example icon for Education

interface PlaceholderSectionProps {
  title: string;
}

export default function PlaceholderSection({ title }: PlaceholderSectionProps) {
  const Icon = title === "Education" ? BookOpen : null; // Choose icon based on title

  return (
    <Card className="shadow-sm rounded-lg border border-border bg-muted/50">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary/80 flex items-center gap-2">
           {Icon && <Icon className="h-5 w-5" />}
           {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground italic text-sm">Content for {title} will be added here later.</p>
         {/* Simplified placeholder visuals */}
         <div className="mt-3 space-y-3">
            <div className="h-3 bg-muted rounded w-3/4"></div>
            <div className="h-3 bg-muted rounded w-1/2"></div>
         </div>
      </CardContent>
    </Card>
  );
}
