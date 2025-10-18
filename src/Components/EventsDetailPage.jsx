const EventDetailPage = ({ event, onBack, colors }) => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 transition-colors duration-500"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      {/* Panel */}
      <div
        className="bg-black bg-opacity-5 p-6 rounded-2xl shadow-lg w-[80%] sm:w-[80%] max-w-5xl"
      >
        {/* Title and Description (centered) */}
        <div className="text-center mb-8">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6"
            style={{ fontFamily: 'Modo Badoni', color: colors.secondary }}
          >
            {event.name}
          </h1>
          <p
            className="text-base sm:text-lg md:text-xl leading-relaxed"
            style={{ fontFamily: 'Raleway', color: colors.text }}
          >
            {event.details}
          </p>
        </div>

        {/* Event details (left-aligned) */}
        <div className="text-left w-full max-w-3xl mx-auto">
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

          {/* Back button */}
          <div className="flex justify-start mt-8">
            <button
              onClick={onBack}
              className="px-6 py-3 text-md font-bold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ backgroundColor: colors.primary, color: colors.secondary, border: `2px solid ${colors.secondary}` }}
            >
              Back to Events
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
