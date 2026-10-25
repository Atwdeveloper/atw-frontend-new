import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "../../../common/components/ThemeToggle";

const navLinks = [
  { label: "About us", to: "/about" },
  { label: "Pricing", to: "/pricing" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

const LandingHeader = () => {
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Header shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu after navigating
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (to) => pathname === to || pathname.startsWith(`${to}/`);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <Link
            to="/"
            onClick={() => pathname === "/" && window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img
              src="/images/worker/Anytime-Logo.png"
              alt="Anytime Work"
              className="h-[50px] w-auto"
            />
          </Link>
        </motion.div>

        {/* RIGHT — Nav Links (desktop) */}
        <nav className="hidden md:flex items-center gap-1 w-auto">
          {navLinks.map((link, i) => {
            const active = isActive(link.to);
            return (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
              >
                <Link
                  to={link.to}
                  aria-current={active ? "page" : undefined}
                  className={`relative block px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    active ? "text-black" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                  {/* Active underline */}
                  {active && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-orange-400 to-purple-400 rounded-full"
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
          {/* Theme toggle (desktop) */}
          <ThemeToggle showLabel={false} variant="minimal" size="sm" />
        </nav>

        {/* MOBILE — Theme toggle + Hamburger */}
        <div className="md:hidden flex items-center gap-1">
          <ThemeToggle showLabel={false} variant="minimal" size="sm" />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="text-gray-700 dark:text-gray-200 p-2"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#0d1b35]/98 backdrop-blur-md border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    to={link.to}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive(link.to)
                        ? "bg-white/10 text-white"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default LandingHeader;
