import { Card } from "@/components/ui/card";
import { Construction } from "lucide-react";

const UnderDevelopment = ({ title }: { title: string }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <Card className="flex flex-col items-center justify-center min-h-[400px] border-dashed border-2">
        <Construction className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold">Under Development</h2>
        <p className="text-muted-foreground">
          The {title} module is coming soon.
        </p>
      </Card>
    </div>
  );
};

export default UnderDevelopment;
