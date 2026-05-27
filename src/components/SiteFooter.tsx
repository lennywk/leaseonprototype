const SiteFooter = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container-page py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display text-xl font-bold mb-4">GGP</h3>
            <p className="text-sm text-primary-foreground/70">
              Discover innovative, high-quality retail spaces designed to help your business thrive.
            </p>
          </div>
          <div>
            <h4 className="font-body font-semibold mb-3 text-sm uppercase tracking-wider text-primary-foreground/60">Leasing</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>Inline Leasing</li>
              <li>Specialty Leasing</li>
              <li>Restaurant Leasing</li>
            </ul>
          </div>
          <div>
            <h4 className="font-body font-semibold mb-3 text-sm uppercase tracking-wider text-primary-foreground/60">Contact</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>Press Inquiries</li>
              <li>Careers</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-xs text-primary-foreground/50 flex flex-wrap gap-4">
          <span>© 2026 GGP Retail LLC</span>
          <span>Privacy Policy</span>
          <span>Terms</span>
          <span>Accessibility</span>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
