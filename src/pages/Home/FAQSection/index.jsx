import React, { useState } from 'react';
const faqs = [
  {
    question: 'How can I book an artist?',
    answer:
      "Browse through our artists, view their profiles, and click on the 'Book' button. Then, fill in the event details like date, time, and location. You'll be prompted to log in to confirm your booking.",
  },
  {
    question: 'What happens after I book an artist?',
    answer:
      "Once you book, the status will be marked as unapproved. Our platform team will contact you for verification. After approval, you'll be able to view your booking details in the 'My Bookings' page.",
  },
  {
    question: 'How can I check the status of my booking?',
    answer:
      "After your booking is approved, you can view it in your 'My Bookings' page under the 'Approved' section. Unapproved bookings will remain in the 'Unapproved' section until verified.",
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container py-10 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Frequently Asked Questions
        </h2>

        {/* Loop through the categories */}

        {faqs.map((faq, questionIndex) => (
          <div key={questionIndex} className="faq-item mb-4">
            <div
              className="faq-question cursor-pointer flex justify-between items-center p-4 bg-gray-800 rounded-lg"
              onClick={() => toggleAnswer(questionIndex)}
            >
              <h4 className="text-xl font-semibold">{faq.question}</h4>
              <span className="text-white">
                {activeIndex === questionIndex ? '-' : '+'}
              </span>
            </div>

            {activeIndex === questionIndex && (
              <div className="faq-answer p-4 bg-gray-700 rounded-lg mt-2">
                <p className="text-sm">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
