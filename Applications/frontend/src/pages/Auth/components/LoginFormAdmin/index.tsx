import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiUrl } from "@/components/common/http";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAdminStore } from "@/stores/useAdminStore";

// 1. Validation Schema in English
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormAdminProps {
  onSwitchToRegister: () => void;
}

export const LoginFormAdmin = ({ onSwitchToRegister }: LoginFormAdminProps) => {
  const navigate = useNavigate();
  const login = useAdminStore((state) => state.login);
  // 2. Form Initialization
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 3. onSubmit Function
  const onSubmit = async (data: LoginFormValues) => {
    console.log("Form Data:", data);

    // TODO: Added response of fetch to result
    const res = await fetch(`${apiUrl}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        if (result.status == 200) {
          const adminInfo = {
            token: result.token,
            id: result.id,
            name: result.name,
          };

          login(adminInfo);
          navigate("/admin/dashboard");
        } else {
          toast.error(result.message);
        }
      });
  };

  return (
    <div className="grid gap-6">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-3">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              {...form.register("email")}
              id="email"
              placeholder="admin@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              className="h-11 border-zinc-200 dark:border-zinc-800"
            />
            {form.formState.errors.email && (
              <span className="text-xs text-destructive">
                {form.formState.errors.email.message}
              </span>
            )}
          </div>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              {...form.register("password")}
              id="password"
              placeholder="Enter password"
              type="password"
              autoComplete="current-password"
              className="h-11 border-zinc-200 dark:border-zinc-800"
            />
            {form.formState.errors.password && (
              <span className="text-xs text-destructive">
                {form.formState.errors.password.message}
              </span>
            )}
          </div>

          <Button
            type="submit"
            className="h-11 font-medium mt-2"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Loading..." : "Access Dashboard"}
          </Button>
        </div>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-2">
        Need access?{" "}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="underline underline-offset-4 font-medium hover:text-primary transition-colors"
        >
          Request Account
        </button>
      </p>
    </div>
  );
};
