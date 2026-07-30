import wedding from "../assets/wedding.png";
import event from "../assets/event.png";
import commercial from "../assets/commercial.png";
import music from "../assets/music.png";

export default function ProductionCategories() {
  const otherCategories = [
    {
      img: event,
      title: "Event Coverage",
      desc: "We professionally capture every moment of your events from corporate functions to special celebrations, ensuring every highlight is preserved with clarity and creativity.",
    },
    {
      img: commercial,
      title: "Commercial Productions",
      desc: "We create impactful visual content that elevates your brand. From advertisements to promotional videos, our productions are designed to attract, engage, and convert your audience.",
    },
    {
      img: music,
      title: "Music Videos",
      desc: "From concept to final cut, we bring your music to life with visually stunning storytelling. Our creative direction ensures your sound is matched with powerful, engaging visuals",
    },
  ];

  // Combine all for the Tablet/Mobile grid view
  const allCategories = [
    {
      img: wedding,
      title: "Creative Wedding Films",
      desc: "We turn your special day into a cinematic love story. Every emotion, smile, and moment is beautifully captured and crafted into a timeless wedding film you’ll cherish forever.",
    },
    ...otherCategories,
  ];

  return (
    <section className=" text-white py-12 md:py-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP SECTION: Text and Highlight Card (Laptop View) */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          
          {/* Left Content */}
          <div className="flex flex-col justify-center font-[Alata]">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6 font-belleza  text-center lg:text-left">
              Bringing Your Moments to Life Through Cinematic Vision
            </h2>

            <p className="text-gray-300  font-roboto  max-w-2xl mx-auto lg:mx-0 text-sm text-center lg:text-justify sm:text-sm leading-relaxed">
              At Studio VisualFX (Pvt) Ltd., we offer a range of
               creative visual production services designed to capture,
                create, and elevate your story. With a perfect blend of
                 innovation, technology, and artistic vision, we deliver
                  high-quality productions tailored to every unique moment
                   and purpose.
            </p>
          </div>

          {/* Wedding Highlight Card - Visible only on Laptop (lg+) */}
          <div className="hidden lg:block relative rounded-[16px] overflow-hidden outline outline-white/30 shadow-2xl h-[350px] group">
            <img
              src={wedding}
              alt="Creative Wedding Films"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
              <h3 className="text-2xl mb-2 font-belleza">Creative Wedding Films</h3>
              <p className="text-[12px] text-gray-200 font-roboto  max-w-lg">
                We turn your special day into a cinematic love story. Every emotion, smile, and moment is beautifully captured and crafted into a timeless wedding film you’ll cherish forever.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: The Grid */}
        {/* Mobile: 1 column (all 4 cards)
            Tablet: 2x2 grid (all 4 cards same size) 
            Laptop: 1x3 grid (remaining 3 cards)
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          
          {/* Map through all categories for Mobile and Tablet */}
          {/* On Laptop (lg), we hide the first item (Wedding) because it's already shown in the top section */}
          {allCategories.map((item, index) => (
            <div
              key={index}
              className={`relative rounded-[16px]  overflow-hidden group h-64 sm:h-72 md:h-80 outline outline-white/30 lg:h-64 
                ${index === 0 ? "lg:hidden" : "block"}`}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition  duration-700"
              />

              {/* Gradient Overlay */}
              <div className="absolute  inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end">
                <h4 className="text-xl mb-2 font-belleza  transition-colors">
                  {item.title}
                </h4>
                <p className="text-[12px] text-gray-200 font-roboto leading-snug">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}