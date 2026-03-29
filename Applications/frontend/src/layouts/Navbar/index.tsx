import {
  Baby,
  Book,
  Menu,
  Shirt,
  ShoppingBag,
  ShoppingCart,
  Sunset,
  Trees,
  Zap,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  cart?: {
    title: string;
    url: string;
  };
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

import logoImage from "@/assets/images/logo.png";
import { useCartStore } from "@/stores/useCartStore";

const Navbar = ({
  logo = {
    url: "/",
    src: logoImage,
    alt: "logo",
    title: null,
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "Catalog", url: "/products" },
    {
      title: "Categories",
      url: "",
      items: [
        {
          title: "Kids",
          description: "Comfort and fun for little explorers.",
          icon: <Baby className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Men",
          description: "From casual to formal with maximum style.",
          icon: <Shirt className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Women",
          description: "Trends and elegance for every moment.",
          icon: <ShoppingBag className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
  ],
  cart = { title: "Cart", url: "/cart" },
  auth = {
    login: { title: "Log In", url: "/login" },
    signup: { title: "Sign Up", url: "/register" },
  },
  className,
}: NavbarProps) => {
  const cartCount = useCartStore((state) => state.productsInCart.length);

  return (
    <section className={cn("w-full shadow", className)}>
      {/* Header */}
      <header className="shadow">
        <div className="bg-black text-center py-1">
          <span className="text-white text-sm font-medium">
            Your Fashion Partner
          </span>
        </div>
      </header>
      <div className="py-4 p-5 md:px-32 gap-2 flex flex-col w-full">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <img
                src={logo.src}
                className="max-h-12 dark:invert"
                alt={logo.alt}
              />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </a>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-auto px-8 py-3 relative" // Adicionado relative
            >
              <a href={cart.url} className="flex items-center gap-2">
                <div className="relative">
                  <ShoppingCart className="size-5" />
                  {/* Badge Vermelho */}
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white animate-in zoom-in">
                      {cartCount}
                    </span>
                  )}
                </div>
                {cart.title}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-auto px-8 py-3"
            >
              <a href={auth.login.url}>{auth.login.title}</a>
            </Button>
            <Button asChild size="lg" className="h-auto px-8 py-3">
              <a href={auth.signup.url}>{auth.signup.title}</a>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <img
                src={logo.src}
                className="max-h-8 dark:invert"
                alt={logo.alt}
              />
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-auto px-5 py-3"
                >
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2 ">
                      <img
                        src={logo.src}
                        className="max-h-12 dark:invert"
                        alt={logo.alt}
                      />
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4 h-auto"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="h-auto px-8 py-3 relative" // Adicionado relative
                    >
                      <a href={cart.url} className="flex items-center gap-2">
                        <div className="relative">
                          <ShoppingCart className="size-5" />
                          {/* Badge Vermelho */}
                          {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white animate-in zoom-in">
                              {cartCount}
                            </span>
                          )}
                        </div>
                        {cart.title}
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="h-auto px-8 py-3"
                    >
                      <a href={auth.login.url}>{auth.login.title}</a>
                    </Button>
                    <Button asChild className="h-auto px-8 py-3">
                      <a href={auth.signup.url}>{auth.signup.title}</a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </a>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className="flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline! transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
};

//TODO - sistema de cart

export default Navbar;
