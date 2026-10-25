import { motion } from "framer-motion";
import {
  Briefcase,
  Building2,
  CheckCircle2,
  ClipboardList,
  Factory,
  HardHat,
  Heart,
  ScanFace,
  ShieldCheck,
  Sparkles,
  Truck,
  UserCheck,
  Users,
  Wallet,
  Warehouse,
} from "lucide-react";
import SiteLayout, { IconTile, SectionHeading } from "./SiteLayout";
import ComplianceSection from "../ComplianceSection";

const stats = [
  { value: "1200+", label: "Registered workers" },
  { value: "1500+", label: "Jobs posted" },
  { value: "15+", label: "Industries" },
  { value: "100%", label: "Compliance" },
];

const highlights = [
  "Smart Payroll & PF/ESI Automation",
  "Daily Wallet-Based Worker Payments",
  "Multi-Company Workforce Management",
];

const audiences = [
  {
    icon: UserCheck,
    title: "For Workers",
    tagline: "Daily pay + insurance",
    points: [
      "No fee to register, apply or get work",
      "Earnings credited to your ATW wallet",
      "EPF & ESIC deducted and deposited for you",
      "Digital payslips and appointment letters",
      "Face attendance — no paper registers",
    ],
  },
  {
    icon: Building2,
    title: "For Companies",
    tagline: "Hire & manage staff",
    featured: true,
    points: [
      "Recruitment and deployment of verified workers",
      "Face and biometric attendance at your site",
      "Payroll with PF/ESI calculated automatically",
      "Digital payouts over UPI / RTGS",
      "Compliance dashboard and monthly reports",
    ],
  },
  {
    icon: Users,
    title: "For Agents",
    tagline: "Connect & earn",
    badge: "Opening soon",
    points: [
      "Refer workers and companies to ATW",
      "Earn commissions on successful placements",
      "Track your referrals from one dashboard",
      "A separate agent agreement when the programme opens",
    ],
  },
];

const steps = [
  {
    icon: ClipboardList,
    title: "Post a requirement",
    text: "A company tells us the roles, shifts, wages and location it needs. We check every vacancy meets the applicable minimum wage before it goes live.",
  },
  {
    icon: UserCheck,
    title: "Match verified workers",
    text: "Workers complete KYC, a live photo and a bank account in their own name before they can apply — so every match is verified.",
  },
  {
    icon: ScanFace,
    title: "Track attendance",
    text: "Attendance is recorded by a face check at the work site, feeding straight into wage calculations. No registers, no disputes.",
  },
  {
    icon: Wallet,
    title: "Pay & stay compliant",
    text: "Wages land in the worker's wallet after EPF and ESIC deductions, payslips are generated automatically, and the company gets one clear invoice.",
  },
];

const industries = [
  { icon: HardHat, name: "Construction" },
  { icon: Factory, name: "Manufacturing" },
  { icon: Warehouse, name: "Warehouse" },
  { icon: Truck, name: "Logistics & Delivery" },
  { icon: ShieldCheck, name: "Security Services" },
  { icon: Sparkles, name: "Housekeeping" },
];

