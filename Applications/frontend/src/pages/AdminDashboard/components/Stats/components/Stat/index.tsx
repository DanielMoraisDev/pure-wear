import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StatProps {
  title: string;
  value: string | number;
  linkText: string;
}

const Stat = ({ title, value, linkText }: StatProps) => {
  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="pb-2">
        <span className="text-3xl font-bold tracking-tight">{value}</span>
        <CardTitle className="text-muted-foreground font-medium text-base">
          {title}
        </CardTitle>
      </CardHeader>
      <CardFooter className="border-t bg-muted/30 p-3">
        <Button
          variant="link"
          className="h-auto p-0 text-xs text-foreground font-medium"
        >
          {linkText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Stat;
