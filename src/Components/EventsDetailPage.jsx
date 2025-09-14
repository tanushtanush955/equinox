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

export default EventDetailPage;