import React from 'react';

const TermofConditionDetails = () => {
const sections = [
  {
    title: "Booking & Payment",
    points: [
      "A non-refundable advance payment of LKR 15,000 is required to confirm the booking.",
      "The remaining balance must be settled at least two (2) days before the event date.",
      "Failure to settle the remaining balance by the specified deadline may result in the suspension or cancellation of services."
    ],
  },
  {
    title: "Cancellations & Refunds",
    points: [
      "If the client cancels the booking, the advance payment is non-refundable.",
      "If the cancellation is made more than sixty (60) days prior to the event, 40% of the advance payment may be credited toward a future booking within twelve (12) months.",
      "If the cancellation is due to unavoidable circumstances on the part of the videographer, a full refund of all payments received will be issued."
    ],
  },
  {
    title: "Travel & Accommodation",
    points: [
      "All packages exclude transportation charges unless otherwise stated.",
      "Travel, accommodation, and any related expenses outside the agreed service area must be covered by the client."
    ],
  },
  {
    title: "Drone Usage",
    points: [
      "Drone operations are subject to weather conditions, safety regulations, and legal permissions.",
      "Any drone permit or authorization fees, where required, must be covered by the client.",
      "If drone usage is restricted on the event day due to adverse weather conditions or legal restrictions, no refund will be provided for the drone service or package."
    ],
  },
  {
    title: "Delivery Timeline & Revisions",
    points: [
      "Final edited videos will be delivered approximately 8–12 weeks after the event date.",
      "Express delivery may be available upon request for an additional fee.",
      "Each package includes up to two (2) rounds of minor revisions, such as music changes or specific shot replacements, requested within fourteen (14) days of delivery.",
      "Any additional revisions or major re-editing requests will be subject to additional charges."
    ],
  },
  {
    title: "Creative Control",
    points: [
      "The videographer retains full creative control over the filming, editing, and overall style of the final production.",
      "Raw footage will not be provided unless otherwise agreed in writing."
    ],
  },
  {
    title: "Client Cooperation",
    points: [
      "The client is responsible for ensuring timely coordination, venue access, and the cooperation of guests to facilitate smooth coverage of the event."
    ],
  },
  {
    title: "Copyright & Usage",
    points: [
      "Studio VisualFX retains the copyright to all recorded footage and edited video content.",
      "The client grants permission for selected footage to be used in Studio VisualFX's portfolio, social media platforms, and promotional materials unless otherwise requested in writing before the event."
    ],
  },
  {
    title: "Publishing Rights",
    points: [
      "The decision to publish any portion of the video content on Studio VisualFX's official website, social media channels, or other promotional platforms remains solely at the discretion of Studio VisualFX."
    ],
  },
  {
    title: "Backup & Archiving",
    points: [
      "Final edited videos will be securely archived for a period of three (3) months from the delivery date.",
      "It is the client's responsibility to download, store, and maintain backup copies of all delivered files."
    ],
  },
  {
    title: "Force Majeure",
    points: [
      "Studio VisualFX shall not be held liable for delays, missed coverage, or failure to perform services due to circumstances beyond its reasonable control.",
      "Such circumstances include, but are not limited to, natural disasters, severe weather conditions, sudden equipment or hardware failure, data corruption, serious illness, curfews, power outages, or other unforeseen events.",
      "In the event of a personal medical emergency affecting the assigned videographer, Studio VisualFX will make every reasonable effort to provide a suitably qualified replacement."
    ],
  },
];

  return (
    <div className="bg-black py-16 px-4 font-roboto">
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

export default TermofConditionDetails;