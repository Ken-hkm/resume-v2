
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ExpertiseSkeleton() {
  return (
    <div className="space-y-12">
      {/* Expertise Skeleton */}
      <Card className="shadow-sm rounded-lg border border-border">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded" />
            <Skeleton className="h-6 w-32" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-32 rounded-full" />
            <Skeleton className="h-6 w-28 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
             <Skeleton className="h-6 w-36 rounded-full" />
          </div>
        </CardContent>
      </Card>

      {/* Technical Expertise Skeleton */}
      <Card className="shadow-sm rounded-lg border border-border">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
             <Skeleton className="h-5 w-5 rounded" />
             <Skeleton className="h-6 w-48" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i}>
              <Skeleton className="h-5 w-1/3 mb-2" /> {/* Skill Name */}
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-28 rounded-full" />
                <Skeleton className="h-6 w-36 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
