import React, { useState, useEffect } from 'react';

const lightColors = {
  primary: '#91A8CE',
  secondary: '#04315F',
  tertiary: '#FFFBFA',
  background: '#FFFBFA',
  card: 'white',
  text: '#04315F',
};

const darkColors = {
  primary: '#91A8CE',
  secondary: '#FFFBFA',
  tertiary: '#04315F',
  background: '#04315F',
  card: '#0D3E70',
  text: '#FFFBFA',
};

// All event data, moved to a central dictionary for scalability and easy backend integration.
const eventsData = [
  {
    category: 'Stage Events',
    description: 'Showcase your talent on the main stage.',
    events: [
      { name: 'Solo Singing', details: 'A musical competition to find the best voices and performers.', venue: 'Main Auditorium', rules: ['Participants must perform one song.', 'No vulgarity allowed.'], num_participants: 1, num_teams: 1, timings: '10:00 AM - 12:00 PM', contact_no: '9108357266', fees: '₹ 200' },
      { name: 'Group Dance', details: 'Express yourself through movement and choreography in this dance-off.', venue: 'Dance Studio A', rules: ['Minimum of 3 participants per team.', 'Performance time is 5-7 minutes.'], num_participants: 5, num_teams: 3, timings: '01:00 PM - 03:00 PM', contact_no: '8147498934', fees: '₹ 500' },
      { name: 'Drama Skit', details: 'Showcase your acting skills in a short dramatic performance.', venue: 'Main Auditorium', rules: ['Skit duration is 10-15 minutes.', 'Props must be safe and approved.'], num_participants: 8, num_teams: 3, timings: '04:00 PM - 06:00 PM', contact_no: '9108357266', fees: '₹ 800' }
    ]
  },
  {
    category: 'Art Events',
    description: 'Unleash your creativity with a brush and canvas.',
    events: [
      { name: 'Live Painting', details: 'Paint a masterpiece in real-time under pressure.', venue: 'Art Block', rules: ['Canvas and paints will be provided.', 'Theme will be announced on the spot.'], num_participants: 1, num_teams: 1, timings: '10:00 AM - 12:00 PM', contact_no: '8147498934', fees: '₹ 250' },
      { name: 'Sculpture Contest', details: 'Create a three-dimensional work of art from given materials.', venue: 'Art Block', rules: ['All tools must be brought by the participants.', 'Work must be original.'], num_participants: 1, num_teams: 1, timings: '01:00 PM - 03:00 PM', contact_no: '9108357266', fees: '₹ 300' },
      { name: 'Digital Art Showcase', details: 'Display your digital masterpieces and animation skills.', venue: 'Computer Lab A', rules: ['Submissions must be in JPG or PNG format.', 'No plagiarism.'], num_participants: 1, num_teams: 1, timings: '04:00 PM - 06:00 PM', contact_no: '8147498934', fees: '₹ 200' }
    ]
  },
  {
    category: 'Science and Math Events',
    description: 'Challenge your mind with logical and scientific puzzles.',
    events: [
      { name: 'Robotics Challenge', details: 'Build, program, and battle your own robots in this electrifying showdown.', venue: 'Football Ground', rules: ['Robots must not exceed specific dimensions.', 'Team members can be up to 5.'], num_participants: 5, num_teams: 2, timings: '10:00 AM - 01:00 PM', contact_no: '9108357266', fees: '₹ 1000' },
      { name: 'Math Olympiad', details: 'A test of mathematical prowess and quick thinking.', venue: 'Classroom 101', rules: ['Individual event.', 'No calculators allowed.'], num_participants: 1, num_teams: 1, timings: '02:00 PM - 04:00 PM', contact_no: '8147498934', fees: '₹ 150' },
      { name: 'Science Fair', details: 'Present your groundbreaking scientific projects and models.', venue: 'Science Lab B', rules: ['Projects must be functional and safe.', 'Team size is 2-4 members.'], num_participants: 4, num_teams: 2, timings: '10:00 AM - 05:00 PM', contact_no: '9108357266', fees: '₹ 600' }
    ]
  },
  {
    category: 'Literary Events',
    description: 'Prove your command over words and language.',
    events: [
      { name: 'Debate', details: 'Showcase your oratory skills and logical reasoning in a series of intense debates.', venue: 'Seminar Hall', rules: ['Two members per team.', 'Topics will be given on the spot.'], num_participants: 2, num_teams: 5, timings: '10:00 AM - 02:00 PM', contact_no: '8147498934', fees: '₹ 400' },
      { name: 'Poetry Slam', details: 'Express your thoughts and emotions through spoken-word poetry.', venue: 'Open Mic Stage', rules: ['Individual performance.', 'Poetry must be original.'], num_participants: 1, num_teams: 1, timings: '03:00 PM - 05:00 PM', contact_no: '9108357266', fees: '₹ 150' },
      { name: 'Story Writing', details: 'Craft an original short story under a given theme.', venue: 'Library', rules: ['Must be completed within the time limit.', 'No external resources.'], num_participants: 1, num_teams: 1, timings: '11:00 AM - 01:00 PM', contact_no: '8147498934', fees: '₹ 200' }
    ]
  },
  {
    category: 'Left vs Right Brain Events',
    description: 'A mix of logic and creativity to test both sides of your brain.',
    events: [
      { name: 'Quiz Bowl', details: 'Answer a wide range of questions in this fast-paced trivia competition.', venue: 'Classroom 201', rules: ['Teams of 2.', 'No use of mobile devices.'], num_participants: 2, num_teams: 5, timings: '10:00 AM - 12:00 PM', contact_no: '9108357266', fees: '₹ 300' },
      { name: 'Chess Tournament', details: 'Outsmart your opponent in a classic game of strategy.', venue: 'Chess Room', rules: ['Individual tournament.', 'Standard chess rules apply.'], num_participants: 1, num_teams: 1, timings: '01:00 PM - 04:00 PM', contact_no: '8147498934', fees: '₹ 100' },
      { name: 'Rubik\'s Cube Challenge', details: 'Solve the cube in the fastest time possible.', venue: 'Cafeteria', rules: ['Individual challenge.', 'Standard 3x3x3 cube.'], num_participants: 1, num_teams: 1, timings: '04:00 PM - 05:00 PM', contact_no: '9108357266', fees: '₹ 50' }
    ]
  },
  {
    category: 'Commerce Events',
    description: 'Test your business acumen and strategic thinking.',
    events: [
      { name: 'Business Plan Pitch', details: 'Pitch your innovative business idea to a panel of judges.', venue: 'Seminar Hall B', rules: ['Teams of 2-4.', 'Presentation time is 15 minutes.'], num_participants: 4, num_teams: 3, timings: '10:00 AM - 02:00 PM', contact_no: '8147498934', fees: '₹ 700' },
      { name: 'Marketing Strategy Contest', details: 'Develop and present a winning marketing plan for a product.', venue: 'Computer Lab B', rules: ['Teams of 2-3.', 'Creativity is key.'], num_participants: 3, num_teams: 3, timings: '03:00 PM - 05:00 PM', contact_no: '9108357266', fees: '₹ 500' },
      { name: 'Stock Market Simulation', details: 'Trade virtual stocks and compete for the highest portfolio value.', venue: 'Computer Lab C', rules: ['Individual or team of 2.', 'All decisions must be justified.'], num_participants: 2, num_teams: 5, timings: '09:00 PM - 04:00 PM', contact_no: '8147498934', fees: '₹ 400' }
    ]
  },
  {
    category: 'Cinema Events',
    description: 'Showcase your filmmaking and editing skills.',
    events: [
      { name: 'Short Film Competition', details: 'Produce and submit a short film on a given theme.', venue: 'Main Auditorium', rules: ['Film must be between 5-10 minutes.', 'Original work only.'], num_participants: 5, num_teams: 4, timings: '10:00 AM - 05:00 PM', contact_no: '9108357266', fees: '₹ 1200' },
      { name: 'Trailer Making', details: 'Create an exciting movie trailer from raw footage.', venue: 'Computer Lab D', rules: ['Trailer must be 1-2 minutes long.', 'Must use provided footage.'], num_participants: 3, num_teams: 4, timings: '10:00 AM - 01:00 PM', contact_no: '8147498934', fees: '₹ 600' },
      { name: 'Photography Contest', details: 'Capture the perfect shot and compete for the best photograph.', venue: 'Main Grounds', rules: ['Individual event.', 'Photos must be submitted by a deadline.'], num_participants: 1, num_teams: 1, timings: 'All Day', contact_no: '9108357266', fees: '₹ 150' }
    ]
  },
  {
    category: 'Exclusive Events',
    description: 'Special events for select participants.',
    events: [
      { name: 'Founder\'s Meet', details: 'An exclusive networking event for aspiring entrepreneurs.', venue: 'Seminar Hall C', rules: ['Invitation only.', 'Formal attire.'], num_participants: 1, num_teams: 1, timings: '06:00 PM - 08:00 PM', contact_no: '8147498934', fees: '₹ 1000' },
      { name: 'Leadership Seminar', details: 'Learn from industry leaders in this insightful seminar.', venue: 'Main Auditorium', rules: ['Pre-registration required.', 'Certificates will be provided.'], num_participants: 1, num_teams: 1, timings: '09:00 AM - 11:00 AM', contact_no: '9108357266', fees: '₹ 500' },
      { name: 'Panel Discussion', details: 'Participate in a thought-provoking discussion with experts.', venue: 'Seminar Hall A', rules: ['Open to all registered participants.', 'Questions must be submitted in advance.'], num_participants: 1, num_teams: 1, timings: '02:00 PM - 04:00 PM', contact_no: '8147498934', fees: '₹ 300' }
    ]
  }
];

