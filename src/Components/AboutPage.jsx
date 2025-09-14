const AboutPage = ({ colors }) => (
  <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 transition-colors duration-500" style={{ backgroundColor: colors.background, color: colors.text }}>
    <div className="max-w-3xl text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6" style={{ fontFamily: 'Modo Badoni', color: colors.secondary }}>About EQUINOX</h1>
      <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-4 sm:mb-6" style={{ fontFamily: 'Raleway', color: colors.text }}>
        EQUINOX 2025 is more than just an event; it's a celebration of talent, intellect, and collaboration. Bringing together students from various schools, we provide a platform for them to compete, learn, and grow. Our mission is to foster a spirit of healthy competition and create an environment where every participant can shine. From technical challenges to artistic performances, Equinox offers something for everyone.
      </p>
      <p className="text-base sm:text-lg md:text-xl leading-relaxed" style={{ fontFamily: 'Raleway', color: colors.text }}>
        Organized by a dedicated team of students and faculty, this event is designed to push boundaries and inspire the next generation of leaders and innovators. We look forward to welcoming you.
      </p>
    </div>
  </div>
);

export default AboutPage;