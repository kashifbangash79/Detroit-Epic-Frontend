import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function AiEngine() {
  const location = useLocation();
  const { suggestions } = location.state || {}; // Safely access the itinerary data

  const [groupedActivities, setGroupedActivities] = useState({});

  useEffect(() => {
    if (suggestions) {
      const activitiesByDay = suggestions.reduce((acc, item) => {
        if (item.activities && item.activities.length > 0) {
          const dayTitle = item.dayTitle;
          acc[dayTitle] = item.activities.reduce((dayAcc, activity) => {
            const { timeSlot } = activity;
            if (!dayAcc[timeSlot]) dayAcc[timeSlot] = [];
            dayAcc[timeSlot].push(activity);
            return dayAcc;
          }, {});
        }
        return acc;
      }, {});
      setGroupedActivities(activitiesByDay);
    }
  }, [suggestions]);

  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    if (Object.keys(groupedActivities).length > 0) {
      // Automatically select the first day initially
      const firstDay = Object.keys(groupedActivities)[0];
      setSelectedDay(firstDay);
    }
  }, [groupedActivities]);

  const handleClickDay = (dayTitle) => {
    setSelectedDay((prevDay) => (prevDay === dayTitle ? null : dayTitle)); // Toggle day selection
  };

  return (
    // <div
    //   className="relative flex size-full min-h-screen flex-col bg-[#f8fafb] group/design-root overflow-x-hidden"
    //   style={{ fontFamily: "'Plus Jakarta Sans', 'Noto Sans', sans-serif" }}
    // >
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
    //                 onClick={() => handleClickDay(dayTitle)} // Toggle day selection
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

    <div
      // className="relative flex size-full min-h-screen flex-col bg-gradient-to-br from-[#f0f9ff] to-[#e6f4fe] group/design-root overflow-x-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', 'Noto Sans', sans-serif" }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-6 px-8 flex flex-1 justify-center py-6">
          {/* Side panel for day selection */}
          <div className="layout-content-container flex flex-col w-80 bg-white rounded-2xl shadow-xl p-4 border border-[#e0f2fe]">
            <h3 className="text-[#1f2937] text-xl font-extrabold leading-tight tracking-tight px-4 pb-3 pt-4 border-b-2 border-[#e0f2fe]">
              📅 Your Itinerary
            </h3>
            {suggestions && Array.isArray(suggestions) ? (
              suggestions.map((item, index) => {
                const dayTitle = item.dayTitle;
                return (
                  <div
                    key={index}
                    onClick={() => handleClickDay(dayTitle)} // Toggle day selection
                    className={`flex items-center gap-4 bg-[#f9fafb] px-4 min-h-[72px] py-2 cursor-pointer ${
                      selectedDay === dayTitle ? "bg-[#e0f4ff]" : ""
                    }`}
                  >
                    <div className="text-[#0e161b] flex items-center justify-center rounded-lg bg-[#e8eef3] shrink-0 size-12">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"></path>
                      </svg>
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-[#0e161b] text-base font-medium leading-normal">
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

          {/* Main content */}
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1 space-y-6">
            {selectedDay && (
              <div className="p-4 bg-white rounded-2xl shadow-xl border border-[#e0e7ff]">
                {Object.entries(groupedActivities[selectedDay] || {}).map(
                  ([timeSlot, activities]) => (
                    <div key={timeSlot} className="mb-8">
                      <div className="flex items-center mb-6">
                        <div className="w-1 h-8 bg-[#4f46e5] rounded-full mr-3"></div>
                        <h4 className="text-[#000] text-xl font-bold tracking-wide">
                          ⏰ {timeSlot}
                        </h4>
                      </div>
                      {activities.map((activity, index) => (
                        <div
                          key={index}
                          className="mb-6 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                          <div className="flex items-center gap-4 py-4 bg-gradient-to-r from-[#f9fafb] to-[#e0e7ff] px-6">
                            <div className="text-white flex items-center justify-center rounded-xl bg-[#797885] shrink-0 size-10 shadow-md">
                              {activity.timeIcon || "⏳"}
                            </div>
                            <div className="flex-1">
                              <p className="text-[#000] text-lg font-semibold truncate">
                                {activity.title}
                              </p>
                              <span className="text-sm text-[#000] font-medium">
                                {activity.duration || "2 hours"}
                              </span>
                            </div>
                            <span className="bg-[#797885] py-1 px-4 rounded-full text-white text-sm font-semibold shadow-sm">
                              {activity.budget || "Free"}
                            </span>
                          </div>

                          <div className="p-6 space-y-6">
                            {/* Activity Details */}
                            <div className="bg-[#f9fafb] rounded-xl p-4 border border-[#e0e7ff]">
                              <div className="flex items-center mb-3">
                                <div className="bg-[#797885] p-2 rounded-lg mr-3">
                                  <svg
                                    className="w-5 h-5 text-black" /* ... */
                                  />
                                </div>
                                <h3 className="text-[#000] text-lg font-bold">
                                  🧘 Activity Details
                                </h3>
                              </div>
                              <p className="text-[#374151] text-base leading-relaxed pl-11">
                                {activity.description}
                              </p>
                            </div>

                            {/* Transportation Guide */}
                            <div className="bg-[#f9fafb] rounded-xl p-4 border border-[#e0e7ff]">
                              <div className="flex items-center mb-3">
                                <div className="bg-[#797885] p-2 rounded-lg mr-3">
                                  <svg
                                    className="w-5 h-5 text-white" /* ... */
                                  />
                                </div>
                                <h3 className="text-[#000] text-lg font-bold">
                                  🚌 Transportation Guide
                                </h3>
                              </div>
                              <p className="text-[#374151] text-base leading-relaxed pl-11">
                                {activity.transportationGuide ||
                                  "5 minute walk from city center"}
                              </p>
                            </div>

                            {/* Additional Features */}
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AiEngine;
