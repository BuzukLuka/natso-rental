// src/components/Header.tsx
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
  ChevronRight,
  UserRound,
} from "lucide-react";
import clsx from "clsx";

/* Hide-on-scroll (mobile) */
function useScrollDirection(threshold = 12) {
  const [dir, setDir] = useState<"up" | "down">("up");
  const last = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last.current) < threshold) return;
      setDir(y > last.current ? "down" : "up");
      last.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return dir;
}

type NavChild = { label: string; href: string; description?: string };
type NavItem = { label: string; href: string; children?: NavChild[] };

const ACCENT_START = "#4A90E2";
const ACCENT_END = "#50E3C2";

export function Header() {
  const pathname = usePathname();
  const scrollDir = useScrollDirection();
  const [open, setOpen] = useState(false); // mobile dropdown
  const [hoverOpen, setHoverOpen] = useState(false); // desktop hover menu
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null); // which accordion is open

  const nav: NavItem[] = [
    { label: "Find Rentals", href: site.links.properties },
    // {
    //   label: "For Hosts",
    //   href: site.links.host,
    //   children: [
    //     { label: "Become a Host", href: site.links.host },
    //     { label: "Pricing", href: site.links.pricing },
    //     { label: "Dashboard", href: site.links.dashboard },
    //   ],
    // },
    { label: "About", href: site.links.about },
  ];

  // helper: active state (also handles parents with children)
  const isActive = (item: NavItem) => {
    if (pathname === item.href) return true;
    if (item.children?.some((c) => pathname.startsWith(c.href))) return true;
    // also treat parent path as active prefix (e.g., /host/anything)
    if (pathname.startsWith(item.href)) return true;
    return false;
  };

  // shared styling for top-level items (link or button)
  const topItemClass = (active: boolean) =>
    clsx(
      "px-3 py-2 rounded-full text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
      active
        ? "text-white"
        : "text-slate-800 hover:text-slate-900 hover:bg-black/5"
    );
  const topItemStyle = (active: boolean): React.CSSProperties =>
    active
      ? {
          background: `linear-gradient(135deg, ${ACCENT_START} 0%, ${ACCENT_END} 100%)`,
        }
      : {};

  /* Close mobile dropdown on route change */
  useEffect(() => {
    if (open) setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  /* Close on Esc */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Auto-close mobile dropdown when resizing to desktop */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: scrollDir === "down" ? -72 : 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 40 }}
      className="sticky top-0 z-50 w-full border-b border-black/5 bg-white dark:bg-white"
    >
      {/* Top bar */}
      <Container className="flex h-16 items-center justify-between gap-3">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 min-w-0">
          <div
            className="h-8 w-8 rounded-xl"
            style={{
              background:
                "conic-gradient(from 180deg, #4A90E2, #50E3C2, #F5A623, #4A90E2)",
            }}
            aria-hidden
          />
          <span className="truncate text-lg font-semibold tracking-tight">
            {site.name}
          </span>
        </Link>

        {/* Search (≥ md) */}
        <div className="hidden md:flex min-w-[380px] max-w-[560px] flex-1 items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 shadow-sm">
          <Search className="size-4 shrink-0" />
          <input
            placeholder="Search location, city, or property"
            className="h-9 w-full border-0 bg-transparent text-gray-600 p-0 text-sm outline-none focus:ring-0"
          />
          <Link
            href={site.links.properties}
            className="inline-flex h-9 items-center rounded-full px-4 text-sm font-medium text-white"
            // style={{
            //   background: `linear-gradient(135deg, ${ACCENT_START} 0%, ${ACCENT_END} 100%)`,
            // }}
          >
            Search
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((item) => {
            const active = isActive(item);
            return !item.children ? (
              <Link
                key={item.label}
                href={item.href}
                className={topItemClass(active)}
                style={topItemStyle(active)}
              >
                {item.label}
              </Link>
            ) : (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setHoverOpen(true)}
                onMouseLeave={() => setHoverOpen(false)}
              >
                <button
                  className={topItemClass(active)}
                  style={topItemStyle(active)}
                  aria-haspopup="menu"
                  aria-expanded={hoverOpen}
                >
                  <span className="mr-1">{item.label}</span>
                  <ChevronDown
                    className={clsx("size-4", active && "opacity-95")}
                  />
                </button>
                <AnimatePresence>
                  {hoverOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 mt-2 w-56 rounded-xl border border-black/10 bg-white p-2 shadow-lg"
                    >
                      {item.children!.map((c) => {
                        const childActive = pathname.startsWith(c.href);
                        return (
                          <Link
                            key={c.href}
                            href={c.href}
                            className={clsx(
                              "block rounded-lg px-3 py-2 text-sm transition",
                              childActive
                                ? "text-white"
                                : "text-slate-800 hover:text-slate-900 hover:bg-black/5"
                            )}
                            style={
                              childActive
                                ? {
                                    background: `linear-gradient(135deg, ${ACCENT_START} 0%, ${ACCENT_END} 100%)`,
                                  }
                                : undefined
                            }
                          >
                            {c.label}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          <div className="mx-2 h-6 w-px bg-black/10" />
          <Link
            href={site.links.auth.signIn}
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-slate-800 hover:text-slate-900 hover:bg-black/5 transition"
          >
            <UserRound className="size-4" /> Sign in
          </Link>
          <Link
            href={site.links.auth.signUp}
            className="ml-1 inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-white"
            style={{
              background: `linear-gradient(135deg, ${ACCENT_START} 0%, ${ACCENT_END} 100%)`,
            }}
          >
            Create account
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5"
          aria-expanded={open}
          aria-controls="mobile-dropdown"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      {/* Mobile dropdown (below header) */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.section
            id="mobile-dropdown"
            key="mobile-dropdown"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-black/5 bg-white dark:bg-white shadow-[0_10px_20px_-10px_rgba(0,0,0,0.12)]"
          >
            <div className="px-4 pt-3 pb-4">
              {/* Search */}
              <div className="mb-4 flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm">
                <Search className="size-4 opacity-60 shrink-0" />
                <input
                  className="h-9 w-full border-0 bg-transparent p-0 text-sm outline-none focus:ring-0"
                  placeholder="Search location, city, or property"
                />
                <Link
                  href={site.links.properties}
                  onClick={() => setOpen(false)}
                  className="inline-flex h-9 items-center rounded-full px-3 text-xs font-medium text-white"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT_START} 0%, ${ACCENT_END} 100%)`,
                  }}
                >
                  Go
                </Link>
              </div>

              {/* Nav list */}
              <div className="space-y-1">
                {nav.map((n) => {
                  const parentActive = isActive(n);
                  return !n.children ? (
                    <Link
                      key={n.label}
                      href={n.href}
                      onClick={() => setOpen(false)}
                      className={clsx(
                        "block rounded-xl px-3 py-3 text-[15px] font-medium transition",
                        parentActive
                          ? "text-white"
                          : "text-slate-800 hover:text-slate-900 hover:bg-black/5"
                      )}
                      style={
                        parentActive
                          ? {
                              background: `linear-gradient(135deg, ${ACCENT_START} 0%, ${ACCENT_END} 100%)`,
                            }
                          : undefined
                      }
                    >
                      {n.label}
                    </Link>
                  ) : (
                    <div key={n.label} className="rounded-xl">
                      {/* Accordion trigger */}
                      <button
                        onClick={() =>
                          setMobileExpanded((prev) =>
                            prev === n.label ? null : n.label
                          )
                        }
                        aria-expanded={mobileExpanded === n.label}
                        aria-controls={`panel-${n.label}`}
                        className={clsx(
                          "flex w-full items-center justify-between rounded-xl px-3 py-3 text-[15px] font-medium transition",
                          parentActive
                            ? "text-white"
                            : "text-slate-800 hover:text-slate-900 hover:bg-black/5"
                        )}
                        style={
                          parentActive
                            ? {
                                background: `linear-gradient(135deg, ${ACCENT_START} 0%, ${ACCENT_END} 100%)`,
                              }
                            : undefined
                        }
                      >
                        <span>{n.label}</span>
                        <motion.span
                          initial={false}
                          animate={{
                            rotate: mobileExpanded === n.label ? 90 : 0,
                          }}
                        >
                          <ChevronRight
                            className={clsx(
                              "size-5",
                              parentActive ? "opacity-100" : "opacity-70"
                            )}
                          />
                        </motion.span>
                      </button>

                      {/* Accordion content */}
                      <AnimatePresence initial={false}>
                        {mobileExpanded === n.label && (
                          <motion.div
                            id={`panel-${n.label}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-1 space-y-1 rounded-xl bg-black/[0.03] p-1">
                              {n.children!.map((c) => {
                                const childActive = pathname.startsWith(c.href);
                                return (
                                  <Link
                                    key={c.href}
                                    href={c.href}
                                    onClick={() => setOpen(false)}
                                    className={clsx(
                                      "flex items-center gap-2 rounded-lg px-3 py-2 text-[14px] transition",
                                      childActive
                                        ? "text-white"
                                        : "text-slate-800 hover:text-slate-900 hover:bg-black/5"
                                    )}
                                    style={
                                      childActive
                                        ? {
                                            background: `linear-gradient(135deg, ${ACCENT_START} 0%, ${ACCENT_END} 100%)`,
                                          }
                                        : undefined
                                    }
                                  >
                                    <span
                                      className="inline-block h-1.5 w-1.5 rounded-full"
                                      style={{ background: ACCENT_START }}
                                    />
                                    {c.label}
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="my-3 h-px bg-black/10" />

              {/* Auth CTAs */}
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href={site.links.auth.signIn}
                  onClick={() => setOpen(false)}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 bg-white text-sm font-medium text-slate-800 hover:text-slate-900 hover:bg-black/5 transition"
                >
                  Sign in
                </Link>
                <Link
                  href={site.links.auth.signUp}
                  onClick={() => setOpen(false)}
                  className="inline-flex h-11 items-center justify-center rounded-full text-sm font-semibold text-white"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT_START} 0%, ${ACCENT_END} 100%)`,
                  }}
                >
                  Create account
                </Link>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
