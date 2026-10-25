import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Building2Icon,
  ChevronLeft,
  ChevronRight,
  User,
  Users,
} from "lucide-react";
import { useState, useEffect } from "react";
import { BACKEND_ENABLED } from "../../../common/utils/features";

const SLIDE_DURATION = 5000;

const slides = [
  {
    image: "/images/landing/hero-construction.jpg",
    alt: "Construction worker holding a safety helmet on site",
    label: "Construction",
    caption: "Skilled site workers, ready when you need them",
  },
  {
    image: "/images/landing/hero-factory.jpg",
    alt: "Two women working in a textile factory",
    label: "Factory",
    caption: "Compliant shop-floor staff with PF & ESI handled",
  },
  {
    image: "/images/landing/hero-warehouse.jpg",
    alt: "Woman sorting stock in a warehouse",
    label: "Warehouse & Logistics",
    caption: "Pickers, packers and loaders for every shift",
  },
];

const HeroSection = () => {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [activeSlide, setActiveSlide] = useState(0);

  // Restarts whenever the slide changes, so a manual pick gets the full time too.
  useEffect(() => {
    if (reduceMotion) return;
    const timer = setTimeout(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearTimeout(timer);
  }, [activeSlide, reduceMotion]);

  const goTo = (index) =>
    setActiveSlide((index + slides.length) % slides.length);

  const [selectedRole, setSelectedRole] = useState(null);

  const roles = {
    worker: {
      title: "I'm a Worker",
      subtitle: "Daily Pay + Insurance",
      //   buttonText: "Find Jobs",
      route: "/worker/register",
      loginRoute: "/login",
      icon: User,
    },
    company: {
      title: "I Own a Factory",
      subtitle: "Hire & Manage Staff",
      //   buttonText: "Hire Workers",
      route: "/company/register",
      loginRoute: "/company/login",
      icon: Building2Icon,
    },
    agent: {
      title: "I'm an Agent",
      subtitle: "Connect & Earn",
      //   buttonText: "Become Agent",
      route: "/agent/register",
      loginRoute: "/agent/login",
      icon: Users,
    },
  };

  const handleRoleCardClick = (key) => {
    setSelectedRole(key);
    navigate(roles[key].loginRoute);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* BACKGROUND CAROUSEL — every slide stays mounted so they cross-fade
          without a flash and the next image is already loaded */}
      <div className="absolute inset-0 z-0 bg-[#0d1b35]">
        {slides.map((slide, index) => (
          <motion.img
            key={slide.image}
            src={slide.image}
            alt={slide.alt}
            aria-hidden={index !== activeSlide}
            className="absolute inset-0 w-full h-full object-cover"
            initial={false}
            animate={{
              opacity: index === activeSlide ? 1 : 0,
              scale: index === activeSlide || reduceMotion ? 1 : 1.08,
            }}
            transition={{
              opacity: { duration: 1.2, ease: "easeInOut" },
              scale: { duration: SLIDE_DURATION / 1000 + 1.2, ease: "linear" },
            }}
          />
        ))}
        {/* Text is centred on phones, so the overlay is flat there; on wider
            screens it fades out to the right to keep faces visible */}
        <div className="absolute inset-0 bg-[#0d1b35]/75 md:hidden"></div>
        <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-[#0d1b35]/95 via-[#0d1b35]/70 to-[#0d1b35]/10"></div>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0d1b35]/90 to-transparent"></div>
      </div>

      {/* ANIMATED BACKGROUND CIRCLES */}
      <motion.div
        className="absolute top-20 right-20 w-72 h-72 rounded-full bg-[#FFB703]/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-[#3885C9]/10 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-48 w-full">
        <div className="max-w-2xl text-center md:text-left">
          {/* Top Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm px-5 py-2 rounded-full mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            Startup India • Skill India • GeM Registered • ISO 9001:2015
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white leading-none mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            India's
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Workforce
            </span>
            <br />
            Revolution
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-gray-300 text-xl leading-relaxed mb-10 max-w-xl mx-auto md:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Workers get{" "}
            <span className="text-green-400 font-semibold">daily payouts</span>.
            Factories get{" "}
            <span className="text-blue-400 font-semibold">
              compliant workforce
            </span>
            . Agents earn{" "}
            <span className="text-orange-400 font-semibold">commissions</span>.
            One platform — ATW.
          </motion.p>

          {/* Role Cards — these open the login pages, hidden until the backend is back */}
          {BACKEND_ENABLED && (
          <div className="grid grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto md:mx-0">
            {Object.entries(roles).map(([key, role]) => {
              const Icon = role.icon;
              return (
                <button
                  key={key}
                  onClick={() => handleRoleCardClick(key)}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm bg-white
    ${
      selectedRole === key
        ? "border-purple-500 shadow-xl scale-105"
        : "border-transparent hover:border-purple-300 hover:scale-105"
    }`}
                >
                  <div className="w-14 h-14 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-3">
                    <Icon className="text-gray-700" size={24} />
                  </div>
                  <h4 className="text-black font-bold text-[18px] mb-1">
                    {role.title}
                  </h4>
                  <p className="text-gray-500 text-sm">{role.subtitle}</p>
                </button>
              );
            })}
          </div>
          )}

          {/* CTA Buttons */}
          {/* <motion.div
            className="flex flex-wrap gap-4 mb-10 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              onClick={() => navigate(roles[selectedRole].route)}
              className="px-8 py-4 rounded-2xl font-semibold text-white
                bg-gradient-to-r from-orange-500 via-purple-500 to-green-500
                hover:scale-105 transition-all duration-300"
            >
              {roles[selectedRole].buttonText} →
            </button>

            <button
              onClick={() => navigate("/download-app")}
              className="px-8 py-4 rounded-2xl border border-white/20
                bg-white/5 backdrop-blur-sm text-white
                hover:bg-white/10 transition-all duration-300"
            >
              📱 Download App
            </button>
          </motion.div> */}
        </div>
      </div>

      {/* SLIDE CAPTION + CONTROLS */}
      <div className="absolute bottom-24 inset-x-0 z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="w-full max-w-sm mx-auto md:mx-0 text-center md:text-left">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              aria-live="polite"
            >
              <p className="text-[#FFB703] text-xs font-semibold uppercase tracking-widest mb-1">
                {slides[activeSlide].label}
              </p>
              <p className="text-white/80 text-sm">
                {slides[activeSlide].caption}
              </p>
            </motion.div>

            {/* Progress bars double as slide buttons */}
            <div className="flex gap-2 mt-4">
              {slides.map((slide, index) => (
                <button
                  key={slide.image}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Show ${slide.label} slide`}
                  aria-current={index === activeSlide}
                  className="h-1 flex-1 rounded-full bg-white/20 overflow-hidden"
                >
                  <motion.span
                    // A fresh key on the active bar restarts its fill animation.
                    key={index === activeSlide ? `active-${activeSlide}` : index}
                    className="block h-full bg-[#FFB703] origin-left"
                    initial={{
                      scaleX: index < activeSlide || reduceMotion ? 1 : 0,
                    }}
                    animate={{ scaleX: index <= activeSlide ? 1 : 0 }}
                    transition={{
                      duration:
                        index === activeSlide && !reduceMotion
                          ? SLIDE_DURATION / 1000
                          : 0,
                      ease: "linear",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex gap-3">
            <button
              type="button"
              onClick={() => goTo(activeSlide - 1)}
              aria-label="Previous slide"
              className="w-11 h-11 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => goTo(activeSlide + 1)}
              aria-label="Next slide"
              className="w-11 h-11 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM SCROLL INDICATOR */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <p className="text-white/40 text-xs">Scroll karo</p>
        <motion.div
          className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center pt-1.5"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-1.5 bg-white/60 rounded-full"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
