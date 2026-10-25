import { Children, isValidElement, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Cookie,
  Mail,
  MessageSquareWarning,
  Phone,
  ReceiptText,
  Scale,
  ShieldCheck,
} from "lucide-react";
import LandingHeader from "../../../worker/pages/LeandingHeader";
import LeadingFooter from "../../../worker/pages/LeandingFooter";
import { useAuthContext } from "../../../../common/context/AuthContext";
import legalDetails from "./legalDetails";

// Every page in the footer's "Support & Legal" list. The current page is
// picked by URL, so each page file only passes its title.
const policies = [
  {
    to: "/terms",
    label: "Terms & Conditions",
    summary: "The rules for using ATW as a worker, a company or a visitor.",
    icon: Scale,
    image: "/images/landing/legal-terms.jpg",
  },
  {
    to: "/privacy",
    label: "Privacy Policy",
    summary: "What personal data we collect, why we need it, and the control you have over it.",
    icon: ShieldCheck,
    image: "/images/landing/legal-privacy.jpg",
  },
  {
    to: "/refund-policy",
    label: "Refund & Cancellation Policy",
    summary: "How cancellations, refunds and failed payouts are handled.",
    icon: ReceiptText,
    image: "/images/landing/legal-refund.jpg",
  },
  {
    to: "/cookies",
    label: "Cookie Policy",
    summary: "The small files our website uses and how you can manage them.",
    icon: Cookie,
    image: "/images/landing/hero-warehouse.jpg",
  },
  {
    to: "/grievance",
    label: "Grievance Redressal",
    summary: "How to raise a complaint and how quickly we respond.",
    icon: MessageSquareWarning,
    image: "/images/landing/hero-construction.jpg",
  },
];

const slugify = (text) =>
  String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Shows a filled-in value from legalDetails, or [●] if it is still blank.
export const Blank = ({ k }) => {
  const value = legalDetails[k];
  if (value) return <>{value}</>;
  return (
    <span className="inline-block px-1 rounded bg-amber-50 text-amber-700 font-medium">
      [●]
    </span>
  );
};

export const Section = ({ title, children }) => (
  <section
    id={slugify(title)}
    className="scroll-mt-28 border-b border-gray-100 pb-8 last:border-b-0"
  >
    <h2 className="flex items-start gap-3 text-xl md:text-2xl font-bold text-gray-900 mb-4">
      <span className="mt-1 h-6 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-b from-orange-400 via-purple-500 to-cyan-400" />
      {title}
    </h2>
    <div className="space-y-4">{children}</div>
  </section>
);

export const Bullets = ({ items, ordered = false }) => {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className={`${ordered ? "list-decimal" : "list-disc"} pl-8 space-y-2 marker:text-purple-500`}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </Tag>
  );
};

