import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Maximize2, Building2, CheckCircle2, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { units, getPriceLabel } from "@/data/units";

const UnitDetail = () => {
  const { id } = useParams<{ id: string }>();
  const unit = units.find(u => u.id === id);

  if (!unit) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-2xl mb-4">Space Not Found</h1>
            <Link to="/" className="text-accent hover:underline">← Back to listings</Link>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* Breadcrumb */}
      <div className="bg-secondary border-b border-border">
        <div className="container-page py-3">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
            <ArrowLeft className="w-4 h-4" />
            Available Spaces
          </Link>
        </div>
      </div>

      {/* Hero section */}
      <section className="container-page pt-8 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="rounded-lg overflow-hidden aspect-[4/3]">
            <img src={unit.image} alt={unit.name} className="w-full h-full object-cover" />
          </div>

          {/* Key info */}
          <div className="flex flex-col justify-between">
            <div>
              <Badge className="bg-primary text-primary-foreground mb-3">{unit.unitType}</Badge>
              <p className="text-sm text-muted-foreground font-body mb-1">{unit.property}</p>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">{unit.name}</h1>
              <div className="flex items-center gap-1 text-muted-foreground text-sm mb-6">
                <MapPin className="w-4 h-4" />
                <span className="font-body">{unit.address}, {unit.city}, {unit.state} {unit.zip}</span>
              </div>

              <div className="bg-secondary rounded-lg p-5 mb-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-body mb-1">Estimated monthly rent</p>
                <p className="font-display text-2xl font-bold text-foreground">
                  {getPriceLabel(unit.unitType)}
                </p>
                <p className="text-xs text-muted-foreground font-body mt-2">
                  Final pricing depends on lease term and your application. Get a detailed estimate after submitting an inquiry.
                </p>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <Maximize2 className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <p className="text-sm font-semibold text-foreground">{unit.sqft.toLocaleString()} sq ft</p>
                  <p className="text-xs text-muted-foreground">Size</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <Building2 className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <p className="text-sm font-semibold text-foreground">{unit.level}</p>
                  <p className="text-xs text-muted-foreground">Location</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <Users className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <p className="text-sm font-semibold text-foreground">{unit.totalRetailers}</p>
                  <p className="text-xs text-muted-foreground">Retailers</p>
                </div>
              </div>
            </div>

            <Link to={`/inquiry/${unit.id}`}>
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold text-base py-6">
                Apply Now <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Separator className="container-page" />

      {/* Details */}
      <section className="container-page py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Space features */}
          <div>
            <h2 className="font-display text-xl font-semibold mb-4">At a Glance</h2>
            <ul className="space-y-3">
              {unit.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-sm font-body text-foreground">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-success flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* About the space */}
          <div>
            <h2 className="font-display text-xl font-semibold mb-4">About the Space</h2>
            <p className="text-sm font-body text-muted-foreground leading-relaxed">{unit.description}</p>
          </div>

          {/* About the property */}
          <div>
            <h2 className="font-display text-xl font-semibold mb-4">About the Property</h2>
            <p className="text-sm font-body text-muted-foreground leading-relaxed mb-4">{unit.propertyDescription}</p>
            <div className="space-y-2 text-sm font-body">
              <div className="flex justify-between"><span className="text-muted-foreground">Center type</span><span className="text-foreground font-medium">{unit.centerType}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total retail space</span><span className="text-foreground font-medium">{unit.totalRetailSqft} sq ft</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Number of retailers</span><span className="text-foreground font-medium">{unit.totalRetailers}</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary">
        <div className="container-page py-12 text-center">
          <h2 className="font-display text-2xl font-bold text-primary-foreground mb-3">Ready to get started?</h2>
          <p className="text-primary-foreground/70 font-body mb-6 max-w-md mx-auto text-sm">
            Submit an inquiry to receive a detailed lease proposal with personalized pricing.
          </p>
          <Link to={`/inquiry/${unit.id}`}>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold px-8 py-5">
              Apply Now
            </Button>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default UnitDetail;
