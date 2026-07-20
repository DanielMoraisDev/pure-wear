import { useOrder } from "@/hooks/admin/use-orders";
import { Order } from "@/types/orders.type";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

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
          <DialogTitle>Detalhes do pedido</DialogTitle>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-16 text-sm text-muted-foreground">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Carregando
              detalhes...
            </div>
          ) : !order ? (
            <div className="rounded-xl border border-dashed border-muted p-8 text-center text-sm text-muted-foreground">
              Selecione um pedido para ver o detalhamento.
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
                      <p className="text-sm text-muted-foreground">Cliente</p>
                      <p className="text-lg font-semibold">{order.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.email}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.mobile}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Endereço</p>
                      <p>{order.address}</p>
                      <p>
                        {order.city}, {order.state} {order.zip}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="border p-6 bg-muted">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Status de Pagamento
                      </p>
                      <span className="inline-flex mt-2 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
                        {capitalize(order.payment_status)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Status do Pedido
                      </p>
                      <span className="inline-flex mt-2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                        {capitalize(order.status)}
                      </span>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="border p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">Items</p>
                    <span className="text-sm text-muted-foreground">
                      {order.items.length} produto(s)
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
                                  Sem imagem
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
