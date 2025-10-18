import ReactPlayer from "react-player";
import AboutPage from "./AboutPage";
import video from "/video.mp4";

const HomePage = ({ setActivePage, colors }) => (
  <div
    className="flex flex-col items-center min-h-screen text-center transition-colors duration-500"
    style={{ backgroundColor: colors.background, color: colors.text }}
  >
    {/* Fullscreen video section */}
    <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden mb-4">
      <video
        src="/video.mp4"
        autoPlay
        loop
        muted
        playsInline
        controls
        width="100%"
        style={{ height: "60vh", objectFit: "cover", background: "black" }}
      />
    </div>

    {/* Main content */}
    <div className="flex flex-col items-center justify-center flex-grow px-4 sm:px-6 space-y-3">
      <h1
        className="text-5xl sm:text-6xl md:text-7xl font-extrabold"
        style={{ fontFamily: "Modo Badoni", color: colors.secondary }}
      >
        EQUINOX
      </h1>
      <h2
        className="text-lg sm:text-xl md:text-2xl tracking-widest font-thin"
        style={{ fontFamily: "Libre Baskerville", color: colors.primary }}
      >
        2025
      </h2>
      <p
        className="max-w-xl text-sm sm:text-base md:text-lg"
        style={{ fontFamily: "Raleway", color: colors.text }}
      >
        Join us for an unforgettable interschool event showcasing talent,
        innovation, and creativity.
      </p>

      {/* About Section */}
      <div className="w-full max-w-3xl">
        <AboutPage setActivePage={setActivePage} colors={colors} />
      </div>

      {/* Register Button */}
      <button
        onClick={() => setActivePage("registration")}
        className="px-6 py-3 text-base sm:text-lg font-bold rounded-full shadow-md transform transition-all duration-300 hover:scale-105 active:scale-95"
        style={{
          backgroundColor: colors.primary,
          color: colors.secondary,
          border: `2px solid ${colors.secondary}`,
        }}
      >
        Register Now
      </button>
    </div>
  </div>
);

export default HomePage;
