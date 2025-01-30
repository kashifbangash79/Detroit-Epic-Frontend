// import Loader from '@/components/loader';
// import ShareExperienceModal from '@/components/shareExperinceModal';
// import WhatOurUsersSay from '@/components/whatOurUsersSay';
// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { userApi } from '../../Apis/index.jsx';

// const Experience = () => {
//   const [experiences, setExperiences] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [newExperiencePost, setnewExperiencePost] = useState({
//     title: '',
//     category: '',
//     description: '',
//     image: '',
//     date: '',
//   });
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Fetch experiences from API
//   const fetchExperiences = async () => {
//     setIsLoading(true);
//     try {
//       const response = await userApi.Getexperiences();
//       setExperiences(response);
//     } catch (error) {
//       console.error('Failed to fetch experiences:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchExperiences();
//   }, []);

//   // Handle new post submission
//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       await userApi.CreateExperiences(newExperiencePost);
//       alert('Exerience created successfully!');
//       setnewExperiencePost({
//         title: '',
//         category: '',
//         description: '',
//         image: '',
//         date: '',
//       });
//       setIsModalOpen(false);
//       await fetchExperiences(); // Refresh blogs after submission
//     } catch (error) {
//       console.error('Failed to create Exerience:', error);
//       alert(
//         'An error occurred while creating the Exerience. Please try again.'
//       );
//     }
//   };

//   return (
//     <div className='container mx-auto p-6'>
//       <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-10'>
//         <div className='p-4 bg-white shadow rounded-lg'>
//           <h3 className='text-xl font-semibold mb-2'>Curated Experiences</h3>
//           <p>Handpicked local adventures</p>
//         </div>
//         {/* Share Your Experience Button */}

//         <div className='p-4 bg-white shadow rounded-lg'>
//           <h3 className='text-xl font-semibold mb-2'>Live Events</h3>
//           <p>Up-to-date concert and event listings</p>
//         </div>
//         <div className='p-4 bg-white shadow rounded-lg'>
//           <h3 className='text-xl font-semibold mb-2'>Foodie Favorites</h3>
//           <p>Best local eateries and hidden gems</p>
//         </div>
//         <div className='p-4 bg-white shadow rounded-lg'>
//           <h3 className='text-xl font-semibold mb-2'>Photo Spots</h3>
//           <p>Instagram-worthy locations</p>
//         </div>
//       </div>
//       <button
//         onClick={() => setIsModalOpen(true)}
//         className='bg-blue-500 text-black border p-2 rounded mb-6'
//       >
//         Share Your Experience{' '}
//       </button>
//       <h2 className='text-3xl font-semibold mb-6'>
//         Featured Detroit Experiences
//       </h2>

//       {isLoading ? (
//         <Loader />
//       ) : (
// <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
//   {experiences.map(experience => (
//     <div
//       key={experience._id}
//       className='bg-white shadow rounded-lg p-4'
//     >
//       {experience.isFeatured && (
//         <div className='mb-4'>
//           <span className='text-sm bg-yellow-300 text-black rounded-full px-2 py-1'>
//             Featured Experience of the Week
//           </span>
//         </div>
//       )}
//       <img
//         src={experience.image}
//         alt={experience.title}
//         className='w-full h-48 object-cover mb-4'
//       />
//       <h3 className='text-xl font-semibold mb-2'>{experience.title}</h3>
//       <p className='mb-2 font-medium'>
//         Rating: {experience.rating} ({experience.numberOfReviews}{' '}
//         reviews)
//       </p>
//       <p className='mb-4'>{experience.description}</p>
//       <Link
//         to={`/experience/${experience._id}`}
//         className='px-4 py-2 bg-blue-500 border text-black rounded'
//       >
//         Learn More
//       </Link>
//     </div>
//   ))}
// </div>
//       )}
//       <ShareExperienceModal
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           fetchExperiences(); // Refresh blogs when modal closes
//         }}
//         mode='experience'
//         newExperiencePost={newExperiencePost}
//         setnewExperiencePost={setnewExperiencePost} // Passing the correct update function
//         handleSubmit={handleSubmit}
//       />
//       <WhatOurUsersSay />
//     </div>
//   );
// };

// export default Experience;

