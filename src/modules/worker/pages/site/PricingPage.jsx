import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeIndianRupee,
  Calculator,
  Check,
  Info,
  Minus,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import SiteLayout, { IconTile, SectionHeading } from "./SiteLayout";
import FaqAccordion from "./FaqAccordion";
import { plans } from "../PricingSection";

const LAKH = 100000;

const accent = {
  orange: { text: "text-orange-500", check: "bg-orange-100 text-orange-600", btn: "bg-orange-500 hover:bg-orange-600" },
  purple: { text: "text-purple-600", check: "bg-purple-100 text-purple-600", btn: "bg-purple-600 hover:bg-purple-700" },
  green: { text: "text-emerald-600", check: "bg-emerald-100 text-emerald-600", btn: "bg-emerald-500 hover:bg-emerald-600" },
};

// Tiers from the landing-page plans: below ₹5L, ₹5L–₹20L, above ₹20L.
const planForWageBill = (amount) => {
  if (amount < 5 * LAKH) return plans[0];
  if (amount <= 20 * LAKH) return plans[1];
  return plans[2];
};

const inr = (value) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

// Each plan adds its own features on top of the previous one ("Everything in …" rows skipped).
const comparisonRows = plans.flatMap((plan, planIndex) =>
  plan.features
    .filter((f) => !f.startsWith("Everything in"))
    .map((feature) => ({ feature, fromPlan: planIndex })),
);

const pricingFaqs = [
  {
    question: "Do workers pay anything?",
    answer:
      "No. ATW never charges workers for registering, applying or getting work — we only charge factories. The only charge a worker may ever see is an optional wallet withdrawal fee, which is always shown before they confirm.",
  },
  {
    question: "Are EPF, ESIC and other statutory costs included in the service fee?",
    answer:
      "No. Employer EPF, ESIC, gratuity and other statutory costs are billed separately from the service fee, so you can see exactly what goes to the government and what goes to ATW.",
  },
  {
    question: "Which plan am I on?",
    answer:
      "Your plan follows your monthly wage bill managed through ATW — below ₹5 lakhs is Starter (10%), ₹5–20 lakhs is Growth (8%), and above ₹20 lakhs is Enterprise (5%). As you grow, your rate per rupee goes down.",
  },
  {
    question: "What happens if we cancel a booking?",
    answer: (
      <>
        Cancelling more than 24 hours before the shift starts is free. Shorter notice carries a
        cancellation charge per cancelled worker, added to your next invoice. Full details are in
        our{" "}
        <Link to="/refund-policy" className="text-blue-600 hover:underline">
          Refund & Cancellation Policy
        </Link>
        .
      </>
    ),
  },
  {
    question: "How do I raise an invoice dispute?",
    answer:
      "Invoice disputes must be raised within 7 days of the invoice date. Contact your account manager or our support team and we will review it with you.",
  },
];

