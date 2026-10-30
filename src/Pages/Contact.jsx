import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhone, FaEnvelope, FaWhatsapp, FaLink } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import useScrollFx from "../hooks/useScrollFx";
import { CONTACT, track } from "../data/studio";

// Quick-pick enquiry types - they only fill the existing Subject field,
// so the EmailJS template does not need any change.
const ENQUIRY_TYPES = [
  "Wedding Film",
  "Pre-Wedding Shoot",
  "Event Coverage",
  "Music Video",
  "Commercial Production",
];

const Contact = () => {
  const form = useRef();
  const scope = useRef(null);
  useScrollFx(scope);
  const recaptchaRef = useRef(null);
  const [modal, setModal] = useState({ show: false, ok: true, message: "" });
  const [sending, setSending] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    subject: "",
    message: "",
  });

  // Function to count words
  const getWordCount = (str) => {
    return str.trim() === "" ? 0 : str.trim().split(/\s+/).length;
  };

  // Local numbers (0771234567) and overseas numbers with country code (9-15 digits)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const wordCount = getWordCount(formData.message);
  const isMobileValid = /^\d{9,15}$/.test(formData.mobile);
  const formValid =
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    emailRegex.test(formData.email) &&
    isMobileValid &&
    formData.subject.trim() !== "" &&
    wordCount > 0 &&
    wordCount <= 250 &&
    captchaValue !== null && // reCAPTCHA must be completed
    !sending;

  const closeModal = () => setModal((m) => ({ ...m, show: false }));

  // Modal auto close after 5 seconds
  useEffect(() => {
    if (!modal.show) return;
    const timer = setTimeout(closeModal, 5000);
    return () => clearTimeout(timer);
  }, [modal.show]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      const onlyNums = value.replace(/[^0-9]/g, "");
      if (onlyNums.length <= 15) {
        setFormData({ ...formData, [name]: onlyNums });
      }
      return;
    }

    if (name === "message") {
      const words = getWordCount(value);
      if (words <= 250 || value.length < formData.message.length) {
        setFormData({ ...formData, [name]: value });
      }
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const resetCaptcha = () => {
    setCaptchaValue(null);
    recaptchaRef.current?.reset();
  };

  // Server-side reCAPTCHA check (/api/verify-recaptcha on Vercel).
  // Only a definite "failed" answer blocks the message; if the endpoint is
  // not available (local dev, secret not configured) the form still works.
  const verifyCaptcha = async (token) => {
    try {
      const res = await fetch("/api/verify-recaptcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (res.status === 400) return false;
      return true;
    } catch {
      return true;
    }
  };

  const failMessage =
    "Sorry, your message could not be sent. Please try again, or reach us on WhatsApp / call +94 77 699 6981.";

  const sendEmail = async (e) => {
    e.preventDefault();
    if (sending) return;

    // Honeypot: real people never fill this hidden field
    if (form.current?.elements?.company_website?.value) return;

    if (!captchaValue) {
      setModal({ show: true, ok: false, message: "Please verify that you are not a robot." });
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!publicKey || !serviceId || !templateId) {
      console.error("EmailJS environment variables are missing.");
      setModal({ show: true, ok: false, message: failMessage });
      return;
    }

    setSending(true);
    try {
      const human = await verifyCaptcha(captchaValue);
      if (!human) {
        setModal({ show: true, ok: false, message: "reCAPTCHA check failed. Please tick the box again." });
        resetCaptcha();
        return;
      }

      await emailjs.sendForm(serviceId, templateId, form.current, publicKey);
      setModal({
        show: true,
        ok: true,
        message: "Message sent successfully! We'll get back to you soon.",
      });
      track("generate_lead", { method: "contact_form", subject: formData.subject });
      form.current.reset();
      setFormData({
        firstName: "",
        lastName: "",
        mobile: "",
        email: "",
        subject: "",
        message: "",
      });
      resetCaptcha();
    } catch (error) {
      console.error("EmailJS error:", error);
      setModal({ show: true, ok: false, message: failMessage });
      resetCaptcha();
    } finally {
      setSending(false);
    }
  };

  // Ultra smooth and slow luxury easing curve
  const luxuryEase = [0.16, 1, 0.3, 1];

  const pickEnquiry = (type) => {
    setFormData((prev) => ({ ...prev, subject: `${type} Enquiry` }));
    track("enquiry_type_select", { type });
  };

  return (
    <div
      ref={scope}
      className="w-full px-6 md:px-6 lg:px-8 pb-16 py-12"
      style={{ color: "white" }}
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

          {/* Left Column */}
          <div className="space-y-8 lg:w-1/3">
            <div>
              <p data-fx="up" className="mb-3 font-roboto text-xs uppercase tracking-[0.3em] text-white/60">
                Let's Talk
              </p>
              <h2 data-fx="words" className="text-3xl sm:text-4xl font-belleza lg:text-5xl mb-4">
                Get in Touch
              </h2>
              <p data-fx="up" className="text-gray-300 font-roboto text-sm sm:text-sm max-w-xl text-justify leading-relaxed mb-8">
                Let's craft something extraordinary together. Whether it's a wedding, event, commercial
                production, or music video, we're here to bring your vision to life.
                Share your details with us, and let's discuss how Studio VisualFX can
                transform your ideas into cinematic stories that inspire and captivate.
              </p>
            </div>

            {/* Quick actions */}
            <div data-fx="up" className="grid grid-cols-3 gap-3">
              <a
                href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hi Studio VisualFX! I'd like to check availability for my date.")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_click", { location: "contact" })}
                className="group flex flex-col items-center gap-2 rounded-[12px] border border-white/20 bg-white/[0.03] px-2 py-4 transition-all duration-500 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-black"
              >
                <FaWhatsapp className="text-xl" />
                <span className="font-roboto text-[11px] uppercase tracking-widest">WhatsApp</span>
              </a>
              <a
                href={`tel:${CONTACT.phone}`}
                onClick={() => track("phone_click", { location: "contact" })}
                className="group flex flex-col items-center gap-2 rounded-[12px] border border-white/20 bg-white/[0.03] px-2 py-4 transition-all duration-500 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-black"
              >
                <FaPhone className="text-lg" />
                <span className="font-roboto text-[11px] uppercase tracking-widest">Call</span>
              </a>
              <a
                href={`mailto:${CONTACT.email}?subject=${encodeURIComponent("Booking Enquiry")}`}
                onClick={() => track("email_click", { location: "contact" })}
                className="group flex flex-col items-center gap-2 rounded-[12px] border border-white/20 bg-white/[0.03] px-2 py-4 transition-all duration-500 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-black"
              >
                <FaEnvelope className="text-lg" />
                <span className="font-roboto text-[11px] uppercase tracking-widest">Email</span>
              </a>
            </div>

            <div>
              <h3 data-fx="up" className="text-xl md:text-3xl font-belleza mb-8">General Inquiries</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div data-fx="card3d">
                  <div className="flex items-center mb-1">
                    <FaPhone className="mr-2 text-white text-lg" />
                    <span className="font-belleza text-lg">Dial</span>
                  </div>
                  <div className="flex flex-col ml-6 font-roboto space-y-1">
                    <a className="text-gray-300 hover:text-white transition" href="tel:+94776996981">+94 77 699 6981</a>
                    <a className="text-gray-300 hover:text-white transition" href="tel:+94719896981">+94 71 989 6981</a>
                  </div>
                </div>

                <div data-fx="card3d">
                  <div className="flex items-center mb-1">
                    <FaWhatsapp className="mr-2 text-white text-xl" />
                    <span className="font-belleza text-lg">Whatsapp</span>
                  </div>
                  <div className="flex flex-col ml-6 font-roboto space-y-1">
                    <a className="text-gray-300 hover:text-white transition" href="https://wa.me/94776996981" target="_blank" rel="noopener noreferrer">+94 77 699 6981</a>
                  </div>
                </div>

                <div data-fx="card3d">
                  <div className="flex items-center mb-1">
                    <FaLink className="mr-2 text-white text-lg" />
                    <span className="font-belleza text-lg">Catch us on us!</span>
                  </div>
                  <div className="ml-6 text-gray-300 font-roboto hover:text-white space-y-1">
                    <p><a href="https://facebook.com/visualfxsl" target="_blank" rel="noopener noreferrer">Facebook</a></p>
                    <p><a href="https://www.instagram.com/studiovisualfx" target="_blank" rel="noopener noreferrer">Instagram</a></p>
                  </div>
                </div>

                <div data-fx="card3d">
                  <div className="flex items-center mb-1">
                    <FaEnvelope className="mr-2 text-white text-lg" />
                    <span className="font-belleza text-lg">Email</span>
                  </div>
                  <div className="ml-6 font-roboto">
                    <a href="mailto:svisualfx@gmail.com" className="text-gray-300 hover:text-white transition">svisualfx@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Form) */}
          <div data-fx="zoom" className="lg:w-2/3 outline outline-white rounded-[16px] p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-belleza text-white mb-2">
              Send Message
            </h2>
            <p className="mb-6 font-roboto text-xs text-white/60">
              Advance payment reserves your date · Final film delivered within 8-12 weeks
            </p>

            {/* Enquiry type quick-pick (fills Subject) */}
            <div className="mb-6">
              <p className="mb-3 font-roboto text-[11px] uppercase tracking-widest text-white/60">What are you planning?</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Enquiry type">
                {ENQUIRY_TYPES.map((type) => {
                  const active = formData.subject === `${type} Enquiry`;
                  return (
                    <button
                      key={type}
                      type="button"
                      aria-pressed={active}
                      onClick={() => pickEnquiry(type)}
                      className={`cursor-pointer rounded-full border px-4 py-2 font-roboto text-xs transition-all duration-300 hover:-translate-y-0.5 ${
                        active ? "border-white bg-white text-black" : "border-white/30 text-white hover:border-white"
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            <form ref={form} onSubmit={sendEmail} className="space-y-4 font-roboto" noValidate>
              {/* Honeypot (hidden from people, bots fill it) */}
              <input
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  name="firstName"
                  aria-label="First name"
                  autoComplete="given-name"
                  maxLength={30}
                  placeholder="First Name"
                  className="flex-1 h-12 p-3 text-base sm:text-sm font-roboto bg-transparent placeholder:text-white/50 hover:outline-white rounded-[8px] border border-white/40 focus:outline-white transition"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="lastName"
                  aria-label="Last name"
                  autoComplete="family-name"
                  maxLength={30}
                  placeholder="Last Name"
                  className="flex-1 h-12 p-3 text-base sm:text-sm font-roboto bg-transparent placeholder:text-white/50 hover:outline-white rounded-[8px] border border-white/40 focus:outline-white transition"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  name="mobile"
                  placeholder="Mobile / WhatsApp (e.g. 0771234567)"
                  inputMode="numeric"
                  autoComplete="tel"
                  aria-label="Mobile number"
                  className="flex-1 h-12 p-3 text-base sm:text-sm font-roboto bg-transparent placeholder:text-white/50 hover:outline-white rounded-[8px] border border-white/40 focus:outline-white transition"
                  required
                  value={formData.mobile}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  aria-label="Email address"
                  autoComplete="email"
                  placeholder="Email"
                  className="flex-1 h-12 p-3 text-base sm:text-sm font-roboto bg-transparent placeholder:text-white/50 hover:outline-white rounded-[8px] border border-white/40 focus:outline-white transition"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  name="subject"
                  aria-label="Subject"
                  autoComplete="off"
                  maxLength={100}
                  placeholder="Subject"
                  className="w-full h-12 p-3 text-base sm:text-sm font-roboto bg-transparent placeholder:text-white/50 hover:outline-white rounded-[8px] border border-white/40 focus:outline-white transition"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-2 -mb-1">
                <textarea
                  name="message"
                  aria-label="Message"
                  placeholder="Message - tell us your date, venue and the story you want to tell"
                  className="w-full h-32 p-3 text-base sm:text-sm font-roboto bg-transparent placeholder:text-white/50 hover:outline-white rounded-[8px] border border-white/40 focus:outline-white transition"
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                <p className="text-[10px] text-gray-400 text-right">
                  {getWordCount(formData.message)} / 250 words
                </p>
              </div>

              {/* Google reCAPTCHA v2 checkbox */}
              <div className="flex justify-start mb-4">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  onChange={handleCaptchaChange}
                  theme="dark"
                  className="transform scale-90 origin-top-left "
                />
              </div>

              {/* Send button now left-aligned instead of full width */}
              <div className="flex justify-start">
                <motion.button
                  whileHover={formValid ? { scale: 1.01 } : {}}
                  whileTap={formValid ? { scale: 0.98 } : {}}
                  transition={{ duration: 0.3, ease: luxuryEase }}
                  type="submit"
                  disabled={!formValid}
                  className={`px-8 py-3 w-full cursor-pointer font-roboto text-black rounded-[8px] transition ${
                    formValid ? "bg-white hover:bg-gray-200" : "bg-gray-500 opacity-60 cursor-not-allowed"
                  }`}
                >
                  {sending ? "Sending..." : "Send Message"}
                </motion.button>
              </div>
            </form>
          </div>
        </div>

        {/* Animated Modal */}
        <AnimatePresence>
          {modal.show && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: luxuryEase }}
              role="alertdialog"
              aria-modal="true"
              aria-live="assertive"
              className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-[10001] px-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.5, ease: luxuryEase }}
                className="bg-black/70 backdrop-blur-xl rounded-[16px] outline-2 outline-white p-6 w-full max-w-sm text-center"
              >
                <h2 className="text-xl text-white font-belleza mb-3">{modal.ok ? "Thank You!" : "Oops!"}</h2>
                <p className="text-white text-xs font-roboto mb-6">{modal.message}</p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2, ease: luxuryEase }}
                  onClick={closeModal}
                  className="w-40 bg-white font-roboto text-black py-2 rounded-[8px] hover:bg-white cursor-pointer"
                >
                  Ok
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Contact;
