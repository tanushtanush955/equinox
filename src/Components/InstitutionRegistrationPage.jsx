import { eventsData } from "../data";
import React, { useState, useEffect } from 'react';
import { sendRegistrationDataInstitution } from "../services/RegistrationApiEndpoint";
import { get_selected_uid, get_event_id } from "../data";
import { set_fees } from "../data";
import { lightColors } from "../data";
import { darkColors } from "../data";

const InstitutionalRegistrationPage = ({ setActivePage, setMessage, colors, initialData }) => {
  const [submitDisabled, setSubmitDisabled] = useState(false); 
  const [schoolName, setSchoolName] = useState(initialData?.schoolName || '');
  const [selectedEvents, setSelectedEvents] = useState(initialData?.registrationForms?.map(f => f.event_uid) || []);
  const [headDelegate, setHeadDelegate] = useState(initialData?.headDelegate || { name: '', phone: '', email: '' });
  const [registrationForms, setRegistrationForms] = useState(initialData?.registrationForms || []);

  const allEvents = eventsData.flatMap(category => category.events);

  const handleSelectAll = () => {
    setSelectedEvents(allEvents.map(event => event.event_uid));
  };

  const handleEventClick = (event_uid) => {
    setSelectedEvents(prevEvents => {
      if (prevEvents.includes(event_uid)) {
        return prevEvents.filter(e => e !== event_uid);
      } else {
        return [...prevEvents, event_uid];
      }
    });
  };

  const updateRegistrationForms = (currentEvents) => {
    const newForms = currentEvents.map(event_uid => {
      const eventDetails = allEvents.find(e => e.event_uid === event_uid);
      const existingForm = registrationForms.find(f => f.event_uid === event_uid);
      if (existingForm) {
        return existingForm;
      }
      return {
        event_uid,
        club_uid: eventDetails.club_uid,
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
    const eventDetails = allEvents.find(e => e.event_uid === newForms[formIndex].event_uid);
    if (newForms[formIndex].teams.length < eventDetails.num_teams) {
      newForms[formIndex].teams.push({
        teamName: `Team ${newForms[formIndex].teams.length + 1}`,
        participants: Array.from({ length: eventDetails.num_participants }, () => ({ name: '', phone: '', reg_no: '' }))
      });
      setRegistrationForms(newForms);
    } else {
      setMessage(`Maximum number of teams reached for ${eventDetails.name}`);
    }
  };
  
  const removeTeam = (formIndex, teamIndex) => {
    const newForms = [...registrationForms];
    newForms[formIndex].teams.splice(teamIndex, 1);
    newForms[formIndex].teams = newForms[formIndex].teams.map((team, index) => ({
      ...team,
      teamName: `Team ${index + 1}`
    }));
    setRegistrationForms(newForms);
  };

  const handleSubmit = async (e) => {
    setSubmitDisabled(true);
    e.preventDefault();
    const registrationData = { registration_uid: get_selected_uid(), type: 'institution', schoolName, headDelegate, registrationForms };
    try {
      const response = await sendRegistrationDataInstitution(registrationData);
      setSubmitDisabled(false);
      set_fees(response.fees)
      setMessage(`Institutional registration submitted! Your UID is: ${response.uid}`);
      setActivePage('thank-you');
    } catch (error) {
      const code = error.detail?.code || 'UNKNOWN';
      const message = error.detail?.message || error.message || 'Something went wrong';
      setMessage(`Error submitting registration: [${code}] ${message}`);
	  setSubmitDisabled(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8 transition-colors duration-500" style={{ backgroundColor: colors.background, color: colors.text }}>
      <div className="w-full max-w-full md:max-w-5xl lg:max-w-6xl px-2">
        <button
          onClick={() => setActivePage('registration')}
          className="mb-4 px-4 py-2 text-sm font-bold rounded-full shadow-md transform transition-all duration-300 hover:scale-105 active:scale-95"
          style={{ backgroundColor: colors.secondary, color: colors.text}}
        >
          &larr; Go Back
        </button>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8" style={{ fontFamily: 'Modo Badoni', color: colors.text }}>Institutional Registration</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-6 sm:p-8 rounded-xl shadow-lg" style={{ backgroundColor: colors.background, color: colors.text, border: `2px solid ${colors.tertiary}` }}>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ fontFamily: 'Modo Badoni' }}>Institution Details</h2>
            <div className="flex flex-col">
              <label className="text-sm sm:text-base font-medium mb-1" style={{ fontFamily: 'Raleway' }}>School/College Name</label>
              <input
                type="text"
                name="schoolName"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="p-2 sm:p-3 rounded-lg border-2"
                style={{ borderColor: colors.secondary, color: colors.text, backgroundColor: colors.background }}
                required
              />
            </div>
            <h3 className="text-sm sm:text-base font-medium mt-4 mb-2" style={{ fontFamily: 'Raleway' }}>Head Delegate Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <input type="text" name="name" placeholder="Name" value={headDelegate.name} onChange={handleHeadDelegateChange} className="p-2 rounded-lg border-2" style={{ borderColor: colors.secondary, color: colors.text, backgroundColor: colors.background }} required />
              <input type="tel" name="phone" placeholder="Phone" value={headDelegate.phone} onChange={handleHeadDelegateChange} className="p-2 rounded-lg border-2" style={{ borderColor: colors.secondary, color: colors.text, backgroundColor: colors.background }} required />
              <input type="email" name="email" placeholder="Email" value={headDelegate.email} onChange={handleHeadDelegateChange} className="p-2 rounded-lg border-2" style={{ borderColor: colors.secondary, color: colors.text, backgroundColor: colors.background }} required />
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
                {allEvents.map((event, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleEventClick(event.event_uid)}
                    className="p-2 rounded-lg text-left transition-colors duration-200"
                    style={{
                      backgroundColor: selectedEvents.includes(event.event_uid) ? colors.primary : colors.background,
                      color: selectedEvents.includes(event.event_uid) ? colors.secondary : colors.text,
                      fontWeight: selectedEvents.includes(event.event_uid) ? 600 : 400,
                    }}
                  >
                    {event.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {registrationForms.length > 0 && (
            <div className="space-y-6">
              {registrationForms.map((form, formIndex) => (
                <div key={formIndex} className="p-6 sm:p-8 rounded-xl shadow-lg" style={{ backgroundColor: colors.background, color: colors.text, border: `2px solid ${colors.tertiary}` }}>
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ fontFamily: 'Modo Badoni' }}>{allEvents.find(e => e.event_uid === form.event_uid)?.name || 'Unknown Event'}</h2>
                  {form.teams.map((team, teamIndex) => (
                    <div key={teamIndex} className="mb-6 p-4 rounded-lg" style={{ backgroundColor: colors.background, color: colors.text, border: `2px dashed ${colors.secondary}` }}>
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
                          <div key={participantIndex} className="p-6 rounded-2xl shadow-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                              style={{
                                  backgroundColor:
                                    colors.background === lightColors.background
                                      ? 'rgba(0, 0, 0, 0.05)' // black with 5% opacity for light background
                                      : colors.background === darkColors.background
                                      ? 'rgba(255, 255, 255, 0.05)' // white with 5% opacity for dark background
                                      : colors.background // fallback: use the theme background as-is
                                }}
                            >
                            <input type="text" name="name" placeholder="Name" value={participant.name} onChange={(e) => handleTeamChange(formIndex, teamIndex, participantIndex, e)} className="p-2 rounded-lg border-2" style={{ borderColor: colors.secondary, color: colors.text, backgroundColor: colors.background }} required />
                            <input type="tel" name="phone" placeholder="Phone" value={participant.phone} onChange={(e) => handleTeamChange(formIndex, teamIndex, participantIndex, e)} className="p-2 rounded-lg border-2" style={{ borderColor: colors.secondary, color: colors.text, backgroundColor: colors.background }} required />
                            <input type="text" name="reg_no" placeholder="Reg. No." value={participant.reg_no} onChange={(e) => handleTeamChange(formIndex, teamIndex, participantIndex, e)} className="p-2 rounded-lg border-2" style={{ borderColor: colors.secondary, color: colors.text, backgroundColor: colors.background }} required />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  {form.teams.length < allEvents.find(e => e.event_uid === form.event_uid)?.num_teams && (
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
                  disabled={submitDisabled}
                  type="submit"
                  className="px-8 py-4 text-lg font-bold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: colors.secondary,
                    color: colors.text,
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