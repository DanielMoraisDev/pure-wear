import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginFormAdminProps {
  onSwitchToRegister: () => void;
}

export const LoginFormAdmin = ({ onSwitchToRegister }: LoginFormAdminProps) => {
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
              placeholder="admin@example.com"
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
              placeholder="Enter password"
              type="password"
              autoComplete="current-password"
              className="h-11 border-zinc-200 dark:border-zinc-800"
            />
          </div>
          <Button className="h-11 font-medium mt-2">Access Dashboard</Button>
        </div>
      </form>
      <p className="text-center text-sm text-muted-foreground mt-2">
        Need access?{" "}
        <button
          onClick={onSwitchToRegister}
          className="underline underline-offset-4 font-medium hover:text-primary transition-colors"
        >
          Request Account
        </button>
      </p>
    </div>
  );
};
