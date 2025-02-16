// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// function AiEngine() {
//   const location = useLocation();
//   const { suggestions } = location.state || {}; // Safely access the itinerary data

//   const [groupedActivities, setGroupedActivities] = useState({});

//   useEffect(() => {
//     if (suggestions) {
//       const activitiesByDay = suggestions.reduce((acc, item) => {
//         if (item.activities && item.activities.length > 0) {
//           const dayTitle = item.dayTitle;
//           acc[dayTitle] = item.activities.reduce((dayAcc, activity) => {
//             const { timeSlot } = activity;
//             if (!dayAcc[timeSlot]) dayAcc[timeSlot] = [];
//             dayAcc[timeSlot].push(activity);
//             return dayAcc;
//           }, {});
//         }
//         return acc;
//       }, {});
//       setGroupedActivities(activitiesByDay);
//     }
//   }, [suggestions]);

//   const [selectedDay, setSelectedDay] = useState(null);

//   useEffect(() => {
//     if (Object.keys(groupedActivities).length > 0) {
//       // Automatically select the first day initially
//       const firstDay = Object.keys(groupedActivities)[0];
//       setSelectedDay(firstDay);
//     }
//   }, [groupedActivities]);

//   const handleClickDay = (dayTitle) => {
//     setSelectedDay((prevDay) => (prevDay === dayTitle ? null : dayTitle)); // Toggle day selection
//   };

//   return (
//     <div
//       className="relative flex size-full min-h-screen flex-col bg-[#f8fafb] group/design-root overflow-x-hidden"
//       style={{ fontFamily: "'Plus Jakarta Sans', 'Noto Sans', sans-serif" }}
//     >
//       <div className="layout-container flex h-full grow flex-col">
//         <div className="gap-1 px-6 flex flex-1 justify-center py-5">
//           {/* Side panel for day selection */}
//           <div className="layout-content-container flex flex-col w-80">
//             <h3 className="text-[#0e161b] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
//               Your Itinerary
//             </h3>
//             {suggestions && Array.isArray(suggestions) ? (
//               suggestions.map((item, index) => {
//                 const dayTitle = item.dayTitle;
//                 // console.log("day title is", item.dayTitle);
//                 // console.log("suggestions are", suggestions[0].dayTitle);
//                 return (
//                   <div
//                     key={index}
//                     onClick={() => handleClickDay(dayTitle)} // Toggle day selection
//                     className={`flex items-center gap-4 bg-[#f8fafb] px-4 min-h-[72px] py-2 cursor-pointer ${
//                       selectedDay === dayTitle ? "bg-[#e0f4ff]" : ""
//                     }`}
//                   >
//                     <div className="text-[#0e161b] flex items-center justify-center rounded-lg bg-[#e8eef3] shrink-0 size-12">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24px"
//                         height="24px"
//                         fill="currentColor"
//                         viewBox="0 0 256 256"
//                       >
//                         <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"></path>
//                       </svg>
//                     </div>
//                     <div className="flex flex-col justify-center">
//                       <p className="text-[#0e161b] text-base font-medium leading-normal">
//                         {dayTitle || "No Day Title"}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })
//             ) : (
//               <p className="px-4 py-2 text-sm text-gray-500">
//                 No itinerary data available.
//               </p>
//             )}
//           </div>

