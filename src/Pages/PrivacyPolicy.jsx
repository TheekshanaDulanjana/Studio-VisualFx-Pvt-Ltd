import React from 'react';
import PrivacyPolicyDetails from '../components/PrivacyPolicyDetails';

export default function PrivacyPolicy() {
  return (
    <div className=" pt-24">
      
      {/* Hero Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="w-full max-w-7xl mx-auto">
          <div className="max-w-7xl">
            
            <h1 className="text-5xl text-white md:text-7xl  tracking-tight mb-6 font-belleza">
              Privacy Policy
            </h1>

            <p className="text-sm text-white text-justify leading-relaxed font-roboto">
              At Studio VisualFX (PVT) LTD, we are committed to protecting your 
              privacy and handling your personal information with the highest level
               of care and professionalism. This Privacy Policy explains what
                information we collect during the booking process, how we use it, 
                and the measures we take to keep it secure. By using our website or 
                engaging our services, you acknowledge and agree to the practices 
                outlined in this Privacy Policy.
</p>

          </div>
        </div>
      </section>
      <PrivacyPolicyDetails />
    

    </div>
  );
}