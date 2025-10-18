import { eventsData } from "../data";
import React, { useState, useEffect } from 'react';
import { sendRegistrationDataIndividual } from "../services/RegistrationApiEndpoint";
import { get_selected_uid } from "../data";
import { set_fees} from "../data";

const IndividualRegistrationPage = ({ setActivePage, setMessage, colors, initialData }) => {
  const [submitDisabled, setSubmitDisabled] = useState(false); 
  const [participants, setParticipants] = useState(initialData?.participants || []);
  const [selectedEvent, setSelectedEvent] = useState(initialData?.selectedEvent || '');

  const allEvents = eventsData.flatMap(category => category.events);

  useEffect(() => {
    if (selectedEvent && participants.length === 0) {
      const eventDetails = allEvents.find(e => e.event_uid === selectedEvent);
      if (eventDetails) {
        setParticipants(Array.from({ length: eventDetails.num_participants }, () => ({ name: '', phone: '', email: '' })));
      }
    }
  }, [selectedEvent]);

  const handleEventChange = (e) => {
    const uid = e.target.value;
    setSelectedEvent(uid);
    if (uid) {
      const eventDetails = allEvents.find(e => e.event_uid === uid);
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
    const clubUid = allEvents.find(e => e.event_uid === selectedEvent)?.club_uid;
    const registrationData = { registration_uid: get_selected_uid(), type: 'individual', selectedEvent, participants, clubUid };
    try {
      const response = await sendRegistrationDataIndividual(registrationData);
      setSubmitDisabled(false);
      set_fees(response.fees)
      setMessage(`Registration submitted successfully! Your UID is: ${response.uid}`);
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
      <div className="w-full max-w-xl md:max-w-3xl lg:max-w-4xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8" style={{ fontFamily: 'Modo Badoni', color: colors.text }}>Individual Registration</h1>
        
        <div className="p-6 sm:p-8 rounded-xl shadow-lg mb-6" style={{ backgroundColor: colors.background, color: colors.text, border: `2px solid ${colors.secondary}` }}>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ fontFamily: 'Modo Badoni' }}>Choose Your Event</h2>
          <div className="flex flex-col">
            <label className="text-sm sm:text-base font-medium mb-1" style={{ fontFamily: 'Raleway' }}>Event</label>
            <select
              name="event"
              value={selectedEvent}
              onChange={handleEventChange}
              className="p-2 sm:p-3 rounded-lg border-2"
              style={{ borderColor: colors.secondary, color: colors.text, backgroundColor: colors.background }}
            >
              <option value="">Select an Event</option>
              {allEvents.map((event, index) => (
                <option key={index} value={event.event_uid}>{event.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        {selectedEvent && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {participants.map((participant, index) => (
              <div key={index} className="p-6 sm:p-8 rounded-xl shadow-lg" style={{ backgroundColor: colors.background, color: colors.text, border: `2px solid ${colors.secondary}` }}>
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
                      style={{ borderColor: colors.secondary, color: colors.text, backgroundColor: colors.background}}
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
                      style={{ borderColor: colors.secondary, color: colors.text, backgroundColor: colors.background }}
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
                      style={{ borderColor: colors.secondary, color: colors.text, backgroundColor: colors.background }}
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
                  backgroundColor: colors.secondary,
                  color: colors.text,
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