import { ArrowLeft, CreditCard, MapPin, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useCartStore, useCartTotal } from "@/stores/useCartStore";
import { useCustomerStore } from "@/stores/useCustomerStore";
import { useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import {
  OrderSaveBody,
  OrderSaveCartItem,
} from "@/types/frontend/orders.types";
import { toast } from "sonner";
import { useOrder } from "@/hooks/frontend/use-order";
import { useUser } from "@/hooks/frontend/use-users";
import { useShipping } from "@/hooks/admin/use-shippings";
import {
  CardElement,
  Elements,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { apiUrl, STRIPE_PUBLIC_KEY } from "@/components/common/http";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const Checkout = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<"cod" | "stripe">("cod");
  const [cardComplete, setCardComplete] = useState(false);
  const [cardError, setCardError] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  const [dataCheckout, setDataCheckout] = useState<OrderSaveBody>({
    name: "",
    payment_status: paymentMethod === "stripe" ? "paid" : "not paid",
    email: "",
    city: "",
    state: "",
    zip: "",
    address: "",
    mobile: "",
    grand_total: 0,
    sub_total: 0,
    shipping: 0,
    cart: [],
  });

  useEffect(() => {
    setDataCheckout((prev) => ({
      ...prev,
      payment_status: paymentMethod === "stripe" ? "paid" : "not paid",
    }));
  }, [paymentMethod]);

  const navigate = useNavigate();
  const { productsInCart, clearCart } = useCartStore();
  const total = useCartTotal();
  const { GetProfileDetails } = useUser();
  const { Get: getShipping } = useShipping();

  const { data: profileData, isLoading: isProfileLoading } = GetProfileDetails(
    {},
    { enabled: true },
  );
  const { data: shippingData, isLoading: isShippingLoading } = getShipping(
    {},
    { enabled: true },
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasCompletedOrder, setHasCompletedOrder] = useState(false);
  const shippingCharge = shippingData?.data?.shipping_charge ?? 0;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (profileData?.data) {
      const profile = profileData.data;
      const fullName = profile.name?.trim() || "";
      const nameParts = fullName.split(/\s+/).filter(Boolean);

      setFirstName(nameParts[0] || "");
      setLastName(nameParts.slice(1).join(" ") || "");
      setDataCheckout((prev) => ({
        ...prev,
        name: fullName,
        email: profile.email || prev.email,
        address: profile.address || prev.address,
        city: profile.city || prev.city,
        state: profile.state || prev.state,
        zip: profile.zip || prev.zip,
        mobile: profile.mobile || prev.mobile,
      }));
    }
  }, [profileData]);

  useEffect(() => {
    if (productsInCart.length === 0 && !isLoading && !hasCompletedOrder) {
      navigate("/cart");
    }

    const formattedCart: OrderSaveCartItem[] = productsInCart.map((item) => ({
      product_id: item.id,
      name: item.name,
      qty: item.quantity,
      price: item.price * item.quantity,
      unit_price: item.price,
      size: item.size,
    }));

    setDataCheckout((prev) => ({
      ...prev,
      grand_total: total + shippingCharge,
      sub_total: total,
      shipping: shippingCharge,
      cart: formattedCart,
    }));
  }, [
    productsInCart,
    isLoading,
    navigate,
    hasCompletedOrder,
    shippingCharge,
    total,
  ]);

  useEffect(() => {
    setDataCheckout((prev) => ({
      ...prev,
      name: `${firstName} ${lastName}`,
    }));
  }, [lastName, firstName]);

  const { OrderSave } = useOrder();

  const { mutate: orderSave, isPending } = OrderSave();

  const onSubmit = async (
    e: FormEvent<HTMLFormElement>,
    stripe: any,
    elements: any,
  ) => {
    e.preventDefault();
    // 1. Validação de Nome Completo (visto que vem de dois inputs separados)
    if (!firstName.trim()) {
      toast.warning("Por favor, preencha o seu primeiro nome.");
      return;
    }
    if (!lastName.trim()) {
      toast.warning("Por favor, preencha o seu sobrenome.");
      return;
    }

    // 2. Validação dos Campos de Endereço e Contato
    if (!dataCheckout.email.trim()) {
      toast.warning("O e-mail do usuário precisa estar preenchido.");
      return;
    }

    // Validação simples de formato de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(dataCheckout.email)) {
      toast.warning("Por favor, insira um e-mail válido.");
      return;
    }

    if (!dataCheckout.mobile.trim()) {
      toast.warning("O número de celular/telefone precisa ser preenchido.");
      return;
    }

    if (!dataCheckout.zip.trim()) {
      toast.warning("O CEP precisa ser preenchido.");
      return;
    }

    if (!dataCheckout.address.trim()) {
      toast.warning("O endereço de entrega precisa ser preenchido.");
      return;
    }

    if (!dataCheckout.city.trim()) {
      toast.warning("A cidade precisa ser preenchida.");
      return;
    }

    if (!dataCheckout.state.trim()) {
      toast.warning("O estado precisa ser preenchido.");
      return;
    }

    if (paymentMethod === "stripe" && !cardComplete) {
      toast.warning("Por favor, insira os dados do cartão para Stripe.");
      return;
    }

    if (paymentMethod === "stripe" && cardError) {
      toast.warning(cardError);
      return;
    }

    // 3. Validação de Segurança (Garantir que o carrinho não está vazio ao enviar)
    if (dataCheckout.cart.length === 0) {
      toast.error("Seu carrinho está vazio!");
      return;
    }

    const customerToken = useCustomerStore.getState().customerInfo?.token;

    if (paymentMethod === "stripe") {
      if (!customerToken) {
        setPaymentStatus(
          "Usuário não autenticado. Faça login e tente novamente.",
        );
        return;
      }

      setLoading(true);
      setPaymentStatus("Iniciando pagamento com Stripe...");

      const response = await fetch(`${apiUrl}/get-payment-details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${customerToken}`,
        },
        body: JSON.stringify({
          amount: Math.round(dataCheckout.grand_total * 100), // Converte para centavos
        }),
      });

      const result = await response.json();

      const clientSecret = result?.clientSecret || result?.client_secret;

      if (!clientSecret) {
        setPaymentStatus(
          "Não foi possível processar o pagamento. Tente novamente.",
        );
        setLoading(false);
        return;
      }

      if (!stripe || !elements) {
        setPaymentStatus("Stripe não está pronto. Aguarde alguns instantes.");
        setLoading(false);
        return;
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setPaymentStatus(
          "Erro no formulário do cartão. Recarregue a página e tente novamente.",
        );
        setLoading(false);
        return;
      }

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: dataCheckout.name,
            email: dataCheckout.email,
            address: {
              line1: dataCheckout.address,
              city: dataCheckout.city,
              state: dataCheckout.state,
              postal_code: dataCheckout.zip,
            },
          },
        },
      });

      if (paymentResult.error) {
        setPaymentStatus(`Pagamento falhou: ${paymentResult.error.message}`);
        setLoading(false);
        return;
      }

      if (paymentResult.paymentIntent?.status !== "succeeded") {
        setPaymentStatus(
          "Pagamento não concluído. Verifique seu cartão e tente novamente.",
        );
        setLoading(false);
        return;
      }

      setPaymentStatus("Pagamento realizado com sucesso!");
    }

    const payloadToSend: OrderSaveBody = {
      ...dataCheckout,
      payment_status: paymentMethod === "stripe" ? "paid" : "not paid",
    };

    // Dispara a requisição
    orderSave(payloadToSend, {
      onSuccess: (response) => {
        const finishedOrder = {
          orderId: `#${Date.now()}`,
          orderDate: new Date().toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          status: "pending",
          customerName: `${firstName} ${lastName}`.trim(),
          email: dataCheckout.email,
          address: dataCheckout.address,
          city: dataCheckout.city,
          state: dataCheckout.state,
          zip: dataCheckout.zip,
          mobile: dataCheckout.mobile,
          paymentStatus: paymentMethod === "stripe" ? "paid" : "not paid",
          paymentMethod:
            paymentMethod === "stripe" ? "Stripe" : "Cash On Delivery",
          items: productsInCart.map((product) => ({
            product_id: product.id,
            name: product.name,
            qty: product.quantity,
            price: product.price * product.quantity,
            unit_price: product.price,
            size: product.size,
            img: product.img,
          })),
          subTotal: total,
          shipping: shippingCharge,
          grandTotal: total + shippingCharge,
          message: response?.message || "Pedido realizado com sucesso",
        };

        sessionStorage.setItem(
          "completedOrderData",
          JSON.stringify(finishedOrder),
        );

        setHasCompletedOrder(true);
        clearCart();
        setLoading(false);

        navigate("/orders/finished", {
          replace: true,
          state: { orderData: finishedOrder },
        });
      },
      onError: () => {
        setLoading(false);
        setPaymentStatus(
          "Ocorreu um erro ao salvar o pedido. Tente novamente.",
        );
      },
    });
  };

  const isPageLoading = isLoading || isProfileLoading || isShippingLoading;

  if (isPageLoading) {
    return (
      <div className="container mx-auto px-4 py-8 lg:px-8 space-y-8">
        <Skeleton className="h-10 w-48" />
        <div className="grid gap-10 lg:grid-cols-12">
          <Skeleton className="lg:col-span-8 h-150 rounded-xl" />
          <Skeleton className="lg:col-span-4 h-100 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <ElementsConsumer>
        {({ stripe, elements }) => (
          <div className="container mx-auto px-4 py-8 lg:px-8">
            <div className="mb-8 flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/cart")}
                className="rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
            </div>

            <form
              onSubmit={(e) => onSubmit(e, stripe, elements)}
              className="grid gap-10 lg:grid-cols-12"
            >
              {/* Formulários (Esquerda) */}
              <div className="lg:col-span-8 space-y-10">
                <section className="rounded-xl border bg-card p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-primary/10 p-2.5 rounded-lg text-primary">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <h2 className="text-xl font-semibold">Shipping Address</h2>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        id="firstName"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        id="lastName"
                        placeholder="Doe"
                        required
                      />
                    </div>
                    <div className="grid gap-2 md:col-span-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        value={dataCheckout.email}
                        onChange={(e) =>
                          setDataCheckout((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    <div className="grid gap-2 md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        value={dataCheckout.address}
                        onChange={(e) =>
                          setDataCheckout((prev) => ({
                            ...prev,
                            address: e.target.value,
                          }))
                        }
                        id="address"
                        placeholder="123 Main St"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        value={dataCheckout.city}
                        onChange={(e) =>
                          setDataCheckout((prev) => ({
                            ...prev,
                            city: e.target.value,
                          }))
                        }
                        id="city"
                        placeholder="Arapiraca"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        value={dataCheckout.state}
                        onChange={(e) =>
                          setDataCheckout((prev) => ({
                            ...prev,
                            state: e.target.value,
                          }))
                        }
                        id="state"
                        placeholder="Alagoas"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="zip">CEP</Label>
                      <Input
                        value={dataCheckout.zip}
                        onChange={(e) =>
                          setDataCheckout((prev) => ({
                            ...prev,
                            zip: e.target.value,
                          }))
                        }
                        id="zip"
                        placeholder="231313-1123"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="mobile">Telefone</Label>
                      <Input
                        value={dataCheckout.mobile}
                        onChange={(e) =>
                          setDataCheckout((prev) => ({
                            ...prev,
                            mobile: e.target.value,
                          }))
                        }
                        id="mobile"
                        placeholder="(85) 99213-213321"
                        required
                      />
                    </div>
                  </div>
                </section>

                <section className="rounded-xl border bg-card p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-primary/10 p-2.5 rounded-lg text-primary">
                      <CreditCard className="h-6 w-6" />
                    </div>
                    <h2 className="text-xl font-semibold">Payment Details</h2>
                  </div>
                  <div className="grid gap-5">
                    <div className="grid gap-2">
                      <Label htmlFor="paymentMethod">
                        Choose Payment Method
                      </Label>
                      <div className="grid gap-2 sm:grid-cols-2">
                        <Button
                          type="button"
                          variant={
                            paymentMethod === "cod" ? "default" : "outline"
                          }
                          className="w-full"
                          onClick={() => setPaymentMethod("cod")}
                        >
                          Cash On Delivery
                        </Button>
                        <Button
                          type="button"
                          variant={
                            paymentMethod === "stripe" ? "default" : "outline"
                          }
                          className="w-full"
                          onClick={() => setPaymentMethod("stripe")}
                        >
                          Stripe
                        </Button>
                      </div>
                    </div>

                    {paymentMethod === "stripe" ? (
                      <div className="grid gap-3">
                        <Label htmlFor="stripe-card">Card details</Label>
                        <div className="rounded-lg border border-input bg-background px-3 py-3">
                          <CardElement
                            id="stripe-card"
                            options={{
                              style: {
                                base: {
                                  color: "#0f172a",
                                  fontSize: "16px",
                                  fontFamily: "inherit",
                                  "::placeholder": {
                                    color: "#94a3b8",
                                  },
                                },
                                invalid: {
                                  color: "#dc2626",
                                },
                              },
                            }}
                            onChange={(event) => {
                              setCardComplete(event.complete);
                              setCardError(event.error?.message || "");
                            }}
                          />
                        </div>
                        {cardError ? (
                          <p className="text-sm text-destructive">
                            {cardError}
                          </p>
                        ) : null}
                        {paymentStatus ? (
                          <p className="text-sm text-primary">
                            {paymentStatus}
                          </p>
                        ) : null}
                      </div>
                    ) : (
                      <div className="rounded-lg border border-input bg-muted p-4 text-sm text-muted-foreground">
                        Pay with cash when your order is delivered.
                      </div>
                    )}
                  </div>
                </section>
              </div>

              {/* Resumo (Direita) */}
              <div className="lg:col-span-4 lg:sticky lg:top-8 lg:h-fit">
                <div className="rounded-xl border bg-card p-6 shadow-sm space-y-6">
                  <h2 className="text-lg font-semibold">Order Summary</h2>

                  <ScrollArea className="h-full max-h-75 pr-3">
                    <div className="space-y-4">
                      {productsInCart.map((product) => (
                        <div
                          key={`${product.id}-${product.size}`}
                          className="flex items-center gap-4"
                        >
                          <div className="relative h-16 w-16 shrink-0">
                            <img
                              src={product.img}
                              alt={product.name}
                              className="h-full w-full rounded-md border object-cover bg-muted"
                            />
                            {/* Badge de Quantidade sobre a imagem */}
                            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-sm">
                              {product.quantity}
                            </span>
                          </div>

                          <div className="flex-1 text-sm">
                            <p className="font-medium line-clamp-1">
                              {product.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Size: {product.size}{" "}
                              {product.quantity > 1 && `(x${product.quantity})`}
                            </p>
                          </div>

                          <span className="text-sm font-medium">
                            $ {(product.price * product.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>$ {total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span
                        className={
                          shippingCharge === 0
                            ? "text-green-600 font-medium"
                            : "font-medium"
                        }
                      >
                        {shippingCharge === 0
                          ? "Free"
                          : `$${shippingCharge.toFixed(2)}`}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg text-primary">
                      <span>Total</span>
                      <span>$ {(total + shippingCharge).toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isPending || loading}
                    className="w-full py-6 text-base font-bold rounded-xl shadow-lg transition-all hover:scale-[1.02]"
                  >
                    {loading || isPending ? "Processando..." : "Complete Order"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        )}
      </ElementsConsumer>
    </Elements>
  );
};

export default Checkout;