const PricingPage = () => {
  const [wageBill, setWageBill] = useState(8 * LAKH);
  const plan = planForWageBill(wageBill);
  const fee = (wageBill * parseFloat(plan.percent)) / 100;

  return (
    <SiteLayout
      banner={{
        image: "/images/landing/page-pricing.jpg",
        breadcrumbs: [{ label: "Pricing" }],
        eyebrow: "Factory pricing",
        title: "Wage-bill linked pricing",
        subtitle:
          "We only charge factories — never workers. The more workers you manage through ATW, the less you pay per rupee.",
        overlap: true,
        children: (
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-white/90 backdrop-blur-sm">
              <ShieldCheck size={15} className="text-[#FFB703]" /> No hidden charges
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-white/90 backdrop-blur-sm">
              <UserCheck size={15} className="text-[#FFB703]" /> Workers pay ₹0
            </span>
          </div>
        ),
      }}
    >
      {/* PLANS — overlapping the banner */}
      <section className="bg-gray-50 px-4 md:px-6 pb-20">
        <div className="relative z-10 max-w-6xl mx-auto -mt-16 md:-mt-20 grid gap-6 md:grid-cols-3">
          {plans.map((p, i) => {
            const c = accent[p.color];
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                whileHover={{ y: -6 }}
                className={`relative flex flex-col rounded-3xl bg-white p-7 shadow-xl ${
                  p.featured ? "ring-2 ring-purple-500 md:-translate-y-4" : ""
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-white">
                    Most popular
                  </span>
                )}
                <p className="text-sm font-medium text-gray-500">{p.label}</p>
                <p className={`mt-2 text-6xl font-extrabold leading-none ${c.text}`}>{p.percent}</p>
                <p className="mt-1 text-xs text-gray-500">service fee on monthly wage bill</p>
                <div className="mt-5 rounded-xl bg-gray-50 px-4 py-3">
                  <p className="text-xs text-gray-500">Monthly wage bill</p>
                  <p className="text-lg font-bold text-gray-900">{p.wageBill}</p>
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${c.check}`}>
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/contact?plan=${p.id}`}
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-colors ${c.btn}`}
                >
                  {p.btnText} <ArrowRight size={16} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* FEE ESTIMATOR */}
      <section className="bg-white px-4 md:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Fee estimator"
            title="See what you'd pay"
            subtitle="Slide to your monthly wage bill to see which plan applies and an estimate of the service fee."
          />
          <div className="grid gap-8 lg:grid-cols-5 items-stretch">
            <div className="lg:col-span-3 rounded-3xl border border-gray-200 bg-white p-6 md:p-8 shadow-lg">
              <div className="flex items-center gap-3">
                <IconTile icon={Calculator} />
                <div>
                  <p className="text-sm text-gray-500">Monthly wage bill</p>
                  <p className="text-3xl font-bold text-gray-900">{inr(wageBill)}</p>
                </div>
              </div>
              <input
                type="range"
                min={LAKH}
                max={50 * LAKH}
                step={50000}
                value={wageBill}
                onChange={(e) => setWageBill(Number(e.target.value))}
                aria-label="Monthly wage bill"
                className="mt-8 w-full accent-purple-600"
              />
              <div className="mt-2 flex justify-between text-xs text-gray-400">
                <span>₹1L</span>
                <span>₹5L</span>
                <span>₹20L</span>
                <span>₹50L</span>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-2">
                {plans.map((p) => (
                  <div
                    key={p.id}
                    className={`rounded-xl px-3 py-2 text-center text-xs font-semibold transition-colors ${
                      p.id === plan.id
                        ? "bg-gradient-to-r from-orange-400 via-purple-500 to-cyan-400 text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {p.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0d1b35] to-[#1a6fc4] p-6 md:p-8 text-white shadow-lg">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#FFB703]/20 blur-2xl" />
              <p className="relative text-sm text-blue-100">Your plan</p>
              <p className="relative text-2xl font-bold">
                {plan.label} · {plan.percent}
              </p>
              <p className="relative mt-6 text-sm text-blue-100">Estimated service fee / month</p>
              <motion.p
                key={fee}
                initial={{ opacity: 0.4, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative text-4xl md:text-5xl font-extrabold text-[#FFB703]"
              >
                {inr(fee)}
              </motion.p>
              <p className="relative mt-6 flex items-start gap-2 text-xs text-blue-100">
                <Info size={14} className="mt-0.5 flex-shrink-0" />
                An estimate only. Statutory costs (EPF, ESIC, gratuity) are billed separately, and
                the rates in your signed Rate Card apply.
              </p>
              <Link
                to={`/contact?plan=${plan.id}`}
                className="relative mt-6 inline-flex items-center gap-2 rounded-xl bg-[#FFB703] px-5 py-3 text-sm font-semibold text-[#0d1b35] transition-transform hover:scale-105"
              >
                Get an exact quote <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="bg-gray-50 px-4 md:px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <SectionHeading eyebrow="Compare plans" title="What's included" />
          <div className="overflow-x-auto rounded-3xl border border-gray-200 bg-white shadow-lg">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-gradient-to-r from-[#0d1b35] to-[#1a6fc4] text-white">
                <tr>
                  <th className="px-6 py-4 font-semibold">Feature</th>
                  {plans.map((p) => (
                    <th key={p.id} className="px-4 py-4 text-center font-semibold">
                      {p.label}
                      <span className="block text-xs font-normal text-blue-100">{p.percent} fee</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.feature} className={`border-t border-gray-200 ${i % 2 ? "bg-gray-50" : ""}`}>
                    <td className="px-6 py-3.5 text-gray-700">{row.feature}</td>
                    {plans.map((p, planIndex) => (
                      <td key={p.id} className="px-4 py-3.5 text-center">
                        {planIndex >= row.fromPlan ? (
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                            <Check size={14} strokeWidth={3} />
                          </span>
                        ) : (
                          <Minus size={16} className="mx-auto text-gray-300" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* WORKERS NEVER PAY + FAQ */}
      <section className="bg-white px-4 md:px-6 py-20">
        <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-28 rounded-3xl bg-gradient-to-br from-orange-50 via-purple-50 to-blue-50 p-8">
              <IconTile icon={BadgeIndianRupee} size="lg" />
              <h3 className="mt-5 text-2xl font-bold text-gray-900">Workers never pay ATW</h3>
              <p className="mt-3 text-gray-600 leading-7">
                No fee to register, apply or get work — ever. If anyone ever asks
                a worker for money in ATW's name, it isn't us — please report it.
              </p>
              <Link
                to="/grievance"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:gap-3 transition-all"
              >
                Report fraud <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-3">
            <p className="text-[#FFB703] font-semibold text-sm uppercase tracking-widest mb-3">
              Pricing FAQs
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Questions about billing</h2>
            <FaqAccordion items={pricingFaqs} />
            <Link
              to="/faq"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:gap-3 transition-all"
            >
              See all FAQs <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default PricingPage;
