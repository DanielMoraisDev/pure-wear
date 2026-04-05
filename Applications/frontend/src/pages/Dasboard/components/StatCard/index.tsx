import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StatCardProps {
  title: string;
  value: string | number;
  linkText: string;
}

export const StatCard = ({ title, value, linkText }: StatCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <span className="text-3xl font-bold">{value}</span>
        <CardTitle className="text-muted-foreground font-medium text-base">
          {title}
        </CardTitle>
      </CardHeader>
      <CardFooter className="border-t bg-muted/50 p-3">
        <Button variant="link" className="h-auto p-0 text-xs text-foreground">
          {linkText}
        </Button>
      </CardFooter>
    </Card>
  );
};
