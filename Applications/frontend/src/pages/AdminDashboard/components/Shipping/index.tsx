import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useShipping } from "@/hooks/admin/use-shippings";
import { ShippingUpdateBody } from "@/types/admin/shippings.types";
import { toast } from "sonner";

const Shipping = () => {
  const { Get, Update } = useShipping();
  const { mutate: updateShipping, isPending } = Update();
  const { data, isLoading, isError, refetch } = Get({}, { enabled: true });

  const [shippingCharge, setShippingCharge] = useState<string>("0");
  const [error, setError] = useState("");

  useEffect(() => {
    if (data?.data?.shipping_charge !== undefined) {
      setShippingCharge(String(data.data.shipping_charge));
    }
  }, [data]);

  const handleSubmit = () => {
    const value = Number(shippingCharge);

    if (!shippingCharge || Number.isNaN(value) || value < 0) {
      setError("Enter a valid shipping value.");
      toast.warning("Enter a valid shipping value.");
      return;
    }

    setError("");

    const payload: ShippingUpdateBody = { shipping_charge: value };

    updateShipping(payload, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-border bg-background p-8 text-center text-sm text-muted-foreground">
        Loading shipping cost...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-3xl border border-destructive/20 bg-destructive/10 p-8 text-center text-sm text-destructive">
        Unable to load shipping information.
      </div>
    );
  }

  return (
    <Card className="shadow-sm border border-border">
      <CardHeader className="px-6 pt-6">
        <CardTitle>Shipping</CardTitle>
        <CardDescription>
          Manage the global shipping charge for orders.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="grid gap-4 md:max-w-xl">
          <div className="grid gap-1">
            <Label htmlFor="shipping-charge">Shipping Charge</Label>
            <Input
              id="shipping-charge"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={shippingCharge}
              placeholder="0.00"
              onChange={(event) => {
                setShippingCharge(event.target.value);
                if (error) setError("");
              }}
            />
            {error ? (
              <span className="text-xs text-destructive">{error}</span>
            ) : null}
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full h-11"
          >
            {isPending ? "Saving..." : "Save shipping charge"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Shipping;
