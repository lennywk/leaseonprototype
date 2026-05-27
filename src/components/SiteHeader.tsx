import { Link } from "react-router-dom";

const SiteHeader = () => {
  return (
    <header className="bg-primary">
      <div className="container-page flex items-center justify-between h-16">
        <Link to="/" className="font-display text-2xl font-bold tracking-wide text-primary-foreground">
          GGP
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <span className="text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors cursor-default">Our Properties</span>
          <Link to="/" className="text-sm font-medium text-primary-foreground border-b border-primary-foreground/50 pb-0.5">Leasing</Link>
          <span className="text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors cursor-default">Resources</span>
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
