"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/Container";
import { site } from "@/data/site";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Search,
  ChevronDown,
  UserRound,
  Home,
  Building2,
  DollarSign,
} from "lucide-react";
import clsx from "clsx";

/* ===== scroll direction (hide on down, show on up) ===== */
function useScrollDirection(threshold = 12) {
  const [scrollDir, setScrollDir] = useState<"up" | "down">("up");
  const last = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = Math.abs(y - last.current);
      if (delta < threshold) return;
      setScrollDir(y > last.current ? "down" : "up");
      last.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrollDir;
}

/* ===== Header ===== */
export function Header() {
  const pathname = usePathname();
  const scrollDir = useScrollDirection();
  const [open, setOpen] = useState(false);
  const [openMore, setOpenMore] = useState(false);

  const nav = [
    { label: "Find Rentals", href: site.links.properties },
    {
      label: "For Hosts",
      href: site.links.host,
      children: [
        { label: "Become a Host", href: site.links.host },
        { label: "Pricing", href: site.links.pricing },
        { label: "Dashboard", href: site.links.dashboard },
      ],
    },
    { label: "About", href: site.links.about },
  ];

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: scrollDir === "down" ? -80 : 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 40 }}
      className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/70 backdrop-blur-md"
    >
      <Container className="flex h-16 items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-brand-sky to-brand-mint" />
          <span className="text-lg font-semibold tracking-tight">
            {site.name}
          </span>
        </Link>

        {/* Search (md+) */}
        <div className="hidden md:flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 shadow-soft">
          <Search className="size-4 opacity-60" />
          <input
            placeholder="Search location, city, or property"
            className="input border-0 p-0 focus:ring-0"
          />
          <Link href={site.links.properties} className="btn-primary text-sm">
            Search
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-2">
          {nav.map((item) =>
            !item.children ? (
              <Link
                key={item.label}
                href={item.href}
                className={clsx(
                  "px-3 py-2 rounded-full hover:bg-black/5",
                  pathname === item.href && "bg-black/5"
                )}
              >
                {item.label}
              </Link>
            ) : (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenMore(true)}
                onMouseLeave={() => setOpenMore(false)}
              >
                <button className="inline-flex items-center gap-1 px-3 py-2 rounded-full hover:bg-black/5">
                  {item.label}
                  <ChevronDown className="size-4" />
                </button>
                <AnimatePresence>
                  {openMore && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 mt-2 w-52 rounded-xl border border-black/10 bg-white p-2 shadow-soft"
                    >
                      {item.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-black/5"
                        >
                          <span>{c.label}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          )}

          <div className="mx-2 h-6 w-px bg-black/10" />

          <Link href={site.links.auth.signIn} className="btn-ghost">
            <UserRound className="size-4" />
            Sign in
          </Link>
          <Link href={site.links.auth.signUp} className="btn-primary">
            Create account
          </Link>
        </nav>

        {/* Mobile toggles */}
        <button
          className="btn-ghost lg:hidden"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <Menu className="size-5" />
        </button>
      </Container>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed inset-y-0 right-0 z-50 w-[86%] max-w-sm border-l border-black/10 bg-white shadow-soft lg:hidden"
          >
            <div className="flex h-16 items-center justify-between px-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-brand-sky to-brand-mint" />
                <span className="text-lg font-semibold tracking-tight">
                  {site.name}
                </span>
              </Link>
              <button className="btn-ghost" onClick={() => setOpen(false)}>
                <X className="size-5" />
              </button>
            </div>

            <div className="px-4 pb-6">
              <div className="mb-4 flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2">
                <Search className="size-4 opacity-60" />
                <input className="input border-0 p-0" placeholder="Search…" />
              </div>

              <div className="space-y-1">
                <Link href={site.links.properties} className="nav-item">
                  <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-black/5">
                    <Home className="size-5" />
                    <span>Find Rentals</span>
                  </div>
                </Link>
                <Link href={site.links.host} className="nav-item">
                  <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-black/5">
                    <Building2 className="size-5" />
                    <span>Become a Host</span>
                  </div>
                </Link>
                <Link href={site.links.pricing} className="nav-item">
                  <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-black/5">
                    <DollarSign className="size-5" />
                    <span>Pricing</span>
                  </div>
                </Link>
                <Link href={site.links.about} className="nav-item">
                  <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-black/5">
                    <span>About</span>
                  </div>
                </Link>
                <div className="h-px bg-black/10 my-3" />
                <div className="flex gap-2">
                  <Link
                    href={site.links.auth.signIn}
                    className="btn-ghost flex-1"
                  >
                    Sign in
                  </Link>
                  <Link
                    href={site.links.auth.signUp}
                    className="btn-primary flex-1"
                  >
                    Create account
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
