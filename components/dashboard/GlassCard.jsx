    
const GlassCard = ({ children, className = '', hoverEffect = false, onClick }) => {
  return (
    // Fix: Applied the onClick prop to the underlying div element
    <div 
      className={`glass rounded-2xl p-6 transition-all duration-300 ${hoverEffect ? 'hover:bg-white/10 hover:-translate-y-1' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassCard;
