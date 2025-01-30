import {
  FaCocktail,
  FaLandmark,
  FaMapMarkerAlt,
  FaMusic,
  FaUtensils,
} from "react-icons/fa";
export default function DetroitEpicWeekend() {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-dark mb-4">
            Detroit Epic Weekend Guide
          </h1>
          <p className=" text-light font-bold text-[#4b5563]">
            Your go-to guide for an unforgettable weekend in the Motor City
          </p>
        </div>

        {/* Day 1 */}
        <div className="mb-8 bg-gray-100 p-4 rounded-md">
          <h2 className="text-xl pl-4 font-bold text-blue-700 mb-4">
            Day 1: Exploring the Heart of Detroit
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Morning */}
            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-start">
              <div className=" mb-4">
                <FaMapMarkerAlt className="text-2xl text-green-500 " />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Morning: Downtown Stroll
              </h3>
              <p className="text-gray-600 text-sm">
                Start your day with a walk around the vibrant downtown area.
                Visit Campus Martius Park and grab a coffee from a local café.
              </p>
            </div>

            {/* Afternoon */}
            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-start">
              <div className=" mb-4">
                <FaLandmark className="text-2xl text-purple-500 " />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Afternoon: Detroit Institute of Arts
              </h3>
              <p className="text-gray-600 text-sm">
                Explore the renowned Detroit Institute of Arts, showcasing art
                from across the globe.
              </p>
            </div>

            {/* Evening */}
            <div className="bg-white shadow-lg rounded-lg p-6 h-full">
              <div className=" mb-4">
                <FaUtensils className="text-3xl text-red-500 mr-4" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Evening: Dinner at Selden Standard
              </h3>
              <p className="text-gray-600 text-sm">
                Enjoy a delicious dinner at Selden Standard, known for upscale
                comfort food with locally-sourced ingredients.
              </p>
            </div>

            {/* Night */}
            <div className="bg-white shadow-lg rounded-lg p-6 h-full">
              <div className="flex items-start mb-4">
                <FaMusic className="text-3xl text-yellow-500 mr-4" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Night: Jazz at Cliff Bell's
              </h3>
              <p className="text-gray-600 text-sm">
                End your day at Cliff Bell's, a famous jazz club offering live
                music and cocktails in an Art Deco setting.
              </p>
            </div>
          </div>
        </div>

        {/* Day 2 */}
        <div className="mb-8 bg-gray-100 p-4 rounded-md">
          <h2 className="text-xl pl-4 font-bold text-blue-700 mb-4">
            Day 2: Adventure and Entertainment
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Morning */}
            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-start">
              <div className="mb-4">
                <FaMapMarkerAlt className="text-2xl text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Morning: Eastern Market
              </h3>
              <p className="text-gray-600 text-sm">
                Visit Eastern Market, one of the nation's largest public
                markets, and enjoy fresh produce and artisan goods.
              </p>
            </div>

            {/* Afternoon */}
            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-start">
              <div className="mb-4">
                <FaMapMarkerAlt className="text-2xl text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Afternoon: Belle Isle Park
              </h3>
              <p className="text-gray-600 text-sm">
                Head to Belle Isle Park for outdoor fun, nature trails, and
                stunning views of the Detroit skyline..
              </p>
            </div>

            {/* Evening */}
            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-start">
              <div className="mb-4">
                <FaUtensils className="text-2xl text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Evening: Dinner at Wright & Company
              </h3>
              <p className="text-gray-600 text-sm">
                Dine in style at Wright & Company, offering small plates and
                craft cocktails in a trendy setting.
              </p>
            </div>

            {/* Night */}
            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-start">
              <div className="mb-4">
                <FaCocktail className="text-2xl text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Night: Drinks at The Sugar House
              </h3>
              <p className="text-gray-600 text-sm">
                Wrap up your weekend at The Sugar House, known for its creative
                and expertly crafted cocktails.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
