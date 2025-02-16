// import Loader from "@/components/loader";
// import { useEffect, useState } from "react";
// import { userApi } from "../../Apis/index.jsx";
// import ShareReviewModal from "../../components/ShareReviewModal/index.jsx";

// const WhatOurUsersSay = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [testimonials, setTestimonials] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchReviews = async () => {
//     setLoading(true);
//     try {
//       const response = await userApi.Getreviews();
//       const apiTestimonials = response.map((review) => ({
//         name: review.createdBy?.fullName || "Anonymous",
//         quote: review.description,
//       }));
//       setTestimonials(apiTestimonials);
//     } catch (error) {
//       console.error("Failed to fetch reviews:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, []);

//   return (
//     <section className="p-8 mt-10 bg-gray-100 text-center">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-bold mb-6">What Our Users Say</h2>

//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-gray-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-600 mb-10"
//         >
//           Share Your Review
//         </button>
//       </div>

//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {testimonials.map((user, index) => (
//             <div key={index} className="bg-white p-6 rounded-lg shadow-md">
//               <p className="text-lg italic">{user.quote}</p>
//               <p className="mt-4 font-bold">{user.name}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       <ShareReviewModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         refreshReviews={fetchReviews} // Passing the function correctly
//       />
//     </section>
//   );
// };

// export default WhatOurUsersSay;

import { useEffect, useState } from "react";
import { userApi } from "../../Apis/index.jsx";
import Loader from "@/components/loader";
import ShareReviewModal from "../../components/ShareReviewModal/index.jsx";
import { MessageCircle } from "lucide-react";

const WhatOurUsersSay = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await userApi.Getreviews();
      const apiTestimonials = response.map((review, index) => ({
        id: index,
        name: review.createdBy?.fullName || "Anonymous",
        role: review.createdBy?.role || "User",
        quote: review.description,
        avatar: `https://randomuser.me/api/portraits/men/${index + 10}.jpg`,
      }));
      setTestimonials(apiTestimonials.length ? apiTestimonials : defaultTestimonials);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      setTestimonials(defaultTestimonials);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const defaultTestimonials = [
    {
      id: 1,
      name: "David K.",
      role: "Developer",
      quote: "I love working with this team. The process was smooth, and they delivered beyond my expectations.",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Henry M.",
      role: "Designer",
      quote: "Amazing collaboration! Very professional and attentive to details. Highly recommend.",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: 3,
      name: "Dawn S.",
      role: "Marketer",
      quote: "One of the best teams I've ever worked with. Exceptional service and support.",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
  ];

  return (
    <section className="bg-gray-100 py-12 w-[1070px]" id="reviews">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Section Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            OVER <span className="text-green-500">200+ POSITIVE TALKS</span>,
            <br />
            SEE WHAT OUR USER SAY!ta 
          </h2>
          <div className="flex justify-center gap-2 mt-4">
            {defaultTestimonials.map((user, index) => (
              <img
                key={index}
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full border-2 border-gray-300"
              />
            ))}
          </div>
        </div>

        {/* Testimonials */}
        {loading ? (
          <Loader />
        ) : (
          <div className="flex gap-6 overflow-x-auto">
            {testimonials.map((user) => (
          <div
          key={user.id}
          className="w-80 p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl border border-gray-300 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col"
        >
          <div className="flex items-center gap-4 mb-6">
            <img
              className="w-14 h-14 rounded-full shadow-lg border-2 border-white"
              src={user.avatar}
              alt={`${user.name}'s Avatar`}
            />
            <div>
              <h4 className="font-bold text-gray-800 text-lg">{user.name}</h4>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
          </div>
          <p
            className={`text-gray-700 text-sm flex-1 ${user.quote.length < 50 ? "min-h-0" : "min-h-[5rem]"}`}
          >
            {user.quote}
          </p>
    
        </div>
        
          
            ))}
          </div>
        )}

        {/* WhatsApp CTA */}
        <div className="fixed bottom-6 right-6">
  <a
    href="https://wa.me/1234567890"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-4 py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600"
  >
    <MessageCircle className="w-5 h-5" />
    Contact us 
  </a>
</div>
      </div>
    </section>
  );
};

export default WhatOurUsersSay;
