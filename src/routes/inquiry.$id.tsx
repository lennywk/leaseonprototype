import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { units, PRICE_RANGES, getPriceLabel } from "@/data/units";

export const Route = createFileRoute("/inquiry/$id")({
  head: ({ params }) => {
    const unit = units.find((u) => u.id === params.id);
    const title = unit ? `Apply for ${unit.name} — GGP LeaseOn` : "Apply — GGP LeaseOn";
    return {
      meta: [
        { title },
        { name: "description", content: "Submit an application to lease this retail space." },
        { property: "og:title", content: title },
      ],
    };
  },
  component: Inquiry,
});

const MERCHANDISE_CATEGORIES = ["Apparel & Accessories", "Beauty & Wellness", "Electronics", "Food & Beverage", "Gift & Novelty", "Health & Fitness", "Home & Garden", "Jewelry", "Pet Supplies", "Sporting Goods", "Toys & Games", "Other"];

const STEPS = [
  { num: 1, label: "Contact Us", desc: "Tell us about you and what you're looking for" },
  { num: 2, label: "Review", desc: "We review your application" },
  { num: 3, label: "Sign", desc: "Sign your lease via email" },
];

function Inquiry() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const unit = units.find((u) => u.id === id);

  const [page, setPage] = useState(1);

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    companyName: "", dba: "", fein: "",
    merchandiseCategory: "", businessDescription: "",
    termMonths: "",
    termsAccepted: false,
    estimatedSales: "", sqFtNeeded: "", existingLocationsCount: "",
    businessLocation: "", yearsOwned: "", website: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!unit) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center">
          <Link to="/" className="text-accent hover:underline">← Back to listings</Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const priceRange = PRICE_RANGES[unit.unitType];

  const update = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  const validatePage1 = () => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.companyName.trim()) e.companyName = "Required";
    const m = parseInt(form.termMonths, 10);
    if (!form.termMonths || isNaN(m) || m < 1 || m > 120) e.termMonths = "Enter a value between 1 and 120";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePage2 = () => {
    const e: Record<string, string> = {};
    if (!form.termsAccepted) e.termsAccepted = "You must accept terms";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (!validatePage1()) return;
    setPage(2);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePage2()) return;

    const months = Math.max(1, Math.min(120, parseInt(form.termMonths, 10) || 1));

    const submissionData = {
      ...form,
      unitId: unit.id,
      unitName: unit.name,
      property: unit.property,
      unitType: unit.unitType,
      sqft: unit.sqft,
      priceRange,
      months,
      address: `${unit.address}, ${unit.city}, ${unit.state} ${unit.zip}`,
    };

    sessionStorage.setItem("leaseInquiry", JSON.stringify(submissionData));
    navigate({ to: "/confirmation" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <div className="bg-secondary border-b border-border">
        <div className="container-page py-6">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {STEPS.map((step, i) => (
              <div key={step.num} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step.num === 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {step.num}
                </div>
                <div className="hidden md:block">
                  <p className={`text-xs font-semibold font-body ${step.num === 1 ? "text-foreground" : "text-muted-foreground"}`}>Step {step.num}: {step.label}</p>
                  <p className="text-xs text-muted-foreground font-body">{step.desc}</p>
                </div>
                {i < STEPS.length - 1 && <div className="hidden lg:block w-12 h-px bg-border mx-2" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-page py-10 flex-1">
        <div className="max-w-3xl mx-auto">
          <div className="bg-secondary rounded-lg p-5 mb-8 flex flex-col sm:flex-row gap-4">
            <img src={unit.image} alt={unit.name} className="w-full sm:w-32 h-24 object-cover rounded-md" />
            <div className="flex-1">
              <h2 className="font-display text-lg font-semibold">{unit.name}</h2>
              <p className="font-body text-sm text-foreground">{unit.property}</p>
              <p className="text-sm text-muted-foreground font-body">{unit.unitType} · {unit.sqft.toLocaleString()} sq ft · {unit.level}</p>
              <p className="text-sm font-semibold text-primary font-body mt-1">
                {getPriceLabel(unit.unitType)}
              </p>
            </div>
          </div>

          {page === 1 ? (
            <>
              <div className="mb-6">
                <h1 className="font-display text-2xl font-bold mb-1">Application</h1>
                <p className="text-sm text-muted-foreground font-body">
                  Submitting an application is the first step and doesn't represent a formal commitment.
                </p>
              </div>

              <div className="space-y-8">
                <section>
                  <h3 className="font-display text-lg font-semibold mb-1">Desired Term</h3>
                  <p className="text-xs text-muted-foreground font-body mb-4">Minimum 1 month · Maximum 120 months</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="termMonths" className="font-body"># of months *</Label>
                      <Input
                        id="termMonths"
                        type="number"
                        min={1}
                        max={120}
                        value={form.termMonths}
                        onChange={(e) => update("termMonths", e.target.value)}
                        placeholder="e.g. 12"
                      />
                      {errors.termMonths && <p className="text-xs text-destructive mt-1">{errors.termMonths}</p>}
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="font-display text-lg font-semibold mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="font-body">First Name *</Label>
                      <Input id="firstName" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} />
                      {errors.firstName && <p className="text-xs text-destructive mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="font-body">Last Name *</Label>
                      <Input id="lastName" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} />
                      {errors.lastName && <p className="text-xs text-destructive mt-1">{errors.lastName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email" className="font-body">Email *</Label>
                      <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
                      {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone" className="font-body">Phone *</Label>
                      <Input id="phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                      {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="font-display text-lg font-semibold mb-4">Tell Us About Your Business</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="companyName" className="font-body">Company Name *</Label>
                      <Input id="companyName" value={form.companyName} onChange={(e) => update("companyName", e.target.value)} placeholder="Your name if sole proprietor" />
                      {errors.companyName && <p className="text-xs text-destructive mt-1">{errors.companyName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="dba" className="font-body">DBA (name for signage)</Label>
                      <Input id="dba" value={form.dba} onChange={(e) => update("dba", e.target.value)} />
                    </div>
                    <div>
                      <Label className="font-body">Merchandise Category</Label>
                      <Select value={form.merchandiseCategory} onValueChange={(v) => update("merchandiseCategory", v)}>
                        <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                        <SelectContent>
                          {MERCHANDISE_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      {errors.merchandiseCategory && <p className="text-xs text-destructive mt-1">{errors.merchandiseCategory}</p>}
                    </div>
                    <div>
                      <Label htmlFor="fein" className="font-body">FEIN</Label>
                      <Input id="fein" value={form.fein} onChange={(e) => update("fein", e.target.value)} placeholder="XX-XXXXXXX" />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="businessDescription" className="font-body">Describe your business</Label>
                      <Textarea id="businessDescription" value={form.businessDescription} onChange={(e) => update("businessDescription", e.target.value)} rows={3} placeholder="Products, services, and target customers..." />
                    </div>
                  </div>
                </section>

                <div className="flex gap-4">
                  <Link to="/unit/$id" params={{ id: unit.id }}>
                    <Button type="button" variant="outline" className="font-body py-5">
                      Back
                    </Button>
                  </Link>
                  <Button type="button" onClick={handleNext} className="bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold px-8 py-5">
                    Next
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mb-6">
                <h1 className="font-display text-2xl font-bold mb-1">Additional Information</h1>
                <p className="text-sm text-muted-foreground font-body">
                  The questions on this page are optional but will help us provide a more accurate quote and the ability to provide suitable recommendations for other spaces that may not be available publicly yet.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <section>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="estimatedSales" className="font-body">Estimated Sales</Label>
                      <Input id="estimatedSales" value={form.estimatedSales} onChange={(e) => update("estimatedSales", e.target.value)} placeholder="e.g. $50,000/year" />
                    </div>
                    <div>
                      <Label htmlFor="sqFtNeeded" className="font-body">Size of Space Needed (sq ft)</Label>
                      <Input id="sqFtNeeded" type="number" value={form.sqFtNeeded} onChange={(e) => update("sqFtNeeded", e.target.value)} placeholder="e.g. 1200" />
                    </div>
                    <div>
                      <Label htmlFor="existingLocationsCount" className="font-body">Number of Existing Locations</Label>
                      <Input id="existingLocationsCount" type="number" value={form.existingLocationsCount} onChange={(e) => update("existingLocationsCount", e.target.value)} placeholder="e.g. 3" />
                    </div>
                    <div>
                      <Label htmlFor="yearsOwned" className="font-body">Years Owning This Business</Label>
                      <Input id="yearsOwned" type="number" value={form.yearsOwned} onChange={(e) => update("yearsOwned", e.target.value)} placeholder="e.g. 5" />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="businessLocation" className="font-body">Location of Existing Business</Label>
                      <Textarea id="businessLocation" value={form.businessLocation} onChange={(e) => update("businessLocation", e.target.value)} rows={2} placeholder="City, state or full address of current locations..." />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="website" className="font-body">Website / Social Media</Label>
                      <Input id="website" value={form.website} onChange={(e) => update("website", e.target.value)} placeholder="e.g. https://mybusiness.com or @mybusiness" />
                    </div>
                  </div>
                </section>

                <section className="bg-secondary rounded-lg p-5">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms"
                      checked={form.termsAccepted}
                      onCheckedChange={(v) => update("termsAccepted", !!v)}
                    />
                    <Label htmlFor="terms" className="text-sm font-body text-muted-foreground leading-relaxed cursor-pointer">
                      I have read and understand that this application is the first step and does not represent a formal commitment by both parties for a lease, partnership, or license agreement.
                    </Label>
                  </div>
                  {errors.termsAccepted && <p className="text-xs text-destructive mt-2">{errors.termsAccepted}</p>}
                </section>

                <div className="flex gap-4">
                  <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold px-8 py-5">
                    Submit Application
                  </Button>
                  <Button type="button" variant="outline" className="font-body py-5" onClick={() => { setPage(1); window.scrollTo(0, 0); }}>
                    Back
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
