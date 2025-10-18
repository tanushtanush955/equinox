const MessageBox = ({ message, onClose, colors }) => {
  if (!message) return null;
  return (
	<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
	  <div className="p-8 rounded-lg shadow-lg text-center" style={{ color: colors.text, backgroundColor: colors.background, borderColor: colors.secondary, borderWidth: 2 }}>
		<p className="text-xl font-bold mb-4" style={{ fontFamily: 'Raleway' }}>{message}</p>
		<button
		  onClick={onClose}
		  className="px-6 py-2 text-md font-bold rounded-full transform transition-all duration-300 hover:scale-105"
		  style={{ backgroundColor: colors.secondary, color: colors.text, border: `2px solid ${colors.secondary}` }}
		>
		  OK
		</button>
	  </div>
	</div>
  );
};

export default MessageBox;