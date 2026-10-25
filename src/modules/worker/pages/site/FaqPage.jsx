import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  CircleHelp,
  Lock,
  Mail,
  MessageCircle,
  MessageSquareWarning,
  Phone,
  Search,
  UserCheck,
  Wallet,
} from "lucide-react";
import SiteLayout from "./SiteLayout";
import FaqAccordion from "./FaqAccordion";
import { faqs as landingFaqs } from "../FaqSectin";
import siteSettings from "../../../../common/utils/siteSettings";

const linkClass = "text-blue-600 hover:underline";

const categories = [
  { id: "all", label: "All questions", icon: CircleHelp },
  { id: "general", label: "General", icon: CircleHelp },
  { id: "companies", label: "For companies", icon: Building2 },
  { id: "workers", label: "For workers", icon: UserCheck },
  { id: "payments", label: "Payments & compliance", icon: Wallet },
  { id: "privacy", label: "Privacy & safety", icon: Lock },
];

// The six landing-page FAQs, in order, sorted into categories.
const [quotation, services, specialities, startProject, workerPayments, pfEsi] = landingFaqs;

const faqs = [
  { ...services, category: "general" },
  { ...specialities, category: "general" },
  {
    category: "general",
    question: "What exactly does ATW do?",
    answer:
      "ATW connects workers with work at client companies and manages recruitment, attendance, wages, statutory compliance (EPF, ESIC, gratuity) and payouts — all on one platform.",
  },
  {
    category: "general",
    question: "Is ATW recognised by the government?",
    answer:
      "Yes. ATW is a DPIIT-recognised startup under Startup India, ISO 9001:2015 certified, a Skill India (NSDC) partner and registered on the Government e-Marketplace (GeM).",
  },
  { ...quotation, category: "companies" },
  { ...startProject, category: "companies" },
  {
    category: "companies",
    question: "Who is the employer of the workers you deploy?",
    answer:
      "For workers deployed through ATW, ATW is the employer and is responsible for paying wages and statutory contributions. Your company provides the workplace and supervises day-to-day work.",
  },
  {
    category: "companies",
    question: "How much does ATW charge?",
    answer: (
      <>
        A service fee linked to your monthly wage bill: 10% below ₹5 lakhs, 8% from ₹5–20 lakhs and
        5% above ₹20 lakhs. Statutory costs are billed separately. See{" "}
        <Link to="/pricing" className={linkClass}>
          Pricing
        </Link>{" "}
        for a fee estimate.
      </>
    ),
  },
  {
    category: "companies",
    question: "What if we need to cancel a booking?",
    answer: (
      <>
        Cancelling more than 24 hours before the shift is free; shorter notice carries a charge per
        cancelled worker. See our{" "}
        <Link to="/refund-policy" className={linkClass}>
          Refund & Cancellation Policy
        </Link>
        .
      </>
    ),
  },
  {
    category: "workers",
    question: "Do I have to pay anything to join ATW?",
    answer:
      "No. ATW never charges workers for registering, applying or getting work. If anyone asks you for money in ATW's name, do not pay — report it to us.",
  },
  {
    category: "workers",
    question: "What do I need before I can apply for a job?",
    answer:
      "You need to complete KYC (an identity check), give a live photo taken in the app, and add a bank account in your own name. You can browse vacancies before KYC, but you can only apply once it's complete.",
  },
  {
    category: "workers",
    question: "How many jobs can I apply for at once?",
    answer:
      "You can have up to 5 active applications at a time, and you cannot hold two jobs whose shifts overlap. When you apply, you accept the published terms of that vacancy.",
  },
  {
    category: "workers",
    question: "How is my attendance marked?",
    answer:
      "Attendance is recorded by a face check on a device at the work site. Your wages are calculated from this recorded attendance.",
  },
  {
    category: "workers",
    question: "What happens if I'm absent?",
    answer:
      "If you are absent for 3 working days in a row without approved leave, your attendance may be disabled and you may be released from that assignment. You can ask to rejoin, which needs the manager's approval.",
  },
  { ...workerPayments, category: "payments" },
  { ...pfEsi, category: "payments" },
  {
    category: "payments",
    question: "Where can I withdraw my wallet balance?",
    answer:
      "Withdrawals go only to your registered primary bank account in your own name. Any withdrawal fee is shown before you confirm.",
  },
  {
    category: "payments",
    question: "What if a withdrawal fails?",
    answer:
      "If the bank rejects a transfer, the full amount and any fee go back to your wallet automatically. Once a transfer has reached your bank account successfully, it cannot be reversed.",
  },
  {
    category: "privacy",
    question: "How is my face data used?",
    answer: (
      <>
        Only to confirm your identity and record your attendance. We store a face template, not a
        video, and it is never shared with client companies or anyone else. Read more in our{" "}
        <Link to="/privacy" className={linkClass}>
          Privacy Policy
        </Link>
        .
      </>
    ),
  },
  {
    category: "privacy",
    question: "Will ATW ever ask for my OTP or money?",
    answer:
      "Never. ATW will never ask you for your OTP, PIN, password or any money by phone, SMS or WhatsApp. If someone does, it's fraud — don't share anything and report it to us.",
  },
  {
    category: "privacy",
    question: "How do I close my account?",
    answer:
      "Contact our support team and ask us to close your account at any time. Any wallet balance due to you will be paid to your registered bank account.",
  },
  {
    category: "privacy",
    question: "How do I raise a complaint?",
    answer: (
      <>
        Every complaint gets a complaint number, and you will never be treated badly for raising
        one. See{" "}
        <Link to="/grievance" className={linkClass}>
          Grievance Redressal
        </Link>{" "}
        for all the ways to reach us.
      </>
    ),
  },
];

