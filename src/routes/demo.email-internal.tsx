import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const Route = createFileRoute("/demo/email-internal")({
  head: () => ({
    meta: [
      { title: "Demo · Internal Sales Email — GGP LeaseOn" },
      { name: "description", content: "Preview of the internal sales notification for a new leasing lead." },
    ],
  }),
  component: DemoEmailInternal,
});

interface InquiryData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  dba: string;
  unitName: string;
  property: string;
  unitType: string;
  sqft: number;
  months: number;
  leaseStartDate?: string;
  leaseEndDate?: string;
  address: string;
}

const MONTHLY_RATE = 2000;
const ADMIN_FEE = 250;

function DemoEmailInternal() {
  const navigate = useNavigate();
  const [data, setData] = useState<InquiryData | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("leaseInquiry");
    if (!stored) {
      navigate({ to: "/" });
      return;
    }
    setData(JSON.parse(stored));
  }, [navigate]);

  if (!data) return null;

  const totalLicense = MONTHLY_RATE * data.months;
  const totalEstimate = totalLicense + ADMIN_FEE;
  const termLine = data.leaseStartDate && data.leaseEndDate
    ? `${data.leaseStartDate} – ${data.leaseEndDate}`
    : `${data.months} month${data.months !== 1 ? "s" : ""}`;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <div className="bg-secondary border-b border-border">
        <div className="container-page py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
            <Mail className="w-4 h-4" />
            <span>Demo: Internal Sales Email Preview</span>
          </div>
        </div>
      </div>

      <div className="container-page py-10 flex-1">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
            <div className="bg-primary px-6 py-4">
              <p className="text-primary-foreground/60 text-xs font-body uppercase tracking-wider mb-1">Subject</p>
              <h1 className="text-primary-foreground font-display text-lg font-bold">
                New LeaseOn Lead Action Required: Review Quote
              </h1>
            </div>

            <div className="p-6 space-y-5 text-sm font-body">
              <p className="text-foreground">Hi Eric,</p>

              <p className="text-muted-foreground">
                A new leasing inquiry has been submitted and routed to you. Please review the auto-generated quote below and either approve it or adjust the pricing before it is sent to the prospect.
              </p>

              <Separator />

              <div className="space-y-2">
                <InfoRow label="Lead" value={`${data.firstName} ${data.lastName} | ${data.email} | ${data.phone}`} />
                <InfoRow label="Business" value={data.dba || data.companyName} />
                <InfoRow label="Space interest" value={`${data.unitType} ${data.unitName}`} />
                <InfoRow label="Requested lease term" value={termLine} />
              </div>

              <Separator />

              <div>
                <h2 className="font-display text-base font-semibold mb-4">Auto-generated quote:</h2>

                <div className="bg-secondary rounded-lg p-5 space-y-3">
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">{data.unitName}</p>
                    <p className="text-muted-foreground">{data.property}</p>
                    <p className="text-muted-foreground">{data.unitType} · {data.sqft.toLocaleString()} sq ft</p>
                  </div>

                  <Separator />

                  <h3 className="font-semibold text-foreground">Monthly Estimate</h3>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">License Fee</span>
                    <span className="text-foreground">${MONTHLY_RATE.toLocaleString()}</span>
                  </div>

                  <Separator />

                  <h3 className="font-semibold text-foreground">Total Lease Estimate</h3>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">License ({data.months} mo)</span>
                    <span className="text-foreground">${totalLicense.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Admin Fee</span>
                    <span className="text-foreground">${ADMIN_FEE.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sales Tax</span>
                    <span className="text-foreground">$0.00</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold text-base">
                    <span className="text-foreground">Total Estimate</span>
                    <span className="text-primary">${totalEstimate.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button className="font-body">Approve Quote</Button>
                <Button variant="outline" className="font-body">Modify Quote</Button>
              </div>

              <Separator />

              <p className="text-muted-foreground">
                Please act on this within 3 business days. If no action is taken, a reminder will be sent automatically.
              </p>

              <p className="text-foreground">
                Thank you,<br />
                <span className="font-semibold">LeaseOn Team</span>
              </p>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <Link to="/demo/email-applicant">
              <Button className="font-body gap-2">
                Next: View Applicant Email <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-wrap gap-1">
    <span className="text-foreground font-medium">{label}:</span>
    <span className="text-muted-foreground">{value}</span>
  </div>
);
