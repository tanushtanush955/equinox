export const lightColors = {
  primary: '#91A8CE',
  secondary: '#04315F',
  tertiary: '#FFFBFA',
  background: '#FFFBFA',
  card: 'white',
  text: '#04315F',  
};

export const darkColors = {
  primary:   '#8a8a8a4d',
  secondary: '#E11D48', 
  tertiary:  '#121212ff', 
  background:'#0B0B0D', 
  card:      '#1A1A1D', 
  text:      '#F5F5F5', 
};



export const eventsData = [
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