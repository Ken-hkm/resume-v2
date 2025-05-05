
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Briefcase } from 'lucide-react';

export default function PortfolioSkeleton() {
  return (
    <Card className="shadow-md rounded-lg border border-border">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-muted" />
          <Skeleton className="h-7 w-48" /> {/* Skeleton for Title */}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Render one skeleton item */}
        <div className="p-4 border border-border rounded-lg bg-secondary/30">
            <div className="flex items-center space-x-3 mb-2">
                <Skeleton className="h-5 w-5 rounded" /> {/* Icon */}
                <Skeleton className="h-6 w-3/5" /> {/* Title */}
            </div>
            <Skeleton className="h-4 w-4/5 mb-3" /> {/* Description */}
            <Skeleton className="h-4 w-24" /> {/* Link */}
        </div>
      </CardContent>
    </Card>
  );
}
