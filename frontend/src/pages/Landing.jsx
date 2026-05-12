import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, BarChart3, Plug, Sheet } from "lucide-react";

const HERO_BG =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBzcHJlYWRzaGVldCUyMGRhc2hib2FyZHxlbnwwfHx8fDE3NzgzNzY3NzN8MA&ixlib=rb-4.1.0&q=85";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-cream" data-testid="landing-page">
      {/* Top Nav */}
      <nav className="sticky top-0 z-40 bg-[#F9F8F6]/85 backdrop-blur-xl border-b border-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-2" data-testid="landing-logo">
            <div className="w-8 h-8 rounded-md bg-moss flex items-center justify-center">
              <span className="text-white text-sm font-semibold" style={{ fontFamily: "Outfit" }}>L</span>
            </div>
            <span className="font-medium tracking-tight" style={{ fontFamily: "Outfit", fontSize: 18 }}>FP&A Analytics - NEXT</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <Link to="/login" data-testid="nav-signin-link">
              <Button variant="ghost" className="text-[#1A1A1A]">Sign in</Button>
            </Link>
            <Link to="/register" data-testid="nav-register-link">
              <Button className="bg-moss hover:bg-[#3D5247] text-white">Get started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8 pt-20 pb-24 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="label-eyebrow mb-6">A finance workspace. Built for clarity.</div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-[#1A1A1A] leading-[1.35]" style={{ fontFamily: "Outfit" }}>
              Statements that{" "}
              <span className="italic" style={{ color: "#022d01" }}>balance themselves.</span>
            </h1>
            <p className="mt-6 text-lg text-[#5C5C5C] max-w-2xl leading-relaxed">
              A complete accounting workspace with auto-reconciled transactions from Get organised today
PayPal, Stripe, Skrill and Paysafe — and a real Google Sheets connection for everything in between.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                onClick={() => navigate("/register")}
                className="bg-moss hover:bg-[#3D5247] text-white px-7 h-12"
                data-testid="hero-cta-register"
              >
                Open your books
                <ArrowRight className="ml-2 w-4 h-4" strokeWidth={1.5} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/login")}
                className="h-12 border-cream text-[#1A1A1A] hover:border-moss hover:bg-[#F9F8F6]"
                data-testid="hero-cta-login"
              >
                I have an account
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { v: "8", l: "Statements" },
                { v: "5", l: "Currencies" },
                { v: "4", l: "PSPs" },
                { v: "1‑click", l: "Sheet sync" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-3xl text-[#1A1A1A]" style={{ fontFamily: "Outfit", fontWeight: 300 }}>{s.v}</div>
                  <div className="label-eyebrow mt-1 text-[10px]">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden border border-cream shadow-[0_30px_60px_-20px_rgba(42,59,50,0.25)]">
              {/* <img src={HERO_BG} alt="Financial dashboard" className="w-full h-[520px] object-cover" /> */}
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute left-6 right-6 bottom-6 bg-white/95 backdrop-blur rounded-lg p-5 border border-cream">
                <div className="label-eyebrow text-[10px]">Net Profit · January</div>
                <div className="mt-1 text-3xl numeric" style={{ fontFamily: "Outfit", fontWeight: 300 }}>$ 84,210.00</div>
                <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
                  <div><div className="text-[#5C5C5C]">Income</div><div className="numeric mt-0.5">$112,400</div></div>
                  <div><div className="text-[#5C5C5C]">Expenses</div><div className="numeric mt-0.5">$28,190</div></div>
                  <div><div className="text-[#5C5C5C]">Margin</div><div className="numeric mt-0.5 text-moss">75%</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white border-y border-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-20 grid md:grid-cols-3 gap-10">
          {[
            { icon: BarChart3, t: "Eight standard statements", d: "P&L, Balance Sheet, Cash Flow, Trial Balance, General Ledger, Tax, Invoices, Receipts — all auto-generated from a single ledger." },
            { icon: Plug, t: "Native PSP connectors", d: "PayPal, Stripe, Skrill and Paysafe. Click connect, click sync, your transactions land already reconciled." },
            { icon: Sheet, t: "Real Google Sheets", d: "Export any statement as a fresh spreadsheet, or import a sheet of transactions in seconds. OAuth, no copy paste." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} data-testid={`feature-${t.split(" ")[0].toLowerCase()}`}>
              <div className="w-10 h-10 rounded-md bg-[#F2F0ED] flex items-center justify-center mb-5">
                <Icon className="w-5 h-5 text-moss" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-medium tracking-tight" style={{ fontFamily: "Outfit" }}>{t}</h3>
              <p className="mt-2 text-sm text-[#5C5C5C] leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-24">
        <div className="rounded-xl bg-moss text-white p-10 md:p-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <div className="label-eyebrow text-white/90 mb-3">Get organised today</div>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight" style={{ fontFamily: "Outfit" }}>
              Your books, finally
              <br /> in one quiet room.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/register">
              <Button size="lg" className="bg-white text-moss hover:bg-[#F2F0ED] h-12 px-7" data-testid="cta-register-bottom">
                Create free account
                <ArrowRight className="ml-2 w-4 h-4" strokeWidth={1.5} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-8 flex items-center justify-between text-xs text-[#5C5C5C]">
          <div>© {new Date().getFullYear()} FP&A Analytics - NEXT</div>
          <div className="flex items-center gap-4">
            <ShieldCheck className="w-3.5 h-3.5" strokeWidth={1.5} /> SOC-style controls · Encrypted at rest
          </div>
        </div>
      </footer>
    </div>
  );
}