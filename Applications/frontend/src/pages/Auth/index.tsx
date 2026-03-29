import { useState } from "react";
import { AuthLayout } from "./components/AuthLayout";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { AuthLayoutAdmin } from "./components/AuthLayoutAdmin";
import { LoginFormAdmin } from "./components/LoginFormAdmin";
import { RegisterFormAdmin } from "./components/RegisterFormAdmin";

type AuthMode = "login" | "register" | "loginAdmin" | "registerAdmin";

interface AuthProps {
  initialType?: AuthMode;
}

const Auth = ({ initialType = "login" }: AuthProps) => {
  const [authMode, setAuthMode] = useState<AuthMode>(initialType);
  const isInternalAdmin = authMode.includes("Admin");

  const pageContent = {
    login: {
      title: "Sign in to store",
      description: "Enter your email and password to access your account.",
    },
    register: {
      title: "Get started",
      description: "Create your free account in less than a minute.",
    },
    loginAdmin: {
      title: "Admin Portal",
      description: "Enter your credentials to access the management dashboard.",
    },
    registerAdmin: {
      title: "Request Admin Access",
      description: "Submit your details to request an administrator account.",
    },
  };

  const { title, description } = pageContent[authMode];

  if (!isInternalAdmin) {
    return (
      <AuthLayout title={title} description={description}>
        {authMode === "login" && (
          <LoginForm onSwitchToRegister={() => setAuthMode("register")} />
        )}
        {authMode === "register" && (
          <RegisterForm onSwitchToLogin={() => setAuthMode("login")} />
        )}
      </AuthLayout>
    );
  }

  if (isInternalAdmin) {
    return (
      <AuthLayoutAdmin titleAdmin={title} descriptionAdmin={description}>
        {authMode === "loginAdmin" && (
          <LoginFormAdmin
            onSwitchToRegister={() => setAuthMode("registerAdmin")}
          />
        )}
        {authMode === "registerAdmin" && (
          <RegisterFormAdmin
            onSwitchToLogin={() => setAuthMode("loginAdmin")}
          />
        )}
      </AuthLayoutAdmin>
    );
  }
};

export default Auth;
