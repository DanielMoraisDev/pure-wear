import React from "react";
import {
  Mail,
  Instagram,
  Github,
  Truck,
  RotateCcw,
  ShieldCheck,
  Baby,
  Shirt,
  ShoppingBag,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/images/logo-white.png";

interface FooterItem {
  title: string;
  url: string;
  icon?: React.ReactNode;
}

interface FooterSection {
  title: string;
  items: FooterItem[];
}

interface FooterProps {
  logo?: {
    src: string;
    alt: string;
    url: string;
  };
  sections?: FooterSection[];
  socials?: {
    instagram: string;
    github: string;
    email: string;
  };
}

const footerData = {
  logo: {
    url: "/",
    src: logoImage,
    alt: "logo",
  },
  sections: [
    {
      title: "Categories",
      items: [
        { title: "Kids", url: "#", icon: <Baby className="size-4" /> },
        { title: "Men", url: "#", icon: <Shirt className="size-4" /> },
        {
          title: "Women",
          url: "#",
          icon: <ShoppingBag className="size-4" />,
        },
      ],
    },
    {
      title: "Legal",
      items: [
        { title: "Privacy Policy", url: "/privacy" },
        { title: "Terms of Service", url: "/terms" },
        { title: "Refund Policy", url: "/refund" },
      ],
    },
    {
      title: "Quick Links",
      items: [
        { title: "Log In", url: "/login" },
        { title: "Sign Up", url: "/register" },
        { title: "Cart", url: "/cart" },
      ],
    },
  ],
  benefits: [
    { title: "Free Delivery", icon: <Truck className="size-5" /> },
    { title: "Money Back Guarantee", icon: <RotateCcw className="size-5" /> },
    { title: "Secure Payment", icon: <ShieldCheck className="size-5" /> },
  ],
  socials: {
    instagram: "https://instagram.com/seu-user",
    github: "https://github.com/seu-user",
    email: "mailto:seu-email@exemplo.com",
  },
};

const Footer = ({
  logo = footerData.logo,
  sections = footerData.sections,
  socials = footerData.socials,
}: FooterProps) => {
  return (
    <footer className="w-full bg-black text-white py-12 px-6 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        {/* Info e Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            {/* Logo */}
            <a href={logo.src} className="flex items-center gap-2">
              <img
                src={logo.src}
                className="max-h-12 dark:invert"
                alt={logo.alt}
              />
            </a>
            <p className="text-zinc-500 text-sm max-w-xs">
              Elevating the concept of basic fashion with premium quality and
              minimalist design.
            </p>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-6 text-zinc-100">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.items.map((item) => (
                  <li key={item.title}>
                    <a
                      href={item.url}
                      className="text-zinc-400 hover:text-white text-sm transition-colors flex items-center gap-2"
                    >
                      {item.icon && item.icon}
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contato Direto */}
          <div>
            <h4 className="font-semibold mb-6 text-zinc-100">Get in Touch</h4>
            <div className="space-y-3 text-sm text-zinc-400">
              <p>Maceió, Alagoas - BR</p>
              <p className="hover:text-white transition-colors cursor-pointer">
                info@purewear.com
              </p>
              <div className="flex gap-4 pt-2">
                <a
                  href={socials.instagram}
                  target="_blank"
                  className="hover:text-white"
                >
                  <Instagram className="size-5" />
                </a>
                <a href={socials.email} className="hover:text-white">
                  <Mail className="size-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Benefícios */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-10 border-y border-zinc-900 mb-16">
          {footerData.benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="p-3 bg-zinc-900 rounded-full group-hover:bg-white group-hover:text-black transition-all">
                {benefit.icon}
              </div>
              <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">
                {benefit.title}
              </span>
            </div>
          ))}
        </div>

        {/* CTA - Portfólio / Projetos */}
        <div className="relative overflow-hidden rounded-3xl bg-zinc-950 border border-zinc-800 p-8 md:p-12 text-center">
          <div className="relative z-10 space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
              Gostou desse projeto?
            </h3>
            <p className="text-zinc-400 max-w-lg mx-auto">
              Este e outros sistemas foram desenvolvidos focando em performance
              e escalabilidade. Confira meus outros repositórios ou entre em
              contato para parcerias.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button
                asChild
                variant="default"
                className="bg-white text-black hover:bg-transparent hover:text-white hover:ring-[1px] hover:ring-white transition-all"
              >
                <a href={socials.github} target="_blank">
                  <Github className="mr-2 size-4" /> Ver Projetos no GitHub
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-zinc-700 bg-transparent"
              >
                <a href={socials.instagram} target="_blank">
                  <Instagram className="mr-2 size-4" /> Instagram
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-zinc-700 bg-transparent"
              >
                <a href={socials.email}>
                  <Mail className="mr-2 size-4" /> E-mail
                </a>
              </Button>
            </div>
          </div>
          {/* Efeito de brilho sutil no fundo */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-full bg-white/5 blur-[120px] pointer-events-none" />
        </div>

        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-zinc-900 pt-8">
          <div className="text-zinc-600 text-[10px] uppercase tracking-[0.2em]">
            © 2026 Pure Wear — Handcrafted by You
          </div>

          <div className="flex gap-6">
            <a
              href="/privacy-policy"
              className="text-zinc-600 hover:text-zinc-400 text-[10px] uppercase tracking-[0.1em] transition-colors"
            >
              Privacy And Policies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
