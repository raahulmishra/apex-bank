import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-[#faf5e6]">
      
      {/* Decorative circles */}
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#ead79a]/30 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#d4af37]/10 blur-3xl" />

      <div className="relative mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8">
        
        {/* Left Content */}
        <div>
          <div className="mb-6 inline-flex rounded-full border border-[#d8c27b] bg-[#fffaf0] px-4 py-2 text-sm font-medium text-[#8b7632]">
            Trusted Banking. Better Future.
          </div>

          <h1 className="max-w-2xl text-5xl font-bold leading-[1.08] tracking-tight text-[#29261f] md:text-6xl">
            Your Future,
            <br />
            <span className="text-[#b08d24]">
              Built on Trust.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-[#625d50]">
            Simple, secure and modern banking designed around you.
            Manage your money, transfer funds and keep track of your
            finances with confidence.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/signup">
              <Button className="h-12 rounded-full bg-[#d4af37] px-7 text-base font-semibold text-white shadow-lg shadow-[#d4af37]/20 hover:bg-[#b99525]">
                Create an Account
              </Button>
            </Link>

            <Link href="/login">
              <Button
                variant="outline"
                className="h-12 rounded-full border-[#cdbb84] bg-white px-7 text-base font-semibold text-[#403c32] hover:bg-[#f7efd5]"
              >
                Secure Login
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-10 flex flex-wrap gap-8 text-sm text-[#625d50]">
            <div>
              <p className="text-xl font-bold text-[#29261f]">100%</p>
              <span>Secure Banking</span>
            </div>

            <div>
              <p className="text-xl font-bold text-[#29261f]">24/7</p>
              <span>Access</span>
            </div>

            <div>
              <p className="text-xl font-bold text-[#29261f]">Fast</p>
              <span>Transfers</span>
            </div>
          </div>
        </div>

        {/* Right Banking Card */}
        <div className="relative mx-auto w-full max-w-lg">
          
          {/* Glow */}
          <div className="absolute inset-0 rounded-[40px] bg-[#d4af37]/20 blur-3xl" />

          <div className="relative rounded-[32px] border border-[#e2d29e] bg-white/80 p-5 shadow-2xl backdrop-blur">
            
            {/* Main bank card */}
            <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#d4af37] via-[#b99525] to-[#8e7017] p-7 text-white shadow-xl">
              
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full border-[30px] border-white/10" />

              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium tracking-widest text-white/80">
                    APEX
                  </p>
                  <p className="text-xs tracking-[0.3em] text-white/70">
                    TRUST
                  </p>
                </div>

                <div className="text-2xl">◈</div>
              </div>

              <div className="mt-14">
                <p className="text-sm text-white/70">Available Balance</p>
                <p className="mt-1 text-4xl font-bold">
                  ₹25,450.00
                </p>
              </div>

              <div className="mt-10 flex justify-between text-sm">
                <div>
                  <p className="text-xs text-white/60">ACCOUNT</p>
                  <p className="mt-1 tracking-widest">
                    •••• 4829
                  </p>
                </div>

                <div>
                  <p className="text-xs text-white/60">STATUS</p>
                  <p className="mt-1">Active</p>
                </div>
              </div>
            </div>

            {/* Bottom stats */}
            <div className="grid grid-cols-2 gap-4 pt-5">
              <div className="rounded-2xl bg-[#faf5e6] p-5">
                <p className="text-sm text-[#77705f]">
                  This Month
                </p>
                <p className="mt-2 text-xl font-bold text-[#29261f]">
                  + ₹8,240
                </p>
                <p className="mt-1 text-xs text-green-700">
                  Income
                </p>
              </div>

              <div className="rounded-2xl bg-[#faf5e6] p-5">
                <p className="text-sm text-[#77705f]">
                  Spending
                </p>
                <p className="mt-2 text-xl font-bold text-[#29261f]">
                  ₹4,820
                </p>
                <p className="mt-1 text-xs text-[#9b6c25]">
                  This month
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}