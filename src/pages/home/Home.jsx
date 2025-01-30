// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const Home = () => {
//   const [token, setToken] = useState(localStorage.getItem("Token"));

//   useEffect(() => {
//     // Listen for changes to the localStorage item "Token"
//     const handleStorageChange = () => {
//       setToken(localStorage.getItem("Token"));
//     };

//     // Add event listener to handle token changes
//     window.addEventListener("storage", handleStorageChange);

//     // Clean up the event listener when the component unmounts
//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

//   return (
//     <>
//       <div
//         className="h-screen relative flex items-center justify-between w-[100%] flex-col"
//         style={{
//           backgroundImage:
//             'url("https://images.unsplash.com/photo-1577278254637-a8b6a7f3614e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <div className="relative z-10 text-center py-24">
//           <h1 className="text-5xl font-bold mb-4">
//             Personalized Detroit Weekend Adventures{" "}
//           </h1>
//           <p className="text-xl mb-8">
//             We plan unforgettable weekend experiences in Detroit, so you don’t
//             have to.
//           </p>
//           {!token ? (
//             <Link to={"/Partner"}>
//               <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200">
//                 Start Planning My Weekend{" "}
//               </button>
//             </Link>
//           ) : (
//             <>
//               <Link to={"/user-profile"}>
//                 <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200">
//                   Start Planning My Weekend{" "}
//                 </button>
//               </Link>
//             </>
//           )}
//         </div>
//       </div>

//       <div>
//         {/* Section 1: Don't Miss Out */}
//         <div className="bg-pink-100 py-10 px-6 md:px-12 lg:px-20 text-center">
//           <h2 className="text-2xl md:text-3xl font-bold mb-4">
//             Don’t Miss Out!
//           </h2>
//           <p className="text-gray-700 mb-2">
//             Planning a weekend in Detroit is overwhelming. Too many options, too
//             little time.
//           </p>
//           <p className="text-gray-700">
//             Don’t risk another disappointing weekend—let DEW craft an
//             unforgettable experience for you.
//           </p>

//           {/* Detroit Features Section */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
//             {/* Feature 1: The Guardian Building */}
//             <div className="bg-white p-4 rounded-lg shadow-md">
//               <img
//                 src="https://tourdetroit.com/wp-content/uploads/2024/03/GuardianExtCityTourDetroit.jpg"
//                 alt="The Guardian Building"
//                 className="w-full h-60 object-cover rounded-t-lg"
//               />
//               <h3 className="text-xl font-bold mt-2">The Guardian Building</h3>
//               <p className="text-gray-700">
//                 An Art Deco masterpiece known as the "Cathedral of Finance,"
//                 featuring stunning architecture and intricate tile work.
//               </p>
//             </div>

//             {/* Feature 2: Detroit Institute of Arts */}
//             <div className="bg-white p-4 rounded-lg shadow-md">
//               <img
//                 src="https://mymichigantravel.com/wp-content/uploads/DIA-in-Detroit-980x551.jpg"
//                 alt="Detroit Institute of Arts"
//                 className="w-full h-60 object-cover rounded-t-lg"
//               />
//               <h3 className="text-xl font-bold mt-2">
//                 Detroit Institute of Arts
//               </h3>
//               <p className="text-gray-700">
//                 Home to over 65,000 artworks, this museum is a cultural gem
//                 showcasing pieces from renowned artists.
//               </p>
//             </div>

//             {/* Feature 3: Motown Museum */}
//             <div className="bg-white p-4 rounded-lg shadow-md">
//               <img
//                 src="https://www.motownmuseum.org/wp-content/uploads/2021/01/mm_Hitsville_Campus_Photo-2-1024x819.jpg"
//                 alt="Motown Museum"
//                 className="w-full h-60 object-cover rounded-t-lg"
//               />
//               <h3 className="text-xl font-bold mt-2">Motown Museum</h3>
//               <p className="text-gray-700">
//                 Explore the birthplace of Motown Records and learn about the
//                 legendary artists who shaped music history.
//               </p>
//             </div>
//           </div>
//         </div>

//   {/* Section 2: We Know Detroit */}
//   <div className="bg-white py-10 px-6 md:px-12 lg:px-20 text-center">
//     <h2 className="text-2xl md:text-3xl font-bold mb-4">
//       We Know Detroit Like No One Else
//     </h2>
//     <p className="text-gray-700 mb-4">
//       With years of experience and expert local knowledge, we know Detroit
//       inside and out.
//     </p>
//     <blockquote className="italic text-gray-500">
//       "DEW made our trip to Detroit effortless and memorable!" – Sarah J.
//     </blockquote>
//   </div>

