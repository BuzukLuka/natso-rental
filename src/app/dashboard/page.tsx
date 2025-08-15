import { Container } from "@/components/Container";

export default function Dashboard() {
  return (
    <Container className="py-8 space-y-4">
      <h1 className="text-2xl font-bold">Host Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card p-4">
          <div className="text-ink text-sm">Active listings</div>
          <div className="text-3xl font-bold">2</div>
        </div>
        <div className="card p-4">
          <div className="text-ink text-sm">Pending requests</div>
          <div className="text-3xl font-bold">1</div>
        </div>
        <div className="card p-4">
          <div className="text-ink text-sm">Payout this month</div>
          <div className="text-3xl font-bold">$2,950</div>
        </div>
      </div>
      <div className="card p-4">
        <h3 className="font-semibold">Recent requests</h3>
        <p className="text-ink text-sm mt-1">No requests yet.</p>
      </div>
    </Container>
  );
}
