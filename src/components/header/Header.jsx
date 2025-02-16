import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [token, setToken] = useState(localStorage.getItem("Token"));

  useEffect(() => {
    // Custom event to handle local storage updates in the same tab
    const handleTokenChange = () => {
      setToken(localStorage.getItem("Token"));
    };

    // Listen for the custom event to update the token
    window.addEventListener("tokenChanged", handleTokenChange);

    // Listen for changes to the localStorage item "Token" from other tabs
    const handleStorageChange = (event) => {
      if (event.key === "Token") {
        setToken(event.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup listeners
    return () => {
      window.removeEventListener("tokenChanged", handleTokenChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Function to update the token and emit the custom event
  const updateToken = (value) => {
    localStorage.setItem("Token", value);
    const event = new Event("tokenChanged");
    window.dispatchEvent(event);
  };

  return (
    <header className="shadow-md fixed top-0 left-0 right-0 z-50 bg-[#fff] text-gray-800 ">
      {/* <div className="absolute inset-0"></div> */}
      <nav className="relative z-10 flex justify-between items-center px-4 py-4">
        <Link to={"/"}>
          <div className="text-2xl font-bold">DEW</div>
        </Link>
        <div className="space-x-4">
          <Link to={"/faq"}>
            <a
              href="#features"
              className="uppercase text-light font-semibold hover:underline underline-offset-8"
            >
              FAQ
            </a>
          </Link>
          <Link to={"/experience"}>
            <a
              href="#experiences"
              className="uppercase text-light font-semibold hover:underline underline-offset-8"
            >
              Experiences
            </a>
          </Link>{" "}
          <Link to={"/Partner"}>
            <a
              href="#Partner"
              className="uppercase text-light font-semibold hover:underline underline-offset-8"
            >
              Become Partner
            </a>
          </Link>{" "}
          <Link to={"/Features"}>
            <a
              href="#Features"
              className="uppercase text-light font-semibold hover:underline underline-offset-8"
            >
              Features{" "}
            </a>
          </Link>
          <Link to={"/blogs"}>
            <a
              href="#experiences"
              className="uppercase text-light font-semibold hover:underline underline-offset-8"
            >
              Blogs
            </a>
          </Link>
          {!token ? (
            <>
              <Link to={"/login"}>
                <a
                  href="#login"
                  className="uppercase text-light font-semibold hover:underline underline-offset-8"
                >
                  Login
                </a>
              </Link>
              <Link to={"/price"}>
                <a
                  href="#price"
                  className="uppercase text-light font-semibold hover:underline underline-offset-8"
                >
                  Pricing
                </a>
              </Link>
            </>
          ) : (
            <>
              <Link to={"/login"}>
                <a
                  href="#logout"
                  className="uppercase text-light font-semibold hover:underline underline-offset-8"
                  onClick={() => {
                    localStorage.removeItem("Token"); // Remove the token completely
                    updateToken(""); // Trigger state update and event
                    setTimeout(() => {
                      window.location.reload(); // Force reload after redirect
                    }, 0);
                  }}
                >
                  Logout
                </a>
              </Link>

              <Link to={"/user-profile"}>
                <a
                  href="#signup"
                  className="uppercase text-light font-semibold hover:underline underline-offset-8"
                >
                  Profile
                </a>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
