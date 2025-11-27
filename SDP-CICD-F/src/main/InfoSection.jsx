import React from "react";
import { FaUsers } from "react-icons/fa";

const InfoSection = () => {
  const cards = [
    {
      title: "Easy Booking",
      description:
        "Book tickets for movies, concerts, and sports in just a few clicks.",
    },
    {
      title: "Secure Payments",
      description:
        "Your transactions are safe with multiple payment options supported.",
    },
    {
      title: "24/7 Support",
      description:
        "Get help anytime with our dedicated customer support team.",
    },
  ];

  return (
<section className="bg-[#f7b441] text-white py-16 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Heading */}
        <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
          Is this booking system Right <br /> For you?
        </h2>

        {/* Right Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-zinc-900 border border-zinc-700 rounded-md p-6 hover:shadow-lg transition"
            >
              <FaUsers className="text-3xl mb-4" />
              <h3 className="font-semibold italic text-lg mb-2">{card.title}</h3>
              <p className="text-sm text-gray-300">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
