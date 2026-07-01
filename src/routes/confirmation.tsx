import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const Route = createFileRoute("/confirmation")({
  head: () => ({
    meta: [
      { title: "Application Submitted — GGP LeaseOn" },
      { name: "description", content: "Your leasing application has been submitted for review." },
    ],
  }),
  component: Confirmation,
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
  priceRange: { min: number; max: number };
  months: number;
  leaseStartDate?: string;
  leaseEndDate?: string;
  merchandiseCategory: string;
  address: string;
}

function Confirmation() {
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

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <div className="bg-secondary border-b border-border">
        <div className="container-page py-6">
          <div className="flex items-center justify-center gap-3">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step === 1 ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {step === 1 ? <CheckCircle2 className="w-5 h-5" /> : step}
                </div>
                {step < 3 && <div className="w-8 h-px bg-border" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-page py-10 flex-1">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-success" />
            </div>
            <h1 className="font-display text-3xl font-bold mb-2">Application Submitted</h1>
            <p className="text-muted-foreground font-body max-w-md mx-auto">
              Your application will be reviewed by a member of our leasing team and he or she will follow-up with you regarding next steps.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="font-display text-lg font-semibold mb-4">Lease Proposal Summary</h2>
              <div className="space-y-3 text-sm font-body">
                <Row label="Submitted By" value={`${data.firstName} ${data.lastName}`} />
                <Row label="" value={data.phone} />
                <Row label="" value={data.email} />
                <Separator />
                <Row label="Location" value={data.property} />
                <Row label="" value={data.address} />
                <Separator />
                <Row label="Company" value={data.companyName} />
                {data.dba && <Row label="DBA" value={data.dba} />}
                {data.merchandiseCategory && <Row label="Category" value={data.merchandiseCategory} />}
                <Separator />
                <Row label="Space" value={`${data.unitName} (${data.unitType})`} />
                <Row label="Size" value={`${data.sqft.toLocaleString()} sq ft`} />
                <Row label="Term" value={`${data.months} month${data.months !== 1 ? "s" : ""}`} />
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="font-display text-lg font-semibold mb-4">Key Terms</h2>
              <ul className="space-y-3 text-sm font-body text-muted-foreground">
                <li><strong className="text-foreground">Utilities:</strong> Electric is direct-metered. Licensee is responsible for setup and payment. Trash billed directly by contracted provider.</li>
                <li><strong className="text-foreground">Sales Reporting:</strong> Monthly written statement of gross sales due by the 5th of the following month.</li>
                <li><strong className="text-foreground">Signage:</strong> All signage must meet Licensor criteria and be submitted for review and approval prior to installation.</li>
                <li><strong className="text-foreground">Space Requirements:</strong> Space is provided in an "as-is" condition. All improvements must be approved in writing.</li>
                <li><strong className="text-foreground">Insurance:</strong> Current and compliant insurance coverage required. COI must be provided before possession.</li>
                <li><strong className="text-foreground">Payment:</strong> Credit card, cashier's check, money order, business check, or electronic payment portal.</li>
              </ul>
            </div>

            <p className="text-xs text-muted-foreground font-body italic">
              The above terms are the basic conditions under which Licensee may enter into a lease. This proposal is not a lease and is not binding on either party. Only a fully executed lease shall constitute a binding agreement.
            </p>

            <div className="flex justify-end pt-4">
              <Link to="/demo/email-internal">
                <Button className="font-body gap-2">
                  Next: View Internal Email <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex">
    {label && <span className="text-muted-foreground w-32 shrink-0 font-medium">{label}:</span>}
    <span className="text-foreground">{value}</span>
  </div>
);