import Loader from "@/components/loader";
import ShareExperienceModal from "@/components/shareExperinceModal";
import WhatOurUsersSay from "@/components/whatOurUsersSay";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userApi } from "../../Apis/index.jsx";
import img1 from "../../assets/images/detroit1.jpg";

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newExperiencePost, setNewExperiencePost] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
    date: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch experiences from API
  const fetchExperiences = async () => {
    setIsLoading(true);
    try {
      const response = await userApi.Getexperiences();
      setExperiences(response);
    } catch (error) {
      console.error("Failed to fetch experiences:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  // Handle new post submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userApi.CreateExperiences(newExperiencePost);
      alert("Experience created successfully!");
      setNewExperiencePost({
        title: "",
        category: "",
        description: "",
        image: "",
        date: "",
      });
      setIsModalOpen(false);
      await fetchExperiences();
    } catch (error) {
      console.error("Failed to create Experience:", error);
      alert(
        "An error occurred while creating the Experience. Please try again."
      );
    }
  };

  return (
    <div className="container mx-auto  -pl-8 pr-8 pb-8">
      {/* Breadcrumb */}
      <nav className="text-lg text-black-800 mb-7 mt-6 text-lg">
        <a href="/" className="hover:text-blue-500">
          Home
        </a>{" "}
        &gt; <span>Experiences</span>
      </nav>

      {/* Minimalistic Cards */}
      {/* Minimalistic Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {[
          "Curated Experiences",
          "Live Events",
          "Foodie Favorites",
          "Photo Spots",
        ].map((card, idx) => (
          <div
            key={idx}
            className="bg-gray-100 p-6 rounded-lg shadow-md text-center transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r hover:from-blue-200 hover:to-blue-100"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2 transition-colors hover:text-blue-600">
              {card}
            </h3>
            <p className="text-sm text-gray-500 transition-colors hover:text-gray-700">
              {card === "Curated Experiences" && "Handpicked local adventures"}
              {card === "Live Events" &&
                "Up-to-date concert and event listings"}
              {card === "Foodie Favorites" &&
                "Best local eateries and hidden gems"}
              {card === "Photo Spots" && "Instagram-worthy locations"}
            </p>
          </div>
        ))}
      </div>

      {/* Share Your Experience Button */}
      <div className="text-left mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-600 mb-10 "
        >
          Share Your Experience
        </button>
      </div>

      {/* Featured Experiences */}
      <h2 className="text-dark text-4xl font-extrabold text-center my-2">
        Featured Detroit Experiences
      </h2>
      <p className="text-light text-center font-bold mb-8">
        Discover the best experiences Detroit has to offer
      </p>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[9rem] ">
          {experiences.map((experience) => (
            <div
              key={experience._id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden w-full md:w-[341.1px]"
            >
              <img
                src={experience.image}
                alt={experience.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg leading-7 text-center mb-2 font-semibold text-gray-800">
                  {experience.title}
                </h3>

                <p className="text-sm text-gray-600 text-opacity-100 mb-4 text-center line-clamp-2">
                  {experience.description}
                </p>

                <div className="flex items-center justify-between mt-6">
                  <Link
                    to={`/experience/${experience._id}`}
                    className="text-blue-500 font-medium hover:underline"
                  >
                    Learn More
                  </Link>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke={
                          index < Math.round(experience.rating)
                            ? "#F97316"
                            : "#F97316"
                        }
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.272a1 1 0 00.95.69h6.592c.969 0 1.371 1.24.588 1.81l-5.347 3.895a1 1 0 00-.364 1.118l2.036 6.272c.3.921-.755 1.688-1.54 1.118l-5.347-3.895a1 1 0 00-1.175 0l-5.347 3.895c-.784.57-1.838-.197-1.539-1.118l2.036-6.272a1 1 0 00-.364-1.118L2.422 11.7c-.784-.57-.38-1.81.588-1.81h6.592a1 1 0 00.95-.69l2.036-6.272z"
                        />
                      </svg>
                    ))}
                    <span className="text-gray-500 text-sm ml-2">
                      ({experience.numberOfReviews} Ratings)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Share Experience Modal */}
      <ShareExperienceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          fetchExperiences();
        }}
        mode="experience"
        newExperiencePost={newExperiencePost}
        setnewExperiencePost={setNewExperiencePost}
        handleSubmit={handleSubmit}
      />

      {/* Testimonials Section */}
      <div className="mt-12">
        <WhatOurUsersSay />
      </div>
    </div>
  );
};

export default Experience;
