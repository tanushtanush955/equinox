import React, { useState, useEffect } from 'react';
import { lightColors, darkColors } from './data';
import HomePage from './Components/HomePage';
import AboutPage from './Components/AboutPage';
import EventDetailPage from './Components/EventsDetailPage';
import RegistrationPage from './Components/RegistrationPage';
import MessageBox from './Components/MessageBox';
import ContactPage from './Components/ContactPage';
import EventsPage from './Components/EventsPage';
import IndividualRegistrationPage from './Components/IndividualRegistrationPage';
import InstitutionalRegistrationPage from './Components/InstitutionRegistrationPage';
import ThankYouPage from './Components/ThankYouPage';
import RegistrationLookupPage from './Components/RegistrationLookupPage';

// App.jsx (Main App Component)
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
        script.onerror = resolve; // Resolve even on error to not block forever
        document.head.appendChild(script);
      }));
    }

    // Font Awesome
    if (!document.getElementById('fontawesome-link')) {
        const link = document.createElement('link');
        link.id = 'fontawesome-link';
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
        document.head.appendChild(link);
    }

    // Google Fonts
    if (!document.getElementById('google-fonts-main')) {
      promises.push(new Promise((resolve) => {
        const link = document.createElement('link');
        link.id = 'google-fonts-main';
        link.rel = 'stylesheet';
        link.href = "https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap";
        link.onload = resolve;
        link.onerror = resolve;
        document.head.appendChild(link);
      }));
    }

    // Custom Styles
    if (!document.getElementById('custom-styles')) {
      const style = document.createElement('style');
      style.id = 'custom-styles';
      style.innerHTML = `
        @font-face {
          font-family: 'Modo Badoni';
          src: url('https://fonts.cdnfonts.com/s/72225/ModaBadoni-LightItalic.woff') format('woff');
          font-weight: 300;
          font-style: italic;
        }
        @font-face {
          font-family: 'Modo Badoni';
          src: url('https://fonts.cdnfonts.com/s/72225/ModaBadoni-ExtraBold.woff') format('woff');
          font-weight: 800;
          font-style: normal;
        }
        html, body {
          margin: 0;
          padding: 0;
          font-family: 'Raleway', sans-serif;
          width: 100%;
          overflow-x: hidden;
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
    
    // Google Fonts Preconnect links (don't need to be awaited)
    if (!document.getElementById('google-fonts-preconnect1')) {
        const link = document.createElement('link');
        link.id = 'google-fonts-preconnect1';
        link.rel = 'preconnect';
        link.href = 'https://fonts.googleapis.com';
        document.head.appendChild(link);
    }
    if (!document.getElementById('google-fonts-preconnect2')) {
        const link = document.createElement('link');
        link.id = 'google-fonts-preconnect2';
        link.rel = 'preconnect';
        link.href = 'https://fonts.gstatic.com';
        link.crossOrigin = 'true';
        document.head.appendChild(link);
    }

    Promise.all(promises).then(() => {
        setTimeout(() => setIsLoading(false), 300); // Small delay for Tailwind to initialize
    });

    const fallbackTimeout = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(fallbackTimeout);

  }, []);


  useEffect(() => {
    if (registrationData) {
      if (registrationData.type === 'institution') {
        const storedUID = localStorage.getItem('lastInstitutionalUID');
        if (storedUID) {
          const data = JSON.parse(localStorage.getItem(storedUID));
          if (data) {
            setRegistrationData(data);
          }
        }
      }
    }
  }, [registrationData]);

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
    <div className="font-sans flex flex-col min-h-screen w-screen overflow-x-hidden">
      {/* Navigation */}
      <nav
        className="sticky top-0 left-0 right-0 z-50 p-4 sm:p-6 flex justify-between backdrop-blur-sm transition-all duration-300"
        style={{ color: currentColors.secondary, backgroundColor: isDarkTheme ? 'rgba(0, 17, 34, 0.5)' : 'rgba(255, 251, 250, 0.5)' }}
      >
        <div className="flex space-x-4 sm:space-x-8 text-md sm:text-xl font-bold rounded-full p-2 transition-all duration-300" style={{ backgroundColor: currentColors.tertiary, boxShadow: `0 4px 6px -1px ${currentColors.secondary}40` }}>
          <button
            onClick={() => setActivePage('home')}
            className="px-3 py-2 sm:px-4 sm:py-2 rounded-full transform transition-all duration-300 hover:scale-110 active:scale-95"
            style={{ color: activePage === 'home' ? currentColors.secondary : currentColors.primary }}
          >
            Home
          </button>
          <button
            onClick={() => setActivePage('about')}
            className="px-3 py-2 sm:px-4 sm:py-2 rounded-full transform transition-all duration-300 hover:scale-110 active:scale-95"
            style={{ color: activePage === 'about' ? currentColors.secondary : currentColors.primary }}
          >
            About
          </button>
          <button
            onClick={() => setActivePage('events')}
            className="px-3 py-2 sm:px-4 sm:py-2 rounded-full transform transition-all duration-300 hover:scale-110 active:scale-95"
            style={{ color: activePage === 'events' ? currentColors.secondary : currentColors.primary }}
          >
            Events
          </button>
          <button
            onClick={() => setActivePage('contact')}
            className="px-3 py-2 sm:px-4 sm:py-2 rounded-full transform transition-all duration-300 hover:scale-110 active:scale-95"
            style={{ color: activePage === 'contact' ? currentColors.secondary : currentColors.primary }}
          >
            Contact
          </button>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={() => setActivePage('registration')}
            className="px-4 py-2 text-sm sm:text-lg font-bold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              backgroundColor: currentColors.primary,
              color: currentColors.secondary,
              border: `2px solid ${currentColors.secondary}`,
            }}
          >
            Register
          </button>
          <button onClick={() => setIsDarkTheme(!isDarkTheme)} className="text-xl sm:text-2xl" style={{ color: currentColors.secondary }}>
            {isDarkTheme ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow relative">
        {(() => {
          switch (activePage) {
            case 'home':
              return <HomePage setActivePage={setActivePage} colors={currentColors} />;
            case 'about':
              return <AboutPage colors={currentColors} />;
            case 'events':
              return <EventsPage setActivePage={setActivePage} setSelectedEvent={setSelectedEvent} colors={currentColors} />;
            case 'contact':
              return <ContactPage colors={currentColors} />;
            case 'registration':
              return <RegistrationPage setActivePage={setActivePage} colors={currentColors} />;
            case 'individual-registration':
              return <IndividualRegistrationPage setActivePage={setActivePage} setMessage={setMessage} colors={currentColors} />;
            case 'institution-registration':
              return <InstitutionalRegistrationPage setActivePage={setActivePage} setMessage={setMessage} colors={currentColors} initialData={registrationData} />;
            case 'event-detail':
              return <EventDetailPage event={selectedEvent} onBack={() => setActivePage('events')} colors={currentColors} />;
            case 'thank-you':
              return <ThankYouPage colors={currentColors} registrationUID={message.split(': ')[1]} />;
            case 'registration-lookup':
              return <RegistrationLookupPage setActivePage={setActivePage} setRegistrationData={setRegistrationData} colors={currentColors} />;
            default:
              return <HomePage setActivePage={setActivePage} colors={currentColors} />;
          }
        })()}
      </main>

      {/* Footer with Instagram icon */}
      <footer
        className="p-4 text-center transition-colors duration-500"
        style={{ backgroundColor: currentColors.tertiary, color: currentColors.secondary }}
      >
        <div className="flex items-center justify-between px-4">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-3xl transition-transform transform hover:scale-125">
             <i className="fab fa-instagram"></i>
          </a>
          <p className="text-sm font-light" style={{ fontFamily: 'Raleway' }}>© 2025 EQUINOX</p>
        </div>
      </footer>
      <MessageBox message={message} onClose={() => {setMessage(null); setActivePage('main')}} colors={currentColors} />
    </div>
  );
};

export default App;

