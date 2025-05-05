import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ExperienceSkeleton() {
  return (
    <Card className="shadow-md rounded-lg border border-border">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-primary">Experience</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {[1, 2].map((i) => ( // Render a couple of skeleton entries
          <div key={i} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
            <Skeleton className="h-6 w-3/5 mb-2" /> {/* Title */}
            <div className="flex items-center space-x-2 mt-1">
               <Skeleton className="h-4 w-4 rounded" /> {/* Icon */}
               <Skeleton className="h-4 w-2/4" /> {/* Company */}
            </div>
             <div className="flex items-center space-x-2 mt-1 text-sm">
               <Skeleton className="h-4 w-4 rounded" /> {/* Icon */}
               <Skeleton className="h-4 w-1/3" /> {/* Location */}
             </div>
             <div className="flex items-center space-x-2 mt-1 text-sm">
                <Skeleton className="h-4 w-4 rounded" /> {/* Icon */}
                <Skeleton className="h-4 w-1/4" /> {/* Date Range */}
             </div>

             {/* Skeleton for Accordion */}
             <div className="w-full mt-4 space-y-2">
                <div className="flex justify-between items-center py-4 border-b">
                   <Skeleton className="h-5 w-4/5" /> {/* Accordion Trigger Text */}
                   <Skeleton className="h-4 w-4" /> {/* Chevron */}
                </div>
                {/* Optionally add skeleton for content if needed, but trigger is often enough */}
             </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
