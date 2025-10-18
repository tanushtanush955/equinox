const BackgroundOverlay = ({ isDarkTheme }) => {
  return (
    <div
      style={{
        position: 'fixed',      // Cover the viewport
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',  // So it doesn't block clicks
        backgroundImage: `url(/texture.png)`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        opacity: 0.15,          // Adjust transparency
        mixBlendMode: 'overlay', // Optional for blending
        filter: isDarkTheme ? 'invert(1)' : 'none', // Invert texture in dark mode
        zIndex: -1,             // Behind everything
      }}
    />
  );
};
export default BackgroundOverlay;