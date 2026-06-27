import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Chrome } from "lucide-react";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export const LoginForm = ({ onSwitchToRegister }: LoginFormProps) => {
  return (
    <div className="grid gap-6">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-3">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              className="h-11 border-zinc-200 dark:border-zinc-800"
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Your secret password"
              type="password"
              autoComplete="current-password"
              className="h-11 border-zinc-200 dark:border-zinc-800"
            />
          </div>
          <Button className="h-11 font-medium mt-2">Sign in with Email</Button>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground tracking-wider font-medium">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <Button
          variant="outline"
          className="h-11 border-zinc-200 dark:border-zinc-800 font-normal"
        >
          <Chrome className="mr-2 h-4 w-4" />
          Google
        </Button>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-2">
        Don't have an account?{" "}
        <button
          onClick={onSwitchToRegister}
          className="underline underline-offset-4 font-medium hover:text-primary transition-colors"
        >
          Sign up for free
        </button>
      </p>
    </div>
  );
};
