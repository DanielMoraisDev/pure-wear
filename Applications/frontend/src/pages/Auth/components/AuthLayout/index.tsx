import React from "react";
import logoImage from "@/assets/images/logo-white.png";
import { useNavigate } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export const AuthLayout = ({
  children,
  title,
  description,
}: AuthLayoutProps) => {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate(`/`);
  };
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* LADO ESQUERDO: Minimalista Moderno com Padrão Geométrico */}
      <div className="relative hidden flex-col justify-between bg-zinc-950 p-12 text-white lg:flex border-r border-zinc-900">
        {/* Efeito de Iluminação de Estúdio (Substitui os pontos de tech) */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-[10%] -top-[10%] h-[50%] w-[50%] rounded-full bg-zinc-800/20 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-[80%] w-[80%] bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-zinc-900/40 via-transparent to-transparent" />
        </div>

        {/* Logo/Brand - Minimalista e High-End */}
        <div
          className="relative z-20 flex items-center text-xl font-black tracking-[0.3em] uppercase cursor-pointer"
          onClick={() => handleBackToLogin()}
        >
          <img src={logoImage} className="max-h-12 dark:invert" alt="Logo" />
        </div>

        {/* Conteúdo Inferior - Vibe Editorial/Ecommerce */}
        <div className="relative z-20 mt-auto max-w-xl">
          <div className="space-y-6">
            <h2 className="text-6xl font-bold leading-[0.9] tracking-tighter italic">
              The New <br /> Standard.
            </h2>

            <div className="space-y-4">
              <p className="text-lg font-light leading-relaxed text-zinc-400">
                Curated pieces for those who understand that luxury lies in the
                simplicity of the cut and the quality of the raw material.
              </p>

              <footer className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                <span>Global Shipping</span>
                <div className="h-1 w-1 rounded-full bg-zinc-700" />
                <span>Sustainability</span>
                <div className="h-1 w-1 rounded-full bg-zinc-700" />
                <span>Limited Editions</span>
              </footer>
            </div>
          </div>
        </div>
      </div>

      {/* LADO DIREITO: Onde o formulário é renderizado */}
      <div className="flex items-center justify-center p-8 lg:p-12 bg-background">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[360px]">
          <div className="flex flex-col space-y-2 text-center lg:text-left">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              {title}
            </h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>

          {/* O Form (Login ou Register) entra aqui */}
          {children}
        </div>
      </div>
    </div>
  );
};
