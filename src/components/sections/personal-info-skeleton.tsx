import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function PersonalInfoSkeleton() {
  return (
    <Card className="mb-12 shadow-md rounded-lg overflow-hidden border border-border">
      <CardHeader className="bg-secondary p-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <Skeleton className="h-24 w-24 rounded-full" />
        <div className="text-center sm:text-left space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-32" />
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div>
          <Skeleton className="h-6 w-32 mb-3" />
          <div className="space-y-2">
             <Skeleton className="h-4 w-full" />
             <Skeleton className="h-4 w-5/6" />
          </div>
        </div>

        <div>
          <Skeleton className="h-6 w-40 mb-3" />
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="flex items-center space-x-3">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex items-start space-x-3">
              <Skeleton className="h-5 w-5 rounded mt-1 shrink-0" />
              <div className="space-y-2">
                 <Skeleton className="h-4 w-64" />
                 <Skeleton className="h-4 w-56" />
              </div>
            </div>
            <div className="flex items-center space-x-4 pt-2">
               <Skeleton className="h-9 w-24" />
               <Skeleton className="h-9 w-24" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
