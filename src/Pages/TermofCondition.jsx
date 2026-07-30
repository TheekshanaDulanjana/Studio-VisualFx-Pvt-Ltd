import React from 'react';
import TermofConditionDetails from '../components/TermofConditionDetails';

export default function TermofCondition() {
  return (
    <div className=" pt-24">
      
      {/* Hero Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="w-full max-w-7xl mx-auto">
          <div className="max-w-7xl">
            
            <h1 className="text-5xl text-white md:text-7xl  tracking-tight mb-6 font-belleza">
              Terms of Condition
            </h1>

            <p className="text-sm text-white text-justify leading-relaxed font-roboto">
              Welcome to Studio VisualFX (PVT) LTD. These Terms & Conditions outline the terms, 
              responsibilities, and agreements between Studio VisualFX and our clients when 
              booking and using our videography services. Please read these terms carefully 
              before confirming your booking. By making an advance payment or engaging our 
              services, you acknowledge that you have read, understood, and agreed to these 
              Terms & Conditions. Studio VisualFX reserves the right to update or modify these 
              terms when necessary to reflect changes in our services or business practices.
            </p>

          </div>
        </div>
      </section>
      <TermofConditionDetails />
    

    </div>
  );
}