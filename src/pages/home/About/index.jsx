import img from "../../../assets/images/about-_KEk4mnC.jpg";

const AboutUsPage = () => {
  return (
    <>
      <div className="pb-3 pt-3 bg-[#e5e7eb]">
        <div className="max-w-[945px] mx-auto bg-white shadow-sm rounded-lg p-2 lg:p-12">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 -mt-9 mb-8">
            About Us
          </h1>
          <div className="relative">
            <img
              src={img}
              alt="Detroit City"
              className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover mb-7 rounded-lg shadow-md"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 rounded-lg flex items-center justify-center px-4">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white text-center">
                Explore Detroit with Personalized Weekend Getaways
              </h1>
            </div>
          </div>
          <p className="text-lg text-gray-700 text-center mb-6">
            At{" "}
            <span className="font-bold text-indigo-600">
              Detroit Epic Weekend
            </span>
            , we aim to make every moment of your visit extraordinary with
            curated, personalized experiences.
          </p>
          {/* <ul className="space-y-6">
            {points.map((point, idx) => (
              <li key={idx} className="flex items-start text-gray-700 text-lg">
                <FaCheckCircle className="text-indigo-600 w-6 h-6 mr-4 mt-1" />
                <span>{point}</span>
              </li>
            ))}
          </ul> */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-9 pt-6 cursor-pointer">
            <div className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0 "
                viewBox="0 0 512 512"
                className="text-indigo-600 w-8 h-8"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path>
              </svg>
              <p className="text-gray-700 text-sm mt-4">
                We believe every visit to our vibrant city should be
                unforgettable.
              </p>
            </div>
            <div className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 352 512"
                className="text-indigo-600 w-8 h-8"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M176 80c-52.94 0-96 43.06-96 96 0 8.84 7.16 16 16 16s16-7.16 16-16c0-35.3 28.72-64 64-64 8.84 0 16-7.16 16-16s-7.16-16-16-16zM96.06 459.17c0 3.15.93 6.22 2.68 8.84l24.51 36.84c2.97 4.46 7.97 7.14 13.32 7.14h78.85c5.36 0 10.36-2.68 13.32-7.14l24.51-36.84c1.74-2.62 2.67-5.7 2.68-8.84l.05-43.18H96.02l.04 43.18zM176 0C73.72 0 0 82.97 0 176c0 44.37 16.45 84.85 43.56 115.78 16.64 18.99 42.74 58.8 52.42 92.16v.06h48v-.12c-.01-4.77-.72-9.51-2.15-14.07-5.59-17.81-22.82-64.77-62.17-109.67-20.54-23.43-31.52-53.15-31.61-84.14-.2-73.64 59.67-128 127.95-128 70.58 0 128 57.42 128 128 0 30.97-11.24 60.85-31.65 84.14-39.11 44.61-56.42 91.47-62.1 109.46a47.507 47.507 0 0 0-2.22 14.3v.1h48v-.05c9.68-33.37 35.78-73.18 52.42-92.16C335.55 260.85 352 220.37 352 176 352 78.8 273.2 0 176 0z"></path>
              </svg>
              <p className="text-gray-700 text-sm mt-4">
                Our dedicated team of local experts combines years of experience
                with cutting-edge AI technology.
              </p>
            </div>
            <div className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 448 512"
                className="text-indigo-600 w-8 h-8"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M400 64h-48V12c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v52H160V12c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v52H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 400H54a6 6 0 0 1-6-6V160h352v298a6 6 0 0 1-6 6zm-52.849-200.65L198.842 404.519c-4.705 4.667-12.303 4.637-16.971-.068l-75.091-75.699c-4.667-4.705-4.637-12.303.068-16.971l22.719-22.536c4.705-4.667 12.303-4.637 16.97.069l44.104 44.461 111.072-110.181c4.705-4.667 12.303-4.637 16.971.068l22.536 22.718c4.667 4.705 4.636 12.303-.069 16.97z"></path>
              </svg>
              <p className="text-gray-700 text-sm mt-4">
                Personalized weekend itineraries tailored to your unique
                preferences.
              </p>
            </div>
            <div className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 496 512"
                className="text-indigo-600 w-8 h-8"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm84-143.4c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.6-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.2-8.4-25.3-7.1-33.8 3.1zM136.5 211c7.7-13.7 19.2-21.6 31.5-21.6s23.8 7.9 31.5 21.6l9.5 17c2.1 3.7 6.2 4.7 9.3 3.7 3.6-1.1 6-4.5 5.7-8.3-3.3-42.1-32.2-71.4-56-71.4s-52.7 29.3-56 71.4c-.3 3.7 2.1 7.2 5.7 8.3 3.4 1.1 7.4-.5 9.3-3.7l9.5-17zM328 152c-23.8 0-52.7 29.3-56 71.4-.3 3.7 2.1 7.2 5.7 8.3 3.5 1.1 7.4-.5 9.3-3.7l9.5-17c7.7-13.7 19.2-21.6 31.5-21.6s23.8 7.9 31.5 21.6l9.5 17c2.1 3.7 6.2 4.7 9.3 3.7 3.6-1.1 6-4.5 5.7-8.3-3.3-42.1-32.2-71.4-56-71.4z"></path>
              </svg>
              <p className="text-gray-700 text-sm mt-4">
                Discover the best that Detroit has to offer—romance, adventure,
                or relaxation!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;
