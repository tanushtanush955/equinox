const AboutPage = ({ colors }) => (
  <div className="flex flex-col items-start text-left space-y-3 transition-colors duration-500" style={{ color: colors.text }}>
    <h1
      className="text-3xl sm:text-4xl md:text-5xl font-bold"
      style={{ fontFamily: "Modo Badoni", color: colors.text }}
    >
      About EQUINOX
    </h1>
    <p
      className="text-base sm:text-lg leading-relaxed"
      style={{ fontFamily: "Raleway", color: colors.text }}
    >
      EQUINOX 2025 is more than just an event; it's a celebration of talent, intellect, and collaboration. Bringing together students from various schools, we provide a platform for them to compete, learn, and grow. Our mission is to foster a spirit of healthy competition and create an environment where every participant can shine.
    </p>
    <p
      className="text-base sm:text-lg leading-relaxed"
      style={{ fontFamily: "Raleway", color: colors.text }}
    >
      Organized by a dedicated team of students and faculty, this event is designed to push boundaries and inspire the next generation of leaders and innovators. We look forward to welcoming you.
    </p>
  </div>
);

export default AboutPage;
