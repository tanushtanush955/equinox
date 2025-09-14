const ContactPage = ({ colors }) => (
  <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 transition-colors duration-500" style={{ backgroundColor: colors.background, color: colors.text }}>
	<div className="max-w-md text-center">
	  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6" style={{ fontFamily: 'Modo Badoni', color: colors.secondary }}>Contact Us</h1>
	  <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-4" style={{ fontFamily: 'Raleway', color: colors.text }}>
		For any inquiries, feel free to reach out. We're here to help!
	  </p>
	  <ul className="text-left space-y-2 sm:space-y-4 mb-8">
		<li className="text-base sm:text-lg" style={{ fontFamily: 'Raleway' }}>
		  <i className="fas fa-map-marker-alt" style={{ color: colors.primary }}></i>
		  <span className="font-semibold ml-2" style={{ color: colors.primary }}>Address:</span>
		  <br /> St. Joseph's Pre-University College,
		  <br /> FM Cariappa Road (Museum Road),
		  <br /> Bengaluru, Karnataka - 560025
		</li>
		<li className="text-base sm:text-lg" style={{ fontFamily: 'Raleway' }}>
		  <i className="fas fa-phone-alt" style={{ color: colors.primary }}></i>
		  <span className="font-semibold ml-2" style={{ color: colors.primary }}>Phone:</span> 9108357266 / 8147498934
		</li>
		<li className="text-base sm:text-lg" style={{ fontFamily: 'Raleway' }}>
		  <i className="fas fa-envelope" style={{ color: colors.primary }}></i>
		  <span className="font-semibold ml-2" style={{ color: colors.primary }}>Email:</span> sjpuc25@gmail.com
		</li>
	  </ul>
	  <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Modo Badoni', color: colors.secondary }}>Our Location</h2>
	  <div className="rounded-xl overflow-hidden w-full max-w-lg mx-auto shadow-lg">
		<iframe
		  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d972.0013476717678!2d77.60342998594393!3d12.971506648219824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1680c9df9f8b%3A0x611a28067d796a0a!2sSt.%20Joseph&#39;s%20Pu%20College!5e0!3m2!1sen!2sin!4v1757862318871!5m2!1sen!2sin"
		  width="100%"
		  height="450"
		  style={{ border: 0 }}
		  allowFullScreen=""
		  loading="lazy"
		></iframe>
	  </div>
	</div>
  </div>
);

export default ContactPage;