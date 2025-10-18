import { create_and_set_uid } from "../data";

const RegistrationPage = ({ setActivePage, colors }) => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 sm:p-8" style={{ backgroundColor: colors.background, color: colors.text }}>
	<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8" style={{ fontFamily: 'Modo Badoni', color: colors.text }}>Choose Your Registration Type</h1>
	<p className="max-w-xl text-base sm:text-lg md:text-xl mb-10 sm:mb-12" style={{ fontFamily: 'Raleway', color: colors.text }}>
	  Are you registering as an individual or on behalf of an institution?
	</p>
	<div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
	  <button
		className="px-6 py-4 text-lg sm:text-xl font-bold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95"
		style={{
		  backgroundColor: colors.secondary,
		  color: colors.text,
		  border: `2px solid ${colors.secondary}`,
		}}
		onClick={() => {create_and_set_uid(); setActivePage('individual-registration')}}
	  >
		Individual
	  </button>
	  <button
		className="px-6 py-4 text-lg sm:text-xl font-bold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95"
		style={{
		  backgroundColor: colors.secondary,
		  color: colors.text,
		  border: `2px solid ${colors.secondary}`,
		}}
		onClick={() => {create_and_set_uid(); setActivePage('institution-registration')}}
	  >
		Institution
	  </button>
	</div>
	<div className="mt-8">
	  <button
		onClick={() => setActivePage('registration-lookup')}
		className="text-sm font-semibold hover:underline"
		style={{ color: colors.tertiary }}
	  >
		Already registered? Update or view your registration
	  </button>
	</div>
  </div>
);

export default RegistrationPage;