import React, { useState, useEffect } from 'react';
import { lightColors, darkColors, get_selected_uid, set_selected_uid } from './data';
import HomePage from './Components/HomePage';
import EventDetailPage from './Components/EventsDetailPage';
import RegistrationPage from './Components/RegistrationPage';
import MessageBox from './Components/MessageBox';
import ContactPage from './Components/ContactPage';
import EventsPage from './Components/EventsPage';
import IndividualRegistrationPage from './Components/IndividualRegistrationPage';
import InstitutionalRegistrationPage from './Components/InstitutionRegistrationPage';
import ThankYouPage from './Components/ThankYouPage';
import RegistrationLookupPage from './Components/RegistrationLookupPage';

const App = () => {
  const [activePage, setActivePage] = useState('home');
  const [message, setMessage] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrationData, setRegistrationData] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const currentColors = isDarkTheme ? darkColors : lightColors;

  useEffect(() => {
    const promises = [];

    // Tailwind CSS
    if (!document.getElementById('tailwind-script')) {
      promises.push(new Promise((resolve) => {
        const script = document.createElement('script');
        script.id = 'tailwind-script';
        script.src = 'https://cdn.tailwindcss.com';
        script.onload = resolve;
        script.onerror = resolve;
        document.head.appendChild(script);
      }));
    }

    // FontAwesome
    if (!document.getElementById('fontawesome-link')) {
      const link = document.createElement('link');
      link.id = 'fontawesome-link';
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
      document.head.appendChild(link);
    }

    // Custom Fonts & Styles
    if (!document.getElementById('custom-styles')) {
      const style = document.createElement('style');
      style.id = 'custom-styles';
      style.innerHTML = `
        /* Local Modo Badoni */
        @font-face {
          font-family: 'Modo Badoni';
          src: url('/fonts/BodoniModa_9pt-Regular.ttf') format('truetype');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'Modo Badoni';
          src: url('/fonts/BodoniModa_9pt-Bold.ttf') format('truetype');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }

        html, body {
          margin: 0;
          padding: 0;
          font-family: 'Raleway', sans-serif;
          width: 100%;
          overflow-x: hidden;
        }

        h1, h2, h3, h4, h5, h6,{
          font-family: 'Modo Badoni', serif;
        }

        .tertiary-font {
          font-family: 'Libre Baskerville', serif;
        }

        .animate-fade-in { animation: fadeIn 1s ease-in-out; }
        .animate-slide-up { animation: slideUp 1s ease-in-out; }
        .animate-fade-in-delay-1 { animation: fadeIn 1s ease-in-out 0.5s forwards; opacity: 0; }
        .animate-pulse-once { animation: pulseOnce 1.5s ease-in-out; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes pulseOnce { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
      `;
      document.head.appendChild(style);
    }

    // Google Fonts Preconnect (for Raleway & Libre Baskerville)
    ['google-fonts-preconnect1', 'google-fonts-preconnect2'].forEach((id, index) => {
      if (!document.getElementById(id)) {
        const link = document.createElement('link');
        link.id = id;
        link.rel = 'preconnect';
        link.href = index === 0 ? 'https://fonts.googleapis.com' : 'https://fonts.gstatic.com';
        if (index === 1) link.crossOrigin = 'true';
        document.head.appendChild(link);
      }
    });

    // Load remaining Google Fonts (Raleway & Libre Baskerville)
    if (!document.getElementById('google-fonts-main')) {
      promises.push(new Promise((resolve) => {
        const link = document.createElement('link');
        link.id = 'google-fonts-main';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap';
        link.onload = resolve;
        link.onerror = resolve;
        document.head.appendChild(link);
      }));
    }

    Promise.all(promises).then(() => setTimeout(() => setIsLoading(false), 300));
    const fallbackTimeout = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(fallbackTimeout);
  }, []);

  useEffect(() => {
    if (activePage === 'registration') {
      set_selected_uid('');
      setRegistrationData(null);
    }
  }, [activePage]);

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#FFFBFA',
        color: '#04315F',
        fontFamily: 'Modo Badoni',
        fontSize: 'clamp(2rem, 10vw, 4rem)',
        textAlign: 'center',
        padding: '1rem'
      }}>
        <h1>Loading EQUINOX...</h1>
      </div>
    );
  }

  return (
    <div className="font-sans flex flex-col min-h-screen w-screen overflow-x-hidden relative">
      {/* Navigation */}
      <nav className="sticky top-0 left-0 right-0 z-50 p-2 sm:p-6 flex flex-wrap items-center backdrop-blur-sm transition-all duration-300"
           style={{ color: currentColors.text, backgroundColor: currentColors.card }}>
        {/* Left buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-4 text-md sm:text-xl font-bold rounded-full p-1 sm:p-2 transition-all duration-300"
             style={{ backgroundColor: currentColors.background, boxShadow: `0 4px 6px -1px ${currentColors.secondary}40` }}>
          {['home', 'events', 'contact'].map((page) => (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              className="px-2 sm:px-4 py-1 sm:py-2 rounded-full flex-shrink transform transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ color: activePage === page ? currentColors.text : currentColors.secondary }}
            >
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </button>
          ))}
        </div>

        {/* Right buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-4 mt-2 sm:mt-0 ml-auto">
          <button
            onClick={() => setActivePage('registration')}
            className="px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-lg font-bold rounded-full shadow-lg flex-shrink transform transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              backgroundColor: currentColors.text,
              color: currentColors.secondary,
              border: `2px solid ${currentColors.text}`,
            }}
          >
            Registrations
          </button>
          <button
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            className="px-3 py-1 sm:px-4 sm:py-2 rounded-md outline-none focus:outline-none ring-0 text-xl sm:text-2xl font-['Chivo'] flex items-center justify-center flex-shrink"
            aria-label={isDarkTheme ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkTheme ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow relative">
        {(() => {
          switch (activePage) {
            case 'home': return <HomePage setActivePage={setActivePage} colors={currentColors} />;
            case 'events': return <EventsPage setActivePage={setActivePage} setSelectedEvent={setSelectedEvent} colors={currentColors} />;
            case 'contact': return <ContactPage colors={currentColors} />;
            case 'registration': return <RegistrationPage setActivePage={setActivePage} colors={currentColors} />;
            case 'individual-registration': return <IndividualRegistrationPage setActivePage={setActivePage} setMessage={setMessage} colors={currentColors} initialData={registrationData} />;
            case 'institution-registration': return <InstitutionalRegistrationPage setActivePage={setActivePage} setMessage={setMessage} colors={currentColors} initialData={registrationData} />;
            case 'event-detail': return <EventDetailPage event={selectedEvent} onBack={() => setActivePage('events')} colors={currentColors} />;
            case 'thank-you': return <ThankYouPage colors={currentColors} registrationUID={get_selected_uid()} />;
            case 'registration-lookup': return <RegistrationLookupPage setActivePage={setActivePage} setRegistrationData={setRegistrationData} colors={currentColors} />;
            default: return <HomePage setActivePage={setActivePage} colors={currentColors} />;
          }
        })()}
      </main>

      {/* Footer */}
      <footer className="p-4 text-center transition-colors duration-500" style={{ backgroundColor: currentColors.card, color: currentColors.tertiary }}>
        <div className="flex items-center justify-between px-4">
          <a href="https://www.instagram.com/equinox_sjpuc?igsh=MTBya3EweHZlM3Qx" target="_blank" rel="noopener noreferrer" className="text-3xl transition-transform transform hover:scale-125">
             <i className="fab fa-instagram"></i>
          </a>
          <p className="text-sm font-light" style={{ fontFamily: 'Raleway' }}>© 2025 EQUINOX</p>
        </div>
      </footer>

      <MessageBox message={message} onClose={() => setMessage(null)} colors={currentColors} />
    </div>
  );
};

export default App;
