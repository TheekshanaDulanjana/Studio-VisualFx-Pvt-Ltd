import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, MessageSquare } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  // Ultra smooth and slow luxury easing curve
  const luxuryEase = [0.16, 1, 0.3, 1];

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: luxuryEase,
      },
    },
  };

  return (
    <motion.div variants={cardVariants} className="flex flex-col items-end w-full mb-4">
      {/* Question Row */}
      <motion.div
        whileHover={{ x: 4 }}
        transition={{ duration: 0.3, ease: luxuryEase }}
        onClick={onClick}
        className="flex items-center gap-4 w-full cursor-pointer group"
      >
        <div className="border border-white p-3 rounded-[12px] shadow-sm transition-colors shrink-0">
          <HelpCircle className="text-white w-6 h-6 sm:w-6 sm:h-6 md:w-6 md:h-6" />
        </div>
        <div className="flex-1 border border-white rounded-[12px] py-3 px-4 sm:px-8 transition-all shadow-sm">
          <h3 className="text-white font-belleza text-sm sm:text-base md:text-base tracking-wide">
            {question}
          </h3>
        </div>
      </motion.div>

      {/* Answer Row (Animated Accordion) */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.6, ease: luxuryEase }}
            className="overflow-hidden w-full flex justify-end"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-3 w-full md:w-[95%]">
              <div className="flex-1 bg-white border border-white rounded-[12px] p-4 sm:p-4 shadow-sm">
                <p className="text-black font-roboto leading-relaxed text-sm sm:text-sm md:text-sm">
                  {answer}
                </p>
              </div>
              <div className="bg-black p-3 rounded-[12px] shadow-lg shrink-0 mt-2 md:mt-0">
                <MessageSquare className="text-white w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Do we need to pay in advance to booking our wedding date?",
      answer: "Yes, for your convenience and ours, advance payment is required to reserve the relevant date."
    },
    {
      question: "Can you capture every single guest on my video?",
      answer: "I do my best to capture all the guests. I strongly suggest arranging a table round session so that I can cover everyone without missing anything."
    },
    {
      question: "How long will you take to edit and deliver the video?",
      answer: "We will send you the final video within 8-12 weeks."
    },
    {
      question: "Can I get the unedited RAW footage from all your cameras?",
      answer: "Yes, RAW footage can be provided as an optional add-on upon request."
    },
    {
      question: "Do you archive the footage after you deliver my video?",
      answer: "Yes, we can archive your footage for a limited period as an optional add-on for future access."
    }
  ];

  // Ultra smooth and slow luxury easing curve
  const luxuryEase = [0.16, 1, 0.3, 1];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.15,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 45 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.4,
        ease: luxuryEase,
      },
    },
  };

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="py-12 px-6 sm:px-6 md:px-12 lg:px-16"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16">
        
        {/* Left Column: Title and Description */}
        <motion.div variants={fadeInUp} className="lg:col-span-1 lg:sticky lg:top-24 h-fit">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-white font-belleza mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-300 font-roboto text-justify text-sm sm:text-sm md:text-sm leading-relaxed mb-12 sm:mb-16">
            Find quick answers to the most common questions about our services,
            process, and what to expect when working with Studio VisualFX.
          </p>
        </motion.div>

        {/* Right Column: FAQ Cards */}
        <motion.div variants={containerVariants} className="w-full lg:col-span-2">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={activeIndex === index}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            />
          ))}
        </motion.div>
        
      </div>
    </motion.section>
  );
};

export default FAQSection;