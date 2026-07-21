import { ArrowRight, CheckCircle, MapPin, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useCartStore } from "@/stores/useCartStore";

interface OrderItem {
  product_id: string;
  name: string;
  qty: number;
  price: number;
  unit_price: number;
  size: string;
  img?: string;
}

interface OrderData {
  orderId?: string;
  orderDate?: string;
  status?: string;
  customerName?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  mobile?: string;
  paymentMethod?: string;
  items?: OrderItem[];
  subTotal?: number;
  shipping?: number;
  grandTotal?: number;
}

const OrdersFinished = () => {
  const { productsInCart, clearCart } = useCartStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const receivedOrderData = location.state?.orderData as OrderData | null;

    if (receivedOrderData) {
      sessionStorage.setItem(
        "completedOrderData",
        JSON.stringify(receivedOrderData),
      );
      setOrderData(receivedOrderData);
      return;
    }

    const savedOrderData = sessionStorage.getItem("completedOrderData");

    if (savedOrderData) {
      try {
        setOrderData(JSON.parse(savedOrderData) as OrderData);
        return;
      } catch {
        sessionStorage.removeItem("completedOrderData");
      }
    }

    setOrderData(null);
  }, [location.state]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 lg:px-8 space-y-8">
        <Skeleton className="h-12 w-64 mx-auto" />
        <Skeleton className="h-8 w-96 mx-auto" />
        <div className="grid gap-10 lg:grid-cols-12">
          <Skeleton className="lg:col-span-8 h-[600px] rounded-xl" />
          <Skeleton className="lg:col-span-4 h-[500px] rounded-xl" />
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-muted-foreground">
          Order not found
        </h1>
      </div>
    );
  }

  const currentOrderData = {
    orderId: orderData.orderId || "#000",
    orderDate: orderData.orderDate || "N/A",
    status: orderData.status || "pending",
    customerName: orderData.customerName || "N/A",
    email: orderData.email || "N/A",
    address: orderData.address || "N/A",
    city: orderData.city || "N/A",
    state: orderData.state || "N/A",
    zip: orderData.zip || "N/A",
    mobile: orderData.mobile || "N/A",
    paymentMethod: orderData.paymentMethod || "Not specified",
    items: orderData.items || [],
    subTotal: orderData.subTotal || 0,
    shipping: orderData.shipping || 0,
    grandTotal: orderData.grandTotal || 0,
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8">
      {/* Header with Success Message */}
      <div className="mb-10 text-center space-y-4">
        <div className="flex justify-center">
          <div className="rounded-full bg-green-100 p-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Thank You!</h1>
        <p className="text-lg text-muted-foreground">
          You have successfully placed your order.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-12">
        {/* Order Details (Esquerda) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Order Summary Card */}
          <section className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                <p className="font-semibold text-lg">
                  {currentOrderData.orderId}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order Date</p>
                <p className="font-semibold text-lg">
                  {currentOrderData.orderDate}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <Badge className={getStatusColor(currentOrderData.status)}>
                  {currentOrderData.status.charAt(0).toUpperCase() +
                    currentOrderData.status.slice(1)}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Payment Method
                </p>
                <p className="font-semibold">
                  {currentOrderData.paymentMethod}
                </p>
              </div>
            </div>
          </section>

          {/* Shipping Address */}
          <section className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 p-2.5 rounded-lg text-primary">
                <MapPin className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-semibold">Shipping Address</h2>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Customer Name</p>
                <p className="font-medium">{currentOrderData.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{currentOrderData.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium">{currentOrderData.address}</p>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">City</p>
                  <p className="font-medium">{currentOrderData.city}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">State</p>
                  <p className="font-medium">{currentOrderData.state}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ZIP Code</p>
                  <p className="font-medium">{currentOrderData.zip}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Contact</p>
                <p className="font-medium">{currentOrderData.mobile}</p>
              </div>
            </div>
          </section>

          {/* Order Items */}
          <section className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 p-2.5 rounded-lg text-primary">
                <Package className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-semibold">Items</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-3 font-semibold text-sm">
                      Item
                    </th>
                    <th className="text-center py-3 px-3 font-semibold text-sm">
                      Size
                    </th>
                    <th className="text-center py-3 px-3 font-semibold text-sm">
                      Quantity
                    </th>
                    <th className="text-right py-3 px-3 font-semibold text-sm">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrderData.items.map((item) => (
                    <tr
                      key={`${item.product_id}-${item.size}`}
                      className="border-b"
                    >
                      <td className="py-4 px-3">
                        <div className="flex items-center gap-3">
                          {item.img && (
                            <img
                              src={item.img}
                              alt={item.name}
                              className="h-12 w-12 rounded object-cover"
                            />
                          )}
                          <span className="font-medium line-clamp-2">
                            {item.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-3 text-center text-sm">
                        {item.size}
                      </td>
                      <td className="py-4 px-3 text-center text-sm">
                        {item.qty}
                      </td>
                      <td className="py-4 px-3 text-right font-medium">
                        ${item.price.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Order Total (Direita) */}
        <div className="lg:col-span-4 lg:sticky lg:top-8 lg:h-fit">
          <div className="rounded-xl border bg-card p-6 shadow-sm space-y-6">
            <h2 className="text-lg font-semibold">Order Total</h2>

            <Separator />

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">
                  ${currentOrderData.subTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium text-green-600">
                  {currentOrderData.shipping === 0
                    ? "Free"
                    : `$${currentOrderData.shipping}`}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg text-primary">
                <span>Grand Total</span>
                <span>${currentOrderData.grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <Button
                onClick={() => navigate("/account/orders")}
                variant="outline"
                className="w-full py-6 text-base font-semibold rounded-xl"
              >
                View More Orders
              </Button>
              <Button
                onClick={() => {
                  navigate("/");
                  clearCart();
                }}
                className="w-full py-6 text-base font-bold rounded-xl shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                Back to Home
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersFinished;
