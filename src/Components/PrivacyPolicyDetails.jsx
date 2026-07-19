import React from 'react';

const PrivacyPolicy = () => {
 const sections = [
  {
    title: "Information We Collect",
    points: [
      "We collect only the information necessary to process your booking and communicate with you.",
      "This may include your full name, contact number, email address, event date, venue, couple's names, and any additional details you voluntarily provide during your inquiry or booking."
    ]
  },
  {
    title: "How We Use Your Information",
    points: [
      "To communicate with you regarding your booking and event arrangements.",
      "To plan, organize, and deliver our videography services.",
      "To respond to your inquiries and provide customer support before and after your event."
    ]
  },
  {
    title: "Sharing of Information",
    points: [
      "Studio VisualFX does not sell, rent, or share your personal information with third parties for marketing purposes.",
      "Your information will only be disclosed where required by law or with your prior consent."
    ]
  },
  {
    title: "Data Security",
    points: [
      "We take reasonable measures to protect the personal information you provide against unauthorized access, disclosure, or misuse.",
      "Only authorized Studio VisualFX personnel have access to your booking information."
    ]
  },
  {
    title: "Media Content",
    points: [
      "Photographs and videos captured during your event are used solely for editing and delivering your final project.",
      "Selected media may be used for our portfolio, website, or social media only where permitted under our Terms & Conditions or with your consent."
    ]
  },
  {
    title: "Data Retention",
    points: [
      "Booking information is retained only for as long as necessary to complete your project and meet legal or business requirements.",
      "Final edited videos are archived for three (3) months after delivery."
    ]
  },
  {
    title: "Your Rights",
    points: [
      "You may request access to the personal information we hold about you.",
      "You may request corrections to inaccurate information or request its removal where applicable."
    ]
  },
  {
    title: "Third-Party Links",
    points: [
      "Our website may contain links to third-party platforms such as Facebook, Instagram, or YouTube.",
      "Studio VisualFX is not responsible for the privacy practices or content of those external websites."
    ]
  },
  {
    title: "Policy Updates",
    points: [
      "This Privacy Policy may be updated from time to time to reflect changes in our services or legal requirements.",
      "Any updates will be published on this page."
    ]
  },
  {
    title: "Contact Us",
    points: [
      "If you have any questions regarding this Privacy Policy or your personal information, please contact Studio VisualFX using the contact details available on our website."
    ]
  }
];

  return (
    <div className=" py-16 px-4 font-roboto">
      <div className="max-w-7xl mx-auto relative">
        
        {/* Vertical Center Line */}
        <div className="absolute left-[30%] top-0 bottom-0 w-px bg-white/30 hidden md:block"></div>

        <div className="space-y-16">
          {sections.map((section, index) => (
            <div key={index} className="flex flex-col md:flex-row items-start relative">
              
              {/* Left Column: Title (Belleza Font) */}
              <div className="w-full md:w-[30%] pr-8 mb-4 md:mb-0 md:text-right">
                <h2 className="font-belleza text-xl md:text-2xl text-white  leading-tight">
                  {section.title}
                </h2>
              </div>

              {/* Middle Dot Marker */}
              <div className="absolute left-[30%] -translate-x-1/2 top- hidden md:block">
                <div className="w-3 h-3 bg-white rounded-full "></div>
              </div>

              {/* Right Column: Point-wise details (Roboto Font) */}
              <div className="w-full md:w-[70%] md:pl-16">
                <ul className="space-y-2">
                  {section.points.map((point, pIndex) => (
                    <li key={pIndex} className="text-white text-sm md:text-sm flex items-start">
                      <span className="mr-3 mt-2 w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;