import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PlaceholderSectionProps {
  title: string;
}

export default function PlaceholderSection({ title }: PlaceholderSectionProps) {
  return (
    <Card className="shadow-sm rounded-lg border border-border bg-muted/50"> {/* Adjusted style */}
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary/80">{title}</CardTitle> {/* Adjusted style */}
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground italic text-sm">Content for {title} will be added here later.</p>
        {/* Simplified placeholder visuals */}
         <div className="mt-3 space-y-3">
            <div className="h-3 bg-muted rounded w-3/4"></div>
            <div className="h-3 bg-muted rounded w-1/2"></div>
            {/* <div className="h-3 bg-muted rounded w-5/6"></div> */}
         </div>
      </CardContent>
    </Card>
  );
}
