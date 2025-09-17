import { eventsData} from "../data";
import React, { useState, useEffect } from 'react';
import { sendRegistrationDataIndividual } from "../services/RegistrationApiEndpoint";
import { get_selected_uid, get_event_id } from "../data";

const IndividualRegistrationPage = ({ setActivePage, setMessage, colors }) => {
  const [submitDisabled, setSubmitDisabled] = useState(false); 
  const [participants, setParticipants] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');

  const handleEventChange = (e) => {
	const eventName = get_event_id(e.target.value);
	setSelectedEvent(eventName);
	if (eventName) {
	  const eventDetails = eventsData.flatMap(cat => cat.events).find(e => e.event_uid === eventName);
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

  const handleSubmit = async (e) => {
	setSubmitDisabled(true);
	e.preventDefault();
	const clubUid = eventsData.flatMap(cat => cat.events).find(e => e.event_uid === selectedEvent)?.club_uid;
	const registrationData = {registration_uid: get_selected_uid(), type: 'individual', selectedEvent, participants, clubUid };
	try{
		const response = await sendRegistrationDataIndividual(registrationData);
		console.log(response)
		setSubmitDisabled(false);
		setMessage(`Registration submitted successfully! Your UID is: ${response.uid}`);
		setActivePage('thank-you');
	}	
	catch (error) {
		const code = error.detail?.code || 'UNKNOWN';
    	const message = error.detail?.message || error.message || 'Something went wrong';
    	setMessage(`Error submitting registration: [${code}] ${message}`);
		setSubmitDisabled(false);
    }
	console.log('Submitted data:', registrationData);
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
					<label className="text-sm sm:text-base font-medium mb-1" style={{ fontFamily: 'Raleway' }}>email</label>
					<input
					  type="email"
					  name="email"
					  value={participant.email}
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
			  	disabled={submitDisabled}
				type="submit"
				className="px-8 py-4 text-lg font-bold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed"
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