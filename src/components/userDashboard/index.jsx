import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { userApi } from "../../Apis/index.jsx";
import Loader from "../../components/loader.jsx";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Bell,
  ClipboardCopy,
  Facebook,
  Instagram,
  Mail,
  Share2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// Dummy notifications
const notifications = [
  "Your itinerary has been updated!",
  "New destinations added to your preferences.",
  "You have 2 new referrals.",
];

export default function UserDashboard() {
  const [itineraryData, setGetitinerary] = useState([]);
  const [itineraryLoadingState, setItineraryLoadingState] = useState({});

  const [profileData, setProfileData] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false); // State to toggle notifications
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for edit profile modal
  const [isLoading, setIsLoading] = useState(true);
  const [editData, setEditData] = useState({ fullName: "", email: "" });
  // Form state for inputs
  const [interest, setSelectedInterests] = useState([]);
  const [activityPreferences, setActivityPreferences] = useState([]);
  const [dietaryPreferences, setDietaryPreferences] = useState([]);

  const [entertainmentPreferences, setEntertainmentPreferences] = useState([]);
  const [diningPreferences, setDiningPreferences] = useState([]);
  const [referalcode, setreferalcode] = useState("");
  const [referalcodestatus, setreferalcodestatus] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [successmessage, setsucessmessage] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // State to track saving status
  const [landmarks, setLandmarks] = useState([]);
  const [cuisinePreferences, setCuisinePreferences] = useState([]);


  const [formData, setFormData] = useState({
    destination: "Detroit",
    title: "",
    startDate: "",
    endDate: "",
    arrivalTime: "",
    departureTime: "",
    purpose: "",
    duration: "",
    cuisineType: "",
    transportation: "",
    budget: 0,
    accessibility: "",
    specialOccasion: "",
    additionalActivities: "",
    exploreNearby: "",
    accomodation: "",
    preferredPace: "",
  });
  const navigate = useNavigate(); // Hook to navigate programmatically
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const response = await userApi.GetProfile();
      setProfileData(response);
      setEditData({ fullName: response.fullName, email: response.email });
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
    setIsLoading(false);
  };

  const handleUpdateProfile = async () => {
    try {
      await userApi.UpdateProfile({
        fullName: editData?.fullName,
        email: editData?.email,
      });
      setIsEditModalOpen(false);
      fetchProfile(); // Re-fetch profile data to get updated details
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  //Add New Itinerary code with check box logic
  // const handleCheckboxChange = (category, value) => {
  //   if (category === "interest") {
  //     setSelectedInterests((prevState) => {
  //       if (prevState.includes(value)) {
  //         return prevState.filter((item) => item !== value);
  //       } else {
  //         return [...prevState, value];
  //       }
  //     });
  //   } else if (category === "activityPreferences") {
  //     setActivityPreferences((prevState) => {
  //       if (prevState.includes(value)) {
  //         return prevState.filter((item) => item !== value);
  //       } else {
  //         return [...prevState, value];
  //       }
  //     });
  //   } else if (category === "diningPreferences") {
  //     setDiningPreferences((prevState) => {
  //       if (prevState.includes(value)) {
  //         return prevState.filter((item) => item !== value);
  //       } else {
  //         return [...prevState, value];
  //       }
  //     });
  //   }
  // };

  const handleCheckboxChange = (category, value) => {
    switch (category) {
      case "interest":
        setSelectedInterests((prevState) =>
          prevState.includes(value)
            ? prevState.filter((item) => item !== value)
            : [...prevState, value]
        );
        break;
  
      case "activityPreferences":
        setActivityPreferences((prevState) =>
          prevState.includes(value)
            ? prevState.filter((item) => item !== value)
            : [...prevState, value]
        );
        break;
  
      case "entertainmentPreferences":
        setEntertainmentPreferences((prevState) =>
          prevState.includes(value)
            ? prevState.filter((item) => item !== value)
            : [...prevState, value]
        );
        break;
  
      case "diningPreferences":
        setDiningPreferences((prevState) =>
          prevState.includes(value)
            ? prevState.filter((item) => item !== value)
            : [...prevState, value]
        );
        break;
  
      case "dietaryPreferences":
        setDietaryPreferences((prevState) =>
          prevState.includes(value)
            ? prevState.filter((item) => item !== value)
            : [...prevState, value]
        );
        break;
  
      case "cuisinePreferences": // New case for cuisinePreferences
        setCuisinePreferences((prevState) =>
          prevState.includes(value)
            ? prevState.filter((item) => item !== value)
            : [...prevState, value]
        );
        break;
  
      case "landmarks":
        setLandmarks((prevState) =>
          prevState.includes(value)
            ? prevState.filter((item) => item !== value)
            : [...prevState, value]
        );
        break;
  
      default:
        console.warn(`Unknown category: ${category}`);
        break;
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedFormData = { ...prev, [name]: value };

      // Calculate duration if startDate or endDate changes
      if (name === "startDate" || name === "endDate") {
        updatedFormData.duration = calculateDuration(
          updatedFormData.startDate,
          updatedFormData.endDate
        );
      }

      return updatedFormData;
    });
  };

  const calculateDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return "";

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return "";

    const diffInMilliseconds = end - start;
    if (diffInMilliseconds < 0) return "Invalid Dates";

    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
    return `${diffInDays + 1} days`;
  };

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      interest, // Ensure this is an array
      activityPreferences, // Ensure this is an array
      diningPreferences, // Ensure this is an array
      entertainmentPreferences,
      dietaryPreferences,
      cuisinePreferences,
      landmarks
    };
    setIsSaving(true); // Start loading spinner

    try {
      console.log("apidata", payload);

      const response = await userApi.Createitineraries(payload);

      console.log("api response", response);
      setsucessmessage(response.message);
      toast.success(response.message);
      setSelectedItinerary(null); // Reset selected itinerary
      fetchItinerary();
    } catch (error) {
      toast.error("Failed to create itinerary. Please try again.");
      console.error("Error creating itinerary:", error);
    } finally {
      setIsSaving(false); // Stop loading spinner
    }
  };

  // itinerary logic end

  // Get All itinerary

  useEffect(() => {
    fetchItinerary();
  }, []);
  // Function to fetch itinerary data
  const fetchItinerary = async () => {
    setIsLoading(true);
    try {
      const response = await userApi.Getitineraries();
      console.log("Fetched itineraries:", response);

      // Ensure response is an array before setting the state
      if (Array.isArray(response)) {
        setGetitinerary(response);
      } else {
        console.error("Fetched data is not an array:", response);
      }
    } catch (error) {
      console.error("Error fetching itineraries:", error);
    }
    setIsLoading(false);
  };

  // Handle generating suggestions for a specific itinerary
  const handleGenerateSuggestions = async (itinerary) => {
    // Set the specific itinerary as loading
    setItineraryLoadingState((prevState) => ({
      ...prevState,
      [itinerary._id]: true,
    }));

    try {
      const id = itinerary._id;
      console.log("itineraryid", id);

      // Call API to generate suggestions
      const response = await userApi.FetchItinerarySuggestions(id);
      console.log("Suggestions generated:", response);

      // Fetch updated itinerary data
      fetchItinerary();
    } catch (error) {
      console.error("Error generating suggestions:", error);
    } finally {
      // Reset the loading state for this specific itinerary after the request completes
      setItineraryLoadingState((prevState) => ({
        ...prevState,
        [itinerary._id]: false,
      }));
    }
  };

  // Handle navigating to AI page with suggestions data
  const handleSeeSuggestions = async (itinerary) => {
    console.log("comming", itinerary);
    try {
      // Fetch suggestions
      const id = itinerary._id;
      console.log("current itineraries id", id);

      const response = await userApi.getSuggestions(id);
      console.log("Fetched suggestions:", response);

      // Navigate to AI page with suggestions
      navigate(`/ai/${itinerary._id}`, { state: { suggestions: response } });
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // Create Referals
  const handleCreatereferralsSubmit = async () => {
    try {
      const response = await userApi.Createreferrals();
      const responsereferralsstatus = await userApi.Createreferralsstatus();
      const responseGetreferralscredits = await userApi.Getreferralscredits();
      setreferalcode(response.referralCode);
      console.log(
        "response",
        response,
        responsereferralsstatus,
        responseGetreferralscredits
      );

      console.log(
        "second api response",
        responseGetreferralscredits.creditsEarned
      );
      const credtiearns = responseGetreferralscredits.creditsEarned;
      setreferalcodestatus(credtiearns);

      toast.success(response.message);
    } catch (error) {
      toast.error("Failed to create itinerary. Please try again.");
      console.error("Error creating itinerary:", error);
    }
  };
  const friendsReferred = referalcodestatus / 10;

  const referralProgress = {
    creditsEarned: referalcodestatus,
    creditsNeeded: 100,
    friendsReferred: friendsReferred,
  };
  if (isLoading) {
    return <Loader />;
  }

  // stripe api

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>

      <>
        {/* Hamburger Icon */}
        <div className="absolute left-5 top-20">
          <button
            // onMouseEnter={() => setIsDropdownOpen(true)}
            // onMouseLeave={() => setIsDropdownOpen(false)}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="text-gray-800 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-32 left-0 w-full bg-white shadow-md rounded-lg mt-2 md:w-auto">
            <ul className="flex flex-col">
              <li>
                <Link
                  to="/user-profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  User Profile{" "}
                </Link>
              </li>
              <li>
                <Link to="/about" className="block px-4 py-2 hover:bg-gray-100">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Privacy
                </Link>
              </li>{" "}
              <li>
                <Link
                  to="/terms-and-conditions"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Terms
                </Link>
              </li>{" "}
              <li>
                <Link to="/guide" className="block px-4 py-2 hover:bg-gray-100">
                  Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/work" className="block px-4 py-2 hover:bg-gray-100">
                  How it Works
                </Link>
              </li>
            </ul>
          </div>
        )}
      </>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* <TabsList className='grid w-full grid-cols-1 gap-2 md:grid-cols-4 md:gap-4'>
          <TabsTrigger value='profile'>Profile</TabsTrigger>
          <TabsTrigger value='itineraries'>Itineraries</TabsTrigger>
          <TabsTrigger value='referrals' onClick={handleCreatereferralsSubmit}>
            Referrals
          </TabsTrigger>
          <TabsTrigger value='add-itinerary'>Add Itinerary</TabsTrigger>
        </TabsList> */}
        <div className="relative bg-white w-full">
          {/* Hamburger Icon for Mobile */}
          <button
            className="block md:hidden p-2 bg-gray-200 rounded focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 7.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          </button>

          {/* Tabs List */}

          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } absolute left-0 top-full z-10 w-full bg-white shadow-lg md:static md:z-auto md:block md:shadow-none`}
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-6 bg-white h-full gap-1 p-2 md:p-0">
              <TabsTrigger
                value="profile"
                className="px-4 py-2 text-sm font-medium text-gray-600 border-b-2 border-transparent hover:border-blue-500 hover:text-blue-500 transition-colors duration-300"
              >
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="itineraries"
                className="px-4 py-2 text-sm font-medium text-gray-600 border-b-2 border-transparent hover:border-blue-500 hover:text-blue-500 transition-colors duration-300"
              >
                Itineraries
              </TabsTrigger>
              <TabsTrigger
                value="referrals"
                onClick={handleCreatereferralsSubmit}
                className="px-4 py-2 text-sm font-medium text-gray-600 border-b-2 border-transparent hover:border-blue-500 hover:text-blue-500 transition-colors duration-300"
              >
                Referrals
              </TabsTrigger>
              <TabsTrigger
                value="add-itinerary"
                className="px-4 py-2 text-sm font-medium text-gray-600 border-b-2 border-transparent hover:border-blue-500 hover:text-blue-500 transition-colors duration-300"
              >
                Add Itinerary
              </TabsTrigger>

              <TabsTrigger
                value="manage_experiences"
                className="px-4 py-2 text-sm font-medium text-gray-600 border-b-2 border-transparent hover:border-blue-500 hover:text-blue-500 transition-colors duration-300"
              >
                Manage Experiences
              </TabsTrigger>

              <TabsTrigger
                value="manage-blogs"
                className="px-4 py-2 text-sm font-medium text-gray-600 border-b-2 border-transparent hover:border-blue-500 hover:text-blue-500 transition-colors duration-300"
              >
                Manage Blogs
              </TabsTrigger>
            </TabsList>
          </div>
        </div>
        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card className="shadow-lg border border-gray-200">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-t-lg">
              <CardTitle className="text-2xl font-semibold text-gray-800">
                Profile Settings
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                Manage your account details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center space-x-6">
                {/* Avatar and Profile Info */}
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-white shadow-lg transition-all hover:scale-105 hover:shadow-xl">
                    <AvatarImage
                      src="/placeholder.svg"
                      alt={profileData?.fullName}
                    />
                    <AvatarFallback>
                      {profileData?.fullName ? profileData?.fullName[0] : "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-semibold text-gray-800">
                    Welcome, {profileData?.fullName || "User"}!
                  </h2>
                  <p className="text-sm text-gray-600">
                    {profileData
                      ? `Email: ${profileData.email || "Not available"}`
                      : "Loading your profile..."}
                  </p>
                </div>
                {/* Notifications Bell */}
                <div className="relative">
                  <Bell
                    className="text-gray-800 mb-5 -ml-4 cursor-pointer hover:text-indigo-500"
                    onClick={() => setShowNotifications(!showNotifications)}
                  />
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4">
                      <ul>
                        {notifications.map((notification, index) => (
                          <li
                            key={index}
                            className="py-2 text-sm text-gray-700"
                          >
                            {notification}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Details */}
              <div className="space-y-3 text-lg text-gray-800">
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {profileData?.dob
                    ? new Date(profileData.dob).toLocaleDateString()
                    : "Not provided"}
                </p>

                <p>
                  <strong>Credits Earned:</strong>{" "}
                  {profileData?.creditsEarned || "0"}
                </p>
              </div>

              {/* Edit Profile Button */}
              <Button
                onClick={() => setIsEditModalOpen(true)}
                className="w-full mt-4  text-white "
              >
                Edit Profile
              </Button>

              {/* Edit Profile Modal */}
              <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="bg-gray-100 p-6 rounded-lg shadow-lg">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Full Name"
                      value={editData.fullName}
                      onChange={(e) =>
                        setEditData({ ...editData, fullName: e.target.value })
                      }
                      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <Input
                      placeholder="Email"
                      value={editData.email}
                      onChange={(e) =>
                        setEditData({ ...editData, email: e.target.value })
                      }
                      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <Button
                      onClick={handleUpdateProfile}
                      className="w-full bg-indigo-600 text-white hover:bg-indigo-700 mt-2"
                    >
                      Save Changes
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="itineraries">
          <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader className=" p-6">
              <CardTitle className="text-2xl font-semibold text-gray-800">
                Saved Itineraries
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                View and manage your saved trips
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div>
                {isLoading ? (
                  <div className="skeleton-loader">
                    <div role="status" className="max-w-sm animate-pulse">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <>
                    {itineraryData && itineraryData.length > 0 ? (
                      <ul className="space-y-6">
                        {itineraryData.map((itinerary) => (
                          <li
                            key={itinerary.id}
                            className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow hover:bg-gray-100 transition duration-300"
                          >
                            <h3 className="font-semibold text-lg text-gray-800">
                              {itinerary.title}
                              <p className="text-sm text-gray-500">
                                {itinerary.startDate &&
                                !isNaN(new Date(itinerary.startDate).getTime())
                                  ? new Date(
                                      itinerary.startDate
                                    ).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    })
                                  : "Invalid Date"}
                                <span className="ms-4 text-gray-400">
                                  Destination: {itinerary.destination}
                                </span>
                              </p>
                            </h3>

                            <div className="flex space-x-4">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <div className="flex">
                                    <Button
                                      variant="outline"
                                      onClick={() =>
                                        setSelectedItinerary(itinerary)
                                      }
                                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                                    >
                                      View
                                    </Button>
                                  </div>
                                </DialogTrigger>

                                <DialogContent className="sm:max-w-[425px]">
                                  <DialogHeader>
                                    <DialogTitle>
                                      Share Your Itinerary
                                    </DialogTitle>
                                    <DialogDescription>
                                      {itinerary.destination ||
                                        "No destination specified"}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <img
                                        src="/placeholder.svg"
                                        alt={
                                          itinerary.name || "Itinerary Image"
                                        }
                                        className="col-span-4 h-40 w-full object-cover rounded-md shadow-md"
                                      />
                                    </div>

                                    {/* Social Media Links */}
                                    <div className="flex space-x-3">
                                      {itinerary.shareLinks?.facebook && (
                                        <a
                                          href={itinerary.shareLinks.facebook}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-blue-600 hover:text-blue-800 transition duration-300"
                                        >
                                          <Button variant="outline" size="icon">
                                            <Facebook className="h-4 w-4" />
                                          </Button>
                                        </a>
                                      )}
                                      {itinerary.shareLinks?.instagram && (
                                        <a
                                          href={itinerary.shareLinks.instagram}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-pink-500 hover:text-pink-700 transition duration-300"
                                        >
                                          <Button variant="outline" size="icon">
                                            <Instagram className="h-4 w-4" />
                                          </Button>
                                        </a>
                                      )}
                                      {itinerary.shareLinks?.tiktok && (
                                        <a
                                          href={itinerary.shareLinks.tiktok}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-black hover:text-gray-700 transition duration-300"
                                        >
                                          <Button variant="outline" size="icon">
                                            <Share2 className="h-4 w-4" />
                                          </Button>
                                        </a>
                                      )}
                                    </div>

                                    {/* Copy Itinerary Link */}
                                    <div className="flex items-center space-x-2">
                                      <Input
                                        id="itinerary-link"
                                        value={`https://visit-detroit.com/itinerary/${itinerary._id}`}
                                        readOnly
                                        className="border-gray-300 shadow-sm rounded-md"
                                      />
                                      <Button
                                        size="sm"
                                        onClick={() =>
                                          navigator.clipboard.writeText(
                                            `https://visit-detroit.com/itinerary/${itinerary._id}`
                                          )
                                        }
                                      >
                                        Copy
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>

                              {/* Aligned Buttons */}
                              <div className="flex space-x-4">
                                {itinerary.activitiesByDay &&
                                itinerary.activitiesByDay.length > 0 ? (
                                  <Button
                                    variant="outline"
                                    onClick={() =>
                                      handleSeeSuggestions(itinerary)
                                    }
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                                  >
                                    See Suggestions
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() =>
                                      handleGenerateSuggestions(itinerary)
                                    }
                                    disabled={
                                      itineraryLoadingState[itinerary._id]
                                    }
                                  >
                                    {itineraryLoadingState[itinerary._id]
                                      ? "Generating suggestions for your itinerary..."
                                      : "Generate Suggestions"}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-center">
                        No itineraries found.
                      </p>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* <TabsContent value="referrals">
          <Card>
            <CardHeader>
              <CardTitle>Your Referral Program</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Your Referral Code
                    </CardTitle>
                    <CardDescription>
                      Share this code with your friends
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-between items-center">
                    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                      {referalcode}
                    </code>
                    <Button size="icon" variant="ghost">
                      <ClipboardCopy
                        className="h-4 w-4"
                        onClick={() => {
                          navigator.clipboard.writeText(referalcode).then(
                            () => {
                              console.log(
                                "Referral code copied to clipboard:",
                                referalcode
                              );
                            },
                            (err) => {
                              console.error(
                                "Failed to copy referral code: ",
                                err
                              );
                            }
                          );
                        }}
                      />
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Referral Stats</CardTitle>
                    <CardDescription>
                      See how many friends you have referred
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="link" className="p-0">
                          View Referral Progress
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Referral Progress</DialogTitle>
                          <DialogDescription>
                            Track your referral rewards
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div>
                            <div className="flex justify-between mb-2">
                              <span>Credits Earned</span>
                              <span className="font-semibold">
                                ${referralProgress.creditsEarned}
                              </span>
                            </div>
                            <Progress
                              value={
                                (referralProgress.creditsEarned /
                                  referralProgress.creditsNeeded) *
                                100
                              }
                              className="w-full"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                              ${referralProgress.creditsEarned} / $
                              {referralProgress.creditsNeeded} to next reward
                            </p>
                          </div>
                          <p>
                            {referralProgress.friendsReferred} friends referred
                          </p>
                          <Button className="w-full">
                            Invite More Friends
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Invite Friends</CardTitle>
                  <CardDescription>
                    Send referral invitations to your friends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Mail className="mr-2 h-4 w-4" /> Send Invitations
                  </Button>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent> */}
        <TabsContent value="referrals">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-800">
                Your Referral Program
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Your Referral Code
                    </CardTitle>
                    <CardDescription>
                      Share this code with your friends
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-between items-center">
                    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                      {referalcode}
                    </code>
                    <Button size="icon" variant="ghost">
                      <ClipboardCopy
                        className="h-4 w-4"
                        onClick={() => {
                          navigator.clipboard.writeText(referalcode).then(
                            () => {
                              console.log(
                                "Referral code copied to clipboard:",
                                referalcode
                              );
                            },
                            (err) => {
                              console.error(
                                "Failed to copy referral code: ",
                                err
                              );
                            }
                          );
                        }}
                      />
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Referral Stats</CardTitle>
                    <CardDescription>
                      See how many friends you have referred
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="link" className="p-0">
                          View Referral Progress
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Referral Progress</DialogTitle>
                          <DialogDescription>
                            Track your referral rewards
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div>
                            <div className="flex justify-between mb-2">
                              <span>Credits Earned</span>
                              <span className="font-semibold">
                                ${referralProgress.creditsEarned}
                              </span>
                            </div>
                            <Progress
                              value={
                                (referralProgress.creditsEarned /
                                  referralProgress.creditsNeeded) *
                                100
                              }
                              className="w-full"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                              ${referralProgress.creditsEarned} / $
                              {referralProgress.creditsNeeded} to next reward
                            </p>
                          </div>
                          <p>
                            {referralProgress.friendsReferred} friends referred
                          </p>
                          <Button className="w-full">
                            Invite More Friends
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Invite Friends</CardTitle>
                  <CardDescription>
                    Send referral invitations to your friends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Mail className="mr-2 h-4 w-4" /> Send Invitations
                  </Button>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="manage_experiences">
          <Card>
            <div className="p-4 text-start">
              <h2 className="text-lg font-semibold text-gray-700">
                Your Experiences
              </h2>
              <p className="text-sm text-gray-500">
                View and manage your experiences
              </p>
              <div className="mt-8 text-gray-400">No experiences found.</div>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="manage-blogs">
          <Card>
            <div className="p-4 text-start">
              <h2 className="text-lg font-semibold text-gray-700">
                Your Blogs
              </h2>
              <p className="text-sm text-gray-500">
                View and manage your blogs
              </p>
              <div className="mt-8 text-gray-400">No experiences found.</div>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="add-itinerary">
          <div className="border rounded-lg p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Add New Itinerary
              </h2>
              {successmessage && (
                <p className="text-green-900 text-lg font-bold bg-green-200 p-2 mt-4">
                  {successmessage}
                </p>
              )}
            </div>
            <Button onClick={() => setSelectedItinerary({})}>
              Add Itinerary
            </Button>

            {/* Modal to Add Itinerary */}
            {selectedItinerary && (
              <Dialog
                open={Boolean(selectedItinerary)}
                onOpenChange={setSelectedItinerary}
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 "
              >
                <DialogContent className=" bg-white rounded-lg shadow-lg max-h-[100vh] w-full md:w-1/2 overflow-y-auto p-4">
                  <DialogHeader>
                    <DialogTitle>Create New Itinerary</DialogTitle>
                    <DialogDescription>
                      Fill in the details to create a new itinerary.
                    </DialogDescription>
                  </DialogHeader>

                  {/* Form Content */}
                  <div className="space-y-4 w-full">
                    {/* Title */}
                    <div>
                      <Label>Title</Label>
                      <input
                        className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                        type="text"
                        placeholder="Add Title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                      />
                    </div>{" "}
                    {/* destination */}
                    <div>
                      <Label>Destination</Label>
                      <input
                        className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                        type="text"
                        placeholder="Add  Destination"
                        name="destination"
                        readOnly
                        value={formData.destination}
                        onChange={handleInputChange}
                      />
                    </div>
                    {/*Start Date */}
                    <div>
                      <Label>Start Date</Label>
                      <input
                        className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                        type="date"
                        placeholder=""
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    {/*End Date */}
                    <div>
                      <Label>End Date</Label>
                      <input
                        className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                        type="date"
                        placeholder=""
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    {/* time of arrival and time of departure. */}
                    <div>
                      <Label>Arrival Time</Label>
                      <input
                        className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                        type="Time"
                        placeholder=""
                        name="arrivalTime"
                        value={formData.arrivalTime}
                        onChange={handleInputChange}
                      />
                    </div>
                    {/* Departure Time */}
                    <div>
                      <Label>Departure Time</Label>
                      <input
                        className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                        type="Time"
                        placeholder=""
                        name="departureTime"
                        value={formData.departureTime}
                        onChange={handleInputChange}
                      />
                    </div>
                    {/* Purpose of Visit */}
                    <div>
                      <Label>Purpose of Visit</Label>
                      <select
                        className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                        value={formData.purpose}
                        onChange={handleInputChange}
                        name="purpose"
                      >
                        <option value="" disabled selected>
                          Select purpose
                        </option>
                        <option value="leisure">Leisure</option>
                        <option value="business">Business</option>
                        <option value="romantic"> Romantic </option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    {/* Duration */}
                    <div className="hidden">
                      <Label>Duration</Label>
                      <input
                        className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                        type="text"
                        name="duration"
                        value={formData.duration}
                        readOnly
                      />
                    </div>
                    {/* Interests */}
                    <div>
                      <Label>Interests</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          {
                            id: "Sightseeing",
                            label:
                              "Sightseeing (museums, landmarks, architecture)",
                          },
                          { id: "Sporting-events", label: "Sporting events" },
                          {
                            id: "Live-music-concerts",
                            label: "Live music/concerts",
                          },
                          {
                            id: "Nightlife",
                            label: "Nightlife (bars, clubs, lounges)",
                          },
                          {
                            id: "Outdoor-activities",
                            label:
                              "Outdoor activities (parks, trails, waterfronts)",
                          },
                          {
                            id: "Food-and-drink",
                            label:
                              "Food and drink (restaurants, breweries, food tours)",
                          },
                          {
                            id: "Shopping",
                            label: "Shopping (boutiques, markets, malls)",
                          },
                          { id: "Art", label: "Art" },
                          {
                            id: "Relaxation",
                            label: "Relaxation (spas, wellness centers)",
                          },
                          { id: "Other", label: "Other" },
                        ].map((item) => (
                          <div key={item.id}>
                            <input
                              type="checkbox"
                              id={item.id}
                              onChange={() =>
                                handleCheckboxChange("interest", item.label)
                              }
                            />
                            <label htmlFor={item.id} className="ml-2">
                              {item.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Transportation Preferences */}
                    <div>
                      <Label>Transportation Options</Label>
                      <select
                        className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                        value={formData.transportation}
                        onChange={handleInputChange}
                        name="transportation"
                      >
                        <option value="" disabled selected>
                          Select Transportation
                        </option>
                        <option value="public">Public Transportation</option>
                        <option value="ride-sharing">
                          Ride-sharing (Uber/Lyft)
                        </option>
                        <option value="private">Private Transportation</option>
                        <option value="car-rental">Car Rentals</option>
                        <option value="biking">Biking</option>
                        <option value="walking">Walking Routes</option>
                      </select>
                    </div>
                    {/* Cuisine Preferences */}
                    <div>
                      <Label>Cuisine Preferences</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: "detroit-classics", label: "Detroit Classics" },
                          { id: "mexican", label: "Mexican" },
                          { id: "italian", label: "Italian" },
                          { id: "asian", label: "Asian" },
                          { id: "fusion", label: "Fusion" },
                          { id: "vegan", label: "Vegan/Vegetarian" },
                          { id: "soul-food", label: "Soul Food" },
                          { id: "seafood", label: "Seafood" },
                          { id: "desserts", label: "Desserts/Cafes" },
                        ].map((item) => (
                          <div key={item.id}>
                            <input
                              type="checkbox"
                              id={item.id}
                              onChange={() =>
                                handleCheckboxChange(
                                  "cuisinePreferences",
                                  item.label
                                )
                              }
                            />
                            <label htmlFor={item.id} className="ml-2">
                              {item.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Dining Preferences */}
                    <div>
                      <Label>Dining Preferences</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: "Fine-dining", label: "Fine-dining" },
                          { id: "Casual-dining", label: "Casual dining" },
                          {
                            id: "Local-Detroit-classics",
                            label:
                              "Local Detroit classics (Coney dogs, Detroit-style pizza)",
                          },
                          { id: "Mexican", label: "Mexican" },
                          {
                            id: "International-cuisine",
                            label: "International cuisine",
                          },
                          { id: "Vegetarian", label: "Vegetarian" },
                          { id: "Italian", label: "Italian" },
                          { id: "Asian", label: "Asian" },
                          { id: "Fusion", label: "Fusion" },
                          { id: "Soul-Food", label: "Soul Food" },
                          { id: "Sea-food", label: "Seafood" },
                          { id: "Deserts-Cafes", label: "Deserts-Cafes" },
                          {
                            id: "open-to-all-types-of-food",
                            label: "I’m open to all types of food",
                          },
                        ].map((item) => (
                          <div key={item.id}>
                            <input
                              type="checkbox"
                              id={item.id}
                              onChange={() =>
                                handleCheckboxChange(
                                  "diningPreferences",
                                  item.label
                                )
                              }
                            />
                            <label htmlFor={item.id} className="ml-2">
                              {item.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Activity Preferences */}
                    <div>
                      <Label>Activity Preferences</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: "sports-events", label: "Sports Events" },
                          {
                            id: "family-friendly",
                            label: "Family-Friendly Experiences",
                          },
                          { id: "live-concerts", label: "Concerts" },
                          { id: "Festivals", label: "Festivals" },
                          {
                            id: "Food-wine-tastings",
                            label: "Food/wine tastings",
                          },
                          {
                            id: "Theater-performances",
                            label: "Theater-performances",
                          },
                        ].map((item) => (
                          <div key={item.id}>
                            <input
                              type="checkbox"
                              id={item.id}
                              onChange={() =>
                                handleCheckboxChange(
                                  "activityPreferences",
                                  item.label
                                )
                              }
                            />
                            <label htmlFor={item.id} className="ml-2">
                              {item.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* LandMark */}
                    <div>
  <Label>Detroit Landmarks/Attraction</Label>
  <div className="grid grid-cols-2 gap-2">
    {[
      {
        id: "Detroit-Institute-of-Arts",
        label: "Detroit-Institute-of-Arts",
      },
      {
        id: "Comerica-Park",
        label: "Comerica Park (Tigers baseball)",
      },
      {
        id: "Ford-Field",
        label: "Ford Field (Lions football)",
      },
      {
        id: "Little-Caesars-Arena",
        label: "Little Caesars Arena (Red Wings hockey, Pistons)",
      },
      { id: "Eastern-Market", label: "Eastern Market" },
      { id: "Belle-Isle-Park", label: "Belle Isle Park" },
      {
        id: "Motown-Museum",
        label: "Motown Museum",
      },
      {
        id: "Detroit-Historical-Museum",
        label: "Detroit Historical Museum",
      },
      {
        id: "The-Guardian-Building",
        label: "The Guardian Building",
      },
      {
        id: "open-to-suggestions",
        label: "I’m open to suggestions",
      },
    ].map((item) => (
      <div key={item.id}>
        <input
          type="checkbox"
          id={item.id}
          onChange={() =>
            handleCheckboxChange("landmarks", item.label) // Use "landmarks" as the category
          }
        />
        <label htmlFor={item.id} className="ml-2">
          {item.label}
        </label>
      </div>
    ))}
  </div>
</div>
                    {/* Entertainment */}
                    <div>
                      <Label>Entertainment or Music Preferences</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: "Live-rock-music", label: "Live rock music" },
                          {
                            id: "Jazz-blues",
                            label: "Jazz/blues",
                          },
                          { id: "Classical", label: "Classical" },
                          { id: "Hip-hop", label: "Hip-hop/R&B" },
                          { id: "Pop-Top", label: "Pop/Top 40" },
                          { id: "Electronic-EDM", label: "Electronic/EDM" },
                          {
                            id: "Comedy-shows",
                            label: "Comedy shows",
                          },
                          {
                            id: "Theater-performing-arts",
                            label: "Theater/performing arts",
                          },
                          {
                            id: "open-to-new-experiences",
                            label: "I’m open to new experiences",
                          },
                        ].map((item) => (
                          <div key={item.id}>
                            <input
                              type="checkbox"
                              id={item.id}
                              onChange={() =>
                                handleCheckboxChange(
                                  "entertainmentPreferences",item.label)
                              }
                            />
                            <label htmlFor={item.id} className="ml-2">
                              {item.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Entertainment */}
                    <div>
                      <Label>Dietary restrictions or preferences?</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: "Gluten-free", label: "Gluten-free" },
                          {
                            id: "Dairy-free",
                            label: "Dairy-free",
                          },
                          { id: "Vegetarian", label: "Vegetarian" },
                          { id: "Vegan", label: "Vegan" },
                          { id: "Kosher", label: "Kosher" },
                          { id: "Halal", label: "Halal" },
                        ].map((item) => (
                          <div key={item.id}>
                            <input
                              type="checkbox"
                              id={item.id}
                              onChange={() =>
                                handleCheckboxChange(
                                  "dietaryPreferences",
                                  item.label
                                )
                              }
                            />
                            <label htmlFor={item.id} className="ml-2">
                              {item.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Accomdation */}
                    <div>
                      <Label>Accomodation</Label>
                      <select
                        className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                        value={formData.accomodation}
                        onChange={handleInputChange}
                        name="accomodation"
                      >
                        <option value="" disabled selected>
                          Select Accomodation
                        </option>
                        <option value="public">Botique Hotel</option>
                        <option value="ride-sharing">Luxury Hotel</option>
                        <option value="private">Budget Friendly Hotel</option>
                        <option value="car-rental">
                          AirBnB or Vaction rental
                        </option>
                        <option value="biking">No accomodation needed</option>
                      </select>
                    </div>
                  {/* Preferred Pace */}
<div>
  <Label>Preferred Pace</Label>
  <select
    className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
    value={formData.preferredPace}
    onChange={handleInputChange}
    name="preferredPace"
  >
    <option value="" disabled>
      Select Preferred Pace
    </option>
    <option value="relaxed">Relaxed, with Plenty of Downtime</option>
    <option value="moderate">Moderate, a good mix of activities and free time</option>
    <option value="busy">Busy, packed with activities and experiences</option>
  </select>
</div>

                    {/* Any special accessibility features */}
                    <div>
                      <Label>Any special accessibility features</Label>
                      <select
                        className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                        value={formData.accessibility} // Corrected value binding
                        onChange={handleInputChange}
                        name="accessibility" // Correct name for accessibility field
                      >
                        <option value="" disabled>
                          Select Any special accessibility features
                        </option>
                        <option value="Yes, Wheelchairs access etc">
                          Yes, Wheelchairs access etc
                        </option>
                        <option value="NO">NO</option>
                        <option value="Not Sure Yet">Not Sure Yet</option>
                      </select>
                    </div>
                    {/* Celebrating a special occasion? */}
                    <div>
                      <Label>Celebrating a special occasion?</Label>
                      <select
                        className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                        value={formData.specialOccasion} // Corrected value binding
                        onChange={handleInputChange}
                        name="specialOccasion" // Correct name for specialOccasion field
                      >
                        <option value="" disabled>
                          Select special occasion?
                        </option>
                        <option value="Yes, (anniversary, birthday, engagement etc.)">
                          Yes, (anniversary, birthday, engagement etc.)
                        </option>
                        <option value="NO">NO</option>
                        <option value="Prefer Not to say">
                          Prefer Not to say
                        </option>
                      </select>
                    </div>
                    {/* Additional activity suggestions during your trip */}
                    <div>
                      <Label>
                        Additional activity suggestions during your trip
                      </Label>
                      <select
                        className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                        value={formData.additionalActivities} // Corrected value binding
                        onChange={handleInputChange}
                        name="additionalActivities" // Correct name for additionalActivities field
                      >
                        <option value="" disabled>
                          Select Additional activity suggestions
                        </option>
                        <option value="Yes, send Real time accommodation">
                          Yes, send Real time accommodation
                        </option>
                        <option value="NO, Stick to original Plan">
                          NO, Stick to original Plan
                        </option>
                        <option value="Not sure yet">Not sure yet</option>
                      </select>
                    </div>
                    {/* Would you like to explore any nearby areas outside of Detroit? */}
                    <div>
                      <Label>
                        Would you like to explore any nearby areas outside of
                        Detroit?
                      </Label>
                      <select
                        className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                        value={formData.exploreNearby} // Corrected value binding
                        onChange={handleInputChange}
                        name="exploreNearby" // Correct name for exploreNearby field
                      >
                        <option value="" disabled>
                          Select Additional activity suggestions
                        </option>
                        <option value="Yes, I'd like to see nearby suburbs or attractions">
                          Yes, I would like to see nearby suburbs or attractions
                        </option>
                        <option value="NO, I will stay in Detroit">
                          NO, I will stay in Detroit
                        </option>
                        <option value="Not sure yet">Not sure yet</option>
                      </select>
                    </div>
                    {/* Budget Slider */}
                    <div>
                      <Label>Budget (USD)</Label>
                      <div className="flex items-center space-x-4">
                        <input
                          type="range"
                          min="0"
                          max="5000"
                          step="100"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                        <span className="text-sm text-gray-700">
                          ${formData.budget}
                        </span>
                      </div>
                    </div>
                    {/* Submit Button */}
                    <Button
                      onClick={handleSubmit}
                      disabled={isSaving} // Disable the button while saving
                      className="relative flex items-center justify-center"
                    >
                      {isSaving ? (
                        <span className="inline-block w-5 h-5 border-2 border-t-2 border-gray-200 border-t-blue-500 rounded-full animate-spin"></span>
                      ) : (
                        "Save Itinerary"
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </TabsContent>{" "}
      </Tabs>
    </div>
  );
}

// <Button
//   variant='outline'
//   onClick={() =>
//     handleGenerateSuggestions(itinerary)
//   }
//   disabled={
//     itineraryLoadingState[itinerary.id] ||
//     isGeneratingSuggestions
//   }
// >
//   {itineraryLoadingState[itinerary.id]
//     ? 'Generating Suggestion'
//     : isGeneratingSuggestions
//     ? 'Generating suggestions for your itinerary...'
//     : 'Generate Suggestions'}
// </Button>
