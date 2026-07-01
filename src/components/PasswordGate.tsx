import { useState, useEffect, type ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

const PASSWORD = "tnv2hM7oL7un52";

interface PasswordGateProps {
  children: ReactNode;
}

const PasswordGate = ({ children }: PasswordGateProps) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setAuthenticated(sessionStorage.getItem("ggp-auth") === "true");
    setReady(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD) {
      sessionStorage.setItem("ggp-auth", "true");
      setAuthenticated(true);
    } else {
      setError(true);
    }
  };

  if (!ready) return null;
  if (authenticated) return <>{children}</>;

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="bg-card rounded-lg p-8 max-w-sm w-full shadow-xl">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">GGP LeaseOn</h1>
          <p className="text-sm text-muted-foreground font-body mt-1">Enter password to view this prototype</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            className={error ? "border-destructive" : ""}
          />
          {error && <p className="text-xs text-destructive">Incorrect password</p>}
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body">
            Enter
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PasswordGate;
