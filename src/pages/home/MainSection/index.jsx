import Loader from "@/components/loader";
import ShareExperienceModal from "@/components/shareExperinceModal";
import WhatOurUsersSay from "@/components/whatOurUsersSay";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userApi } from "../../../Apis/index.jsx";
import img1 from "../../../assets/images/detroit1.jpg";

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
    <div className="my-10 px-20">
      {/* Breadcrumb */}

      {/* Featured Experiences */}
      <h2 className="text-dark text-4xl font-extrabold text-center my-2">
        Featured Detroit Experiences
      </h2>
      <p className="text-light text-center font-bold mb-8 text-[#4b5563]">
        Discover the best experiences Detroit has to offer
      </p>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          {experiences.map((experience) => (
            <div
              key={experience._id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden w-full md:w-[341.1px]"
            >
              <img
                src={experience.image || img1}
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
    </div>
  );
};

export default Experience;
