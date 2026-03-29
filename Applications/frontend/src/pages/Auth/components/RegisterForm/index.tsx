import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  return (
    <div className="grid gap-6">
      <form onSubmit={(e) => e.preventDefault()}>
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
            />
          </div>
          <Button className="h-11 font-medium mt-2">Create Free Account</Button>
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
