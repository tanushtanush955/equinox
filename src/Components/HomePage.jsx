const HomePage = ({ setActivePage, colors }) => (
  <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 sm:p-8 transition-colors duration-500" style={{ backgroundColor: colors.background, color: colors.text }}>
    <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold mb-2 sm:mb-4 animate-fade-in" style={{ fontFamily: 'Modo Badoni', color: colors.secondary }}>EQUINOX</h1>
    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-6 sm:mb-8 tracking-widest font-thin animate-slide-up" style={{ fontFamily: 'Libre Baskerville', color: colors.primary }}>2025</h2>
    <p className="max-w-xl text-md sm:text-lg md:text-xl mb-10 sm:mb-12 animate-fade-in-delay-1" style={{ fontFamily: 'Raleway', color: colors.text }}>
      Join us for an unforgettable interschool event showcasing talent, innovation, and creativity.
    </p>
    <button
      onClick={() => setActivePage('registration')}
      className="px-6 py-3 sm:px-8 sm:py-4 text-lg sm:text-xl font-bold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95 animate-pulse-once"
      style={{
        backgroundColor: colors.primary,
        color: colors.secondary,
        border: `2px solid ${colors.secondary}`,
      }}
    >
      Register Now
    </button>
  </div>
);

export default HomePage;