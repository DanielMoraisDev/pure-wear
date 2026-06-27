import { BotOff, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Certifique-se de que o caminho está correto

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5.5">
      <BotOff className="w-24 h-24" />

      <div className="flex flex-col items-center justify-center gap-2.5 text-center max-w-lg">
        <h3 className="text-3xl font-semibold">Página Não Encontrada</h3>
        <p className="opacity-75">
          Parece que você entrou em uma página não existente em nosso sistema,
          por favor, retorne para a tela inicial.
        </p>
      </div>

      <Button
        onClick={() => navigate("/")}
        className="cursor-pointer hover:bg-wine text-white px-8 py-5 rounded-md transition-all duration-500 flex items-center gap-1.5"
      >
        <Home className="w-5 h-5" />
        <span className="font-medium">Retornar para o início</span>
      </Button>
    </div>
  );
};

export default NotFound;
