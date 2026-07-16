import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/hooks/frontend/use-users";
import { UserRegisterBody } from "@/types/frontend/users.type";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserRegisterBody>({
    name: "",
    password: "",
    email: "",
  });

  const { Register } = useUser();

  const { mutate: registerUser, isPending } = Register();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user.name == "") {
      toast.warning("O nome do usuário precisa estar preenchido");
    }

    if (user.email == "") {
      toast.warning("O email do usuário precisa estar preenchido");
    }

    if (user.password == "") {
      toast.warning("A senha do usuário precisa estar preenchido");
    }

    // Dispara a requisição
    registerUser(user, {
      onSuccess: () => {
        const timer = setTimeout(() => {
          navigate("/auth?type=login");
        }, 1000);
      },
    });
  };

  return (
    <div className="grid gap-6">
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="grid gap-3">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Full Name
            </Label>
            <Input
              id="name"
              placeholder="How should we call you?"
              type="text"
              autoCapitalize="words"
              className="h-11 border-zinc-200 dark:border-zinc-800"
              onChange={(e) => {
                setUser({
                  ...user,
                  name: e.target.value,
                });
              }}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="reg-email">
              Email
            </Label>
            <Input
              id="reg-email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              className="h-11 border-zinc-200 dark:border-zinc-800"
              onChange={(e) => {
                setUser({
                  ...user,
                  email: e.target.value,
                });
              }}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="reg-password">
              Create Password
            </Label>
            <Input
              id="reg-password"
              placeholder="Create a strong password"
              type="password"
              className="h-11 border-zinc-200 dark:border-zinc-800"
              onChange={(e) => {
                setUser({
                  ...user,
                  password: e.target.value,
                });
              }}
            />
          </div>
          <Button
            type="submit"
            disabled={isPending}
            className="h-11 font-medium mt-2"
          >
            {isPending ? "Creating your account..." : "Create your account"}
          </Button>
        </div>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-2">
        Already have an account?{" "}
        <button
          onClick={onSwitchToLogin}
          className="underline underline-offset-4 font-medium hover:text-primary transition-colors"
        >
          Sign in
        </button>
      </p>

      <p className="text-center text-xs text-muted-foreground/70 px-6">
        By clicking create account, you agree to our Terms of Service and
        Privacy Policy.
      </p>
    </div>
  );
};
