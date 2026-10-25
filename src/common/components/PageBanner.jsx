import { Fragment } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

// Photo banner with the navy/purple gradient used at the top of the public
// pages (About, Pricing, FAQ, Contact) and the legal pages.
// `overlap` adds extra bottom padding so the first card below can sit over it.
const PageBanner = ({
  image,
  imagePosition = "center",
  breadcrumbs = [],
  icon: Icon,
  eyebrow,
  title,
  subtitle,
  overlap = false,
  children,
}) => (
  <section className="relative overflow-hidden bg-[#0d1b35] pt-[74px]">
    <img
      src={image}
      alt=""
      className="absolute inset-0 h-full w-full object-cover"
      style={{ objectPosition: imagePosition }}
    />
    <div className="absolute inset-0 bg-gradient-to-r from-[#0d1b35] via-[#0d1b35]/85 to-[#2a1b5e]/60" />
    <div className="absolute -top-24 right-10 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
    <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-orange-400/10 blur-3xl" />

    <div
      className={`relative max-w-7xl mx-auto px-4 md:px-6 pt-12 md:pt-16 ${
        overlap ? "pb-28 md:pb-36" : "pb-16 md:pb-24"
      }`}
    >
      {breadcrumbs.length > 0 && (
        <nav
          className="flex flex-wrap items-center gap-1 text-sm text-white/60 mb-8"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          {breadcrumbs.map((crumb, i) => (
            <Fragment key={crumb.label}>
              <ChevronRight size={14} />
              {crumb.to ? (
                <Link to={crumb.to} className="hover:text-white transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className={i === breadcrumbs.length - 1 ? "text-white" : ""}>
                  {crumb.label}
                </span>
              )}
            </Fragment>
          ))}
        </nav>
      )}

      <motion.div
        className="max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {Icon && (
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 via-purple-500 to-cyan-400 text-white shadow-lg">
            <Icon size={26} />
          </div>
        )}
        {eyebrow && (
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#FFB703]">
            {eyebrow}
          </p>
        )}
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-gray-300 max-w-2xl mb-8">{subtitle}</p>
        )}
        {children}
      </motion.div>
    </div>

    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-orange-400 via-purple-500 to-cyan-400" />
  </section>
);

export default PageBanner;
