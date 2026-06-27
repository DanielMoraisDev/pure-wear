import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function PrivacyPolicy() {
  const lastUpdated = "29 de Março de 2026";

  return (
    /* w-full ocupa a div pai, max-w-3xl impede que o texto fique largo demais e mx-auto centraliza */
    <div className="w-full max-w-3xl mx-auto py-12 px-6">
      {/* Cabeçalho centralizado via flex-center */}
      <header className="flex flex-col items-center text-center gap-4 mb-16">
        <Badge variant="secondary" className="rounded-full">
          Documento Legal
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
          Termos e Privacidade
        </h1>
        <p className="text-muted-foreground text-lg">
          Leia atentamente como tratamos seus dados e as regras da nossa
          plataforma.
        </p>
        <span className="text-xs uppercase tracking-widest text-muted-foreground/60 font-medium">
          Última atualização: {lastUpdated}
        </span>
      </header>

      {/* Conteúdo das Seções */}
      <div className="flex flex-col gap-10 text-muted-foreground leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground tracking-tight">
            1. Transações e Pagamentos
          </h2>
          <p>
            Ao realizar um pedido, você concorda que todas as informações de
            pagamento fornecidas são verdadeiras e precisas. Utilizamos gateways
            criptografados para sua segurança.
          </p>
        </section>

        <Separator className="bg-border/40" />

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground tracking-tight">
            2. Processamento e Entrega
          </h2>
          <p>
            O prazo de entrega começa após a confirmação do pagamento. Atrasos
            por transportadoras terceirizadas serão comunicados imediatamente.
          </p>
        </section>

        <Separator className="bg-border/40" />

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground tracking-tight">
            3. Arrependimento e Devoluções
          </h2>
          <p>
            Conforme o CDC, você tem <strong>7 dias corridos</strong> para
            desistência. O produto deve estar lacrado e sem sinais de uso.
          </p>
        </section>

        <Separator className="bg-border/40" />

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground tracking-tight">
            4. Segurança e Dados
          </h2>
          <p>
            Seus dados são processados de acordo com a LGPD. Não compartilhamos
            informações pessoais com terceiros para fins de marketing sem sua
            permissão.
          </p>
        </section>
      </div>

      <footer className="mt-20 p-8 border border-border/50 rounded-2xl bg-muted/20 text-center">
        <p className="text-sm text-muted-foreground">
          Dúvidas? Entre em contato com nosso suporte via e-mail ou WhatsApp.
        </p>
      </footer>
    </div>
  );
}
