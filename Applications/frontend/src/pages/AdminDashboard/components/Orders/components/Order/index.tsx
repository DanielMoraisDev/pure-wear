import { TableCell, TableRow } from "@/components/ui/table";
import { Order, PaymentStatus, Status } from "@/types/orders.type";

interface OrderRowProps {
  order: Order;
}

// 1. Mapeamento de cores para o Status de Pagamento
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

// Helper simples para deixar a primeira letra maiúscula (ex: "not paid" -> "Not Paid")
const capitalize = (str: string) =>
  str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const OrderRow = ({ order }: OrderRowProps) => {
  return (
    <TableRow className="hover:bg-muted/50 transition-colors">
      <TableCell className="font-medium text-muted-foreground">
        {order.id}
      </TableCell>
      <TableCell className="font-medium">{order.name}</TableCell>
      <TableCell className="font-medium">{order.email}</TableCell>
      <TableCell className="font-medium">
        {/* Formatando o dinheiro de forma amigável */}
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(order.grand_total)}
      </TableCell>
      <TableCell className="font-medium">
        {(() => {
          const date = new Date(order.created_at);
          return isNaN(date.getTime())
            ? "Data inválida"
            : new Intl.DateTimeFormat("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }).format(date);
        })()}
      </TableCell>

      {/* Coluna Payment Status */}
      <TableCell>
        <span
          className={`inline-flex items-center justify-center px-3 py-1 text-xs rounded-full min-w-[85px] text-center ${
            paymentStatusStyles[order.payment_status]
          }`}
        >
          {capitalize(order.payment_status)}
        </span>
      </TableCell>

      {/* Coluna Status */}
      <TableCell>
        <span
          className={`inline-flex items-center justify-center px-3 py-1 text-xs rounded-full min-w-[85px] text-center ${
            orderStatusStyles[order.status]
          }`}
        >
          {capitalize(order.status)}
        </span>
      </TableCell>
    </TableRow>
  );
};

export default OrderRow;