// Plain text of a question + answer, for search (answers may be JSX).
const textOf = (node) => {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join(" ");
  return textOf(node.props?.children);
};

const FaqPage = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter(
      (f) =>
        (category === "all" || f.category === category) &&
        (!q || `${f.question} ${textOf(f.answer)}`.toLowerCase().includes(q)),
    );
  }, [query, category]);

  const countFor = (id) => (id === "all" ? faqs.length : faqs.filter((f) => f.category === id).length);
  const whatsapp = siteSettings.whatsapp_number.replace(/\D/g, "");

  return (
    <SiteLayout
      banner={{
        image: "/images/landing/page-faq.jpg",
        breadcrumbs: [{ label: "FAQ" }],
        eyebrow: "Help centre",
        title: "Got questions? We've got answers",
        subtitle:
          "Everything about hiring through ATW, working with us, payments, compliance and your data.",
        children: (
          <div className="relative max-w-xl">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions, e.g. PF, wallet, attendance"
              aria-label="Search FAQs"
              className="w-full rounded-2xl border-0 bg-white py-4 pl-12 pr-4 text-gray-900 shadow-xl outline-none ring-2 ring-transparent placeholder:text-gray-400 focus:ring-purple-400"
            />
          </div>
        ),
      }}
    >
      <section className="bg-gray-50 px-4 md:px-6 py-16">
        <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* CATEGORIES + HELP */}
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:rounded-2xl lg:bg-white lg:p-3 lg:shadow-lg">
              {categories.map((c) => {
                const Icon = c.icon;
                const active = c.id === category;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCategory(c.id)}
                    className={`flex flex-shrink-0 items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                      active
                        ? "bg-gradient-to-r from-orange-400 via-purple-500 to-cyan-400 text-white shadow"
                        : "bg-white text-gray-600 hover:text-gray-900 lg:bg-transparent"
                    }`}
                  >
                    <Icon size={16} />
                    <span className="flex-1 text-left">{c.label}</span>
                    <span className={`text-xs ${active ? "text-white/80" : "text-gray-400"}`}>{countFor(c.id)}</span>
                  </button>
                );
              })}
            </div>

            <div className="hidden lg:block relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0d1b35] to-[#1a6fc4] p-6 text-white shadow-lg">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#FFB703]/20 blur-2xl" />
              <p className="relative text-lg font-bold">Still need help?</p>
              <p className="relative mt-1 mb-5 text-sm text-blue-100">Our team is a call or message away.</p>
              <div className="relative space-y-3 text-sm">
                <a href={`tel:${siteSettings.support_phone.replace(/\s/g, "")}`} className="flex items-center gap-3 hover:text-[#FFB703]">
                  <Phone size={16} /> {siteSettings.support_phone}
                </a>
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-[#FFB703]">
                  <MessageCircle size={16} /> WhatsApp us
                </a>
                <a href={`mailto:${siteSettings.support_email}`} className="flex items-center gap-3 hover:text-[#FFB703]">
                  <Mail size={16} /> {siteSettings.support_email}
                </a>
              </div>
            </div>
          </aside>

          {/* QUESTIONS */}
          <div className="min-w-0">
            <p className="mb-4 text-sm text-gray-500">
              {results.length} {results.length === 1 ? "question" : "questions"}
              {query && <> matching “{query}”</>}
            </p>
            {results.length > 0 ? (
              // Re-mount on filter change so the first result opens.
              <FaqAccordion key={`${category}|${query}`} items={results} />
            ) : (
              <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
                <CircleHelp size={40} className="mx-auto text-gray-300" />
                <p className="mt-4 text-lg font-semibold text-gray-900">No questions match your search</p>
                <p className="mt-1 text-gray-500">Try another word, or ask us directly.</p>
                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white hover:bg-purple-700"
                >
                  Contact us <ArrowRight size={16} />
                </Link>
              </div>
            )}

            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6">
              <MessageSquareWarning size={28} className="flex-shrink-0 text-purple-500" />
              <p className="flex-1 text-sm text-gray-600">
                Have a complaint about wages, attendance, PF/ESI or someone asking for money in
                ATW's name? Use our grievance process — every complaint gets a number.
              </p>
              <Link to="/grievance" className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 whitespace-nowrap">
                Raise a complaint <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default FaqPage;
