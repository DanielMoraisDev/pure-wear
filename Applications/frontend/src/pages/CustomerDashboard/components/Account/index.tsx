import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/hooks/frontend/use-users";
import { UserUpdateBody } from "@/types/frontend/users.type";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

const initialFormData: UserUpdateBody = {
  name: "",
  email: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  mobile: "",
};

const Account = () => {
  const { UpdateProfile, GetProfileDetails } = useUser();
  const { mutate: updateProfile, isPending } = UpdateProfile();
  const { data, isLoading, isError, refetch } = GetProfileDetails(
    {},
    { enabled: true },
  );
  const [formData, setFormData] = useState<UserUpdateBody>(initialFormData);
  const [errors, setErrors] = useState<
    Partial<Record<keyof UserUpdateBody, string>>
  >({});

  useEffect(() => {
    if (data?.data) {
      setFormData({
        name: data.data.name || "",
        email: data.data.email || "",
        address: data.data.address || "",
        city: data.data.city || "",
        state: data.data.state || "",
        zip: data.data.zip || "",
        mobile: data.data.mobile || "",
      });
    }
  }, [data]);

  const validate = () => {
    const nextErrors: Partial<Record<keyof UserUpdateBody, string>> = {};

    if (!formData.name.trim()) {
      nextErrors.name = "The name field is required.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "The email field is required.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      toast.warning("Por favor, preencha os campos obrigatórios.");
      return;
    }

    updateProfile(formData, {
      onSuccess: () => {
        refetch?.();
      },
    });
  };

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-input bg-background p-8 text-center text-sm text-muted-foreground">
        Carregando informações da conta...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-3xl border border-destructive/20 bg-destructive/10 p-8 text-center text-sm text-destructive">
        Não foi possível carregar os dados da conta. Tente novamente mais tarde.
      </div>
    );
  }

  return (
    <Card className="shadow-sm border border-border">
      <CardHeader className="px-6 pt-6">
        <CardTitle>Account</CardTitle>
        <CardDescription>
          Atualize suas informações de contato e endereço.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1">
              <Label htmlFor="account-name">Name</Label>
              <Input
                id="account-name"
                value={formData.name}
                aria-invalid={Boolean(errors.name)}
                placeholder="Enter Name"
                onChange={(event) => {
                  setFormData({ ...formData, name: event.target.value });
                }}
              />
              {errors.name ? (
                <span className="text-xs text-destructive">{errors.name}</span>
              ) : null}
            </div>
            <div className="grid gap-1">
              <Label htmlFor="account-email">Email</Label>
              <Input
                id="account-email"
                type="email"
                value={formData.email}
                aria-invalid={Boolean(errors.email)}
                placeholder="Enter Email"
                onChange={(event) => {
                  setFormData({ ...formData, email: event.target.value });
                }}
              />
              {errors.email ? (
                <span className="text-xs text-destructive">{errors.email}</span>
              ) : null}
            </div>
          </div>

          <div className="grid gap-1">
            <Label htmlFor="account-address">Address</Label>
            <Textarea
              id="account-address"
              value={formData.address}
              placeholder="Address"
              onChange={(event) => {
                setFormData({ ...formData, address: event.target.value });
              }}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1">
              <Label htmlFor="account-mobile">Mobile</Label>
              <Input
                id="account-mobile"
                value={formData.mobile}
                placeholder="Enter Mobile"
                onChange={(event) => {
                  setFormData({ ...formData, mobile: event.target.value });
                }}
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="account-city">City</Label>
              <Input
                id="account-city"
                value={formData.city}
                placeholder="Enter City"
                onChange={(event) => {
                  setFormData({ ...formData, city: event.target.value });
                }}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1">
              <Label htmlFor="account-state">State</Label>
              <Input
                id="account-state"
                value={formData.state}
                placeholder="Enter State"
                onChange={(event) => {
                  setFormData({ ...formData, state: event.target.value });
                }}
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="account-zip">Zip</Label>
              <Input
                id="account-zip"
                value={formData.zip}
                placeholder="Enter Zip"
                onChange={(event) => {
                  setFormData({ ...formData, zip: event.target.value });
                }}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-11 font-medium"
          >
            {isPending ? "Salvando..." : "Salvar alterações"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Account;
