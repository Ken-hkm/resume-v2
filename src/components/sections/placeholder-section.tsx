import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PlaceholderSectionProps {
  title: string;
}

export default function PlaceholderSection({ title }: PlaceholderSectionProps) {
  return (
    <Card className="shadow-md rounded-lg border border-border">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground italic">Content for {title} will be added here later.</p>
        {/* You can add more detailed placeholders if needed */}
         <div className="mt-4 space-y-4">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
         </div>
      </CardContent>
    </Card>
  );
}
