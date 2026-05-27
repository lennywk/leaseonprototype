import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

interface InquiryData {
  firstName: string;
  unitName: string;
  property: string;
  unitType: string;
  sqft: number;
  months: number;
  leaseStartDate: string;
  leaseEndDate: string;
}

const MONTHLY_RATE = 3000;
const ADMIN_FEE = 250;

const DemoEmailApplicant = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<InquiryData | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("leaseInquiry");
    if (!stored) {
      navigate("/");
      return;
    }
    setData(JSON.parse(stored));
  }, [navigate]);

  if (!data) return null;

  const totalLicense = MONTHLY_RATE * data.months;
  const totalEstimate = totalLicense + ADMIN_FEE;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <div className="bg-secondary border-b border-border">
        <div className="container-page py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
            <Mail className="w-4 h-4" />
            <span>Demo: Applicant Email Preview</span>
          </div>
        </div>
      </div>

      <div className="container-page py-10 flex-1">
        <div className="max-w-3xl mx-auto">
          {/* Email container */}
          <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
            {/* Email header */}
            <div className="bg-primary px-6 py-4">
              <p className="text-primary-foreground/60 text-xs font-body uppercase tracking-wider mb-1">Subject</p>
              <h1 className="text-primary-foreground font-display text-lg font-bold">
                Your LeaseOn Space Quote is Ready
              </h1>
            </div>

            {/* Email body */}
            <div className="p-6 space-y-5 text-sm font-body">
              <p className="text-foreground">Hi {data.firstName},</p>

              <p className="text-muted-foreground">
                Thank you for your patience. Based on the details you submitted, we're pleased to share the following pricing information for the space you're interested in:
              </p>

              <Separator />

              {/* Space details */}
              <div className="space-y-2">
                <InfoRow label="Space type" value={data.unitType} />
                <InfoRow label="Estimated square footage" value={`${data.sqft.toLocaleString()} sq ft`} />
                <InfoRow label="Lease term" value={`${data.leaseStartDate} – ${data.leaseEndDate}`} />
              </div>

              <Separator />

              {/* Quoted pricing */}
              <div>
                <h2 className="font-display text-base font-semibold mb-4">Quoted pricing:</h2>

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
                    <span className="text-accent">${totalEstimate.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <p className="text-muted-foreground">
                This quote has been reviewed by one of our leasing specialists. If you'd like to move forward or have questions, please reply to this email or contact Eric directly at{" "}
                <span className="text-accent font-medium">eric@ggp.com</span>.
              </p>

              <p className="text-foreground">
                Best Regards,<br />
                <span className="font-semibold">GGP</span>
              </p>
            </div>
          </div>

          {/* Back button */}
          <div className="flex justify-start pt-6">
            <Link to="/confirmation">
              <Button variant="outline" className="font-body gap-2">
                <ArrowLeft className="w-4 h-4" /> Back to Confirmation
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-wrap gap-1">
    <span className="text-foreground font-medium">{label}:</span>
    <span className="text-muted-foreground">{value}</span>
  </div>
);

export default DemoEmailApplicant;
