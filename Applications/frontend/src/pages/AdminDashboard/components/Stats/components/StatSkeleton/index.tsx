import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const StatSkeleton = () => (
  <Card className="w-full">
    <CardHeader className="pb-2 space-y-2">
      <Skeleton className="h-8 w-10" />
      <Skeleton className="h-4 w-20" />
    </CardHeader>
    <CardFooter className="border-t bg-muted/30 p-3">
      <Skeleton className="h-3 w-24" />
    </CardFooter>
  </Card>
);
export default StatSkeleton;
