"use client";
import { Container } from "@/components/Container";
import Link from "next/link";

export default function SignIn() {
  return (
    <Container className="py-10 max-w-lg">
      <h1 className="text-2xl font-bold">Sign in</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Demo login");
        }}
        className="mt-4 space-y-3 card p-4"
      >
        <input className="input" placeholder="Email" type="email" />
        <input className="input" placeholder="Password" type="password" />
        <button className="btn btn-primary w-full">Continue</button>
      </form>
      <p className="mt-3 text-sm text-ink">
        No account?{" "}
        <Link className="underline" href="/auth/sign-up">
          Sign up
        </Link>
      </p>
    </Container>
  );
}