//           {/* Main content */}
//           <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
//             {selectedDay && (
//               <div className="p-4">
//                 {Object.entries(groupedActivities[selectedDay] || {}).map(
//                   ([timeSlot, activities]) => (
//                     <div key={timeSlot} className="mb-6">
//                       <h4 className="text-[#0e161b] text-lg font-bold mb-4">
//                         {timeSlot}
//                       </h4>
//                       {activities.map((activity, index) => (
//                         <div key={index} className="mb-4 shadow-lg rounded-lg">
//                           <div className="flex items-center gap-4 py-3 bg-[#f8fafb] px-4 min-h-14">
//                             <div
//                               className="text-[#0e161b] flex items-center justify-center rounded-lg bg-[#e8eef3] shrink-0 size-10"
//                               data-icon="Clock"
//                               data-size="24px"
//                               data-weight="regular"
//                             >
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 width="24px"
//                                 height="24px"
//                                 fill="currentColor"
//                                 viewBox="0 0 256 256"
//                               >
//                                 <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
//                               </svg>
//                             </div>
//                             <p className="text-[#0e161b] text-base font-normal leading-normal flex-1 truncate">
//                               {activity.title}
//                             </p>
//                           </div>
//                           <span className="bg-[#507a95] ms-5 py-1 w-[15%] px-4 rounded-lg text-white">
//                             {activity.budget}
//                           </span>
//                           <div className="p-4">
//                             {/* Heading with Icon */}
//                             <div className="flex items-center mb-2">
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-6 w-6 text-[#507a95] mr-2"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                                 strokeWidth={2}
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   d="M9 12h6m-6 0a3 3 0 106 0 3 3 0 10-6 0zm9-7v2a1 1 0 001 1h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1zm0 10v2a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 00-1-1h-2a1 1 0 00-1 1zM4 5v2a1 1 0 001 1h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1zm0 10v2a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1z"
//                                 />
//                               </svg>
//                               <h3 className="text-[#507a95] text-base font-bold">
//                                 Activity Details
//                               </h3>
//                             </div>
//                             {/* Description */}
//                             <p className="text-[#507a95] text-base font-normal leading-normal">
//                               {activity.description}
//                             </p>
//                             {/* Transportation Guide */}
//                             <div className="flex items-center mt-4">
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-6 w-6 text-[#507a95] mr-2"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                                 strokeWidth={2}
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   d="M3 10h11m-6 0H5a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2v-1m6-5h3m-3 0a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2v-1"
//                                 />
//                               </svg>
//                               <h3 className="text-[#507a95] text-base font-bold">
//                                 Transportation Guide
//                               </h3>
//                             </div>
//                             <p className="text-[#507a95] text-base font-normal leading-normal">
//                               {activity.transportationGuide}
//                             </p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AiEngine;

// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// function AiEngine() {
//   const location = useLocation();
//   const { suggestions } = location.state || {}; // Safely access the itinerary data

//   const [groupedActivities, setGroupedActivities] = useState({});
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [showNotifications, setShowNotifications] = useState(false); // State for notification visibility

//   useEffect(() => {
//     if (suggestions) {
//       const activitiesByDay = suggestions.reduce((acc, item) => {
//         if (item.activities && item.activities.length > 0) {
//           const dayTitle = item.dayTitle;
//           acc[dayTitle] = item.activities.reduce((dayAcc, activity) => {
//             const { timeSlot } = activity;
//             if (!dayAcc[timeSlot]) dayAcc[timeSlot] = [];
//             dayAcc[timeSlot].push(activity);
//             return dayAcc;
//           }, {});
//         }
//         return acc;
//       }, {});
//       setGroupedActivities(activitiesByDay);
//     }
//   }, [suggestions]);

//   useEffect(() => {
//     if (Object.keys(groupedActivities).length > 0) {
//       // Automatically select the first day initially
//       const firstDay = Object.keys(groupedActivities)[0];
//       setSelectedDay(firstDay);
//     }
//   }, [groupedActivities]);

//   const handleClickDay = (dayTitle) => {
//     setSelectedDay((prevDay) => (prevDay === dayTitle ? null : dayTitle)); // Toggle day selection
//   };

//   const toggleNotifications = () => {
//     setShowNotifications((prev) => !prev); // Toggle notification visibility
//   };

//   return (
//     <div
//       className="relative flex size-full min-h-screen flex-col bg-[#f8fafb] group/design-root overflow-x-hidden"
//       style={{ fontFamily: "'Plus Jakarta Sans', 'Noto Sans', sans-serif" }}
//     >
//       {/* Notification Button */}
//       <div
//         className="fixed top-20 right-3 z-50 p-2 bg-white rounded-lg shadow-lg hover:cursor-pointer group"
//         onClick={toggleNotifications}
//       >
//         <svg
//           stroke="currentColor"
//           fill="currentColor"
//           strokeWidth="0"
//           viewBox="0 0 512 512"
//           className="text-3xl text-red-500 animate-bounce"
//           height="1em"
//           width="1em"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm0 336c-20.9 0-37.52-8.86-39.75-27.58a4 4 0 0 1 4-4.42h71.45a4 4 0 0 1 4 4.48C293.15 374.85 276.68 384 256 384zm98-48H158c-11.84 0-18-15-11.19-23 16.33-19.34 27.87-27.47 27.87-80.8 0-48.87 25.74-66.21 47-74.67a11.35 11.35 0 0 0 6.33-6.68C231.7 138.6 242.14 128 256 128s24.28 10.6 28 22.86a11.39 11.39 0 0 0 6.34 6.68c21.21 8.44 47 25.81 47 74.67 0 53.33 11.53 61.46 27.86 80.8 6.74 7.99.57 22.99-11.2 22.99z"></path>
//         </svg>
//         <span className="absolute right-12 top-3 w-max px-3 py-1 text-xs text-white bg-gray-800 rounded-md opacity-0 transition-opacity group-hover:opacity-100">
//           See The Available Events
//         </span>
//       </div>

//       {/* Notification Dropdown with Event Cards */}
//       {showNotifications && (
//         <div className="fixed top-32 right-3 z-50 bg-white rounded-lg shadow-lg p-4 w-96 max-h-[80vh] overflow-y-auto">
//           <h1 className="text-lg font-bold text-center mb-4">
//             Events in Detroit
//           </h1>
//           {/* Event Cards */}
//           <div className="space-y-4">
//             {/* Example Event Card */}
//             <div className="flex items-center gap-3 border-b pb-3">
//               <img
//                 src="https://s1.ticketm.net/dam/a/015/c6fbf2ff-8115-4f25-aeae-c61bed8d2015_1277431_EVENT_DETAIL_PAGE_16_9.jpg"
//                 alt="Detroit Red Wings vs. Minnesota Wild"
//                 className="w-20 h-20 object-cover rounded-md"
//               />
//               <div className="flex-1">
//                 <h3 className="text-sm font-semibold">
//                   Detroit Red Wings vs. Minnesota Wild
//                 </h3>
//                 <p className="text-xs text-gray-600">Sat Feb 22 2025</p>
//                 <p className="text-xs text-gray-600">12:30:00</p>
//                 <p className="text-xs text-gray-500">
//                   <span className="font-semibold">Status:</span> onsale
//                 </p>
//                 <p className="text-xs text-blue-500">
//                   <a
//                     href="https://www.ticketmaster.com/detroit-red-wings-vs-minnesota-wild-detroit-michigan-02-22-2025/event/080060E2A66A2A37"
//                     target="_blank"
//                     className="text-blue underline underline-offset-4"
//                     rel="noopener noreferrer"
//                   >
//                     More Info
//                   </a>
//                 </p>
//               </div>
//             </div>

//             {/* Add more event cards here */}
//             {/* Example: Repeat the above structure for each event */}
//             <div className="flex items-center gap-3 border-b pb-3">
//               <img
//                 src="https://s1.ticketm.net/dam/a/63c/4cdbcc8d-e52a-4b64-9075-18782539663c_TABLET_LANDSCAPE_LARGE_16_9.jpg"
//                 alt="Detroit Tigers vs. New York Yankees"
//                 className="w-20 h-20 object-cover rounded-md"
//               />
//               <div className="flex-1">
//                 <h3 className="text-sm font-semibold">
//                   Detroit Tigers vs. New York Yankees
//                 </h3>
//                 <p className="text-xs text-gray-600">Mon Apr 07 2025</p>
//                 <p className="text-xs text-gray-600">18:40:00</p>
//                 <p className="text-xs text-gray-500">
//                   <span className="font-semibold">Status:</span> onsale
//                 </p>
//                 <p className="text-xs text-blue-500">
//                   <a
//                     href="https://www.ticketmaster.com/event/Z7r9jZ1A7uO0p"
//                     target="_blank"
//                     className="text-blue underline underline-offset-4"
//                     rel="noopener noreferrer"
//                   >
//                     More Info
//                   </a>
//                 </p>
//               </div>
//             </div>

//             {/* Add more event cards as needed */}
//           </div>
//         </div>
//       )}

//   {/* Rest of the AiEngine component */}
//   <div className="layout-container flex h-full grow flex-col">
//     <div className="gap-1 px-6 flex flex-1 justify-center py-5">
//       {/* Side panel for day selection */}
//       <div className="layout-content-container flex flex-col w-80">
//         <h3 className="text-[#0e161b] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
//           Your Itinerary
//         </h3>
//         {suggestions && Array.isArray(suggestions) ? (
//           suggestions.map((item, index) => {
//             const dayTitle = item.dayTitle;
//             return (
//               <div
//                 key={index}
//                 onClick={() => handleClickDay(dayTitle)}
//                 className={`flex items-center gap-4 bg-[#f8fafb] px-4 min-h-[72px] py-2 cursor-pointer ${
//                   selectedDay === dayTitle ? "bg-[#e0f4ff]" : ""
//                 }`}
//               >
//                 <div className="text-[#0e161b] flex items-center justify-center rounded-lg bg-[#e8eef3] shrink-0 size-12">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24px"
//                     height="24px"
//                     fill="currentColor"
//                     viewBox="0 0 256 256"
//                   >
//                     <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"></path>
//                   </svg>
//                 </div>
//                 <div className="flex flex-col justify-center">
//                   <p className="text-[#0e161b] text-base font-medium leading-normal">
//                     {dayTitle || "No Day Title"}
//                   </p>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <p className="px-4 py-2 text-sm text-gray-500">
//             No itinerary data available.
//           </p>
//         )}
//       </div>

//       {/* Main content */}
//       <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
//         {selectedDay && (
//           <div className="p-4">
//             {Object.entries(groupedActivities[selectedDay] || {}).map(
//               ([timeSlot, activities]) => (
//                 <div key={timeSlot} className="mb-6">
//                   <h4 className="text-[#0e161b] text-lg font-bold mb-4">
//                     {timeSlot}
//                   </h4>
//                   {activities.map((activity, index) => (
//                     <div key={index} className="mb-4 shadow-lg rounded-lg">
//                       <div className="flex items-center gap-4 py-3 bg-[#f8fafb] px-4 min-h-14">
//                         <div
//                           className="text-[#0e161b] flex items-center justify-center rounded-lg bg-[#e8eef3] shrink-0 size-10"
//                           data-icon="Clock"
//                           data-size="24px"
//                           data-weight="regular"
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width="24px"
//                             height="24px"
//                             fill="currentColor"
//                             viewBox="0 0 256 256"
//                           >
//                             <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
//                           </svg>
//                         </div>
//                         <p className="text-[#0e161b] text-base font-normal leading-normal flex-1 truncate">
//                           {activity.title}
//                         </p>
//                       </div>
//                       <span className="bg-[#507a95] ms-5 py-1 w-[15%] px-4 rounded-lg text-white">
//                         {activity.budget}
//                       </span>
//                       <div className="p-4">
//                         {/* Heading with Icon */}
//                         <div className="flex items-center mb-2">
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-6 w-6 text-[#507a95] mr-2"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                             strokeWidth={2}
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               d="M9 12h6m-6 0a3 3 0 106 0 3 3 0 10-6 0zm9-7v2a1 1 0 001 1h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1zm0 10v2a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 00-1-1h-2a1 1 0 00-1 1zM4 5v2a1 1 0 001 1h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1zm0 10v2a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1z"
//                             />
//                           </svg>
//                           <h3 className="text-[#507a95] text-base font-bold">
//                             Activity Details
//                           </h3>
//                         </div>
//                         {/* Description */}
//                         <p className="text-[#507a95] text-base font-normal leading-normal">
//                           {activity.description}
//                         </p>
//                         {/* Transportation Guide */}
//                         <div className="flex items-center mt-4">
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-6 w-6 text-[#507a95] mr-2"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                             strokeWidth={2}
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               d="M3 10h11m-6 0H5a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2v-1m6-5h3m-3 0a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2v-1"
//                             />
//                           </svg>
//                           <h3 className="text-[#507a95] text-base font-bold">
//                             Transportation Guide
//                           </h3>
//                         </div>
//                         <p className="text-[#507a95] text-base font-normal leading-normal">
//                           {activity.transportationGuide}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   </div>
// </div>
//   );
// }

// export default AiEngine;

// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// // Event data
// const events = [
//   {
//     id: 1,
//     image:
//       "https://s1.ticketm.net/dam/a/015/c6fbf2ff-8115-4f25-aeae-c61bed8d2015_1277431_EVENT_DETAIL_PAGE_16_9.jpg",
//     title: "Detroit Red Wings vs. Minnesota Wild",
//     date: "Sat Feb 22 2025",
//     time: "12:30:00",
//     status: "onsale",
//     link: "https://www.ticketmaster.com/detroit-red-wings-vs-minnesota-wild-detroit-michigan-02-22-2025/event/080060E2A66A2A37",
//   },
//   {
//     id: 2,
//     image:
//       "https://s1.ticketm.net/dam/a/015/c6fbf2ff-8115-4f25-aeae-c61bed8d2015_1277431_EVENT_DETAIL_PAGE_16_9.jpg",
//     title: "Detroit Red Wings vs. Boston Bruins",
//     date: "Sat Mar 29 2025",
//     time: "20:00:00",
//     status: "onsale",
//     link: "https://www.ticketmaster.com/detroit-red-wings-vs-boston-bruins-detroit-michigan-03-29-2025/event/080060E2A6932B0D",
//   },

//   {
//     id: 3,
//     image:
//       "https://s1.ticketm.net/dam/a/015/c6fbf2ff-8115-4f25-aeae-c61bed8d2015_1277431_EVENT_DETAIL_PAGE_16_9.jpg",
//     title: "Detroit Red Wings vs. Vegas Golden Knights",
//     date: "Sun Mar 16 2025",
//     time: "13:00:00",
//     status: "onsale",
//     link: "https://www.ticketmaster.com/detroit-red-wings-vs-boston-bruins-detroit-michigan-03-29-2025/event/080060E2A6932B0D",
//   },

//   {
//     id: 4,
//     image:
//       "https://s1.ticketm.net/dam/a/015/c6fbf2ff-8115-4f25-aeae-c61bed8d2015_1277431_EVENT_DETAIL_PAGE_16_9.jpg",
//     title: "Detroit Red Wings vs. Boston Bruins",
//     date: "Sun april 06 2025",
//     time: "23:00:00",
//     status: "onsale",
//     link: "https://www.ticketmaster.com/detroit-red-wings-vs-boston-bruins-detroit-michigan-03-29-2025/event/080060E2A6932B0D",
//   },

//   {
//     id: 5,
//     image:
//       "https://s1.ticketm.net/dam/a/63c/4cdbcc8d-e52a-4b64-9075-18782539663c_TABLET_LANDSCAPE_LARGE_16_9.jpg",
//     title: "Detroit Pistons vs. Charlotte Hornets",
//     date: "Thu Feb 27 2025",
//     time: "10:00:00",
//     status: "onsale",
//     link: "https://www.ticketmaster.com/detroit-red-wings-vs-boston-bruins-detroit-michigan-03-29-2025/event/080060E2A6932B0D",
//   },

//   {
//     id: 6,
//     image:
//       "https://s1.ticketm.net/dam/a/63c/4cdbcc8d-e52a-4b64-9075-18782539663c_TABLET_LANDSCAPE_LARGE_16_9.jpg",
//     title: "Detroit Tigers vs. New York Yankees",
//     date: "Sat Mar 29 2025",
//     time: "20:00:00",
//     status: "onsale",
//     link: "https://www.ticketmaster.com/detroit-red-wings-vs-boston-bruins-detroit-michigan-03-29-2025/event/080060E2A6932B0D",
//   },

//   {
//     id: 7,
//     image:
//       "https://s1.ticketm.net/dam/a/63c/4cdbcc8d-e52a-4b64-9075-18782539663c_TABLET_LANDSCAPE_LARGE_16_9.jpg",
//     title: "Detroit Tigers vs. New York Yankees",
//     date: "Sat Mar 29 2025",
//     time: "20:00:00",
//     status: "onsale",
//     link: "https://www.ticketmaster.com/detroit-red-wings-vs-boston-bruins-detroit-michigan-03-29-2025/event/080060E2A6932B0D",
//   },

//   {
//     id: 8,
//     image:
//       "https://s1.ticketm.net/dam/a/63c/4cdbcc8d-e52a-4b64-9075-18782539663c_TABLET_LANDSCAPE_LARGE_16_9.jpg",
//     title: "Detroit Tigers vs. New York Yankees",
//     date: "Sat Mar 29 2025",
//     time: "20:00:00",
//     status: "onsale",
//     link: "https://www.ticketmaster.com/detroit-red-wings-vs-boston-bruins-detroit-michigan-03-29-2025/event/080060E2A6932B0D",
//   },

//   {
//     id: 9,
//     image:
//       "https://s1.ticketm.net/dam/a/63c/4cdbcc8d-e52a-4b64-9075-18782539663c_TABLET_LANDSCAPE_LARGE_16_9.jpg",
//     title: "Detroit Pistons vs. Memphis Grizzlies",
//     date: "Sat Apr 05 2025",
//     time: "10:00:00",
//     status: "onsale",
//     link: "https://www.ticketmaster.com/detroit-red-wings-vs-boston-bruins-detroit-michigan-03-29-2025/event/080060E2A6932B0D",
//   },

//   {
//     id: 10,
//     image:
//       "https://s1.ticketm.net/dam/a/015/c6fbf2ff-8115-4f25-aeae-c61bed8d2015_1277431_EVENT_DETAIL_PAGE_16_9.jpg",
//     title: "Detroit Red Wings vs. Vegas Golden Knights",
//     date: "Sun Mar 16 2025",
//     time: "13:00:00",
//     status: "onsale",
//     link: "https://www.ticketmaster.com/detroit-red-wings-vs-boston-bruins-detroit-michigan-03-29-2025/event/080060E2A6932B0D",
//   },

//   {
//     id: 11,
//     image:
//       "https://s1.ticketm.net/dam/a/015/c6fbf2ff-8115-4f25-aeae-c61bed8d2015_1277431_EVENT_DETAIL_PAGE_16_9.jpg",
//     title: "Detroit Pistons v Milwaukee Bucks (Fashion Glasses Giveaway)",
//     date: "Sun april 16 2025",
//     time: "19:00:00",
//     status: "onsale",
//     link: "https://www.ticketmaster.com/detroit-red-wings-vs-boston-bruins-detroit-michigan-03-29-2025/event/080060E2A6932B0D",
//   },

//   // Add more events here...
// ];

// function AiEngine() {
//   const location = useLocation();
//   const { suggestions } = location.state || {}; // Safely access the itinerary data

//   const [groupedActivities, setGroupedActivities] = useState({});
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [showNotifications, setShowNotifications] = useState(false); // State for notification visibility

//   useEffect(() => {
//     if (suggestions) {
//       const activitiesByDay = suggestions.reduce((acc, item) => {
//         if (item.activities && item.activities.length > 0) {
//           const dayTitle = item.dayTitle;
//           acc[dayTitle] = item.activities.reduce((dayAcc, activity) => {
//             const { timeSlot } = activity;
//             if (!dayAcc[timeSlot]) dayAcc[timeSlot] = [];
//             dayAcc[timeSlot].push(activity);
//             return dayAcc;
//           }, {});
//         }
//         return acc;
//       }, {});
//       setGroupedActivities(activitiesByDay);
//     }
//   }, [suggestions]);

//   useEffect(() => {
//     if (Object.keys(groupedActivities).length > 0) {
//       // Automatically select the first day initially
//       const firstDay = Object.keys(groupedActivities)[0];
//       setSelectedDay(firstDay);
//     }
//   }, [groupedActivities]);

//   const handleClickDay = (dayTitle) => {
//     setSelectedDay((prevDay) => (prevDay === dayTitle ? null : dayTitle)); // Toggle day selection
//   };

//   const toggleNotifications = () => {
//     setShowNotifications((prev) => !prev); // Toggle notification visibility
//   };

//   // return (
//   //   <div
//   //     className="relative flex size-full min-h-screen flex-col bg-[#f8fafb] group/design-root overflow-x-hidden"
//   //     style={{ fontFamily: "'Plus Jakarta Sans', 'Noto Sans', sans-serif" }}
//   //   >
//   //     {/* Notification Button */}
//   //     <div
//   //       className="fixed top-20 right-3 z-50 p-2 bg-white rounded-lg shadow-lg hover:cursor-pointer group"
//   //       onClick={toggleNotifications}
//   //     >
//   //       <svg
//   //         stroke="currentColor"
//   //         fill="currentColor"
//   //         strokeWidth="0"
//   //         viewBox="0 0 512 512"
//   //         className="text-3xl text-red-500 animate-bounce"
//   //         height="1em"
//   //         width="1em"
//   //         xmlns="http://www.w3.org/2000/svg"
//   //       >
//   //         <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm0 336c-20.9 0-37.52-8.86-39.75-27.58a4 4 0 0 1 4-4.42h71.45a4 4 0 0 1 4 4.48C293.15 374.85 276.68 384 256 384zm98-48H158c-11.84 0-18-15-11.19-23 16.33-19.34 27.87-27.47 27.87-80.8 0-48.87 25.74-66.21 47-74.67a11.35 11.35 0 0 0 6.33-6.68C231.7 138.6 242.14 128 256 128s24.28 10.6 28 22.86a11.39 11.39 0 0 0 6.34 6.68c21.21 8.44 47 25.81 47 74.67 0 53.33 11.53 61.46 27.86 80.8 6.74 7.99.57 22.99-11.2 22.99z"></path>
//   //       </svg>
//   //       <span className="absolute right-12 top-3 w-max px-3 py-1 text-xs text-white bg-gray-800 rounded-md opacity-0 transition-opacity group-hover:opacity-100">
//   //         See The Available Events
//   //       </span>
//   //     </div>

//   //     {/* Notification Dropdown with Event Cards */}
//   //     {showNotifications && (
//   //       <div className="fixed top-32 right-3 z-50 bg-white rounded-lg shadow-lg p-4 w-96 max-h-[80vh] overflow-y-auto">
//   //         <h1 className="text-lg font-bold text-center mb-4">
//   //           Events in Detroit
//   //         </h1>
//   //         <div className="space-y-4">
//   //           {events.map((event) => (
//   //             <div
//   //               key={event.id}
//   //               className="flex items-center gap-3 border-b pb-3"
//   //             >
//   //               <img
//   //                 src={event.image}
//   //                 alt={event.title}
//   //                 className="w-20 h-20 object-cover rounded-md"
//   //               />
//   //               <div className="flex-1">
//   //                 <h3 className="text-sm font-semibold">{event.title}</h3>
//   //                 <p className="text-xs text-gray-600">{event.date}</p>
//   //                 <p className="text-xs text-gray-600">{event.time}</p>
//   //                 <p className="text-xs text-gray-500">
//   //                   <span className="font-semibold">Status:</span>{" "}
//   //                   {event.status}
//   //                 </p>
//   //                 <p className="text-xs text-blue-500">
//   //                   <a
//   //                     href={event.link}
//   //                     target="_blank"
//   //                     className="text-blue underline underline-offset-4"
//   //                     rel="noopener noreferrer"
//   //                   >
//   //                     More Info
//   //                   </a>
//   //                 </p>
//   //               </div>
//   //             </div>
//   //           ))}
//   //         </div>
//   //       </div>
//   //     )}

  //     {/* Rest of the AiEngine component */}
//   //     <div className="layout-container flex h-full grow flex-col">
//   //       <div className="gap-1 px-6 flex flex-1 justify-center py-5">
  //         {/* Side panel for day selection */}
//   //         <div className="layout-content-container flex flex-col w-80">
//   //           <h3 className="text-[#0e161b] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
//   //             Your Itinerary
//   //           </h3>
  //           {suggestions && Array.isArray(suggestions) ? (
//   //             suggestions.map((item, index) => {
//   //               const dayTitle = item.dayTitle;
//   //               return (
//   //                 <div
//   //                   key={index}
//   //                   onClick={() => handleClickDay(dayTitle)}
//   //                   className={`flex items-center gap-4 bg-[#f8fafb] px-4 min-h-[72px] py-2 cursor-pointer ${
//   //                     selectedDay === dayTitle ? "bg-[#e0f4ff]" : ""
//   //                   }`}
//   //                 >
//   //                   <div className="text-[#0e161b] flex items-center justify-center rounded-lg bg-[#e8eef3] shrink-0 size-12">
//   //                     <svg
//   //                       xmlns="http://www.w3.org/2000/svg"
//   //                       width="24px"
//   //                       height="24px"
//   //                       fill="currentColor"
//   //                       viewBox="0 0 256 256"
//   //                     >
//   //                       <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"></path>
//   //                     </svg>
//   //                   </div>
//   //                   <div className="flex flex-col justify-center">
//   //                     <p className="text-[#0e161b] text-base font-medium leading-normal">
//   //                       {dayTitle || "No Day Title"}
//   //                     </p>
//   //                   </div>
//   //                 </div>
//   //               );
//   //             })
//   //           ) : (
//   //             <p className="px-4 py-2 text-sm text-gray-500">
//   //               No itinerary data available.
//   //             </p>
//   //           )}
//   //         </div>

  //         {/* Main content */}
//   //         <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
//   //           {selectedDay && (
//   //             <div className="p-4">
//   //               {Object.entries(groupedActivities[selectedDay] || {}).map(
//   //                 ([timeSlot, activities]) => (
//   //                   <div key={timeSlot} className="mb-6">
//   //                     <h4 className="text-[#0e161b] text-lg font-bold mb-4">
//   //                       {timeSlot}
//   //                     </h4>
//   //                     {activities.map((activity, index) => (
//   //                       <div key={index} className="mb-4 shadow-lg rounded-lg">
//   //                         <div className="flex items-center gap-4 py-3 bg-[#f8fafb] px-4 min-h-14">
//   //                           <div
//   //                             className="text-[#0e161b] flex items-center justify-center rounded-lg bg-[#e8eef3] shrink-0 size-10"
//   //                             data-icon="Clock"
//   //                             data-size="24px"
//   //                             data-weight="regular"
//   //                           >
//   //                             <svg
//   //                               xmlns="http://www.w3.org/2000/svg"
//   //                               width="24px"
//   //                               height="24px"
//   //                               fill="currentColor"
//   //                               viewBox="0 0 256 256"
//   //                             >
//   //                               <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
//   //                             </svg>
//   //                           </div>
//   //                           <p className="text-[#0e161b] text-base font-normal leading-normal flex-1 truncate">
//   //                             {activity.title}
//   //                           </p>
//   //                         </div>
//   //                         <span className="bg-[#507a95] ms-5 py-1 w-[15%] px-4 rounded-lg text-white">
//   //                           {activity.budget}
//   //                         </span>
//   //                         <div className="p-4">
//   //                           {/* Heading with Icon */}
//   //                           <div className="flex items-center mb-2">
//   //                             <svg
//   //                               xmlns="http://www.w3.org/2000/svg"
//   //                               className="h-6 w-6 text-[#507a95] mr-2"
//   //                               fill="none"
//   //                               viewBox="0 0 24 24"
//   //                               stroke="currentColor"
//   //                               strokeWidth={2}
//   //                             >
//   //                               <path
//   //                                 strokeLinecap="round"
//   //                                 strokeLinejoin="round"
//   //                                 d="M9 12h6m-6 0a3 3 0 106 0 3 3 0 10-6 0zm9-7v2a1 1 0 001 1h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1zm0 10v2a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 00-1-1h-2a1 1 0 00-1 1zM4 5v2a1 1 0 001 1h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1zm0 10v2a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1z"
//   //                               />
//   //                             </svg>
//   //                             <h3 className="text-[#507a95] text-base font-bold">
//   //                               Activity Details
//   //                             </h3>
//   //                           </div>
//   //                           {/* Description */}
//   //                           <p className="text-[#507a95] text-base font-normal leading-normal">
//   //                             {activity.description}
//   //                           </p>
//   //                           {/* Transportation Guide */}
//   //                           <div className="flex items-center mt-4">
//   //                             <svg
//   //                               xmlns="http://www.w3.org/2000/svg"
//   //                               className="h-6 w-6 text-[#507a95] mr-2"
//   //                               fill="none"
//   //                               viewBox="0 0 24 24"
//   //                               stroke="currentColor"
//   //                               strokeWidth={2}
//   //                             >
//   //                               <path
//   //                                 strokeLinecap="round"
//   //                                 strokeLinejoin="round"
//   //                                 d="M3 10h11m-6 0H5a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2v-1m6-5h3m-3 0a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2v-1"
//   //                               />
//   //                             </svg>
//   //                             <h3 className="text-[#507a95] text-base font-bold">
//   //                               Transportation Guide
//   //                             </h3>
//   //                           </div>
//   //                           <p className="text-[#507a95] text-base font-normal leading-normal">
//   //                             {activity.transportationGuide}
//   //                           </p>
//   //                         </div>
//   //                       </div>
//   //                     ))}
//   //                   </div>
//   //                 )
//   //               )}
//   //             </div>
//   //           )}
//   //         </div>
//   //       </div>
//   //     </div>
//   //   </div>
//   // );


// }
import { useEffect, useState } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { BsCalendar2Date } from "react-icons/bs";
import { IoMdTime } from "react-icons/io";
import { useParams } from 'react-router-dom';


import getSuggestions from '../../Apis/api.js'

const AiEngine = () => {

  let { id } = useParams();

  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Day 1');
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [loading,setLoading] =useState(false)
  const [events, setEvents] = useState([])
  const [data,setData]=useState([])
  const [dayTitle,setdayTitle]=useState('')
  const [selectedItinerary,setselectedItinerary]=useState([])
  const [profileData,setProfileData]=useState([])
  // const [selectedData,setSelectedData]=useState([])
  
// let selectedItinerary;


  const toggleNotifications = () => setShowNotifications(!showNotifications);
  const handleClickDay = (dayTitle) => setSelectedDay(dayTitle);
  const toggleSidePanel = () => setIsSidePanelOpen(!isSidePanelOpen);
  

  // Dummy data for demonstration
  // const events = [
  //   { id: 1, title: "Event 1", date: "2023-10-01", time: "10:00 AM", status: "Upcoming", link: "#", image: "https://via.placeholder.com/150" },
  //   { id: 2, title: "Event 2", date: "2023-10-02", time: "11:00 AM", status: "Upcoming", link: "#", image: "https://via.placeholder.com/150" },
  // ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log('before api call ')
        const response = await getSuggestions.getSuggestions(`${id}`);
        // if (!response.ok) {
        //   throw new Error(`HTTP error! Status: ${response.status}`);
        // }
        console.log('api data is here ',response)
        // const result = await response.json();
        setData(response);
      } catch (err) {
        console.log('err',err)
      } finally { 
        setLoading(false);
      }
    };

    fetchData();
    // console.log('inside user Effect')
  }, []); 


  useEffect(()=>{
     const data1 = data.find((day) => day.days == selectedDay);
    // const data1 =data.filter((day)=>{
    //   console.log(day)
    //   return day.days==selectedDay
    // })
    if(data1?.activities){
      setdayTitle(data1.dayTitle)
      setselectedItinerary(data1.activities)
      // console.log("day data is here ************",data1.activities)
    }
    // selectedData

  },[selectedDay,data])



  useEffect(()=>{
    const fetchEvents = async () => {
      try {
        const respose =  await getSuggestions.getEvents();
  
        // console.log("this is the events response :::: ",data);

        setEvents(respose)
        
      } catch (error) {
        console.log(error);
      }
    }
  fetchEvents();

  },[])

  useEffect(()=>{
    const fetchEvents = async () => {
      try {
        let data= await getSuggestions.Getitineraries()


        console.log("this is the Getitineraries response :::: ",data);
        const result = data.find( ( item ) => item._id == id);
        console.log('here is the result ',result)
        setProfileData(result)
        
      } catch (error) {
        console.log(error);
      }
    }
  fetchEvents();
  },[])
console.log('id is here id',id)
  // console.log('filter data on day =======',selectedItinerary)


  // const groupedActivities = {
  //   "Day 1": {
  //     "Morning": [
  //       { title: "Activity 1", budget: "$50", description: "Description 1", transportationGuide: "Guide 1" },
  //       { title: "Activity 2", budget: "$30", description: "Description 2", transportationGuide: "Guide 2" },
  //     ],
  //   },
  //   // Add more days and activities as needed
  // };


  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#f8fafb] group/design-root overflow-x-hidden font-grotesk"
      style={{ fontFamily: "'Plus Jakarta Sans', 'Noto Sans', sans-serif" }}
    >
      {/* ... (Notification Button and Side Panel - unchanged) */}

      <div
        className="fixed top-24 right-3 z-50 p-2 bg-white rounded-lg shadow-lg hover:cursor-pointer group"
        onClick={toggleNotifications}
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          className="text-3xl text-red-500 animate-bounce"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm0 336c-20.9 0-37.52-8.86-39.75-27.58a4 4 0 0 1 4-4.42h71.45a4 4 0 0 1 4 4.48C293.15 374.85 276.68 384 256 384zm98-48H158c-11.84 0-18-15-11.19-23 16.33-19.34 27.87-27.47 27.87-80.8 0-48.87 25.74-66.21 47-74.67a11.35 11.35 0 0 0 6.33-6.68C231.7 138.6 242.14 128 256 128s24.28 10.6 28 22.86a11.39 11.39 0 0 0 6.34 6.68c21.21 8.44 47 25.81 47 74.67 0 53.33 11.53 61.46 27.86 80.8 6.74 7.99.57 22.99-11.2 22.99z"></path>
        </svg>
        <span className="absolute right-12 top-3 w-max px-3 py-1 text-xs text-white bg-gray-800 rounded-md opacity-0 transition-opacity group-hover:opacity-100">
          See The Available Events
        </span>
      </div>

      {showNotifications && (
        <div className="fixed top-32 right-3 z-50 bg-white rounded-lg shadow-lg p-4 lg:w-96 max-h-[80vh] overflow-y-auto">
          <h1 className="text-lg font-bold text-center mb-4">Events in Detroit</h1>
          <div className="space-y-4">
            {events.map((event, index) => (
              
              <div
                key={index}
                className="flex items-center gap-3 border-b pb-3"
              >
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold">{event.name}</h3>
                  <p className="text-xs text-gray-600">{event.date}</p>
                  <p className="text-xs text-gray-600">{event.time}</p>
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold">City:</span> {event.venue_city},
                  </p>
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold">venue_name:</span> {event.venue_name},
                  </p>
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold">venue_state:</span> {event.venue_state},
                  </p>
                  {/* <p><span className="font-semibold">Date:</span>{event.date}</p>
                  <p><span className="font-semibold">time:</span>{event.time}</p> */}
                  <p className="text-xs text-blue-500">
                    <a
                      href={event.url}
                      target="_blank"
                      className="text-blue underline underline-offset-4"
                      rel="noopener noreferrer"
                    >
                      More Info
                    </a>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
  
      {/* Hamburger Icon for Small Screens */}
      <div className="fixed top-24 left-1 z-50 lg:hidden ">
        <button
          onClick={toggleSidePanel}
          className="p-2 bg-white border-2 rounded-lg shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
  
    
      {/* Main Content (Modified) */}
      <div className="flex h-full grow  font-grotesk "> {/* Added flex here */}
        {/* Side Panel for Day Selection */}
        <div
          className={`fixed top-0  lg:block md:pt-3 pt-6  mt-16   ${
            isSidePanelOpen ? "block" : "hidden"
          } z-40 lg:z-auto w-[200px] bg-white h-screen lg:h-screen overflow-y-auto transition-transform duration-300 ease-in-out transform ${
            isSidePanelOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        >
          {/* ... (Side panel content - unchanged) */}

           {/* Side Panel for Day Selection */}
      <div
        className={`fixed lg:relative lg:block  px-2  ${
          isSidePanelOpen ? "block" : "hidden"
        } z-40 lg:z-auto w-[200px] bg-white h-screen lg:h-screen overflow-y-auto transition-transform duration-300 ease-in-out transform ${
          isSidePanelOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="h-full flex flex-col justify-center pl-5  ">
          <h3 className="text-[#0e161b] text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">
            Days
          </h3>
          {data && data.length > 0 && Array.isArray(data) ? (
            data.map((item, index) => {
              const dayTitle = item.days;
              return (
                <div
                  key={index}
                  onClick={() => handleClickDay(dayTitle)}
                  className={`flex gap-4  cursor-pointer rounded-lg hover:bg-[#6150b4] w-full  h-[40px]  pl-2 mb-2`}
                >
                  <div className="text-[#0e161b] flex items-center justify-center rounded-lg shrink-0">
                    <IoSunnyOutline color="#f7b819" size={24} />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-[#0e161b] text-[14px] font-medium">
                      {dayTitle || "No Day Title"}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="px-4 py-2 text-sm text-gray-500">
              No itinerary data available.
            </p>
          )}
          
        </div>
      </div>
        </div>


        <div className="layout-container flex-1   bg-gray-200 lg:pl-48 pl-0 pt-20  "> {/* flex-1 and lg:pl-[200px] here */}
          <div className="gap-1  flex flex-1 justify-center py-5 p-3 lg:p-0 ">
            <div className="layout-content-container flex flex-col max-w-[1050px] flex-1">
              {/* Static Header */}
              <div className="p-4 flex flex-col items-center">
              <h1 className="text-black  font-bold text-[25px]">{profileData?.title}</h1>
                <h1 className=" text-gray-400 ">
                  Your AI-generated travel plan
                </h1>
              </div>

              <div className=" flex justify-between gap-2 mb-3 md:flex-row flex-col">
                <div className="bg-white flex  w-full items-center  gap-3 rounded-md py-2 pl-1">
                  <IoLocationOutline
                    size={30}
                    color="blue"
                  />
                  <div className="flex flex-col ">
                    <p className="text-gray-500 ">Destination</p>
                    <p>{profileData?.destination}</p>
                  </div>
                </div>
                <div className="bg-white flex  w-full items-center  gap-3 rounded-md py-2 pl-3">
                  <BsCalendar2Date
                      size={30}
                      color="green"
                  />
                   <div className="flex flex-col ">
                    <p className="text-gray-500 ">Date</p>
                    <p>{new Date(profileData?.startDate).toLocaleDateString(
                      "en-US", 
                      { year: "numeric", month: "long", day: "numeric" }
                    )
                  }</p>
                  </div>
                </div>
                <div className="bg-white flex  w-full items-center  gap-3 rounded-md py-2 pl-3">
                  <IoMdTime
                      size={35}
                      color="red"
                  />
                   <div className="flex flex-col ">
                    <p className="text-gray-500 ">Dudget</p>
                    <p>{profileData?.budget}</p>
                  </div>
                </div>
              </div>

              {/* Activities Grid */}
              {/* {selectedDay && (
                <div className="p-4">
                  {Object.entries(groupedActivities[selectedDay] || {}).map(
                    ([timeSlot, activities]) => (
                      <div key={timeSlot} className="mb-8">
                        {/* ... (Activity grid content - unchanged) */}
                        
                      {/* {activities.map((activity, index) => (
                        <div key={index} className="mb-4 shadow-lg rounded-lg border-4  bg-white border-red-500">
                          
                        </div>
                      ))}
                        
                      </div>
                    )
                  )}
                </div>
              )} */} 
            <p className="text-[17px] font-bold mb-5 font-grotesk">{dayTitle}</p>
            <div className="flex flex-col gap-4">

            {
               
              selectedItinerary.map(activity=>
<>

              <div  className=" flex flex-col gap-2">
             <div className="bg-white  rounded-md p-3 flex flex-col gap-4">
              <p className="text-[16px] font-bold font-grotesk">{activity.timeSlot}</p>
              <p className="text-[16px] font-bold text-green-700 font-grotesk">{activity.title}</p>
              <p className="text-[16px] text-gray-500 font-grotesk">{activity.description}</p>
              <p className="text-[16px] text-gray-500 font-grotesk"> <span>Duration: </span> { activity.duration}</p>
              <p className="text-[14px] text-gray-500 font-grotesk"><span className="text-[16px] text-gray-500">Location: </span>{ activity.location}</p>
              <p className="bg-blue w-fit rounded-md p-2 text-white">{activity.budget}</p>
              </div>
             </div>
             </>
              )
            }
           
             {/* <div  className=" flex flex-col gap-2">
              
             <div className="bg-white  rounded-md p-3">
              <p className="text-[16px] font-bold">MorningActivity</p>
              <p className="text-[16px] font-bold text-green-700">Some another data here </p>
              <p className="text-[16px] text-gray-500 ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mollis neque non hendrerit pellentesque. Sed maximus, orci id pharetra rhoncus, enim tortor dictum leo, vel lacinia arcu purus sit amet nisi. In imperdiet, lorem non vulputate faucibus, lectus felis congue urna, vitae vulputate mi justo convallis nisi. Sed consequat tempus fringilla. Nam vehicula metus non hendrerit ornare. Etiam aliquet vel nisl at venenatis. Aenean condimentum volutpat lobortis. In sit amet ante et lorem placerat hendrerit ut eget urna. Aliquam ligula risus, pretium ac dolor id, fringilla auctor </p>
              <p className="bg-blue w-fit rounded-md p-2 text-white">$30</p>
              </div>
             </div>
             <div  className=" flex flex-col gap-2">
              
             <div className="bg-white  rounded-md p-3">
              <p className="text-[16px] font-bold">MorningActivity</p>
              <p className="text-[16px] font-bold text-green-700">Some another data here </p>
              <p className="text-[16px] text-gray-500 ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mollis neque non hendrerit pellentesque. Sed maximus, orci id pharetra rhoncus, enim tortor dictum leo, vel lacinia arcu purus sit amet nisi. In imperdiet, lorem non vulputate faucibus, lectus felis congue urna, vitae vulputate mi justo convallis nisi. Sed consequat tempus fringilla. Nam vehicula metus non hendrerit ornare. Etiam aliquet vel nisl at venenatis. Aenean condimentum volutpat lobortis. In sit amet ante et lorem placerat hendrerit ut eget urna. Aliquam ligula risus, pretium ac dolor id, fringilla auctor </p>
              <p className="bg-blue w-fit rounded-md p-2 text-white">$30</p>
              </div>
             </div> */}
            </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};




export default AiEngine;