//   {/* Section 3: Call to Action */}
//   <div className="bg-blue-600 px-6 md:px-12 lg:px-20 text-center text-white">
//     <h2 className="text-2xl md:text-3xl font-bold mb-4">
//       Your Perfect Detroit Weekend is Just a Click Away
//     </h2>
//     <p className="mb-6">
//       Book now for exclusive access to Detroit’s top spots.
//     </p>
//   </div>
//   <div className="text-center">
//     <Link to="/Partner">
//       <button className="bg-gray-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-600 mb-10">
//         Start Partnering{" "}
//       </button>
//     </Link>
//   </div>
// </div>
//     </>
//   );
// };

// export default Home;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Index from "../home/HeroSection/index";
import Experience from "./MainSection";
import HowItWorks from "./HowItWorks";
import DetroitEpicWeekend from "./Guide";
import AboutUsPage from "./About";
import FAQs from "./Faqs";
import ContactUs from "./Contact";

const Home = () => {
  const [token, setToken] = useState(localStorage.getItem("Token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("Token"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative flex items-center justify-center min-h-[75vh] bg-cover bg-center text-center text-white"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1577278254637-a8b6a7f3614e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        }}
      >
        <div className="bg-black bg-opacity-50 px-6 py-12 rounded-lg w-full max-w-screen-lg mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Personalized Detroit Weekend Adventures
          </h1>

          <p className="text-lg md:text-xl mb-6">
            We plan unforgettable weekend experiences in Detroit, so you don’t
            have to.
          </p>
          {!token ? (
            <Link to="/Partner">
              <button className=" bg-gray-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-600 mb-10 ">
                Start Planning My Weekend
              </button>
            </Link>
          ) : (
            <Link to="/user-profile">
              <button className="bg-gray-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-600 mb-10">
                Start Planning My Weekend
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Section 1: Don't Miss Out */}
      {/* <div className="bg-pink-100 py-12 px-6 md:px-12 lg:px-20">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-6">
          Don’t Miss Out!
        </h2>
        <p className="text-center text-gray-700 max-w-screen-md mx-auto mb-8">
          Planning a weekend in Detroit is overwhelming. Too many options, too
          little time. Don’t risk another disappointing weekend—let DEW craft an
          unforgettable experience for you.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "The Guardian Building",
              image:
                "https://tourdetroit.com/wp-content/uploads/2024/03/GuardianExtCityTourDetroit.jpg",
              description:
                "An Art Deco masterpiece known as the 'Cathedral of Finance,' featuring stunning architecture and intricate tile work.",
            },
            {
              title: "Detroit Institute of Arts",
              image:
                "https://cdn.britannica.com/33/189933-050-C6F38784/Detroit-Institute-of-Arts.jpg",
              description:
                "Home to over 65,000 artworks, this museum is a cultural gem showcasing pieces from renowned artists.",
            },
            {
              title: "Motown Museum",
              image:
                "https://www.motownmuseum.org/wp-content/uploads/2021/01/mm_Hitsville_Campus_Photo-2-1024x819.jpg",
              description:
                "Explore the birthplace of Motown Records and learn about the legendary artists who shaped music history.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-60 object-cover rounded-t-lg"
              />
              <h3 className="text-xl font-bold mt-4">{feature.title}</h3>
              <p className="text-gray-700 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div> */}

      {/* Section 2: We Know Detroit */}
      {/* <div className="bg-white py-12 px-6 md:px-12 lg:px-20 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-700 mb-4">
          We Know Detroit Like No One Else
        </h2>
        <p className="text-lg md:text-xl text-gray-700 mb-4 max-w-3xl mx-auto">
          With years of experience and expert local knowledge, we know Detroit
          inside and out.
        </p>
        <blockquote className="italic text-gray-500 text-lg max-w-xl mx-auto">
          "DEW made our trip to Detroit effortless and memorable!" – Sarah J.
        </blockquote>
      </div> */}

      {/* Section 3: Call to Action */}
      {/* <div className="bg-white py-12 px-6 md:px-12 lg:px-20 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-700 mb-4">
          Your Perfect Detroit Weekend is Just a Click Away
        </h2>
        <p className="text-lg md:text-xl  max-w-2xl mx-auto">
          Book now for exclusive access to Detroit’s top spots.
        </p>
      </div> */}

      {/* <div className="text-center">
        <Link to="/Partner">
          <button className="bg-gray-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-600 mb-10 -mt-9 ">
            Start Partnering
          </button>
        </Link>
      </div> */}
      <Index />
      <Experience />
      <HowItWorks />
      <DetroitEpicWeekend />
      <AboutUsPage />
      <FAQs />
      <ContactUs />
    </>
  );
};

export default Home;
