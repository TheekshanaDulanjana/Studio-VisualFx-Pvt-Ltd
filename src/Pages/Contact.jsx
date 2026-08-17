import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhone, FaEnvelope, FaBuilding, FaClock, FaWhatsapp, FaLink } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";

const Contact = () => {
  const form = useRef();
  const recaptchaRef = useRef(null);
  const [modal, setModal] = useState({ show: false, message: "" });
  const [formValid, setFormValid] = useState(false);
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

  useEffect(() => {
    // Basic Sri Lankan mobile check (starts with 0 or 94 or 7, max 10 digits total for simplicity)
    const mobileRegex = /^(?:0|94|\+94)?(?:7(0|1|2|4|5|6|7|8)\d{7})$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const wordCount = getWordCount(formData.message);
    const isMobileValid = /^\d+$/.test(formData.mobile) && formData.mobile.length <= 10;

    const isValid =
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      emailRegex.test(formData.email) &&
      isMobileValid &&
      formData.subject.trim() !== "" &&
      wordCount > 0 && wordCount <= 250 &&
      captchaValue !== null; // reCAPTCHA must be completed

    setFormValid(isValid);
  }, [formData, captchaValue]);

  // Modal auto close after 5 seconds
  useEffect(() => {
    if (modal.show) {
      const timer = setTimeout(() => {
        closeModal();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [modal.show]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      const onlyNums = value.replace(/[^0-9]/g, "");
      if (onlyNums.length <= 10) {
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

  const sendEmail = (e) => {
    e.preventDefault();

    if (!captchaValue) {
      setModal({
        show: true,
        message: "Please verify that you are not a robot.",
      });
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!publicKey) {
      setModal({
        show: true,
        message: "Failed to send message: EmailJS Public Key is missing.",
      });
      return;
    }

    emailjs
      .sendForm(serviceId, templateId, form.current, publicKey)
      .then(
        () => {
          setModal({ show: true, message: "Message sent successfully!" });
          form.current.reset();
          setFormData({
            firstName: "",
            lastName: "",
            mobile: "",
            email: "",
            subject: "",
            message: "",
          });
          setCaptchaValue(null);
          if (recaptchaRef.current) {
            recaptchaRef.current.reset();
          }
        },
        (error) => {
          const errorDetails = error?.text || JSON.stringify(error) || "Unknown error";
          setModal({
            show: true,
            message: `Failed to send message: ${errorDetails}`,
          });
          setCaptchaValue(null);
          if (recaptchaRef.current) {
            recaptchaRef.current.reset();
          }
        }
      );
  };

  const closeModal = () => setModal({ show: false, message: "" });

  // Ultra smooth and slow luxury easing curve
  const luxuryEase = [0.16, 1, 0.3, 1];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.3,
        ease: luxuryEase,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="w-full px-6 md:px-6 lg:px-8 pb-16 py-12"
      style={{ color: "white" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

          {/* Left Column */}
          <motion.div variants={fadeInUp} className="space-y-8 lg:w-1/3">
            <div>
              <h2 className="text-3xl sm:text-4xl font-belleza lg:text-5xl mb-4">
                Get in Touch
              </h2>
              <p className="text-gray-300 font-roboto text-sm sm:text-sm max-w-xl text-justify leading-relaxed mb-8">
                Let's craft something extraordinary together. Whether it's a wedding, event, commercial
                production, or music video, we're here to bring your vision to life.
                Share your details with us, and let's discuss how Studio VisualFX can
                transform your ideas into cinematic stories that inspire and captivate.
              </p>
            </div>

            <div>
              <h3 className="text-xl md:text-3xl font-belleza mb-8">General Inquiries</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <div className="flex items-center mb-1">
                    <FaPhone className="mr-2 text-white text-lg" />
                    <span className="font-belleza text-lg">Dial</span>
                  </div>
                  <div className="flex flex-col ml-6 font-roboto space-y-1">
                    <a className="text-gray-300 hover:text-white transition" href="tel:+94776996981">+94 77 699 6981</a>
                    <a className="text-gray-300 hover:text-white transition" href="tel:+94719896981">+94 71 989 6981</a>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-1">
                    <FaWhatsapp className="mr-2 text-white text-xl" />
                    <span className="font-belleza text-lg">Whatsapp</span>
                  </div>
                  <div className="flex flex-col ml-6 font-roboto space-y-1">
                    <a className="text-gray-300 hover:text-white transition" href="https://wa.me/94776996981" target="_blank" rel="noopener noreferrer">+94 77 699 6981</a>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-1">
                    <FaLink className="mr-2 text-white text-lg" />
                    <span className="font-belleza text-lg">Catch us on us!</span>
                  </div>
                  <div className="ml-6 text-gray-300 font-roboto hover:text-white space-y-1">
                    <p><a href="https://facebook.com/visualfxsl" target="_blank" rel="noopener noreferrer">Facebook</a></p>
                    <p><a href="https://www.instagram.com/studiovisualfx" target="_blank" rel="noopener noreferrer">Instagram</a></p>
                  </div>
                </div>

                <div>
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
          </motion.div>

          {/* Right Column (Form) */}
          <motion.div variants={cardVariants} className="lg:w-2/3 outline outline-white rounded-[16px] p-6">
            <h2 className="text-2xl sm:text-3xl font-belleza text-white mb-8">
              Send Message
            </h2>

            <form ref={form} onSubmit={sendEmail} className="space-y-4 font-roboto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  name="firstName"
                  maxLength={30}
                  placeholder="First Name"
                  className="flex-1 h-12 p-3 text-xs font-roboto hover:outline-white rounded-[8px] border border-white/40 focus:outline-white transition"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="lastName"
                  maxLength={30}
                  placeholder="Last Name"
                  className="flex-1 h-12 p-3 text-xs font-roboto hover:outline-white rounded-[8px] border border-white/40 focus:outline-white transition"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  name="mobile"
                  placeholder="Mobile (e.g. 0771234567)"
                  className="flex-1 h-12 p-3 text-xs font-roboto hover:outline-white rounded-[8px] border border-white/40 focus:outline-white transition"
                  required
                  value={formData.mobile}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="flex-1 h-12 p-3 text-xs font-roboto hover:outline-white rounded-[8px] border border-white/40 focus:outline-white transition"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  name="subject"
                  maxLength={100}
                  placeholder="Subject"
                  className="w-full h-12 p-3 text-xs font-roboto hover:outline-white rounded-[8px] border border-white/40 focus:outline-white transition"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-2 -mb-1">
                <textarea
                  name="message"
                  placeholder="Message"
                  className="w-full h-32 p-3 text-xs font-roboto hover:outline-white rounded-[8px] border border-white/40 focus:outline-white transition"
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
                  Send Message
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Animated Modal */}
        <AnimatePresence>
          {modal.show && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: luxuryEase }}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.5, ease: luxuryEase }}
                className="bg-transparent backdrop-blur-xl rounded-[16px] outline-2 outline-white p-6 w-80 sm:w-96 text-center"
              >
                <h2 className="text-xl text-white font-belleza mb-3">Thank You!</h2>
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
    </motion.div>
  );
};

export default Contact;
