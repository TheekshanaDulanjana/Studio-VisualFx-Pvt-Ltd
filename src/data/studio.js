// Shared site data - edit here, every section that uses it updates.

export const STATS = [
  { label: "Years of Experience", value: "7+" },
  { label: "Frames Crafted", value: "150+" },
  { label: "Cinematic Hours", value: "400+" },
  { label: "Creative Team", value: "4+" },
];

export const FILMS = [
  { coupleName: "Jules & Cheshan", link: "https://www.youtube.com/watch?v=KaQCh7E6mg8" },
  { coupleName: "Nethmi & Charuka", link: "https://www.youtube.com/watch?v=MhENvCuxF0I" },
  { coupleName: "Piyumi & Darshana", link: "https://youtu.be/7JUmj4brDds" },
  { coupleName: "Inesha & Randika", link: "https://youtu.be/aplPx3YgxOc" },
  { coupleName: "Meditha & Teran", link: "https://www.youtube.com/watch?v=0yavt1yQGhc" },
  { coupleName: "Raweesha & Sahan", link: "https://www.youtube.com/watch?v=sqs5lNAy6GE" },
  { coupleName: "Dilmi & Sanitha", link: "https://www.youtube.com/watch?v=Ezo05vzfBbU" },
  { coupleName: "Vihangi & Lahiru", link: "https://youtu.be/j5-crzYuAys" },
  { coupleName: "Nimmi & Brinoj", link: "https://youtu.be/v2BLa9HXxeA" },
  { coupleName: "Raveesha & Sahan", link: "https://youtu.be/kkNuwRHeYR4" },
];

export const getVideoId = (url) => {
  if (url.includes("youtu.be")) return url.split("/").pop().split("?")[0];
  if (url.includes("watch?v=")) return url.split("watch?v=")[1].split("&")[0];
  return "";
};

export const CONTACT = {
  phone: "+94776996981",
  phoneDisplay: "+94 77 699 6981",
  whatsapp: "94776996981",
  email: "svisualfx@gmail.com",
};

// Fire a GA4 event if analytics is loaded (lead tracking for the client)
export const track = (name, params = {}) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
};

export const FAQS = [
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