export const LegalTable = ({ headers, rows }) => (
  <div className="overflow-x-auto rounded-xl border border-gray-200">
    <table className="w-full text-sm md:text-base text-left">
      <thead className="bg-gradient-to-r from-[#0d1b35] to-[#1a6fc4] text-white">
        <tr>
          {headers.map((h) => (
            <th key={h} className="px-4 py-3 font-semibold">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          // Plain bg-gray-50 (not even:) so the dark theme in darkTheme.css can remap it.
          <tr key={i} className={`border-t border-gray-200 align-top ${i % 2 ? "bg-gray-50" : ""}`}>
            {row.map((cell, j) => (
              <td key={j} className="px-4 py-3 leading-7">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Highlights the section currently in view in the "On this page" list.
const useActiveSection = (ids) => {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join("|");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      // A band near the top of the screen, just under the fixed header.
      { rootMargin: "-110px 0px -65% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
};

const LegalLayout = ({ title, children }) => {
  const { pathname } = useLocation();
  const { settings } = useAuthContext();

  const current = policies.find((p) => p.to === pathname) || policies[0];
  const others = policies.filter((p) => p.to !== current.to);
  const Icon = current.icon;

  const toc = Children.toArray(children)
    .filter((child) => isValidElement(child) && child.type === Section)
    .map((child) => ({ id: slugify(child.props.title), title: child.props.title }));
  const activeId = useActiveSection(toc.map((t) => t.id));
  const tocListRef = useRef(null);

  // Long pages (Terms has 16 sections) make the list scroll, so keep the
  // active item visible. Scrolls only the list, never the page.
  useEffect(() => {
    const list = tocListRef.current;
    const item = list?.querySelector('[aria-current="true"]');
    if (!item) return;
    const top = item.offsetTop - list.offsetTop;
    if (top < list.scrollTop) {
      list.scrollTop = top;
    } else if (top + item.offsetHeight > list.scrollTop + list.clientHeight) {
      list.scrollTop = top + item.offsetHeight - list.clientHeight;
    }
  }, [activeId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      <LandingHeader />

      {/* BANNER */}
      <section className="relative overflow-hidden bg-[#0d1b35] pt-[74px]">
        <img
          src={current.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1b35] via-[#0d1b35]/85 to-[#2a1b5e]/60" />
        <div className="absolute -top-24 right-10 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-orange-400/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 pt-12 pb-28 md:pt-16 md:pb-36">
          <nav className="flex flex-wrap items-center gap-1 text-sm text-white/60 mb-8" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span>Support & Legal</span>
            <ChevronRight size={14} />
            <span className="text-white">{title}</span>
          </nav>

          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 via-purple-500 to-cyan-400 text-white shadow-lg">
              <Icon size={26} />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
              {title}
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mb-8">{current.summary}</p>

            <div className="flex flex-wrap gap-3 text-sm">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-white/90 backdrop-blur-sm">
                <CalendarDays size={15} className="text-[#FFB703]" />
                Effective: <Blank k="effectiveDate" />
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-white/90 backdrop-blur-sm">
                <CalendarDays size={15} className="text-[#FFB703]" />
                Last updated: <Blank k="lastUpdated" />
              </span>
            </div>
          </motion.div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-orange-400 via-purple-500 to-cyan-400" />
      </section>

      {/* BODY */}
      <div className="bg-gray-50 px-4 md:px-6 pb-20">
        <div className="relative z-10 max-w-7xl mx-auto -mt-16 md:-mt-20 grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* SIDEBAR — after the content on phones, sticky beside it on desktop */}
          <aside className="order-last lg:order-first lg:sticky lg:top-28 lg:self-start space-y-6">
            {toc.length > 0 && (
              <div className="hidden lg:block rounded-2xl bg-white p-5 shadow-lg">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500">
                  On this page
                </p>
                <ul ref={tocListRef} className="relative max-h-[calc(100vh-20rem)] space-y-1 overflow-y-auto pr-1">
                  {toc.map((item) => {
                    const isActive = item.id === activeId;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => scrollTo(item.id)}
                          aria-current={isActive}
                          className={`w-full rounded-lg border-l-2 px-3 py-1.5 text-left text-sm transition-colors ${
                            isActive
                              ? "border-purple-500 bg-gray-50 font-semibold text-gray-900"
                              : "border-transparent text-gray-500 hover:text-gray-900"
                          }`}
                        >
                          {item.title}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0d1b35] to-[#1a6fc4] p-6 text-white shadow-lg">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#FFB703]/20 blur-2xl" />
              <p className="relative text-lg font-bold mb-1">Need help?</p>
              <p className="relative text-sm text-blue-100 mb-5">
                Questions about this policy? Our team is happy to help.
              </p>
              <div className="relative space-y-3 text-sm">
                {settings?.support_email && (
                  <a
                    href={`mailto:${settings.support_email}`}
                    className="flex items-center gap-3 hover:text-[#FFB703] transition-colors"
                  >
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
                      <Mail size={16} />
                    </span>
                    <span className="break-all">{settings.support_email}</span>
                  </a>
                )}
                {settings?.support_phone && (
                  <a
                    href={`tel:${settings.support_phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 hover:text-[#FFB703] transition-colors"
                  >
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
                      <Phone size={16} />
                    </span>
                    {settings.support_phone}
                  </a>
                )}
              </div>
            </div>
          </aside>

          {/* CONTENT */}
          <div className="min-w-0 space-y-8">
            <motion.article
              className="rounded-3xl bg-white p-6 md:p-12 shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="space-y-8 text-gray-700 leading-8">{children}</div>
            </motion.article>

            {/* OTHER POLICIES */}
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
                Other policies
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {others.map((policy) => {
                  const PolicyIcon = policy.icon;
                  return (
                    <Link
                      key={policy.to}
                      to={policy.to}
                      className="group flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                    >
                      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 via-purple-500 to-cyan-400 text-white">
                        <PolicyIcon size={20} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-1 font-semibold text-gray-900">
                          {policy.label}
                          <ArrowRight
                            size={16}
                            className="text-purple-500 transition-transform group-hover:translate-x-1"
                          />
                        </span>
                        <span className="mt-1 block text-sm text-gray-500">{policy.summary}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <LeadingFooter />
    </>
  );
};

export default LegalLayout;
