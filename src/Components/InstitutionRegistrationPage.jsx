import { eventsData} from "../data";
import React, { useState, useEffect } from 'react';
import { sendRegistrationDataInstitution } from "../services/RegistrationApiEndpoint";
import { get_selected_uid } from "../data";

const InstitutionalRegistrationPage = ({ setActivePage, setMessage, colors, initialData }) => {
  const [schoolName, setSchoolName] = useState(initialData?.schoolName || '');
  const [selectedEvents, setSelectedEvents] = useState(initialData?.registrationForms.map(f => f.eventName) || []);
  const [headDelegate, setHeadDelegate] = useState(initialData?.headDelegate || { name: '', phone: '', email: '' });
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

  const handleSubmit = async (e) => {
	e.preventDefault();
	const registrationData = {registration_uid: get_selected_uid(), type: 'institution', schoolName, headDelegate, registrationForms };
	try{
		const response = await sendRegistrationDataInstitution(registrationData);
		console.log(response.uid)
		setMessage(`Institutional registration submitted! Your UID is: ${response.uid}`);
		setActivePage('thank-you');
		localStorage.setItem(response.uid, JSON.stringify(registrationData));
	}
	catch (error) {
		setMessage('Error submitting registration. Please try again.');
	  }
	console.log('Submitted data:', registrationData);
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
			  <input type="email" name="email" placeholder="Email" value={headDelegate.email} onChange={handleHeadDelegateChange} className="p-2 rounded-lg border-2" style={{ borderColor: colors.secondary, color: colors.text, backgroundColor: colors.tertiary }} required />
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

export default InstitutionalRegistrationPage;