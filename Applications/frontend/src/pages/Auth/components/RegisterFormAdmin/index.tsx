import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RegisterFormAdminProps {
  onSwitchToLogin: () => void;
}

export const RegisterFormAdmin = ({
  onSwitchToLogin,
}: RegisterFormAdminProps) => {
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
              placeholder="Administrator Name"
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
              placeholder="corporate@example.com"
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
              placeholder="Choose a secure password"
              type="password"
              className="h-11 border-zinc-200 dark:border-zinc-800"
            />
          </div>
          <Button className="h-11 font-medium mt-2">Request Access</Button>
        </div>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-2">
        Already registered?{" "}
        <button
          onClick={onSwitchToLogin}
          className="underline underline-offset-4 font-medium hover:text-primary transition-colors"
        >
          Log in
        </button>
      </p>

      <p className="text-center text-xs text-muted-foreground/70 px-6">
        Your request will be reviewed by the security team within 24 hours.
      </p>
    </div>
  );
};
