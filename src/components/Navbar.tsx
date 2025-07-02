"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Camera, MapPin, Fingerprint, UserCheck } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NavLinks = () => {
    const links = [
      {
        href: "/detect-faces",
        icon: Camera,
        label: "Detectar rostros en fotografias",
      },
      {
        href: "/face-auth",
        icon: UserCheck,
        label: "Autenticar Rostros usando la camara",
      },
    ];

    return (
      <>
        {links.map((link) => (
          <Button
            key={link.href}
            variant="ghost"
            asChild
            className="w-full justify-start"
            onClick={() => setIsMenuOpen(false)}
          >
            <Link href={link.href} className="flex items-center gap-2">
              <link.icon size={16} />
              {link.label}
            </Link>
          </Button>
        ))}
      </>
    );
  };

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            App de Deteccion de Rostros
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            <NavLinks />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(true)}>
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col gap-4 mt-8">
                  <NavLinks />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
