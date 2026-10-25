import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CircleHelp,
  IndianRupee,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquareWarning,
  Phone,
  Send,
} from "lucide-react";
import SiteLayout, { IconTile } from "./SiteLayout";
import { plans } from "../PricingSection";
import siteSettings from "../../../../common/utils/siteSettings";

const roles = ["Company / Factory", "Worker", "Agent", "Other"];

const whatsappDigits = siteSettings.whatsapp_number.replace(/\D/g, "");
const phoneHref = `tel:${siteSettings.support_phone.replace(/\s/g, "")}`;

const channels = [
  {
    icon: Phone,
    title: "Call us",
    value: siteSettings.support_phone,
    href: phoneHref,
    hint: "Talk to our team",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: siteSettings.whatsapp_number.replace(/^\+91(\d{5})(\d{5})$/, "+91 $1 $2"),
    href: `https://wa.me/${whatsappDigits}`,
    hint: "Quick replies on chat",
    external: true,
  },
  {
    icon: Mail,
    title: "Email",
    value: siteSettings.support_email,
    href: `mailto:${siteSettings.support_email}`,
    hint: "For detailed requirements",
  },
  {
    icon: MapPin,
    title: "Visit us",
    value: "Malviya Nagar, Jaipur",
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteSettings.office_address)}`,
    hint: "Bhamashah Techno Hub",
    external: true,
  },
];

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100";

const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const selectedPlan = plans.find((p) => p.id === searchParams.get("plan"));

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    role: selectedPlan ? roles[0] : "",
    company: "",
    city: "",
    message: selectedPlan
      ? `Hi, I'm interested in the ${selectedPlan.label} plan (${selectedPlan.percent} service fee). Please share more details.`
      : "",
  });
  const [errors, setErrors] = useState({});

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((err) => ({ ...err, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name";
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, "").slice(-10)))
      next.phone = "Please enter a valid 10-digit mobile number";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Please enter a valid email";
    if (!form.message.trim()) next.message = "Please tell us how we can help";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const composedMessage = () => {
    const details = [
      "New enquiry from anytimework.in",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.email && `Email: ${form.email}`,
      form.role && `I am a: ${form.role}`,
      form.company && `Company: ${form.company}`,
      form.city && `City: ${form.city}`,
    ].filter(Boolean);
    return `${details.join("\n")}\n\n${form.message.trim()}`;
  };

  // There is no backend for enquiries yet, so the message is handed to WhatsApp
  // or the visitor's email app, fully written out.
  const sendWhatsApp = (e) => {
    e.preventDefault();
    if (!validate()) return;
    window.open(`https://wa.me/${whatsappDigits}?text=${encodeURIComponent(composedMessage())}`, "_blank", "noopener");
  };

  const sendEmail = () => {
    if (!validate()) return;
    const subject = `Enquiry from ${form.name}${form.company ? ` (${form.company})` : ""}`;
    window.location.href = `mailto:${siteSettings.support_email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(composedMessage())}`;
  };

  const isCompany = form.role === roles[0];

  return (
    <SiteLayout
      showCta={false}
      banner={{
        image: "/images/landing/page-contact.jpg",
        imagePosition: "center 15%",
        breadcrumbs: [{ label: "Contact" }],
        eyebrow: "Contact us",
        title: "Let's talk",
        subtitle:
          "Hiring for your site, looking for work, or have a question about payments? Our team is here to help.",
        overlap: true,
      }}
    >
      {/* CHANNELS — overlapping the banner */}
      <section className="bg-gray-50 px-4 md:px-6">
        <div className="relative z-10 max-w-7xl mx-auto -mt-16 md:-mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {channels.map((c, i) => (
            <motion.a
              key={c.title}
              href={c.href}
              target={c.external ? "_blank" : undefined}
              rel={c.external ? "noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i }}
              whileHover={{ y: -6 }}
              className="group flex items-start gap-4 rounded-2xl bg-white p-6 shadow-xl"
            >
              <IconTile icon={c.icon} />
              <div className="min-w-0">
                <p className="text-sm text-gray-500">{c.title}</p>
                <p className="font-semibold text-gray-900 break-words group-hover:text-purple-600 transition-colors">
                  {c.value}
                </p>
                <p className="mt-0.5 text-xs text-gray-400">{c.hint}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* FORM + MAP */}
      <section className="bg-gray-50 px-4 md:px-6 py-16">
        <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-5">
          <motion.form
            onSubmit={sendWhatsApp}
            noValidate
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 rounded-3xl bg-white p-6 md:p-10 shadow-xl"
          >
            <p className="text-[#FFB703] font-semibold text-sm uppercase tracking-widest mb-2">Send a message</p>
            <h2 className="text-3xl font-bold text-gray-900">Tell us what you need</h2>
            <p className="mt-2 mb-8 text-gray-500">We'll get back to you as soon as possible.</p>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" required error={errors.name}>
                <input className={inputClass} value={form.name} onChange={update("name")} placeholder="Your name" autoComplete="name" />
              </Field>
              <Field label="Mobile number" required error={errors.phone}>
                <input className={inputClass} value={form.phone} onChange={update("phone")} placeholder="10-digit mobile" inputMode="tel" autoComplete="tel" />
              </Field>
              <Field label="Email" error={errors.email}>
                <input className={inputClass} type="email" value={form.email} onChange={update("email")} placeholder="you@company.com" autoComplete="email" />
              </Field>
              <Field label="City">
                <input className={inputClass} value={form.city} onChange={update("city")} placeholder="e.g. Jaipur" autoComplete="address-level2" />
              </Field>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-sm font-medium text-gray-700">I am a</p>
              <div className="flex flex-wrap gap-2">
                {roles.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, role: r }))}
                    aria-pressed={form.role === r}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      form.role === r
                        ? "bg-gradient-to-r from-orange-400 via-purple-500 to-cyan-400 text-white shadow"
                        : "border border-gray-200 bg-white text-gray-600 hover:border-purple-300"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {isCompany && (
              <div className="mt-5">
                <Field label="Company name">
                  <input className={inputClass} value={form.company} onChange={update("company")} placeholder="Your company" autoComplete="organization" />
                </Field>
              </div>
            )}

            <div className="mt-5">
              <Field label="Message" required error={errors.message}>
                <textarea
                  className={`${inputClass} min-h-[130px] resize-y`}
                  value={form.message}
                  onChange={update("message")}
                  placeholder={isCompany ? "Roles, number of workers, shifts and location…" : "How can we help?"}
                />
              </Field>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-emerald-600"
              >
                <MessageCircle size={18} /> Send on WhatsApp
              </button>
              <button
                type="button"
                onClick={sendEmail}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:border-purple-300 hover:text-purple-600"
              >
                <Send size={18} /> Send by email
              </button>
            </div>
            <p className="mt-4 text-xs text-gray-400">
              Opens WhatsApp or your email app with your message filled in. Nothing is stored on this website.
            </p>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
              <iframe
                title="Anytime Work office location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(siteSettings.office_address)}&output=embed`}
                className="h-72 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="p-6">
                <p className="flex items-center gap-2 font-semibold text-gray-900">
                  <MapPin size={18} className="text-purple-500" /> Our office
                </p>
                <p className="mt-2 text-sm leading-6 text-gray-600">{siteSettings.office_address}</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0d1b35] to-[#1a6fc4] p-6 text-white shadow-xl">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#FFB703]/20 blur-2xl" />
              <p className="relative text-lg font-bold">Stay safe</p>
              <p className="relative mt-2 text-sm text-blue-100 leading-6">
                ATW will never ask for your OTP, PIN, password or any money by phone, SMS or
                WhatsApp. Workers never pay ATW anything to get work.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* QUICK HELP */}
      <section className="bg-white px-4 md:px-6 py-16">
        <div className="max-w-7xl mx-auto grid gap-4 md:grid-cols-3">
          {[
            { to: "/faq", icon: CircleHelp, title: "Browse FAQs", text: "Quick answers about hiring, wages, PF/ESI and attendance." },
            { to: "/pricing", icon: IndianRupee, title: "See pricing", text: "Wage-bill linked plans and a fee estimator." },
            { to: "/grievance", icon: MessageSquareWarning, title: "Raise a complaint", text: "Every complaint gets a number and a response." },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <IconTile icon={item.icon} />
              <span>
                <span className="flex items-center gap-1 font-semibold text-gray-900">
                  {item.title}
                  <ArrowRight size={16} className="text-purple-500 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="mt-1 block text-sm text-gray-500">{item.text}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
};

const Field = ({ label, required, error, children }) => (
  <label className="block">
    <span className="mb-2 block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </span>
    {children}
    {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
  </label>
);

export default ContactPage;
