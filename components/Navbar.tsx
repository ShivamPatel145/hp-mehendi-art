"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Gallery", href: "/gallery" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 w-full z-[60] transition-all duration-500 ${
          scrolled
            ? "bg-background/95 backdrop-blur-xl shadow-[0_2px_32px_0_rgba(0,0,0,0.08)] border-b border-accent/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center z-[70]">
              <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                <Image
                  src="/hp_logo.png"
                  alt="HP Mehendi Art"
                  width={280}
                  height={100}
                  className="h-16 md:h-20 w-auto object-contain mix-blend-multiply"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-semibold tracking-widest uppercase transition-colors duration-200 rounded-full group ${
                      isActive
                        ? "text-primary"
                        : "text-foreground/70 hover:text-primary"
                    }`}
                  >
                    {link.name}
                    {/* Animated underline */}
                    <span
                      className={`absolute bottom-0.5 left-4 right-4 h-[2px] rounded-full bg-primary transition-transform duration-300 origin-left ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                );
              })}
              <div className="ml-4">
                <Button
                  nativeButton={false}
                  render={<Link href="/contact" />}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full px-7 py-2 shadow-md hover:shadow-lg transition-all duration-200 text-sm tracking-wide"
                >
                  Book Now
                </Button>
              </div>
            </div>

            {/* Mobile hamburger */}
            <div className="md:hidden flex items-center z-[70]">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-foreground hover:text-primary focus:outline-none p-2 -mr-2 rounded-full hover:bg-accent/10 transition-colors"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={isOpen ? "close" : "open"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-[50] bg-background/97 backdrop-blur-2xl flex flex-col justify-center items-center"
          >
            {/* Decorative bg pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
              backgroundImage: "radial-gradient(circle at 20% 50%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(var(--accent)) 0%, transparent 40%)"
            }} />

            <div className="relative flex flex-col items-center justify-center gap-2 w-full px-8">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ delay: index * 0.07, duration: 0.3 }}
                    className="w-full text-center"
                  >
                    <Link
                      href={link.href}
                      className={`block py-4 text-3xl font-heading font-semibold transition-colors duration-200 border-b border-accent/10 ${
                        isActive ? "text-primary" : "text-foreground hover:text-primary"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ delay: navLinks.length * 0.07, duration: 0.3 }}
                className="pt-8 w-full"
              >
                <Button
                  nativeButton={false}
                  render={<Link href="/contact" onClick={() => setIsOpen(false)} />}
                  className="w-full bg-primary hover:bg-primary/90 rounded-full h-14 text-xl shadow-xl tracking-wide"
                >
                  Book Now
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
