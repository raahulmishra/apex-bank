import Navbar from "@/components/Navbar";
import LandingHero from "@/components/LandingHero";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fffdf7]">
      <Navbar />

      <LandingHero />

      {/* Services */}
      <section
        id="services"
        className="bg-[#fffdf7] px-6 py-24 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b08d24]">
              Banking Made Simple
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight text-[#29261f]">
              Everything you need to manage your money
            </h2>

            <p className="mt-4 text-[#625d50]">
              Powerful banking features with a simple and secure
              experience.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            
            <FeatureCard
              title="Secure Savings"
              description="Keep your money safe with reliable and secure banking."
              icon="◉"
            />

            <FeatureCard
              title="Easy Transfers"
              description="Transfer money quickly and conveniently whenever you need."
              icon="↗"
            />

            <FeatureCard
              title="Smart Banking"
              description="Keep track of your balance and transactions in one place."
              icon="▣"
            />

            <FeatureCard
              title="24/7 Access"
              description="Access your banking information anytime, anywhere."
              icon="◷"
            />

          </div>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="bg-[#faf5e6] px-6 py-24 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b08d24]">
              About Apex Trust
            </p>

            <h2 className="mt-4 text-4xl font-bold text-[#29261f]">
              Banking built around your future.
            </h2>

            <p className="mt-6 leading-8 text-[#625d50]">
              At Apex Trust, we believe banking should be simple,
              transparent and secure. Our goal is to provide modern
              financial tools that help you manage your money with
              confidence.
            </p>

            <p className="mt-4 leading-8 text-[#625d50]">
              From everyday transactions to managing your savings,
              everything is designed to give you a better banking
              experience.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <StatCard number="10K+" label="Happy Customers" />
            <StatCard number="99.9%" label="System Reliability" />
            <StatCard number="24/7" label="Banking Access" />
            <StatCard number="100%" label="Secure Platform" />
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[32px] bg-[#29261f] px-8 py-16 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-bold">
            Ready to take control of your finances?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Create your account today and experience simple,
            secure and modern banking.
          </p>

          <div className="mt-8">
            <a href="/signup">
              <Button>
                Get Started
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="border-t border-[#e8dfc7] bg-[#fffdf7] px-6 py-10 lg:px-8"
      >
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 md:flex-row">
          <div>
            <p className="font-bold text-[#29261f]">
              APEX TRUST
            </p>
            <p className="mt-1 text-sm text-[#77705f]">
              Your future, built on trust.
            </p>
          </div>

          <p className="text-sm text-[#77705f]">
            © 2026 Apex Trust. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ title, description, icon }) {
  return (
    <div className="group rounded-3xl border border-[#e8dfc7] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#faf1cf] text-xl text-[#9b7b1e]">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-bold text-[#29261f]">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#77705f]">
        {description}
      </p>
    </div>
  );
}

function StatCard({ number, label }) {
  return (
    <div className="rounded-3xl border border-[#e8dfc7] bg-white p-7 shadow-sm">
      <p className="text-3xl font-bold text-[#b08d24]">
        {number}
      </p>

      <p className="mt-2 text-sm text-[#77705f]">
        {label}
      </p>
    </div>
  );
}