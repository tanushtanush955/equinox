import { eventsData} from "../data";
import React, { useState, useEffect } from 'react';

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

export default IndividualRegistrationPage;