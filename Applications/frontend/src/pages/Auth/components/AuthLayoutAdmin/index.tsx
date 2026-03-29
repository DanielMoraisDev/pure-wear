import React from "react";
import logoImage from "@/assets/images/logo-white.png";

interface AuthLayoutAdminProps {
  children: React.ReactNode;
  titleAdmin: string;
  descriptionAdmin: string;
}

export const AuthLayoutAdmin = ({
  children,
  titleAdmin,
  descriptionAdmin,
}: AuthLayoutAdminProps) => {
  return (
    <div className="grid min-h-screen grid-cols-1">
      <div className="flex items-center justify-center p-8 lg:p-12 bg-background">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[360px]">
          <div className="flex flex-col space-y-2 text-center lg:text-left">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              {titleAdmin}
            </h1>
            <p className="text-sm text-muted-foreground">{descriptionAdmin}</p>
          </div>

          {/* O Form (Login ou Register) entra aqui */}
          {children}
        </div>
      </div>
    </div>
  );
};
