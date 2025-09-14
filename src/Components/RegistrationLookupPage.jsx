import React, { useState, useEffect } from 'react';
import MessageBox from './MessageBox';

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

export default RegistrationLookupPage;