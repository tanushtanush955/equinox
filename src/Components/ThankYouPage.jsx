import { get_fees } from "../data";
import { get_qr_code } from "../data";

const ThankYouPage = ({ colors, registrationUID}) => {

  const qrBase64 = get_qr_code();

  const qrCode = qrBase64
    ? `data:image/png;base64,${qrBase64}`
    : null;

  return (
  <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 sm:p-8" style={{ backgroundColor: colors.background, color: colors.text }}>
	<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6" style={{ fontFamily: 'Modo Badoni', color: colors.secondary }}>Thank You!</h1>
	<p className="max-w-xl text-base sm:text-lg md:text-xl mb-4" style={{ fontFamily: 'Raleway', color: colors.text }}>
	  Your registration has been submitted successfully.
	</p>
	<p className="max-w-xl text-lg sm:text-xl md:text-2xl font-bold mb-10 sm:mb-12" style={{ fontFamily: 'Raleway', color: colors.text }}>
	  Your Registration ID is: <span style={{ color: colors.primary }}>{registrationUID}</span>
	</p>
	<p className="max-w-xl text-lg sm:text-xl md:text-2xl font-bold mb-10 sm:mb-12" style={{ fontFamily: 'Raleway', color: colors.text }}>
	  Your have to pay ₹<span style={{ color: colors.primary }}>{get_fees()} </span>
	   at the registration desk
	</p>
	{/* QR Code Display */}
      {qrCode && (
        <div className="mb-10">
          <img
            src={qrCode}
            alt="Registration QR Code"
            className="mx-auto w-40 h-40 sm:w-56 sm:h-56"
          />
          <p
            className="mt-2 text-sm sm:text-base italic"
            style={{ fontFamily: "Raleway", color: colors.text }}
          >
            Save this QR code and provide it at the registration desk for verification
          </p>
        </div>
      )}
	<p className="max-w-xl text-sm sm:text-base italic" style={{ fontFamily: 'Raleway', color: colors.text }}>
	  Please save this ID to view or update your registration later and distribute it to the participants on the day of the fest.
	</p>
  </div>
  );
};

export default ThankYouPage;