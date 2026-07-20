import { useState } from "react";
import OrderRow from "./components/Order";
import OrderSkeleton from "./components/OrderSkeleton";
import OrderDetail from "./components/OrderDetail";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { useOrder } from "@/hooks/admin/use-orders";
import { Order } from "@/types/orders.type";

const Orders = () => {
  const { GetAll } = useOrder();
  const { data: response, isLoading } = GetAll({});

  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const orders = Array.isArray(response?.data) ? response.data : [];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Orders</h2>
      </div>

      <Card className="border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">ID</TableHead>
              <TableHead className="w-20">Customer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => <OrderSkeleton key={i} />)
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <OrderRow
                  key={order.id}
                  order={order}
                  onClick={() => {
                    setSelectedOrderId(order.id);
                    setIsDetailOpen(true);
                  }}
                />
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-10 text-muted-foreground"
                >
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
      <OrderDetail
        orderId={selectedOrderId}
        open={isDetailOpen}
        onOpenChange={(open) => {
          setIsDetailOpen(open);
          if (!open) {
            setSelectedOrderId(null);
          }
        }}
      />
    </div>
  );
};

export default Orders;