const values = [
  { hindi: "समय पर पैसा", english: "Paid on time", quote: "हाथ का हाथ कमाई" },
  { hindi: "भरोसा", english: "Trust", quote: "काम और सुरक्षा का वादा" },
  { hindi: "आज़ादी", english: "Freedom", quote: "जब चाहो, तब काम पाओ" },
  { hindi: "पक्की नौकरी", english: "Steady work", quote: "ईमानदारी = काम की गारंटी" },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const AboutPage = () => (
  <SiteLayout
    banner={{
      image: "/images/landing/page-about.jpg",
      breadcrumbs: [{ label: "About us" }],
      eyebrow: "About Anytime Work",
      title: "India's smartest workforce platform for blue-collar work",
      subtitle:
        "Har mazdoor ko roz kaam, roz paisa — bina kisi thekedaar ke chakkar kaate. And for companies, one platform for hiring, attendance, payroll and compliance.",
      overlap: true,
      children: (
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-white/90 backdrop-blur-sm">
            <Heart size={15} className="text-red-400" fill="currentColor" /> Made in Jaipur
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-white/90 backdrop-blur-sm">
            <ShieldCheck size={15} className="text-[#FFB703]" /> DPIIT-recognised startup
          </span>
        </div>
      ),
    }}
  >
    {/* STATS — overlapping the banner */}
    <section className="bg-gray-50 px-4 md:px-6">
      <div className="relative z-10 max-w-7xl mx-auto -mt-16 md:-mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="rounded-2xl bg-white p-6 text-center shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
          >
            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* STORY */}
    <section className="bg-gray-50 px-4 md:px-6 py-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        <motion.div className="relative" {...fadeUp}>
          <div className="absolute -top-4 -left-4 h-full w-full rounded-3xl bg-[#FFB703]/20" />
          <img
            src="/images/landing/about-worker.jpg"
            alt="Construction worker in a safety vest and helmet"
            className="relative w-full aspect-[4/5] max-h-[560px] object-cover object-top rounded-3xl shadow-xl"
          />
          <div className="absolute -bottom-6 right-4 md:-right-6 rounded-2xl bg-gradient-to-br from-[#1a6fc4] to-[#1a2a4a] px-6 py-5 text-white shadow-xl">
            <p className="text-xl font-bold">Recognised Startup</p>
            <p className="mt-1 text-xs text-blue-200">Startup India · Skill India · GeM</p>
          </div>
        </motion.div>

        <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
          <p className="text-[#FFB703] font-semibold text-sm uppercase tracking-widest mb-3">
            Our story
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-5">
            Blue-collar workers ke liye{" "}
            <span className="text-[#3885C9]">India ka smartest</span> workforce platform
          </h2>
          <div className="space-y-4 text-gray-600 leading-7">
            <p>
              Anytime Work ek digital platform hai jo blue-collar workers aur companies ko ek
              jagah connect karta hai. Too often, a worker's day depends on a middleman — whether
              there is work, whether wages come on time, whether PF and ESI are ever deposited.
            </p>
            <p>
              We set out to change that. Workers get verified jobs, daily earnings in their own
              wallet and full statutory benefits. Companies get a reliable, compliant workforce
              with smart hiring, attendance tracking, automated payroll and PF/ESI compliance —
              sab ek hi platform par.
            </p>
          </div>
          <div className="mt-6 rounded-2xl bg-blue-50 px-6 py-5 space-y-3">
            {highlights.map((point) => (
              <div key={point} className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-[#FFB703] flex-shrink-0" fill="#FFF3DC" />
                <span className="text-sm font-semibold text-gray-900">{point}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    {/* WHO WE SERVE */}
    <section className="bg-white px-4 md:px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Who we serve"
          title="One platform, three ways to grow"
          subtitle="Workers get daily payouts. Factories get a compliant workforce. Agents earn commissions."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {audiences.map((item, i) => (
            <motion.div
              key={item.title}
              {...fadeUp}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className={`relative rounded-3xl p-7 shadow-lg transition-shadow hover:shadow-2xl ${
                item.featured
                  ? "bg-gradient-to-br from-[#0d1b35] to-[#1a6fc4] text-white"
                  : "bg-white border border-gray-200"
              }`}
            >
              {item.badge && (
                <span className="absolute top-6 right-6 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                  {item.badge}
                </span>
              )}
              <IconTile icon={item.icon} size="lg" />
              <h3 className={`mt-5 text-2xl font-bold ${item.featured ? "text-white" : "text-gray-900"}`}>
                {item.title}
              </h3>
              <p className={`text-sm font-medium ${item.featured ? "text-[#FFB703]" : "text-purple-600"}`}>
                {item.tagline}
              </p>
              <ul className="mt-5 space-y-3">
                {item.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm">
                    <CheckCircle2
                      size={18}
                      className={`mt-0.5 flex-shrink-0 ${item.featured ? "text-[#FFB703]" : "text-emerald-500"}`}
                    />
                    <span className={item.featured ? "text-blue-50" : "text-gray-600"}>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* HOW IT WORKS */}
    <section className="bg-gray-50 px-4 md:px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="How it works"
          title="From requirement to payout"
          subtitle="Every step — hiring, attendance, wages and compliance — runs on the same platform."
        />
        <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-7 hidden h-0.5 bg-gradient-to-r from-orange-300 via-purple-300 to-cyan-300 lg:block" />
          {steps.map((step, i) => (
            <motion.div key={step.title} {...fadeUp} transition={{ delay: i * 0.12 }} className="relative">
              <div className="relative flex items-center gap-3">
                <IconTile icon={step.icon} size="lg" />
                <span className="text-sm font-bold text-gray-400">STEP {i + 1}</span>
              </div>
              <div className="mt-5 rounded-2xl bg-white p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{step.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* INDUSTRIES */}
    <section className="bg-white px-4 md:px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Industries"
          title="Built for the sectors that build India"
          subtitle="Our platform is designed specifically for blue-collar workforce needs across these sectors."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {industries.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.name}
                {...fadeUp}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-xl"
              >
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-700 transition-colors group-hover:bg-gradient-to-br group-hover:from-orange-400 group-hover:via-purple-500 group-hover:to-cyan-400 group-hover:text-white">
                  <Icon size={26} />
                </span>
                <p className="mt-4 text-sm font-semibold text-gray-900">{item.name}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* VALUES */}
    <section className="bg-gray-50 px-4 md:px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="What we stand for"
          title="हमारे वादे — our promises"
          subtitle="The four things every worker on ATW can count on."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((value, i) => (
            <motion.div
              key={value.english}
              {...fadeUp}
              transition={{ delay: i * 0.08 }}
              className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-md"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-400 via-purple-500 to-cyan-400" />
              <p className="text-2xl font-bold text-gray-900">{value.hindi}</p>
              <p className="text-sm font-semibold text-purple-600">{value.english}</p>
              <p className="mt-3 text-sm text-gray-500">"{value.quote}"</p>
            </motion.div>
          ))}
        </div>
        <motion.div
          {...fadeUp}
          className="mt-10 flex flex-col md:flex-row md:items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6"
        >
          <IconTile icon={Briefcase} />
          <p className="text-gray-600">
            For workers deployed through ATW, <strong className="text-gray-900">ATW is the employer</strong> —
            responsible for wages and statutory contributions — while the client company provides
            the workplace and day-to-day supervision.
          </p>
        </motion.div>
      </div>
    </section>

    <ComplianceSection />
  </SiteLayout>
);

export default AboutPage;
