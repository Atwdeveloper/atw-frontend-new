import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

// items: [{ question, answer }] — answer can be a string or JSX (for links).
const FaqAccordion = ({ items, defaultOpen = 0 }) => {
  const [openIndex, setOpenIndex] = useState(defaultOpen);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.question}
            className={`rounded-2xl border bg-white transition-shadow ${
              isOpen ? "border-purple-200 shadow-lg" : "border-gray-200 shadow-sm"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5 text-left"
            >
              <span
                className={`text-base md:text-lg font-semibold transition-colors ${
                  isOpen ? "text-purple-600" : "text-gray-900"
                }`}
              >
                {item.question}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                  isOpen
                    ? "bg-gradient-to-br from-orange-400 via-purple-500 to-cyan-400 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <ChevronDown size={18} />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 md:px-6 text-gray-600 leading-7">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default FaqAccordion;
