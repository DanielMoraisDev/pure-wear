import { useOrder } from "@/hooks/frontend/use-order";
import { Order, PaymentStatus, Status } from "@/types/orders.type";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const paymentStatusStyles: Record<PaymentStatus, string> = {
  "not paid": "bg-red-600 text-white font-semibold shadow-sm",
  paid: "bg-emerald-600 text-white font-semibold shadow-sm",
};

// 2. Mapeamento de cores para o Status do Pedido
const orderStatusStyles: Record<Status, string> = {
  pending: "bg-amber-500 text-white font-semibold shadow-sm",
  shipped: "bg-blue-500 text-white font-semibold shadow-sm",
  delivered: "bg-emerald-700 text-white font-semibold shadow-sm",
  cancelled: "bg-zinc-500 text-white font-semibold shadow-sm",
};

interface OrderDetailProps {
  orderId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

const formatDate = (value: Date | string) => {
  const date = new Date(value);
  if (isNaN(date.getTime())) return "Data inválida";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const capitalize = (value: string) =>
  value
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const OrderDetail = ({ orderId, open, onOpenChange }: OrderDetailProps) => {
  const { GetOne } = useOrder();
  const { data: response, isLoading } = GetOne(
    { orderId: orderId?.toString() ?? "" },
    { enabled: open && orderId !== null },
  );

  const order: Order | undefined = response?.data;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-w-[calc(100%-2rem)] max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order details</DialogTitle>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-16 text-sm text-muted-foreground">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading
              details...
            </div>
          ) : !order ? (
            <div className="rounded-xl border border-dashed border-muted p-8 text-center text-sm text-muted-foreground">
              Select an order to see the details.
            </div>
          ) : (
            <div className="space-y-6">
              <Card className="border p-6">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Order ID
                    </p>
                    <p className="text-2xl font-semibold">#{order.id}</p>
                    <span className="inline-flex mt-2 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white">
                      {capitalize(order.status)}
                    </span>
                  </div>

                  <div className="grid gap-3 text-sm sm:text-right">
                    <div>
                      <p className="text-muted-foreground">Date</p>
                      <p className="font-medium">
                        {formatDate(order.created_at)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Payment Status</p>
                      <p className="font-medium">
                        {capitalize(order.payment_status)}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
                <Card className="border p-6">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Customer</p>
                      <p className="text-lg font-semibold">{order.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.email}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.mobile}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p>{order.address}</p>
                      <p>
                        {order.city}, {order.state} {order.zip}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="border p-6 bg-muted">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="payment-status">Payment Status</Label>
                      <p
                        className={`text-md inline-flex items-center justify-center px-3 py-1 rounded-full ${paymentStatusStyles[order.payment_status]}`}
                      >
                        {order.payment_status}
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="order-status">Order Status</Label>
                      <p
                        className={`text-md inline-flex items-center justify-center px-3 py-1 rounded-full ${orderStatusStyles[order.status]}`}
                      >
                        {order.status}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="border p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">Items</p>
                    <span className="text-sm text-muted-foreground">
                      {order.items.length} item(s)
                    </span>
                  </div>

                  <div className="space-y-4">
                    {order.items.map((item) => {
                      const product = Array.isArray(item.product)
                        ? item.product[0]
                        : item.product;

                      const image = product?.image_url || product?.image || "";

                      return (
                        <div
                          key={item.id}
                          className="flex flex-col gap-4 rounded-2xl border border-muted/70 p-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="flex items-center gap-4">
                            <div className="h-20 w-20 overflow-hidden rounded-xl border bg-muted">
                              {image ? (
                                <img
                                  src={image}
                                  alt={item.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                                  No image
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-semibold">{item.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Size {item.size}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-1 text-right">
                            <p className="font-semibold">
                              {formatCurrency(item.unit_price)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              x{item.qty}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-3 rounded-2xl border border-muted/70 bg-muted p-4 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatCurrency(order.sub_total)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{formatCurrency(order.shipping)}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Grand Total</span>
                      <span>{formatCurrency(order.grand_total)}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetail;
