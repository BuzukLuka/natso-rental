"use client";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/Container";
import { formatMoney } from "@/utils/currency";
import { div } from "framer-motion/client";

export default function CheckoutPage() {
  const sp = useSearchParams();
  const id = sp.get("booking");
  const amount = Number(sp.get("amount") || 0);
  return (
    <Container className="py-10">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <p className="text-ink mt-1">
        Demo flow — integrate your payment provider here.
      </p>
      <div className="mt-4 card p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-ink">Booking</div>
            <div className="font-semibold">{id}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-ink">Amount due</div>
            <div className="text-xl font-bold">{formatMoney(amount)}</div>
          </div>
        </div>
        <button className="mt-4 btn btn-primary w-full">Pay now (demo)</button>
      </div>
    </Container>
  );
}