// Custom MessageBox component
const MessageBox = ({ message, onClose, colors }) => {
  if (!message) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="p-8 rounded-lg shadow-lg text-center" style={{ color: colors.text, backgroundColor: colors.card, borderColor: colors.secondary, borderWidth: 2 }}>
        <p className="text-xl font-bold mb-4" style={{ fontFamily: 'Raleway' }}>{message}</p>
        <button
          onClick={onClose}
          className="px-6 py-2 text-md font-bold rounded-full transform transition-all duration-300 hover:scale-105"
          style={{ backgroundColor: colors.primary, color: colors.secondary, border: `2px solid ${colors.secondary}` }}
        >
          OK
        </button>
      </div>
    </div>
  );
};

// HomePage Component
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

// AboutPage Component
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

// EventsPage Component
const EventsPage = ({ setActivePage, setSelectedEvent, colors }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleExpand = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setActivePage('event-detail');
  };

  return (
    <div className="flex flex-col items-center p-4 sm:p-8 transition-colors duration-500" style={{ backgroundColor: colors.background, color: colors.text }}>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8" style={{ fontFamily: 'Modo Badoni', color: colors.secondary }}>Upcoming Events</h1>
      <div className="w-full max-w-lg md:max-w-2xl rounded-xl overflow-hidden shadow-2xl" style={{backgroundColor: colors.card}}>
        <div className="p-4" style={{ backgroundColor: colors.primary, color: colors.secondary, fontFamily: 'Modo Badoni', fontWeight: 'bold' }}>
          EVENTS
        </div>
        {eventsData.map((event, index) => (
          <div key={index} className="border-b border-gray-200" style={{borderColor: colors.text}}>
            <button
              onClick={() => toggleExpand(event.category)}
              className="w-full flex justify-between items-center p-4 transition-colors duration-300"
              style={{ backgroundColor: expandedCategory === event.category ? colors.primary : colors.card, color: expandedCategory === event.category ? colors.secondary : colors.text }}
            >
              <span className="text-lg sm:text-xl font-semibold" style={{ fontFamily: 'Libre Baskerville' }}>{event.category}</span>
              <i className={`fas fa-chevron-${expandedCategory === event.category ? 'up' : 'down'} transition-transform duration-300`}></i>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedCategory === event.category ? 'max-h-screen' : 'max-h-0'}`}
              style={{ backgroundColor: colors.card, color: colors.text, borderTop: `1px solid ${colors.primary}` }}
            >
              <div className="p-4">
                <p className="mb-2 italic text-sm sm:text-base" style={{ fontFamily: 'Raleway' }}>{event.description}</p>
                <ul className="list-disc list-inside space-y-1">
                  {event.events.map((subEvent, subIndex) => (
                    <li key={subIndex} className="cursor-pointer hover:text-gray-500 transition-colors duration-200 text-sm sm:text-base" onClick={() => handleEventClick(subEvent)} style={{ fontFamily: 'Raleway' }}>{subEvent.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// EventDetailPage Component
const EventDetailPage = ({ event, onBack, colors }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 transition-colors duration-500" style={{ backgroundColor: colors.background, color: colors.text }}>
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6" style={{ fontFamily: 'Modo Badoni', color: colors.secondary }}>{event.name}</h1>
        <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8" style={{ fontFamily: 'Raleway', color: colors.text }}>
          {event.details}
        </p>
        <div className="text-left w-full max-w-md mx-auto">
          <ul className="space-y-4">
            <li className="text-base sm:text-lg" style={{ fontFamily: 'Raleway' }}>
              <span className="font-semibold" style={{ color: colors.secondary }}>Venue:</span> {event.venue}
            </li>
            <li className="text-base sm:text-lg" style={{ fontFamily: 'Raleway' }}>
              <span className="font-semibold" style={{ color: colors.secondary }}>Timings:</span> {event.timings}
            </li>
            <li className="text-base sm:text-lg" style={{ fontFamily: 'Raleway' }}>
              <span className="font-semibold" style={{ color: colors.secondary }}>Participants per team:</span> {event.num_participants}
            </li>
            <li className="text-base sm:text-lg" style={{ fontFamily: 'Raleway' }}>
              <span className="font-semibold" style={{ color: colors.secondary }}>Max teams per institution:</span> {event.num_teams}
            </li>
            <li className="text-base sm:text-lg" style={{ fontFamily: 'Raleway' }}>
              <span className="font-semibold" style={{ color: colors.secondary }}>Fees:</span> {event.fees}
            </li>
            <li className="text-base sm:text-lg" style={{ fontFamily: 'Raleway' }}>
              <span className="font-semibold" style={{ color: colors.secondary }}>Contact No:</span> {event.contact_no}
            </li>
            <li className="text-base sm:text-lg" style={{ fontFamily: 'Raleway' }}>
              <span className="font-semibold" style={{ color: colors.secondary }}>Rules:</span>
              <ul className="list-disc list-inside ml-4 space-y-1">
                {event.rules.map((rule, index) => <li key={index} style={{ fontFamily: 'Raleway' }}>{rule}</li>)}
              </ul>
            </li>
          </ul>
        </div>
        <button
          onClick={onBack}
          className="mt-8 px-6 py-3 text-md font-bold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95"
          style={{ backgroundColor: colors.primary, color: colors.secondary, border: `2px solid ${colors.secondary}` }}
        >
          Back to Events
        </button>
      </div>
    </div>
  );
};

// RegistrationPage Component
const RegistrationPage = ({ setActivePage, colors }) => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 sm:p-8" style={{ backgroundColor: colors.background, color: colors.text }}>
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8" style={{ fontFamily: 'Modo Badoni', color: colors.secondary }}>Choose Your Registration Type</h1>
    <p className="max-w-xl text-base sm:text-lg md:text-xl mb-10 sm:mb-12" style={{ fontFamily: 'Raleway', color: colors.text }}>
      Are you registering as an individual or on behalf of an institution?
    </p>
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
      <button
        className="px-6 py-4 text-lg sm:text-xl font-bold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95"
        style={{
          backgroundColor: colors.primary,
          color: colors.secondary,
          border: `2px solid ${colors.secondary}`,
        }}
        onClick={() => setActivePage('individual-registration')}
      >
        Individual
      </button>
      <button
        className="px-6 py-4 text-lg sm:text-xl font-bold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95"
        style={{
          backgroundColor: colors.primary,
          color: colors.secondary,
          border: `2px solid ${colors.secondary}`,
        }}
        onClick={() => setActivePage('institution-registration')}
      >
        Institution
      </button>
    </div>
    <div className="mt-8">
      <button
        onClick={() => setActivePage('registration-lookup')}
        className="text-sm font-semibold hover:underline"
        style={{ color: colors.secondary }}
      >
        Already registered? Update or view your registration
      </button>
    </div>
  </div>
);

// Individual Registration Page
const IndividualRegistrationPage = ({ setActivePage, setMessage, colors }) => {
  const [participants, setParticipants] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');

  const handleEventChange = (e) => {
    const eventName = e.target.value;
    setSelectedEvent(eventName);
    if (eventName) {
      const eventDetails = eventsData.flatMap(cat => cat.events).find(e => e.name === eventName);
      if (eventDetails) {
        setParticipants(Array.from({ length: eventDetails.num_participants }, () => ({ name: '', phone: '', email: '' })));
      }
    } else {
      setParticipants([]);
    }
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newParticipants = [...participants];
    newParticipants[index][name] = value;
    setParticipants(newParticipants);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const uid = crypto.randomUUID();
    const registrationData = { type: 'individual', selectedEvent, participants };
    console.log('Submitted data:', registrationData);
    localStorage.setItem(uid, JSON.stringify(registrationData));
    setMessage(`Registration submitted successfully! Your UID is: ${uid}`);
    setActivePage('thank-you');
  };

  const allEvents = eventsData.flatMap(category => category.events.map(event => event.name));

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8 transition-colors duration-500" style={{ backgroundColor: colors.background, color: colors.text }}>
      <div className="w-full max-w-xl md:max-w-3xl lg:max-w-4xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8" style={{ fontFamily: 'Modo Badoni', color: colors.secondary }}>Individual Registration</h1>
        
        <div className="p-6 sm:p-8 rounded-xl shadow-lg mb-6" style={{ backgroundColor: colors.card, color: colors.text, border: `2px solid ${colors.primary}` }}>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ fontFamily: 'Modo Badoni' }}>Choose Your Event</h2>
          <div className="flex flex-col">
            <label className="text-sm sm:text-base font-medium mb-1" style={{ fontFamily: 'Raleway' }}>Event</label>
            <select
              name="event"
              value={selectedEvent}
              onChange={handleEventChange}
              className="p-2 sm:p-3 rounded-lg border-2"
              style={{ borderColor: colors.secondary, color: colors.text, backgroundColor: colors.tertiary }}
            >
              <option value="">Select an Event</option>
              {allEvents.map((eventName, eventIndex) => (
                <option key={eventIndex} value={eventName}>{eventName}</option>
              ))}
            </select>
          </div>
        </div>
        
        {selectedEvent && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {participants.map((participant, index) => (
              <div key={index} className="p-6 sm:p-8 rounded-xl shadow-lg" style={{ backgroundColor: colors.card, color: colors.text, border: `2px solid ${colors.primary}` }}>
                <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ fontFamily: 'Modo Badoni' }}>Participant {index + 1}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <label className="text-sm sm:text-base font-medium mb-1" style={{ fontFamily: 'Raleway' }}>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={participant.name}
                      onChange={(e) => handleInputChange(index, e)}
                      className="p-2 sm:p-3 rounded-lg border-2"
                      style={{ borderColor: colors.secondary, color: colors.text, backgroundColor: colors.tertiary }}
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm sm:text-base font-medium mb-1" style={{ fontFamily: 'Raleway' }}>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={participant.phone}
                      onChange={(e) => handleInputChange(index, e)}
                      className="p-2 sm:p-3 rounded-lg border-2"
                      style={{ borderColor: colors.secondary, color: colors.text, backgroundColor: colors.tertiary }}
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm sm:text-base font-medium mb-1" style={{ fontFamily: 'Raleway' }}>Reg. No</label>
                    <input
                      type="text"
                      name="reg_no"
                      value={participant.reg_no}
                      onChange={(e) => handleInputChange(index, e)}
                      className="p-2 sm:p-3 rounded-lg border-2"
                      style={{ borderColor: colors.secondary, color: colors.text, backgroundColor: colors.tertiary }}
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="px-8 py-4 text-lg font-bold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.secondary,
                  border: `2px solid ${colors.secondary}`,
                }}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// Institutional Registration Page
const InstitutionalRegistrationPage = ({ setActivePage, setMessage, colors, initialData }) => {
  const [schoolName, setSchoolName] = useState(initialData?.schoolName || '');
  const [selectedEvents, setSelectedEvents] = useState(initialData?.registrationForms.map(f => f.eventName) || []);
  const [headDelegate, setHeadDelegate] = useState(initialData?.headDelegate || { name: '', phone: '', reg_no: '' });
  const [registrationForms, setRegistrationForms] = useState(initialData?.registrationForms || []);

  const allEvents = eventsData.flatMap(category => category.events);
  const allEventNames = allEvents.map(event => event.name);

  const handleSelectAll = () => {
    setSelectedEvents(allEventNames);
  };

  const handleEventClick = (event) => {
    setSelectedEvents(prevEvents => {
      if (prevEvents.includes(event)) {
        return prevEvents.filter(e => e !== event);
      } else {
        return [...prevEvents, event];
      }
    });
  };

  const updateRegistrationForms = (currentEvents) => {
    const newForms = currentEvents.map(eventName => {
      const eventDetails = allEvents.find(e => e.name === eventName);
      const existingForm = registrationForms.find(f => f.eventName === eventName);
      if (existingForm) {
        return existingForm;
      }
      return {
        eventName,
        num_teams: eventDetails.num_teams,
        num_participants: eventDetails.num_participants,
        teams: [{
          teamName: `Team 1`,
          participants: Array.from({ length: eventDetails.num_participants }, () => ({ name: '', phone: '', reg_no: '' }))
        }]
      };
    });
    setRegistrationForms(newForms);
  };

  useEffect(() => {
    if (initialData) {
      setSchoolName(initialData.schoolName);
      setHeadDelegate(initialData.headDelegate);
      setSelectedEvents(initialData.registrationForms.map(f => f.eventName));
      setRegistrationForms(initialData.registrationForms);
    }
  }, [initialData]);

  useEffect(() => {
    updateRegistrationForms(selectedEvents);
  }, [selectedEvents]);

  const handleHeadDelegateChange = (e) => {
    const { name, value } = e.target;
    setHeadDelegate(prev => ({ ...prev, [name]: value }));
  };

  const handleTeamChange = (formIndex, teamIndex, participantIndex, e) => {
    const { name, value } = e.target;
    const newForms = [...registrationForms];
    const newParticipants = [...newForms[formIndex].teams[teamIndex].participants];
    newParticipants[participantIndex][name] = value;
    newForms[formIndex].teams[teamIndex].participants = newParticipants;
    setRegistrationForms(newForms);
  };

  const addTeam = (formIndex) => {
    const newForms = [...registrationForms];
    const eventDetails = allEvents.find(e => e.name === newForms[formIndex].eventName);
    if (newForms[formIndex].teams.length < eventDetails.num_teams) {
      newForms[formIndex].teams.push({
        teamName: `Team ${newForms[formIndex].teams.length + 1}`,
        participants: Array.from({ length: eventDetails.num_participants }, () => ({ name: '', phone: '', reg_no: '' }))
      });
      setRegistrationForms(newForms);
    } else {
      setMessage(`Maximum number of teams reached for ${newForms[formIndex].eventName}`);
    }
  };
  
  const removeTeam = (formIndex, teamIndex) => {
    const newForms = [...registrationForms];
    newForms[formIndex].teams.splice(teamIndex, 1);
    // Re-assign team names to be sequential after removal
    newForms[formIndex].teams = newForms[formIndex].teams.map((team, index) => ({
      ...team,
      teamName: `Team ${index + 1}`
    }));
    setRegistrationForms(newForms);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const uid = crypto.randomUUID();
    const registrationData = { type: 'institution', schoolName, headDelegate, registrationForms };
    console.log('Submitted data:', registrationData);
    localStorage.setItem(uid, JSON.stringify(registrationData));
    setMessage(`Institutional registration submitted! Your UID is: ${uid}`);
    setActivePage('thank-you');
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8 transition-colors duration-500" style={{ backgroundColor: colors.background, color: colors.text }}>
      <div className="w-full max-w-xl md:max-w-3xl lg:max-w-4xl">
        <button
          onClick={() => setActivePage('registration')}
          className="mb-4 px-4 py-2 text-sm font-bold rounded-full shadow-md transform transition-all duration-300 hover:scale-105 active:scale-95"
          style={{ backgroundColor: colors.primary, color: colors.secondary }}
        >
          &larr; Go Back
        </button>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8" style={{ fontFamily: 'Modo Badoni', color: colors.secondary }}>Institutional Registration</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-6 sm:p-8 rounded-xl shadow-lg" style={{ backgroundColor: colors.card, color: colors.text, border: `2px solid ${colors.primary}` }}>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ fontFamily: 'Modo Badoni' }}>Institution Details</h2>
            <div className="flex flex-col">
              <label className="text-sm sm:text-base font-medium mb-1" style={{ fontFamily: 'Raleway' }}>School/College Name</label>
              <input
                type="text"
                name="schoolName"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="p-2 sm:p-3 rounded-lg border-2"
                style={{ borderColor: colors.secondary, color: colors.text, backgroundColor: colors.tertiary }}
                required
              />
            </div>
            <h3 className="text-sm sm:text-base font-medium mt-4 mb-2" style={{ fontFamily: 'Raleway' }}>Head Delegate Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <input type="text" name="name" placeholder="Name" value={headDelegate.name} onChange={handleHeadDelegateChange} className="p-2 rounded-lg border-2" style={{ borderColor: colors.secondary, color: colors.text, backgroundColor: colors.tertiary }} required />
              <input type="tel" name="phone" placeholder="Phone" value={headDelegate.phone} onChange={handleHeadDelegateChange} className="p-2 rounded-lg border-2" style={{ borderColor: colors.secondary, color: colors.text, backgroundColor: colors.tertiary }} required />
              <input type="text" name="reg_no" placeholder="Reg. No" value={headDelegate.reg_no} onChange={handleHeadDelegateChange} className="p-2 rounded-lg border-2" style={{ borderColor: colors.secondary, color: colors.text, backgroundColor: colors.tertiary }} required />
            </div>
            <div className="flex flex-col mt-4">
              <h3 className="text-sm sm:text-base font-medium mb-2" style={{ fontFamily: 'Raleway' }}>Select Events</h3>
              <button
                type="button"
                onClick={handleSelectAll}
                className="px-4 py-2 mb-2 text-sm font-bold rounded-lg transition-colors duration-200"
                style={{ backgroundColor: colors.secondary, color: colors.tertiary }}
              >
                Select All
              </button>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {allEventNames.map((eventName, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleEventClick(eventName)}
                    className={`p-2 rounded-lg text-left transition-colors duration-200 ${selectedEvents.includes(eventName) ? 'bg-indigo-300 text-white font-semibold' : 'bg-gray-100 text-gray-700'}`}
                  >
                    {eventName}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {registrationForms.length > 0 && (
            <div className="space-y-6">
              {registrationForms.map((form, formIndex) => (
                <div key={formIndex} className="p-6 sm:p-8 rounded-xl shadow-lg" style={{ backgroundColor: colors.card, color: colors.text, border: `2px solid ${colors.primary}` }}>
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ fontFamily: 'Modo Badoni' }}>{form.eventName}</h2>
                  {form.teams.map((team, teamIndex) => (
                    <div key={teamIndex} className="mb-6 p-4 rounded-lg" style={{ backgroundColor: colors.tertiary, color: colors.secondary, border: `2px dashed ${colors.secondary}` }}>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold" style={{ fontFamily: 'Libre Baskerville' }}>{team.teamName}</h3>
                        {form.teams.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTeam(formIndex, teamIndex)}
                            className="px-3 py-1 text-xs font-bold rounded-full text-red-500 border border-red-500 hover:bg-red-500 hover:text-white transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="space-y-4">
                        {team.participants.map((participant, participantIndex) => (
                          <div key={participantIndex} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <input type="text" name="name" placeholder="Name" value={participant.name} onChange={(e) => handleTeamChange(formIndex, teamIndex, participantIndex, e)} className="p-2 rounded-lg border-2" style={{ borderColor: colors.secondary, color: colors.text, backgroundColor: colors.card }} required />
                            <input type="tel" name="phone" placeholder="Phone" value={participant.phone} onChange={(e) => handleTeamChange(formIndex, teamIndex, participantIndex, e)} className="p-2 rounded-lg border-2" style={{ borderColor: colors.secondary, color: colors.text, backgroundColor: colors.card }} required />
                            <input type="text" name="reg_no" placeholder="Reg. No." value={participant.reg_no} onChange={(e) => handleTeamChange(formIndex, teamIndex, participantIndex, e)} className="p-2 rounded-lg border-2" style={{ borderColor: colors.secondary, color: colors.text, backgroundColor: colors.card }} required />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  {form.teams.length < form.num_teams && (
                    <button
                      type="button"
                      onClick={() => addTeam(formIndex)}
                      className="mt-4 px-4 py-2 text-sm font-bold rounded-full transform transition-all duration-300 hover:scale-105"
                      style={{ backgroundColor: colors.secondary, color: colors.tertiary }}
                    >
                      Add New Team
                    </button>
                  )}
                </div>
              ))}
              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  className="px-8 py-4 text-lg font-bold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.secondary,
                    border: `2px solid ${colors.secondary}`,
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

// RegistrationLookupPage Component
const RegistrationLookupPage = ({ setActivePage, setRegistrationData, colors }) => {
  const [uid, setUid] = useState('');
  const [message, setMessage] = useState(null);

  const handleLookup = () => {
    // This simulates fetching data from a backend
    const storedData = localStorage.getItem(uid);
    if (storedData) {
      const data = JSON.parse(storedData);
      setRegistrationData(data);
      if (data.type === 'institution') {
        setActivePage('institution-registration');
      } else {
        setActivePage('individual-registration');
      }
    } else {
      setMessage("Registration ID not found. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8" style={{ backgroundColor: colors.background, color: colors.text }}>
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg" style={{ backgroundColor: colors.card, color: colors.text, border: `2px solid ${colors.primary}` }}>
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6" style={{ fontFamily: 'Modo Badoni', color: colors.secondary }}>Find Your Registration</h1>
        <p className="mb-4 text-center" style={{ fontFamily: 'Raleway' }}>Enter your unique registration ID below.</p>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            placeholder="Enter Registration ID"
            className="p-3 rounded-lg border-2"
            style={{ borderColor: colors.secondary, color: colors.text, backgroundColor: colors.tertiary }}
          />
          <button
            onClick={handleLookup}
            className="px-6 py-3 text-lg font-bold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: colors.secondary, color: colors.primary }}
          >
            Load Registration
          </button>
        </div>
        <MessageBox message={message} onClose={() => setMessage(null)} colors={colors} />
      </div>
    </div>
  );
};

// ThankYouPage Component
const ThankYouPage = ({ colors, registrationUID }) => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 sm:p-8" style={{ backgroundColor: colors.background, color: colors.text }}>
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6" style={{ fontFamily: 'Modo Badoni', color: colors.secondary }}>Thank You!</h1>
    <p className="max-w-xl text-base sm:text-lg md:text-xl mb-4" style={{ fontFamily: 'Raleway', color: colors.text }}>
      Your registration has been submitted successfully.
    </p>
    <p className="max-w-xl text-lg sm:text-xl md:text-2xl font-bold mb-10 sm:mb-12" style={{ fontFamily: 'Raleway', color: colors.text }}>
      Your Registration ID is: <span style={{ color: colors.primary }}>{registrationUID}</span>
    </p>
    <p className="max-w-xl text-sm sm:text-base italic" style={{ fontFamily: 'Raleway', color: colors.text }}>
      Please save this ID to view or update your registration later.
    </p>
  </div>
);

// ContactPage Component
const ContactPage = ({ colors }) => (
  <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 transition-colors duration-500" style={{ backgroundColor: colors.background, color: colors.text }}>
    <div className="max-w-md text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6" style={{ fontFamily: 'Modo Badoni', color: colors.secondary }}>Contact Us</h1>
      <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-4" style={{ fontFamily: 'Raleway', color: colors.text }}>
        For any inquiries, feel free to reach out. We're here to help!
      </p>
      <ul className="text-left space-y-2 sm:space-y-4 mb-8">
        <li className="text-base sm:text-lg" style={{ fontFamily: 'Raleway' }}>
          <i className="fas fa-map-marker-alt" style={{ color: colors.primary }}></i>
          <span className="font-semibold ml-2" style={{ color: colors.primary }}>Address:</span>
          <br /> St. Joseph's Pre-University College,
          <br /> FM Cariappa Road (Museum Road),
          <br /> Bengaluru, Karnataka - 560025
        </li>
        <li className="text-base sm:text-lg" style={{ fontFamily: 'Raleway' }}>
          <i className="fas fa-phone-alt" style={{ color: colors.primary }}></i>
          <span className="font-semibold ml-2" style={{ color: colors.primary }}>Phone:</span> 9108357266 / 8147498934
        </li>
        <li className="text-base sm:text-lg" style={{ fontFamily: 'Raleway' }}>
          <i className="fas fa-envelope" style={{ color: colors.primary }}></i>
          <span className="font-semibold ml-2" style={{ color: colors.primary }}>Email:</span> sjpuc25@gmail.com
        </li>
      </ul>
      <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Modo Badoni', color: colors.secondary }}>Our Location</h2>
      <div className="rounded-xl overflow-hidden w-full max-w-lg mx-auto shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.081831405179!2d77.5939794148419!3d12.96695679085816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16769992d95b%3A0xb3637172023d04e5!2sSt.%20Joseph's%20Pre-University%20College!5e0!3m2!1sen!2sin!4v1638276685000!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  </div>
);

// App.jsx (Main App Component)
const App = () => {
  const [activePage, setActivePage] = useState('home');
  const [message, setMessage] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrationData, setRegistrationData] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const currentColors = isDarkTheme ? darkColors : lightColors;

  useEffect(() => {
    if (registrationData) {
      if (registrationData.type === 'institution') {
        const storedUID = localStorage.getItem('lastInstitutionalUID');
        if (storedUID) {
          const data = JSON.parse(localStorage.getItem(storedUID));
          if (data) {
            setRegistrationData(data);
          }
        }
      }
    }
  }, [registrationData]);


  return (
    <div className="font-sans flex flex-col min-h-screen">
      {/* Tailwind CSS and Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      <style>
        {`
        @font-face {
          font-family: 'Modo Badoni';
          src: url('https://fonts.cdnfonts.com/s/72225/ModaBadoni-LightItalic.woff') format('woff');
          font-weight: 300;
          font-style: italic;
        }
        @font-face {
          font-family: 'Modo Badoni';
          src: url('https://fonts.cdnfonts.com/s/72225/ModaBadoni-ExtraBold.woff') format('woff');
          font-weight: 800;
          font-style: normal;
        }

        body { margin: 0; }
        .animate-fade-in { animation: fadeIn 1s ease-in-out; }
        .animate-slide-up { animation: slideUp 1s ease-in-out; }
        .animate-fade-in-delay-1 { animation: fadeIn 1s ease-in-out 0.5s forwards; opacity: 0; }
        .animate-pulse-once { animation: pulseOnce 1.5s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes pulseOnce { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
        `}
      </style>
      <script src="https://cdn.tailwindcss.com"></script>
      <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
      <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"></link>

      {/* Navigation */}
      <nav
        className="sticky top-0 left-0 right-0 z-50 p-4 sm:p-6 flex justify-between backdrop-blur-sm transition-all duration-300"
        style={{ color: currentColors.secondary, backgroundColor: isDarkTheme ? 'rgba(4, 49, 95, 0.5)' : 'rgba(255, 251, 250, 0.5)' }}
      >
        <div className="flex space-x-4 sm:space-x-8 text-md sm:text-xl font-bold rounded-full p-2 transition-all duration-300" style={{ backgroundColor: currentColors.tertiary, boxShadow: `0 4px 6px -1px ${currentColors.secondary}40` }}>
          <button
            onClick={() => setActivePage('home')}
            className="px-3 py-2 sm:px-4 sm:py-2 rounded-full transform transition-all duration-300 hover:scale-110 active:scale-95"
            style={{ color: activePage === 'home' ? currentColors.secondary : currentColors.primary }}
          >
            Home
          </button>
          <button
            onClick={() => setActivePage('about')}
            className="px-3 py-2 sm:px-4 sm:py-2 rounded-full transform transition-all duration-300 hover:scale-110 active:scale-95"
            style={{ color: activePage === 'about' ? currentColors.secondary : currentColors.primary }}
          >
            About
          </button>
          <button
            onClick={() => setActivePage('events')}
            className="px-3 py-2 sm:px-4 sm:py-2 rounded-full transform transition-all duration-300 hover:scale-110 active:scale-95"
            style={{ color: activePage === 'events' ? currentColors.secondary : currentColors.primary }}
          >
            Events
          </button>
          <button
            onClick={() => setActivePage('contact')}
            className="px-3 py-2 sm:px-4 sm:py-2 rounded-full transform transition-all duration-300 hover:scale-110 active:scale-95"
            style={{ color: activePage === 'contact' ? currentColors.secondary : currentColors.primary }}
          >
            Contact
          </button>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={() => setActivePage('registration')}
            className="px-4 py-2 text-sm sm:text-lg font-bold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              backgroundColor: currentColors.primary,
              color: currentColors.secondary,
              border: `2px solid ${currentColors.secondary}`,
            }}
          >
            Register
          </button>
          <button onClick={() => setIsDarkTheme(!isDarkTheme)} className="text-xl sm:text-2xl" style={{ color: currentColors.secondary }}>
            {isDarkTheme ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow relative">
        {(() => {
          switch (activePage) {
            case 'home':
              return <HomePage setActivePage={setActivePage} colors={currentColors} />;
            case 'about':
              return <AboutPage colors={currentColors} />;
            case 'events':
              return <EventsPage setActivePage={setActivePage} setSelectedEvent={setSelectedEvent} colors={currentColors} />;
            case 'contact':
              return <ContactPage colors={currentColors} />;
            case 'registration':
              return <RegistrationPage setActivePage={setActivePage} colors={currentColors} />;
            case 'individual-registration':
              return <IndividualRegistrationPage setActivePage={setActivePage} setMessage={setMessage} colors={currentColors} />;
            case 'institution-registration':
              return <InstitutionalRegistrationPage setActivePage={setActivePage} setMessage={setMessage} colors={currentColors} initialData={registrationData} />;
            case 'event-detail':
              return <EventDetailPage event={selectedEvent} onBack={() => setActivePage('events')} colors={currentColors} />;
            case 'thank-you':
              return <ThankYouPage colors={currentColors} registrationUID={message.split(': ')[1]} />;
            case 'registration-lookup':
              return <RegistrationLookupPage setActivePage={setActivePage} setRegistrationData={setRegistrationData} colors={currentColors} />;
            default:
              return <HomePage setActivePage={setActivePage} colors={currentColors} />;
          }
        })()}
      </main>

      {/* Footer with Instagram icon */}
      <footer
        className="p-4 text-center transition-colors duration-500"
        style={{ backgroundColor: currentColors.tertiary, color: currentColors.secondary }}
      >
        <div className="flex items-center justify-between px-4">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-3xl transition-transform transform hover:scale-125">
             <i className="fab fa-instagram"></i>
          </a>
          <p className="text-sm font-light" style={{ fontFamily: 'Raleway' }}>© 2025 EQUINOX</p>
        </div>
      </footer>
      <MessageBox message={message} onClose={() => setMessage(null)} colors={currentColors} />
    </div>
  );
};

export default App;

