
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { GraduationCap } from 'lucide-react';

export default function EducationSkeleton() {
  return (
    <Card className="shadow-md rounded-lg border border-border">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
           <GraduationCap className="h-6 w-6 text-muted" /> {/* Use muted color for skeleton icon */}
           <Skeleton className="h-7 w-32" /> {/* Skeleton for Title */}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {[1, 2].map((i) => ( // Render a couple of skeleton entries
          <div key={i} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
            <Skeleton className="h-6 w-4/6 mb-2" /> {/* Degree */}
            <div className="flex items-center space-x-2 mt-1">
               <Skeleton className="h-4 w-4 rounded" /> {/* Icon */}
               <Skeleton className="h-4 w-3/5" /> {/* Institution */}
            </div>
             <div className="flex items-center space-x-2 mt-1 text-sm">
                <Skeleton className="h-4 w-4 rounded" /> {/* Icon */}
                <Skeleton className="h-4 w-1/4" /> {/* Date Range */}
             </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
