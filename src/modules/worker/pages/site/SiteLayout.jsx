import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import LandingHeader from "../LeandingHeader";
import LeadingFooter from "../LeandingFooter";
import PageBanner from "../../../../common/components/PageBanner";
import siteSettings from "../../../../common/utils/siteSettings";

// Small building blocks shared by the About, Pricing, FAQ and Contact pages.

export const SectionHeading = ({ eyebrow, title, subtitle, center = true }) => (
  <motion.div
    className={`mb-12 ${center ? "text-center mx-auto" : ""} max-w-3xl`}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    {eyebrow && (
      <p className="text-[#FFB703] font-semibold text-sm uppercase tracking-widest mb-3">
        {eyebrow}
      </p>
    )}
    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">{title}</h2>
    {subtitle && <p className="mt-4 text-gray-600 text-base md:text-lg">{subtitle}</p>}
  </motion.div>
);

// Gradient icon tile, matching the banner and legal-page icons.
export const IconTile = ({ icon: Icon, size = "md" }) => (
  <span
    className={`inline-flex flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 via-purple-500 to-cyan-400 text-white shadow-md ${
      size === "lg" ? "h-14 w-14" : "h-12 w-12"
    }`}
  >
    <Icon size={size === "lg" ? 26 : 22} />
  </span>
);

const CtaBand = () => (
  <section className="bg-white px-4 md:px-6 py-16">
    <div className="relative max-w-7xl mx-auto overflow-hidden rounded-3xl bg-gradient-to-br from-[#0d1b35] via-[#1a2a6c] to-[#1a6fc4] px-6 py-12 md:px-14 md:py-14 shadow-xl">
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#FFB703]/20 blur-3xl" />
      <div className="absolute -bottom-20 left-1/4 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Ready to build a{" "}
            <span className="bg-gradient-to-r from-orange-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
              compliant workforce
            </span>
            ?
          </h2>
          <p className="mt-3 text-blue-100">
            Tell us what you need and our team will get back to you with a plan for your site.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-[#FFB703] px-6 py-3 font-semibold text-[#0d1b35] shadow-lg transition-transform hover:scale-105"
          >
            Talk to our team <ArrowRight size={18} />
          </Link>
          <a
            href={`tel:${siteSettings.support_phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <Phone size={18} /> {siteSettings.support_phone}
          </a>
        </div>
      </div>
    </div>
  </section>
);

const SiteLayout = ({ banner, children, showCta = true }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <LandingHeader />
      <PageBanner {...banner} />
      <main>{children}</main>
      {showCta && <CtaBand />}
      <LeadingFooter />
    </>
  );
};

export default SiteLayout;
