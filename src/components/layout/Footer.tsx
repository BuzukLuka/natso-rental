"use client";

import Link from "next/link";
import { Container } from "@/components/Container";
import { site } from "@/data/site";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-black/5 bg-[linear-gradient(180deg,#fff,rgba(250,250,249,.8))]">
      <Container className="grid gap-10 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-brand-sky to-brand-mint" />
            <span className="text-lg font-semibold">{site.name}</span>
          </div>
          <p className="mt-3 text-sm text-black/70 max-w-sm">
            {site.tagline}. Search, compare, and book rentals with secure
            payments and modern tools for hosts & tenants.
          </p>
          <div className="mt-4 flex gap-2">
            <Link href="#" className="badge">
              <Facebook className="size-4" />
              Facebook
            </Link>
            <Link href="#" className="badge">
              <Instagram className="size-4" />
              Instagram
            </Link>
            <Link href="#" className="badge">
              <Twitter className="size-4" />X
            </Link>
          </div>
        </div>

        <div>
          <h4 className="mb-3 font-semibold">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href={site.links.properties} className="hover:underline">
                All Rentals
              </Link>
            </li>
            <li>
              <Link href="/properties?type=room" className="hover:underline">
                Rooms
              </Link>
            </li>
            <li>
              <Link href="/properties?type=studio" className="hover:underline">
                Studios
              </Link>
            </li>
            <li>
              <Link href="/properties?type=shared" className="hover:underline">
                Shared Spaces
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold">For Hosts</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href={site.links.host} className="hover:underline">
                Become a Host
              </Link>
            </li>
            <li>
              <Link href={site.links.pricing} className="hover:underline">
                Pricing
              </Link>
            </li>
            <li>
              <Link href={site.links.dashboard} className="hover:underline">
                Host Dashboard
              </Link>
            </li>
            <li>
              <Link href="/docs" className="hover:underline">
                Guides
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold">Newsletter</h4>
          <p className="text-sm text-black/70">
            Market tips and rental deals in your inbox.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Subscribed!");
            }}
            className="mt-3 space-y-2"
          >
            <input
              className="input"
              type="email"
              placeholder="you@example.com"
            />
            <button className="btn-primary w-full">Subscribe</button>
          </form>
        </div>
      </Container>

      <div className="border-t border-black/5">
        <Container className="flex flex-col md:flex-row items-center justify-between py-5 text-sm text-black/60">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
            <Link href={site.links.contact} className="hover:underline">
              Contact
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
