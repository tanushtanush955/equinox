import { get_fees } from "../data";

const ThankYouPage = ({ colors, registrationUID}) => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 sm:p-8" style={{ backgroundColor: colors.background, color: colors.text }}>
	<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6" style={{ fontFamily: 'Modo Badoni', color: colors.text }}>Thank You!</h1>
	<p className="max-w-xl text-base sm:text-lg md:text-xl mb-4" style={{ fontFamily: 'Raleway', color: colors.text }}>
	  Your registration has been submitted successfully.
	</p>
	<p className="max-w-xl text-lg sm:text-xl md:text-2xl font-bold mb-10 sm:mb-12" style={{ fontFamily: 'Raleway', color: colors.text }}>
	  Your Registration ID is: <span style={{ color: colors.secondary }}>{registrationUID}</span>
	</p>
	<p className="max-w-xl text-lg sm:text-xl md:text-2xl font-bold mb-10 sm:mb-12" style={{ fontFamily: 'Raleway', color: colors.text }}>
	  Your have to pay ₹<span style={{ color: colors.secondary }}>{get_fees()} </span>
	   at the registration desk
	</p>
	<p className="max-w-xl text-sm sm:text-base italic" style={{ fontFamily: 'Raleway', color: colors.text }}>
	  Please save this ID to view or update your registration later and to verify your registration on the day of the fest.
	</p>
  </div>
);

export default ThankYouPage;