import { eventsData} from "../data";
import React, { useState, useEffect } from 'react';

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
	<div className="flex flex-col items-center p-4 sm:p-8 transition-colors duration-500" style={{ backgroundColor: colors.background }}>
	  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8" style={{ fontFamily: 'Modo Badoni', color: colors.text }}>Upcoming Events</h1>
	  <div className="w-full max-w-lg md:max-w-2xl rounded-xl overflow-hidden shadow-2xl" style={{backgroundColor: colors.card}}>
		<div className="p-4" style={{ backgroundColor: colors.secondary, color: colors.text, fontFamily: 'Modo Badoni', fontWeight: 'bold' }}>
		  EVENTS
		</div>
		{eventsData.map((event, index) => (
		  <div key={index} className="border-b border-gray-200" style={{borderColor: colors.card}}>
			<button
			  onClick={() => toggleExpand(event.category)}
			  className="w-full flex justify-between items-center p-4 transition-colors duration-300"
			  style={{ backgroundColor: expandedCategory === event.category ? colors.background : colors.background, color: expandedCategory === event.category ? colors.text : colors.text }}
			>
			  <span className="text-lg sm:text-xl font-semibold" style={{ fontFamily: 'Libre Baskerville' }}>{event.category}</span>
			  <i className={`fas fa-chevron-${expandedCategory === event.category ? 'up' : 'down'} transition-transform duration-300`}></i>
			</button>
			<div
			  className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedCategory === event.category ? 'max-h-screen' : 'max-h-0'}`}
			  style={{ backgroundColor: colors.background, color: colors.text, borderTop: `1px solid ${colors.primary}` }}
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

export default EventsPage;