import AboutPage from "./AboutPage";

const HomePage = ({ setActivePage, colors }) => (
  <div className="flex flex-col min-h-screen transition-colors duration-500" style={{ backgroundColor: colors.background, color: colors.text }}>
    {/* Fullscreen video section */}
    <div className="relative w-full px-2 mt-6 h-[75vh] overflow-hidden rounded-2xl shadow-lg">
      <video
        src="/video.mp4"
        autoPlay
        loop
        muted
        playsInline
        controls
        className="w-full h-full object-cover rounded-2xl"
      />
    </div>

    {/* Main content panel aligned right */}
    <div className="flex justify-end w-full mt-6 px-4 sm:px-6">
      <div className="bg-black bg-opacity-5 p-6 rounded-2xl shadow-lg flex flex-col items-end text-right max-w-xl space-y-3">
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
          className="text-sm sm:text-base md:text-lg"
          style={{ fontFamily: "Raleway", color: colors.text }}
        >
          Join us for an unforgettable interschool event showcasing talent, innovation, and creativity.
        </p>
      </div>
    </div>

    {/* About panel aligned left */}
    <div className="flex justify-start w-full mt-6 px-4 sm:px-6">
      <div className="bg-black bg-opacity-5 p-6 rounded-2xl shadow-lg max-w-3xl">
        <AboutPage setActivePage={setActivePage} colors={colors} />
      </div>
    </div>

    {/* Register button centered */}
    <div className="flex justify-center w-full mt-6 px-4 sm:px-6">
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
